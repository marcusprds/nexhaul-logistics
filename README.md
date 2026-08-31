# NexHaul Logistics

A responsive static website for **NexHaul Logistics**, a fictional freight and logistics portfolio concept. It can be deployed directly to GitHub Pages without a build step.

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

## Required production configuration

This project intentionally remains in demonstration mode until real company information is provided.

### 1. Replace fictional business information

Review every page and replace or remove:

- `.example` email addresses
- Fictional team names, biographies, and portraits
- Illustrative operating language and service claims
- Demo shipment and dashboard data
- Careers and talent messaging
- Privacy and terms placeholders

Add real USDOT, MC, insurance, safety, address, claims, and service information only when it can be verified.

### 2. Google Forms integration

The shipper, carrier, and general inquiry interfaces submit to the published **NexHaul Logistics — Website Inquiries** Google Form. Field names in `index.html` map directly to the Google Forms response entry IDs, while `script.js` provides accessible validation and confirmation states.

The form is owned by the configured project Google account, and email notifications for new responses are enabled. If the Google Form is replaced or its questions are recreated, update the form action and corresponding `entry.*` field names in `index.html`.

Before commercial use:

- Add spam protection and review Google account access controls.
- Define response retention and deletion procedures.
- Test every inquiry route after any Google Form question change.
- Use a dedicated secure carrier-onboarding system for insurance, authority documents, banking, or other sensitive records.

### 3. Complete deployment metadata

After the final domain is known:

- Add a canonical URL to every indexable page.
- Add `og:url`.
- Change Open Graph and X image paths to absolute HTTPS URLs.
- Add the organization URL, logo, address, and verified contacts to structured data.
- Generate `sitemap.xml` with absolute production URLs.
- Add the sitemap URL to `robots.txt`.

### 4. Add measurement carefully

Connect privacy-conscious analytics and conversion events only after the organization has chosen its provider and consent requirements. Useful events include:

- Shipper form starts and completions
- Carrier form starts and completions
- Service-card selections
- Telephone and email clicks
- Careers inquiries

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

## Accessibility testing before launch

Complete manual checks with:

- Keyboard-only navigation
- VoiceOver with Safari
- NVDA with Firefox or Chrome
- 200% and 400% browser zoom
- Reduced-motion and high-contrast settings
- Current iOS and Android devices

## Important note

NexHaul Logistics is fictional. The site does not represent a real freight broker, carrier, logistics provider, employer, or commercial offer.
