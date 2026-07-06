# Rock Solid Christian Church Landing Page

A responsive, Figma-faithful landing page built as the application project for Triumph Tech.

**Live site:** https://triumph-assessment.netlify.app/

## Overview

A single-page marketing site for a fictional church, Rock Solid Christian Church. The goal was to translate a Figma design into a clean, responsive, production-quality front end that holds up from mobile through wide desktop.

## Tech stack

- **HTML5:** semantic, accessible markup
- **CSS3:** custom styles with design tokens (CSS custom properties), Flexbox, and Grid
- **Bootstrap 5.3.3:** grid, utilities, and the offcanvas mobile menu
- **Swiper 11:** the responsive ministry carousel
- **Vanilla JavaScript:** service countdown timer and carousel initialization
- **Inline SVG icons:** brand, navigation, and UI glyphs are inlined in the
  markup rather than pulled from an icon-font CDN, so no extra render-blocking
  CSS or webfonts load for iconography
- **Inter** (Google Fonts): typography

There is no build step; it is a static site.

## Features

- Fully responsive layout (mobile, tablet, desktop) matched to the Figma
- Live countdown to the next Sunday service
- Swipeable, autoplaying ministry carousel: arrow-key navigation, pause on
  hover, auto-rotation stops when keyboard focus enters, and the centered
  card is highlighted on mobile where touch has no hover
- Sections fade in as you scroll to them (using IntersectionObserver). This is
  turned off for anyone who has "reduce motion" set on their device, so it stays
  comfortable for people who get motion sickness or just prefer less movement
- WCAG 2.2 AA: passes an axe-core audit with zero violations (contrast-safe
  text tokens, 24px tap targets, skip link, carousel ARIA per the W3C
  pattern, reduced-motion support throughout)
- Performance: photography served as right-sized WebP with lazy loading,
  a WebP decorative texture, no icon-font CDNs (icons are inline SVG),
  preloaded hero image, a `gstatic` preconnect for the webfont, and
  cache-control headers tuned in `netlify.toml`
- Security headers in `netlify.toml`: `nosniff`, a restrictive
  `Referrer-Policy`, `X-Frame-Options: DENY`, and HSTS
- Bootstrap offcanvas menu on smaller screens
- Design tokens for consistent theming

## Running locally

Because it is a static site, you can open `index.html` directly in a browser. For the smoothest experience with live reload, serve it locally:

```bash
npx serve .
```

Then open the printed local URL. (The VS Code Live Server extension also works.)

## Project structure

```
.
├── index.html     # markup for all sections
├── styles.css     # custom styles and responsive breakpoints
├── main.js        # countdown, carousel init, scroll reveals
├── netlify.toml   # headers, caching, and redirect config
├── favicon.svg    # brand favicon
└── images/        # photography, logo, and artwork
```

## Approach

- **Figma fidelity:** sections, spacing, the type scale, and the button system were measured against the design and matched, using full-bleed cards over a centered 1280px content column with exact radii and gaps.
- **Bootstrap plus custom CSS:** Bootstrap handles the grid, utilities, and interactive components; custom CSS covers the bespoke layouts and Figma-exact values the framework defaults cannot reach.
- **Responsive, not scaled:** the design is one fixed desktop snapshot, so the build reflows (full-bleed sections, a fluid content column, `clamp()` typography, `aspect-ratio` media) rather than shrinking a fixed canvas.
