
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  schema?: object; // Structured Data untuk Google
}

const SEO: React.FC<SEOProps> = ({ title, description, image, type = 'website', schema }) => {
  useEffect(() => {
    // 1. Update Title
    document.title = `${title} | Pruidea.com`;

    // 2. Update Meta Tags Manual (karena kita tidak pakai library eksternal berat)
    const updateMeta = (name: string, content: string) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('name', name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    const updateOG = (property: string, content: string) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('property', property);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateOG('og:title', title);
    updateOG('og:description', description);
    updateOG('og:type', type);
    if (image) updateOG('og:image', image);

    // 3. Inject Schema Markup (JSON-LD)
    // Ini senjata rahasia agar tampil keren di Google Search (Rich Snippets)
    if (schema) {
        let script = document.querySelector('#seo-schema');
        if (!script) {
            script = document.createElement('script');
            script.id = 'seo-schema';
            script.setAttribute('type', 'application/ld+json');
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);
    }

    return () => {
        // Cleanup title saat pindah halaman
        document.title = "Pruidea.com - Etalase Ide Digital Indonesia";
    };
  }, [title, description, image, type, schema]);

  return null;
};

export default SEO;
