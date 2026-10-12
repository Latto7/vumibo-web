# Vumibo – official website

Rescue Crew songs & cartoons for kids ages 2–6. Built with [Astro](https://astro.build) and [GSAP](https://gsap.com), deployed on Vercel.

## Develop
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Add a new episode
Add one object to `EPISODES` in `src/data/site.ts` (slug, YouTube id, thumbnail in `public/img/`, chapters). The episodes list, detail page, sitemap and VideoObject schema update automatically.

## Structure
- `src/data/site.ts` – links, characters, episodes (single source of truth)
- `src/layouts/Base.astro` – SEO meta, Open Graph, JSON-LD, shared scripts
- `src/scripts/motion.ts` – GSAP + ScrollTrigger animations (respects `prefers-reduced-motion`)
- `src/styles/` – design system (`global.css`) and motion styles
- `public/` – images (WebP), character voice clips, font, QR codes

## Deploy
Import the GitHub repo in Vercel – the Astro preset is detected automatically. After adding a custom domain, update `site` in `astro.config.mjs` and `public/robots.txt`.

## Privacy
No cookies, analytics or trackers. YouTube videos load in privacy-enhanced mode only after a click.
