from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Imped Logic Systems API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    computers: Optional[str] = None
    location: Optional[str] = None
    service: Optional[str] = "Book Service"
    message: Optional[str] = None


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    mobile: str
    computers: Optional[str] = None
    location: Optional[str] = None
    service: Optional[str] = "Book Service"
    message: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class NewsletterCreate(BaseModel):
    email: EmailStr


class Newsletter(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str


class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Imped Logic Systems API", "status": "ok"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())
    logger.info(f"New lead captured: {lead.email}")
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


@api_router.post("/newsletter", response_model=Newsletter)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already subscribed")
    entry = Newsletter(email=payload.email)
    await db.newsletter.insert_one(entry.model_dump())
    return entry


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    contact = Contact(**payload.model_dump())
    await db.contacts.insert_one(contact.model_dump())
    logger.info(f"New contact message from: {contact.email}")
    return contact


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
