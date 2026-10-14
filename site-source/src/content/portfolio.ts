export const profile = {
  name: 'Milan Lamsal',
  role: 'Computer Science student',
  headline: 'Thoughtful software.\nHuman experiences.',
  intro: 'I build web applications, including booking workflows, news interfaces, and browser-based tools.',
  about: 'I’m from Nepal and study Computer Science at Rowan University in New Jersey. My projects include web interfaces, booking workflows, and a Node.js learning backend.',
  email: 'milan123lamsal@gmail.com',
  github: 'https://github.com/Milan-Lamsal',
  linkedin: 'https://www.linkedin.com/in/milanlamsal/',
  resume: null as string | null,
  location: 'New Jersey, US',
  timezone: 'America/New_York',
  education: [
    { institution: 'Rowan University', title: 'B.S. Computer Science', date: 'Expected May 2029' },
    { institution: 'Atlantic Cape Community College', title: 'Associate degree · Computer Information System', date: 'May 2026' },
  ],
  experience: [{ institution: 'Bowling Green State University', title: 'Technical Support', date: 'Jan — May 2024' }],
  achievement: 'First place · Inter-College Chess Championship · February 2023',
  skills: {
    Frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
    Programming: ['Python', 'Java', 'C', 'C++', 'JavaFX'],
    Data: ['SQL', 'MySQL'],
    Workflow: ['Git', 'GitHub'],
  },
};

