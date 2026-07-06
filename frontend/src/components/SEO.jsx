import { useEffect } from "react";

const DEFAULT_OG =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80";
const SITE_URL = "https://www.impedlogic.com";

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [_, k, v] = selector.match(/\[(\w+)="([^"]+)"\]/) || [];
    if (k && v) el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_OG,
  type = "website",
  keywords,
}) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title
    ? `${title} · Imped Logic Systems`
    : "Imped Logic Systems · Enterprise Laptop, Desktop & IT Infrastructure";

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description || "");
    if (keywords) setMeta('meta[name="keywords"]', "content", keywords);

    // Open Graph
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description || "");
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:site_name"]', "content", "Imped Logic Systems");

    // Twitter
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description || "");
    setMeta('meta[name="twitter:image"]', "content", image);

    // Canonical
    setLink("canonical", url);
  }, [fullTitle, description, image, url, type, keywords]);

  return null;
}
