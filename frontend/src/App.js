import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Industries from "@/pages/Industries";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { LanguageProvider } from "@/i18n/LanguageContext";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/industries" element={<Industries />} />
          </Routes>
          <WhatsAppFloat />
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </LanguageProvider>
    </div>
  );
}

export default App;