export type Project = {
  slug: string; number: string; name: string; category: string; description: string;
  technologies: string[]; repository?: string; live?: string; image?: string;
  visual: 'salon' | 'news' | 'api'; status: string;
  story: { title: string; text: string }[];
  evidence: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: 'hair-by-zoe', number: '01', name: 'Hair by Zoe', category: 'FULL-STACK / REAL-WORLD PRODUCT', visual: 'salon',
    description: 'A stylist’s digital home. From discovering a new look to finding a place in the appointment book.',
    technologies: ['React', 'TypeScript', 'Cloudflare D1'],
    live: 'https://hair-salon-website.bhagawanlamsal.workers.dev/', image: '/images/hair-by-zoe.jpg',
    status: 'Implementation documented in project records',
    story: [
      { title: 'The problem', text: 'A salon website needs to support two different journeys: a visitor exploring a stylist’s work, and a stylist managing appointments behind the scenes.' },
      { title: 'The objective', text: 'Bring services, real client photography, appointment availability, and day-to-day administration into one coherent product.' },
      { title: 'The approach', text: 'The public experience centers on services, booking, a filterable gallery, and contact. A separate administrative workspace handles bookings, services, clients, photos, and settings.' },
      { title: 'Technical implementation', text: 'React and TypeScript run on a Vinext/Vite foundation, with Cloudflare Workers, a D1 SQLite database, and Drizzle. Email notifications use a delivery outbox with per-recipient retry handling. Calendar access is a read-only subscription.' },
      { title: 'Challenges & tradeoffs', text: 'Booking state and email delivery are separate concerns: an appointment should not disappear because a notification needs a retry. Responsive WebP images balance the importance of salon photography with page weight.' },
      { title: 'The result', text: 'Project records document a deployed booking platform, an administrative workspace, and a gallery with 27 real client looks. Payments are not part of this implementation. The image shown here is an actual saved site capture.' },
      { title: 'Engineering takeaway', text: 'A useful full-stack product includes the quieter operational details—delivery retries, manageable content, and clear appointment state—as well as its public interface.' },
    ], evidence: [{ label: 'Visit the salon website', href: 'https://hair-salon-website.bhagawanlamsal.workers.dev/' }],
  },
  {
    slug: 'news-explorer', number: '02', name: 'News Explorer', category: 'FRONTEND / INFORMATION DESIGN', visual: 'news',
    description: 'Different sources. One reading flow. A news reader with saved articles and thoughtful browser caching.',
    technologies: ['React', 'Tailwind CSS', 'LocalForage'], repository: 'https://github.com/Milan-Lamsal/News-App',
    status: 'Verified from public source',
    story: [
      { title: 'The problem', text: 'News providers expose different response formats. A reader still needs a consistent way to browse stories, revisit articles, and move between categories.' },
      { title: 'The objective', text: 'Build a React reading experience that normalizes provider data and remembers useful state in the browser.' },
      { title: 'The approach', text: 'Guardian stories and MediaStack health news map into a shared article shape. Category pages, date filters, a loaded-article text filter, and saved stories keep navigation focused.' },
      { title: 'Technical implementation', text: 'React Router handles views. Axios retrieves data. IntersectionObserver loads pages of ten articles. Bookmarks use localStorage; LocalForage caches API results with category-specific expiry windows.' },
      { title: 'Challenges & tradeoffs', text: 'Caching reduces repeated fetches but introduces staleness. The source uses 15-minute headline, 30-minute category, and 60-minute health caches, plus a manual clear-cache control. Text search covers already loaded articles, not the provider’s entire archive.' },
      { title: 'The result', text: 'The repository contains a working frontend implementation with multiple news views, infinite scrolling, saved articles, and a theme toggle. Authentication and personalized feeds are roadmap ideas, not delivered features. Live deployment availability has not been verified.' },
      { title: 'Engineering takeaway', text: 'Normalizing data at the service boundary keeps UI components independent of individual provider response shapes. A cache also needs explicit expiry and a way to recover from stale data.' },
    ], evidence: [{ label: 'News API service', href: 'https://github.com/Milan-Lamsal/News-App/blob/main/src/services/newsAPI.js' }, { label: 'Cache implementation', href: 'https://github.com/Milan-Lamsal/News-App/blob/main/src/services/cacheService.js' }],
  },
  {
    slug: 'backend-project', number: '03', name: 'Behind the request', category: 'BACKEND / ENGINEERING STUDY', visual: 'api',
    description: 'An evolving Node.js backend exploring authentication, media handling, and document relationships.',
    technologies: ['Node.js', 'Express', 'MongoDB'], repository: 'https://github.com/Milan-Lamsal/backend-project',
    status: 'Learning project · source reviewed',
    story: [
      { title: 'The problem', text: 'Account-based applications need more than a login screen. They need request boundaries, persistent user records, password handling, and a clear approach to uploaded media.' },
      { title: 'The objective', text: 'Explore these backend responsibilities in a Node.js project with routes, controllers, middleware, models, and utility modules.' },
      { title: 'The approach', text: 'Express mounts user routes under /api/v1/users. Mongoose defines users and related document models. Middleware separates authentication and multipart upload handling from controller logic.' },
      { title: 'Technical implementation', text: 'The user model uses bcrypt password hashing and JWT access/refresh token methods. Multer handles uploads, Cloudinary stores media, and MongoDB persists documents. Only user routes are mounted; the presence of video or playlist models does not imply completed CRUD endpoints.' },
      { title: 'Challenges & tradeoffs', text: 'The reviewed source has unresolved issues in refresh-token, avatar, current-user, and watch-history handlers. It also lacks centralized JSON error middleware. This case study presents the architecture honestly, without a production-readiness or security-audit claim.' },
      { title: 'The result', text: 'A source-inspectable learning backend, with implemented account flows and areas still needing repair and tests. The explorer below runs locally against illustrative data; it never sends credentials or requests to a live API.' },
      { title: 'Engineering takeaway', text: 'Consistent response contracts and integration tests matter as much as organizing modules. A route existing in source is not proof that every path through it works.' },
    ], evidence: [{ label: 'Route definitions', href: 'https://github.com/Milan-Lamsal/backend-project/blob/main/src/routes/user.routes.js' }, { label: 'Controller implementation', href: 'https://github.com/Milan-Lamsal/backend-project/blob/main/src/controllers/user.controller.js' }],
  },
];

// Unpublished content stays here until its supporting assets are supplied.
export const pendingContent = {
  resumePdf: 'Add the real PDF to public and set profile.resume.',
  posResearch: 'Original report not supplied. POS lab is a new illustrative simulation, not a research result.',
  otherProjects: ['BreakFree', 'Currency Converter', 'Password Generator', 'academic projects'],
  personalReflections: 'Case-study takeaways are source-grounded observations; add personal challenges and reflections when available.',
};
