# Milan Lamsal — Selected projects

A personal portfolio with verified project stories, a command palette, and hands-on engineering experiments. Built with Next.js App Router, React, TypeScript, Tailwind CSS, Lucide, and chess.js. The site exports static files: no database, API keys, or server runtime are needed.

## Interaction components

shadcn/ui is configured in `components.json`, using the official New York Radix registry. Button, Dialog, Command, and Tooltip components live in `src/components/ui`. The command palette, contact dialog, and terminal use managed focus, Escape dismissal, and focus restoration. Component tokens and editorial overrides preserve the existing dark theme and layout. Project filters and native details remain unchanged. No official shadcn Codex skill was installed; implementation followed https://ui.shadcn.com/docs/installation/next and the official component documentation.

## Run and build

Use a current Node.js LTS release compatible with Next.js 16.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. To preview the production export instead:

```sh
npm run build
npm start
```

Stop the development server first so port 3000 is free. `npm start` serves `out/`, supports nested routes, and returns the custom 404. It is a local preview server. Production hosts should serve the `out/` directory directly.

```sh
npm test
npm run typecheck
npm run lint
```

The lockfile records the installed dependency versions. Use `npm ci` for reproducible installation. Production builds use Next.js's supported Webpack engine because Turbopack encountered a CSS worker startup failure in this Windows environment. Static generation uses one worker to reduce concurrent output-directory creation on Windows; this affects build speed, not visitor behavior.

## Creative direction

The editorial design uses #09090b backgrounds, #fafafa text, #a1a1aa supporting text, and restrained emerald status and navigation accents. DM Sans and IBM Plex Mono metadata are bundled locally. A sticky biography sits beside the project feed on desktop; mobile uses a single column.

The signature experience connects Milan's chess background with a working terminal and a legal mate-in-one puzzle. The three labs follow the personalization addendum: a shared-inventory POS simulation, the terminal/chess workspace, and a linear-scan versus B+ style index lookup. Project API exploration supplements those labs. Native CSS transitions keep motion limited to small interface feedback, previews, and overlays. Reduced motion is respected.

## Editing content

`src/content/portfolio.ts` is the central source for contact details, education, experience, technologies, projects, evidence links, and unpublished content notes.

- Add a real résumé PDF under `public/`, then set `profile.resume` to its URL. The link remains hidden until configured.
- Add a project to `projects`; its case-study route is generated at build time. Rebuild after changes.
- Replace project media in `public/images/` and update `project-visual.tsx` for a new media treatment.
- Set `NEXT_PUBLIC_SITE_URL` before building for a custom domain. See `.env.example`; this origin is used by metadata, sitemap, and robots.
- Visual tokens, layout breakpoints, and motion rules live in `src/app/globals.css`.

Contact uses real mail links and a copy-email action. The topic drawer opens the visitor's email application; it does not send messages. No meeting scheduler, contact delivery backend, tracking, or analytics provider is configured. If analytics is added later, use an actual configured provider and disclose its data practices.

## Structure

| Location | Purpose |
| --- | --- |
| `src/app/page.tsx` | Work, playground, biography, skills, education, contact |
| `src/app/projects/[slug]/page.tsx` | Three generated project stories |
| `src/app/labs/page.tsx` | Three interactive experiments |
| `src/components/site-shell.tsx` | Navigation, theme, recruiter mode, command palette, contact |
| `src/components/terminal.tsx` | Supported commands, history, completion |
| `src/components/chess-puzzle.tsx` | Legal moves, checkmate validation, keyboard board |
| `src/components/labs.tsx` | POS, index visualizer, simulated API explorer |
| `src/lib/simulations.ts` | Pure simulation and validation logic |
| `tests/simulations.test.ts` | Functional tests for simulations and chess |

## Interaction guide

