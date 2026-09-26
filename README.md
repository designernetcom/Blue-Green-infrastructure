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

## Pages

| Page | Content |
| --- | --- |
| `index.html` | Home: hero, key facts, introduction and links to every page |
| `about.html` | Company story and history timeline |
| `partners.html` | Founding partner profiles |
| `expertise.html` | Capabilities, engineering lifecycle and sustainability |
| `projects.html` | Blue & Green commissions |
| `track-record.html` | Partners' project track record and the Aditi project index |
| `clients.html` | Selected clients of our partners |
| `network.html` | Architects & PMC network |
| `contact.html` | Project brief form |

Every page repeats the same header, menu, footer and dialogs as static HTML, so a change to navigation must be made in each page. Pages use lowercase hyphenated file names; the preview server and build pick them up automatically.

## Features

- Responsive desktop, tablet and mobile layouts.
- Original brand artwork and real photographs extracted from the supplied portfolio.
- Eight accessible service accordions with contextual imagery.
- History timeline separating Blue & Green's establishment (18 December 2025) from the partners' firm histories.
- Founding-partner profiles with firm logos (portrait slots ready for photographs).
- Blue & Green commissions illustrated with original schematic drawings, labelled as illustrative.
- Partners' project track record: every project names its location, partner and executing firm, plus a filterable Aditi Irrigation project index.
- Selected clients of our partners, and the architects & PMC network.
- Project detail dialogs with photo galleries, and a mobile navigation menu.
- Project brief form with validation and a local text-file download.
- Reduced-motion support, visible keyboard focus, skip navigation and native modal focus management.

## Contact handoff

The supplied materials contain no verified business email, phone number or enquiry endpoint. The project form therefore explicitly creates a local brief; it does not claim to send a message. To enable live enquiries, supply the business contact details and connect the form to a server-side endpoint with validation, abuse protection and delivery monitoring. Do not embed mail-service credentials in frontend code.

## Content and assets

Content is adapted from `Corporate Portfolio(1).pdf` (the databank). Draft editing notes, incomplete entries, inconsistent incorporation dates and conflicting cumulative-experience figures are omitted. Existing projects are distinguished from the founding firms' legacy; scope is not invented where the source does not provide it.

Only the site pages, `styles.css`, `app.js` and `assets/` are included in the build. The original portfolio and private review files are not served by the preview server or included in the production output.

The supplied photography retains its original resolution. Higher-resolution originals of the hero and the vertical campus photograph would improve very large desktop displays.

## Assets still required

- Black-and-white blazer portraits of the three partners: add as `assets/partners/*.jpg` and replace the monogram in each `.portrait` (see the HTML comments).
- The official Samruddhi Enterprises logo, and high-resolution versions of the Agrotech, Aditi and Hydroscape logos (current files are upscaled from 46–87 px originals).
- Aditi Irrigation presentation photography, and any real CAD/technical drawings, to replace or supplement the illustrative schematics.
- `assets/image25.jpg` is not used: it is captioned Reliance Corporate Park in the databank but shows the McLaren Technology Centre, UK.
