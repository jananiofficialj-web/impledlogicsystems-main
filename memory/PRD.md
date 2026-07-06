# Imped Logic Systems — Enterprise IT Website

## Original Problem Statement
Build a premium enterprise website for **Imped Logic Systems** — an IT services company
providing laptop / desktop repair, Computer AMC (Annual Maintenance Contracts), networking,
motherboard chip-level repair, data recovery and corporate IT solutions. Design language
inspired by Tata Elxsi (premium multinational corporate feel). Content structure inspired
by an attached reference (Service Ninjas). Must NOT resemble a local repair shop — should
feel like Dell / IBM / Cisco / Lenovo Enterprise / HP Business.

## Architecture
- **Frontend**: React 19 + React Router 7 + Tailwind CSS + Framer Motion + Lucide icons + Sonner (toasts)
- **Backend**: FastAPI + Motor (async MongoDB)
- **DB**: MongoDB — collections: `leads`, `newsletter`, `contacts`
- **Design system**: Primary #071C38, Accent #00AEEF, BG #F7F9FC · Poppins headings + Inter body

## User Personas
1. **Enterprise IT procurement leads** evaluating a long-term AMC partner.
2. **SME founders / office managers** looking for laptop/desktop repair + support.
3. **Editorial readers** browsing IT best-practice content (blog).

## Core Requirements (static)
- Premium enterprise look (Tata Elxsi-inspired)
- Single-page home with anchor navigation + separate Blog and Industries routes
- Book Service lead capture form on hero
- Contact form + newsletter subscription
- 10 real blog articles with individual article pages
- 10 industry pages with tailored solutions
- Fully responsive, animation-rich, SEO-friendly

## What's Been Implemented (Feb 08, 2026)
- Hero with premium bg image, glassmorphic Book Service form → `POST /api/leads`
- Our Speciality section (Desktop / Laptop / Network AMC)
- What We Offer (10 capability cards with Lucide icons)
- Free Site Visit CTA
- Trending Services grid (9 cards)
- AMC Services pricing grid (5 tiers, "Laptop AMC" featured)
- Industries preview (6 highlighted) + full `/industries` page (10 sectors, alternating layouts)
- CTA Banner + Contact section (form → `POST /api/contact`)
- Enterprise footer with client marquee + newsletter (`POST /api/newsletter` w/ 409 dedupe)
- Blog listing at `/blog` (featured + 9 grid cards, 10 total real articles)
- Blog post detail at `/blog/:slug` with prose, related articles, back-to-home CTA
- Sticky transparent → glass navigation with mobile drawer

## Backend Endpoints (all `/api` prefixed)
- `GET  /api/` — health
- `POST /api/leads` · `GET /api/leads` — Book Service submissions
- `POST /api/newsletter` — newsletter with 409 dedupe
- `POST /api/contact` — contact form

## Backlog / Next Tasks
- **P1**: WhatsApp floating button; Google Maps embed in Contact section
- **P1**: Admin dashboard route (`/admin`) to view captured leads/contacts (auth-protected)
- **P2**: SEO — per-page meta tags, sitemap.xml, OG images
- **P2**: Blog CMS (content editable from an admin panel)
- **P2**: Case-studies / testimonials section with animated logo grid
- **P3**: Multi-language (EN/HI); dark-mode variant; page transitions with Framer
- **P3**: Analytics (GA4 / Plausible) integration