- Ctrl/Cmd+K opens searchable commands. Arrow keys select, Enter runs, Escape closes.
- Keys 1–4 navigate work, labs, about, and contact outside editable controls or dialogs.
- The terminal accepts `help`, `about`, `skills`, `projects`, `experience`, `chess`, `contact`, and `clear`. Up/Down recall history; Tab completes a unique command. It does not execute system commands.
- The chess board supports click/tap and arrow-key focus. Select the white queen, then a legal destination. Reset allows another attempt.
- Recruiter mode simplifies the same content and persists locally. Theme preference also persists locally.
- The POS menu and inventory use one state source. Orders validate stock before changing it; reset restores initial stock.
- The index lab counts actual simulated comparisons and page visits. It supports run, pause, resume, speed changes, target selection, and reset. It is an in-memory educational B+ style index, not a disk database benchmark.
- The API explorer runs locally with `demo-user` and `demo-password`. Success envelopes follow the reviewed login controller. Error summaries are explicitly illustrative because the source does not contain a centralized JSON error handler. No credentials leave the page.

## Content evidence and boundaries

Personal details come from the supplied briefs and Milan's direct confirmation. The associate degree is labeled "Computer Information System" as confirmed by Milan; no unconfirmed formal degree designation is added. No résumé file or original POS report was supplied.

- **Hair by Zoe:** Existing local project handoff records and an actual saved screenshot support the booking/admin/notification descriptions. The screenshot is included with the site. [Recorded live site](https://hair-salon-website.bhagawanlamsal.workers.dev/). The public portfolio does not expose private repository details or operational data. A fresh live-service audit was not performed.
- **News Explorer:** [News-App source](https://github.com/Milan-Lamsal/News-App), including service normalization, cache expiry, infinite scrolling, and browser bookmarks. Authentication and personalized feeds are not claimed. Live deployment availability was not verified.
- **Backend study:** [backend-project source](https://github.com/Milan-Lamsal/backend-project). Only user routes are mounted. Known unresolved controller issues are disclosed in the case study. The portfolio does not claim production readiness or complete video/playlist CRUD.
- The POS simulation is newly built for this portfolio. It is not presented as the missing research report or a deployed commercial system.
- Architecture diagrams are labeled as diagrams. They do not pretend to be application screenshots. Unverified projects remain unpublished in `pendingContent`.

## Validation and remaining review

The final implementation passed all five functional tests, TypeScript, ESLint, and a production static build on October 13, 2026. The export generated all nine entries successfully. HTTP checks against the production preview returned 200 for home, labs, all three case studies, sitemap, and robots, plus 404 for a missing route. Repeat the commands above after edits. Functional coverage includes immutable inventory updates, stock exhaustion, index lookup results and counters across 16/32/64/128 records, login validation branches, and legal chess checkmate.

Browser review exercised the desktop layout at 1280×720, the 375px lab layout, command search and launching, legal chess completion/reset, terminal history/completion, POS success/out-of-stock/reset, and index pause/resume/completion. It identified and prompted fixes for sidebar spacing and unwanted inline terminal autofocus.

Remaining browser checks: the final home layout at 375px, 768px and 1440px; final desktop sidebar refinement; complete light-theme review; clipboard success; full focus-return/keyboard navigation; and API explorer interaction. Browser approval review stopped at an account usage limit. These checks are not claimed complete. Lighthouse and a formal accessibility audit have not been run; no performance score is claimed.

## Deployment

The existing Sites identity is retained in `.openai/hosting.json`; do not create another Site for updates. Its static directory is `out`. Use the Sites source workflow to push the checked source, package the matching export, and deploy a saved version. The intended audience is owner-private; publication does not make it public.

Publication is pending. The source helper reached its credential-input step, but this session's approval policy rejected stdin submission. Granting permission to the local repository did not resolve the block. No source-upload success or deployment was reported; the expected hosting URL must not be treated as live. Resume the existing Site when the execution approval issue is resolved. Credentials are not included in this project.

For another static host, build and upload `out/`, enable directory indexes/trailing-slash routes, and serve `404.html` for missing routes. Set the final origin and rebuild. No secrets belong in the source or static export.
