# Milan Lamsal — Portfolio V2

Website: https://milan-lamsal.github.io/Portfolio-V2/

A restrained editorial portfolio with a 1320px split layout with 35/65 columns and responsive typography, a sticky biography, project filters, expandable implementation notes, real project links, and optional engineering labs and chess. The site uses one sans-serif family (DM Sans), monospace metadata, an exact #09090b background, #fafafa text, #a1a1aa supporting text, and thin white 8% dividers. Emerald is reserved for status and active navigation. Creative/Recruiter modes have been removed.

## Edit and run

The repository root contains the built GitHub Pages export. Editable Next.js/TypeScript source, content, tests, and scripts are in site-source/. Images are in site-source/public/. Project information comes from inspected source and supplied project records. No outcomes or missing features are invented. Only the salon project has an actual site screenshot; the remaining case studies use labeled architecture diagrams.

From site-source/, run npm ci and npm run dev. To update the published root, run npm test, npm run lint, and npm run build:pages, then commit both the source and generated export. GitHub Pages publishes main from / (root). The check workflow runs the tests, lint, build, and TypeScript independently.

## Verification

The editorial revision was reviewed at 1280×720 and 375×812. Desktop measurements confirmed a 1024px container, 52px name, sticky bio, no horizontal overflow, and the second project beginning at approximately 683px. Mobile measurements confirmed stacked content, static bio, no overflow, and 44px filter targets. Category filters, native detail expansion, keyboard activation, Ctrl+K search, Escape focus return, contact, optional chess entry, labs, and all three case-study routes were exercised in the browser. Five functional tests and ESLint passed. The production build and TypeScript passed after repairing a Windows generated-output folder issue. Internal export links were checked before upload.

No Lighthouse score or formal accessibility certification is claimed. A current résumé PDF is still needed before a download link is enabled. The POS lab is an illustrative simulation; the original POS report was not supplied. The backend case study discloses unresolved implementation issues. Contact opens an email draft and sends nothing automatically.

## Interaction components

Selectively uses shadcn/ui Button, Dialog, Command, and Tooltip with keyboard navigation and focus restoration. Native project filters and disclosure controls remain in place. Configuration is in site-source/components.json.

