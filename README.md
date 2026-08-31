# NexHaul Logistics

A responsive static website for **NexHaul Logistics**, a fictional freight and logistics portfolio concept.

## Project structure

```text
nexhaul-logistics/
├── assets/
│   ├── daniel-cho.webp
│   ├── favicon.png
│   ├── jordan-brooks.webp
│   ├── maya-reynolds.webp
│   ├── og.png
│   └── sofia-ortega.webp
├── accessibility.html
├── index.html
├── privacy.html
├── README.md
├── robots.txt
├── script.js
├── styles.css
└── terms.html
```

No framework, package manager, environment variable, or build tool is required.

## Preview locally

Open `index.html` directly or run a local static server from the project folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a GitHub repository.
2. Add the contents of this folder to the repository root.
3. Commit and push to the `main` branch.
4. Open **Settings → Pages** in the repository.
5. Choose **Deploy from a branch**.
6. Select `main` and `/ (root)`, then save.

All site links and assets use relative paths, so repository-subpath deployments work correctly.

## Improvements included

- Full-card keyboard and touch interactions for services and industries
- Accessible orange-on-navy color treatment and improved small-text readability
- Progressive-enhancement animation: content stays visible if JavaScript fails
- Mobile navigation overlay, focus loop, Escape handling, and focus restoration
- Active-navigation `aria-current` state
- Separate shipper, carrier, and general inquiry workflows
- Inline accessible validation with live Google Forms submission
- Honest portfolio disclosures replacing unverifiable metrics and testimonials
- Optimized transparent WebP portraits with responsive dimensions and lazy loading
- Branded Open Graph image and favicon
- Privacy, terms, accessibility, and robots files
- Organization schema replaced with portfolio-safe Website schema
- FAQ schema synchronized with visible questions

## Important note

NexHaul Logistics is fictional. The site does not represent a real freight broker, carrier, logistics provider, employer, or commercial offer.
