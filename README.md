# Blue & Green Infrastructure

A responsive, dependency-free homepage built from the supplied brand reference and corporate portfolio.

## Run locally

```sh
npm run dev
```

Open http://localhost:3000. To use another port, run `npm run dev -- --port 3001`.

## Build for hosting

```sh
npm run check
npm run build
```

Upload the contents of `dist/` to a static web host. No Node runtime or third-party requests are required in production. The included Node server is for local preview only.

## Features

- Responsive desktop, tablet and mobile layouts.
- Original brand artwork and real photographs extracted from the supplied portfolio.
- Eight accessible service accordions with contextual imagery.
- Keyboard-operated tabs separating founding-firm legacy and Blue & Green commissions.
- Project detail dialogs, founding-partner profiles and a mobile navigation menu.
- Project brief form with validation and a local text-file download.
- Reduced-motion support, visible keyboard focus, skip navigation and native modal focus management.

## Contact handoff

The supplied materials contain no verified business email, phone number or enquiry endpoint. The project form therefore explicitly creates a local brief; it does not claim to send a message. To enable live enquiries, supply the business contact details and connect the form to a server-side endpoint with validation, abuse protection and delivery monitoring. Do not embed mail-service credentials in frontend code.

## Content and assets

Content is adapted from `Corporate Portfolio.docx`. Draft editing notes, incomplete entries, inconsistent incorporation dates and conflicting cumulative-experience figures are omitted. Existing projects are distinguished from the founding firms' legacy; scope is not invented where the source does not provide it.

Only `index.html`, `styles.css`, `app.js` and `assets/` are included in the build. The original portfolio and private review files are not served by the preview server or included in the production output.

The supplied photography retains its original resolution. Higher-resolution originals of the hero and the vertical campus photograph would improve very large desktop displays.
