# Gaia Gómez — Portfolio

Design and software engineering portfolio. Built from scratch as a working example of hybrid product thinking — deliberate visual system, frontend architecture and responsive UI without relying on component libraries or CSS frameworks.

**Live:** [gaiagomez.com](https://gaiagomez.com)

## Stack

- **React 19** + **Vite 7**
- Custom CSS — no UI framework
- Deployed on **Vercel**

## Features

- Animated hero with motion interactions and scroll-driven layout
- Dark editorial project layout — full-bleed cinematic rows on desktop
- Mobile project cards — image, content and buttons unified as a single card with staggered scroll reveal
- Project detail modals with case study structure
- Scroll reveal via Intersection Observer with `prefers-reduced-motion` support
- Custom visual system: type scale, color tokens, spacing rhythm
- Fully responsive across desktop, tablet and mobile
- WebP-optimized assets

## Projects featured

| Project | Description |
|---|---|
| **Lumi** | Clinical ops platform for independent psychology practices |
| **Fynt** | Personal finance dashboard — SSR, optimistic UX, testing pipeline |
| **Gaia Portfolio** | This site |
| **Selected Design Works** | Brand, editorial, hospitality and packaging design (2021–2025) |

## Getting started

```bash
npm install
npm run dev
```

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build |
| `npm run lint` | Run ESLint |
