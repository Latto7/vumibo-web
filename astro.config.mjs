// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Vercel'deki son alan adini buraya yaz (ornegin https://vumibo.com)
export default defineConfig({
  site: 'https://vumibo.vercel.app',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
