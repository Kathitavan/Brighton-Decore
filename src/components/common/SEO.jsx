// src/components/common/SEO.jsx
// Lightweight, zero-dependency dynamic SEO component for per-page metadata, OpenGraph, Twitter Cards, and JSON-LD schema
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_IMAGE = 'https://brightondecor.co/assets/imgs/main%20logo.png';
const BASE_URL = 'https://brightondecor.co';

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  schema,
}) {
  const location = useLocation();
  const fullUrl = `${BASE_URL}${location.pathname}`;
  const canonicalUrl = canonical || fullUrl;
  const siteTitle = title 
    ? `${title} | Brighton Decor Ltd` 
    : 'Brighton Decor Ltd | Blinds, Window Coverings & Flooring — Saskatoon, SK';

  useEffect(() => {
    // 1. Page Title
    document.title = siteTitle;

    // Helper to create or update meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Primary Meta Description
    if (description) {
      setMetaTag('name', 'description', description);
    }

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', siteTitle);
    if (description) setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:title', siteTitle);
    if (description) setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // 6. JSON-LD Structured Data Schema (if supplied)
    let schemaScript = document.getElementById('page-structured-data');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-structured-data';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Clean up dynamic schema on unmount if route changes
      const s = document.getElementById('page-structured-data');
      if (s) s.remove();
    };
  }, [siteTitle, description, canonicalUrl, ogImage, ogType, schema]);

  return null;
}
