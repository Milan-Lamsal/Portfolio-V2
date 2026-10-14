# Milan Lamsal · Portfolio

A personal portfolio with project case studies, interactive engineering labs, a command palette, recruiter mode, and a chess puzzle.

**Website:** https://milan-lamsal.github.io/Portfolio-V2/

## Repository layout

- The repository root contains the built static website. GitHub Pages publishes `main` from `/ (root)`; `.nojekyll` allows Next.js's `_next` assets to be served.
- `site-source/` contains the editable Next.js App Router / TypeScript project, dependencies, tests, and build scripts.
- The original Portfolio repository remains separate. Add a current résumé PDF when ready.
- This second portfolio lives in Milan-Lamsal/Portfolio-V2.

## Work locally

Use Node.js 22.13 or later (CI uses Node 24):

```sh
cd site-source
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The ordinary development preview uses the domain root. Do not copy `.env.example` unless you want to test the GitHub Pages prefix locally.

## Update the live site

```sh
cd site-source
npm test
npm run lint
npm run build:pages
```

`build:pages` builds with `/Portfolio` as the base path and copies the export into the repository root. It does not push or publish. Review and commit both `site-source/` and the generated root changes, then push or merge to `main`. Existing generated asset fingerprints may remain in the repository; only current files are referenced. GitHub Pages publishes the root without changing the existing hosting arrangement. The check workflow independently installs, tests, lints, type-checks, and builds the editable source on pushes and pull requests.

For another domain, update the two environment values in `site-source/scripts/build-pages.mjs`, rebuild, and adjust the Pages domain configuration. The origin and path are build-time values.

## Content and features

Edit `site-source/src/content/portfolio.ts` for contact information, education, experience, skills, and projects. Styles and responsive tokens are in `site-source/src/app/globals.css`. Add a current résumé under `site-source/public/` and configure its public URL in `profile.resume` when ready.

- Home with editorial project rows, biography, skills, education, and direct contact.
- Three case studies: Hair by Zoe, News Explorer, and a candid backend architecture study.
- Labs: shared-inventory POS simulation; terminal with history, completion, and legal chess; B+ style lookup versus a full scan.
- Local simulated API explorer with success and error cases, no network requests or real credentials.
- Ctrl/Cmd+K search, keyboard navigation, persisted themes and recruiter mode, reduced-motion support.
- Real email and social links. The message drawer opens an email draft; no messages are sent automatically.

Project claims are based on inspected source and supplied records. The salon image is an actual saved site capture; other visuals are labeled diagrams. The POS lab is a new illustrative simulation, not the missing original research report. The backend case study discloses unresolved source issues and makes no production-readiness claim. No analytics or contact delivery service is configured.

## Validation

On October 13, 2026, the `/Portfolio` production build passed TypeScript, ESLint, all five functional tests, and an export audit of 202 internal asset/page links across eight HTML files. Browser review previously exercised command search, chess completion/reset, terminal history/completion, POS stock/order/reset, index pause/resume, a desktop layout, and the narrow lab layout.

Full final browser review remains incomplete: light-theme review, clipboard behavior, complete focus-return checks, and final layouts at 375/768/1440px. Browser approval review encountered an account usage limit. Lighthouse and a formal accessibility audit were not run; no score is claimed.

No private Sites hosting credentials, generated dependencies, or build caches are included in this repository.
