'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  ArrowRight, 
  CodeXml, 
  TerminalSquare, 
  Trophy, 
  GraduationCap, 
  Database, 
  ExternalLink,
  Mail,
  Copy,
  Check,
  FileText
} from 'lucide-react';
import { profile, projects } from '@/content/portfolio';
import { publicPath } from '@/lib/paths';
import { 
  HairByZoeBookingDemo, 
  NewsCacheDemo, 
  BackendAuthDemo, 
  IndexSpeedDemo, 
  PosMicroDemo, 
  InteractiveSkills 
} from './bento-micro-demos';
import { ChessPuzzle } from './chess-puzzle';
import { Terminal } from './terminal';
import { useUI } from './site-shell';

export function BentoGrid() {
  const { open, recruiter } = useUI();
  const [copied, setCopied] = useState(false);
  const [contactTopic, setContactTopic] = useState('Internship opportunity');

  const hairProject = projects.find(p => p.slug === 'hair-by-zoe')!;
  const newsProject = projects.find(p => p.slug === 'news-explorer')!;
  const backendProject = projects.find(p => p.slug === 'backend-project')!;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  }

  if (recruiter) {
    return (
      <div className="recruiter-container animate-fade-in">
        <div className="recruiter-header">
          <div className="flex items-center gap-2 mb-2">
            <span className="live-badge-dot" />
            <span className="eyebrow accent font-mono">RECRUITER PERSPECTIVE · CONDENSED OVERVIEW</span>
          </div>
          <h1 className="recruiter-title">{profile.name}</h1>
          <p className="recruiter-lead">{profile.headline.replace('\n', ' ')} — {profile.role} at Rowan University.</p>
          <div className="recruiter-actions">
            <a href={`mailto:${profile.email}`} className="action-pill-btn">
              <Mail size={14} /> Email Milan
            </a>
            <button type="button" className="secondary-pill-btn" onClick={copyEmail}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy Email'}
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer" className="secondary-pill-btn">
              <CodeXml size={14} /> GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="secondary-pill-btn">
              LinkedIn
            </a>
            {profile.resume && (
              <a href={profile.resume} download className="secondary-pill-btn">
                <FileText size={14} /> Résumé PDF
              </a>
            )}
          </div>
        </div>

        {/* Education & Academic Record */}
        <section className="recruiter-section">
          <h2 className="recruiter-section-title">Education & Credentials</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {profile.education.map(e => (
              <div key={e.institution} className="recruiter-card">
                <div className="text-xs font-mono text-emerald-400 mb-1">{e.date}</div>
                <div className="font-semibold text-text">{e.institution}</div>
                <div className="text-sm text-muted">{e.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Projects */}
        <section className="recruiter-section">
          <h2 className="recruiter-section-title">Featured Projects</h2>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.slug} className="recruiter-card">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="text-base font-bold text-text flex items-center gap-2">
                    {p.name}
                    <span className="text-xs font-mono font-normal text-emerald-400">({p.category})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline flex items-center gap-1 font-mono">
                        Live Site <ExternalLink size={12} />
                      </a>
                    )}
                    {p.repository && (
                      <a href={p.repository} target="_blank" rel="noreferrer" className="text-xs text-accent hover:underline flex items-center gap-1 font-mono">
                        GitHub <ExternalLink size={12} />
                      </a>
                    )}
                    <Link href={`/projects/${p.slug}`} className="text-xs text-accent hover:underline flex items-center gap-1 font-mono">
                      Case Study <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
                <p className="text-sm text-muted mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.technologies.map(t => (
                    <span key={t} className="skill-chip text-[11px] py-0.5 px-2">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="recruiter-section">
          <h2 className="recruiter-section-title">Technical Skills Matrix</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(profile.skills).map(([group, list]) => (
              <div key={group} className="recruiter-card">
                <div className="text-xs font-mono uppercase text-emerald-400 mb-2 font-semibold tracking-wider">
                  {group}
                </div>
                <div className="text-sm text-muted leading-relaxed">
                  {list.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bento-container">
      {/* 1. High-Impact Modern Hero */}
      <section className="hero-section">
        <div className="hero-badge">
          <span className="live-badge-dot" />
          <span className="font-mono text-xs">Rowan University CS · Open for Summer/Fall Internships</span>
        </div>

        <h1 className="hero-title">
          Milan Lamsal<span className="text-emerald-400">.</span>
        </h1>

        <p className="hero-lead">
          Full-stack developer & systems engineer. Building high-performance web products, 
          low-latency edge architectures, and intuitive digital tools.
        </p>

        <p className="hero-bio">
          Studying Computer Science at Rowan University (NJ). Originally from Nepal, 
          combining technical rigor with inter-college championship chess strategy.
        </p>

        <div className="hero-actions">
          <a href="#work" className="action-pill-btn">
            Explore Bento Grid <ArrowRight size={15} />
          </a>
          <button type="button" className="secondary-pill-btn" onClick={() => open('terminal')}>
            <TerminalSquare size={15} /> Interactive Console
          </button>
          <button type="button" className="secondary-pill-btn" onClick={copyEmail}>
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
          </button>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Milan on GitHub" className="social-icon-btn">
              <CodeXml size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Milan on LinkedIn" className="social-icon-btn">
              <span className="font-bold text-sm">in</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Bento Grid */}
      <section id="work" className="bento-grid-wrapper">
        <div className="bento-grid-header">
          <div>
            <span className="eyebrow accent font-mono">LIVE EXPERIENCES & CASE STUDIES</span>
            <h2 className="bento-section-title">The Engineering Showcase<span className="text-emerald-400">.</span></h2>
          </div>
          <p className="bento-header-note">
            Every card contains verified code, live simulations, or interactive micro-demos.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Featured Project — Hair by Zoe (Large, 8-col span) */}
          <div className="bento-card bento-col-8 bento-featured">
            <div className="bento-card-header">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="category-tag">FULL-STACK PRODUCTION PRODUCT</span>
                  <span className="status-badge">DEPLOYED & DOCUMENTED</span>
                </div>
                <h3 className="bento-card-title flex items-center justify-between">
                  <span>Hair by Zoe</span>
                  <div className="flex items-center gap-2">
                    {hairProject.live && (
                      <a 
                        href={hairProject.live} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="live-link-pill" 
                        title="Visit Live Site"
                      >
                        Live Website <ArrowUpRight size={13} />
                      </a>
                    )}
                    <Link href={`/projects/${hairProject.slug}`} className="live-link-pill">
                      Full Case Study <ArrowRight size={13} />
                    </Link>
                  </div>
                </h3>
              </div>
            </div>

            <p className="bento-card-desc">
              A comprehensive salon platform combining client booking, an interactive portfolio gallery of 27 real hair treatments, and an administrative scheduling system powered by Cloudflare Workers and D1 SQLite.
            </p>

            {/* Visual with mock browser frame */}
            <div className="featured-visual-box">
              <div className="browser-mock-header">
                <span className="mock-dot red" />
                <span className="mock-dot yellow" />
                <span className="mock-dot green" />
                <span className="mock-url font-mono">hair-salon-website.bhagawanlamsal.workers.dev</span>
              </div>
              <div className="relative aspect-[16/8] overflow-hidden rounded-b-lg">
                <Image 
                  src={publicPath(hairProject.image!)} 
                  alt="Hair by Zoe live salon homepage" 
                  fill 
                  className="object-cover object-top hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  priority
                />
              </div>
            </div>

            {/* Embedded Live Micro-Demo */}
            <HairByZoeBookingDemo />

            <div className="bento-tags mt-3">
              {hairProject.technologies.map(t => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
              <span className="tech-badge">Drizzle ORM</span>
              <span className="tech-badge">Edge Compute</span>
            </div>
          </div>

          {/* Card 2: Interactive Terminal Console (4-col span) */}
          <div className="bento-card bento-col-4 flex flex-col justify-between">
            <div>
              <div className="bento-card-header">
                <div>
                  <div className="category-tag">DEVELOPER TOOLING</div>
                  <h3 className="bento-card-title flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <TerminalSquare size={18} className="text-emerald-400" />
                      Live Terminal
                    </span>
                    <button 
                      type="button" 
                      className="text-xs font-mono text-muted hover:text-emerald-400"
                      onClick={() => open('terminal')}
                    >
                      Expand ↗
                    </button>
                  </h3>
                </div>
              </div>
              <p className="bento-card-desc mb-3">
                Command-line navigation environment with tab completion, history tracking, and custom utilities.
              </p>

              <div className="embedded-terminal-container">
                <Terminal />
              </div>
            </div>

            <div className="pt-3 border-t border-glass flex items-center justify-between text-xs font-mono text-subtle">
              <span>Run <code className="text-emerald-400">help</code> or <code className="text-emerald-400">chess</code></span>
              <Link href="/labs#terminal" className="text-emerald-400 hover:underline">
                Lab details →
              </Link>
            </div>
          </div>

          {/* Card 3: Algorithm Lab — B+ Tree vs Linear Scan (6-col span) */}
          <div id="play" className="bento-card bento-col-6">
            <div className="bento-card-header">
              <div>
                <div className="category-tag">DATA STRUCTURES & ALGORITHMS</div>
                <h3 className="bento-card-title flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Database size={18} className="text-cyan-400" />
                    B+ Tree Index vs. Linear Scan
                  </span>
                  <Link href="/labs#lookup" className="live-link-pill">
                    Full Lab <ArrowRight size={13} />
                  </Link>
                </h3>
              </div>
            </div>
            <p className="bento-card-desc">
              Visualizing ordered disk index efficiency. Compare sequential table scans against multi-level B+ Tree traversal to observe exact comparisons and speedups.
            </p>

            <IndexSpeedDemo />
          </div>

          {/* Card 4: Chess Puzzle & Champion Background (6-col span) */}
          <div className="bento-card bento-col-6">
            <div className="bento-card-header">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="category-tag flex items-center gap-1.5">
                    <Trophy size={13} className="text-amber-400" />
                    CHESS CHAMPIONSHIP HIGHLIGHT
                  </span>
                </div>
                <h3 className="bento-card-title flex items-center justify-between">
                  <span>First Place · Inter-College Championship</span>
                  <span className="text-xs font-mono text-amber-400 font-normal">Feb 2023</span>
                </h3>
              </div>
            </div>
            <p className="bento-card-desc">
              Chess taught me how to evaluate branch consequences, spot patterns under pressure, and think moves ahead in systems architecture.
            </p>

            {/* Embedded Chess Puzzle */}
            <div className="bento-chess-wrapper">
              <ChessPuzzle />
            </div>
          </div>

          {/* Card 5: Project 2 — News Explorer (6-col span) */}
          <div className="bento-card bento-col-6">
            <div className="bento-card-header">
              <div>
                <div className="category-tag">FRONTEND / CACHING DESIGN</div>
                <h3 className="bento-card-title flex items-center justify-between">
                  <span>News Explorer</span>
                  <div className="flex items-center gap-2">
                    {newsProject.repository && (
                      <a 
                        href={newsProject.repository} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="live-link-pill" 
                        title="GitHub Repo"
                      >
                        GitHub <ExternalLink size={12} />
                      </a>
                    )}
                    <Link href={`/projects/${newsProject.slug}`} className="live-link-pill">
                      Case Study <ArrowRight size={13} />
                    </Link>
                  </div>
                </h3>
              </div>
            </div>
            <p className="bento-card-desc">
              Unified multi-source reader fetching from Guardian and MediaStack APIs. Implements normalized data structures and client-side storage to deliver instant offline browsing.
            </p>

            <NewsCacheDemo />

            <div className="bento-tags mt-3">
              {newsProject.technologies.map(t => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
              <span className="tech-badge">Cache-Aside</span>
              <span className="tech-badge">Infinite Scroll</span>
            </div>
          </div>

          {/* Card 6: Project 3 — Backend API Architecture (6-col span) */}
          <div className="bento-card bento-col-6">
            <div className="bento-card-header">
              <div>
                <div className="category-tag">BACKEND / AUTHENTICATION ARCHITECTURE</div>
                <h3 className="bento-card-title flex items-center justify-between">
                  <span>Node.js Auth & API Engine</span>
                  <div className="flex items-center gap-2">
                    {backendProject.repository && (
                      <a 
                        href={backendProject.repository} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="live-link-pill" 
                        title="GitHub Repo"
                      >
                        GitHub <ExternalLink size={12} />
                      </a>
                    )}
                    <Link href={`/projects/${backendProject.slug}`} className="live-link-pill">
                      Case Study <ArrowRight size={13} />
                    </Link>
                  </div>
                </h3>
              </div>
            </div>
            <p className="bento-card-desc">
              Architectural study of REST API controllers, JWT authentication pipelines, token refresh rotation, and MongoDB schema design.
            </p>

            <BackendAuthDemo />

            <div className="bento-tags mt-3">
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">Express</span>
              <span className="tech-badge">MongoDB</span>
              <span className="tech-badge">JWT Tokens</span>
              <span className="tech-badge">Bcrypt</span>
            </div>
          </div>

          {/* Card 7: POS Inventory Simulator (4-col span) */}
          <div className="bento-card bento-col-4">
            <div className="bento-card-header">
              <div>
                <div className="category-tag">STATE SYNCHRONIZATION</div>
                <h3 className="bento-card-title flex items-center justify-between">
                  <span>POS Shared State</span>
                  <Link href="/labs#pos" className="live-link-pill">
                    Full Lab <ArrowRight size={13} />
                  </Link>
                </h3>
              </div>
            </div>
            <p className="bento-card-desc">
              Atomic inventory counters ensuring concurrent orders cannot oversell remaining stock.
            </p>

            <PosMicroDemo />
          </div>

          {/* Card 8: Technical Skills Matrix (4-col span) */}
          <div id="about" className="bento-card bento-col-4">
            <div className="bento-card-header">
              <div>
                <div className="category-tag">ENGINEERING TOOLKIT</div>
                <h3 className="bento-card-title">Technical Skills</h3>
              </div>
            </div>
            <p className="bento-card-desc mb-3">
              Languages, libraries, and frameworks I use to build scalable systems.
            </p>

            <InteractiveSkills />
          </div>

          {/* Card 9: Education & Journey (4-col span) */}
          <div className="bento-card bento-col-4">
            <div className="bento-card-header">
              <div>
                <div className="category-tag">BACKGROUND & EDUCATION</div>
                <h3 className="bento-card-title flex items-center gap-1.5">
                  <GraduationCap size={18} className="text-emerald-400" />
                  Academic Path
                </h3>
              </div>
            </div>
            <div className="space-y-3 pt-1">
              <div className="p-2.5 rounded bg-surface-2 border border-glass">
                <div className="flex justify-between items-center text-xs text-emerald-400 font-mono">
                  <span>Rowan University</span>
                  <span>May 2029</span>
                </div>
                <div className="text-sm font-semibold text-text">B.S. Computer Science</div>
                <div className="text-xs text-subtle">Glassboro, New Jersey</div>
              </div>

              <div className="p-2.5 rounded bg-surface-2 border border-glass">
                <div className="flex justify-between items-center text-xs text-cyan-400 font-mono">
                  <span>Atlantic Cape Community College</span>
                  <span>May 2026</span>
                </div>
                <div className="text-sm font-semibold text-text">Associate in Computer Information System</div>
                <div className="text-xs text-subtle">New Jersey</div>
              </div>

              <div className="text-xs text-muted flex items-center gap-2 pt-1 font-mono">
                <span className="text-emerald-400">📍</span>
                <span>Nepal ➔ New Jersey, USA</span>
              </div>
            </div>
          </div>

          {/* Card 10: Let's Connect & Collaboration Outbox (Full 12-col span) */}
          <div id="contact" className="bento-card bento-col-12 bento-connect-card">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="live-badge-dot" />
                  <span className="eyebrow accent font-mono">GET IN TOUCH</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-3">
                  Let’s build something impactful together<span className="text-emerald-400">.</span>
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  Seeking Summer & Fall 2025/2026 Software Engineering Internships and thoughtful web product collaborations. If you are solving intriguing engineering challenges, my inbox is open.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a 
                    href={`mailto:${profile.email}?subject=${encodeURIComponent(contactTopic)}&body=${encodeURIComponent('Hi Milan,\n\n')}`}
                    className="action-pill-btn"
                  >
                    <Mail size={15} /> Send Email
                  </a>
                  <button type="button" className="secondary-pill-btn" onClick={copyEmail}>
                    {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                    <span>{copied ? 'Copied to Clipboard!' : profile.email}</span>
                  </button>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="secondary-pill-btn">
                    <CodeXml size={15} /> GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="secondary-pill-btn">
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface-2 border border-glass">
                <label htmlFor="bento-topic-select" className="text-xs font-mono text-muted block mb-2">
                  What is on your mind?
                </label>
                <select 
                  id="bento-topic-select"
                  value={contactTopic} 
                  onChange={e => setContactTopic(e.target.value)}
                  className="w-full mb-4 text-sm"
                >
                  <option>Software Engineering Internship</option>
                  <option>Project Collaboration</option>
                  <option>Freelance / Contract Opportunity</option>
                  <option>Just saying hello & chess chat</option>
                </select>

                <div className="text-xs text-subtle font-mono space-y-1 mb-4">
                  <div>⚡ Direct Email: <strong className="text-text">{profile.email}</strong></div>
                  <div>📍 Location: <strong className="text-text">New Jersey, US</strong></div>
                  <div>🎓 Status: <strong className="text-emerald-400">CS Undergrad @ Rowan</strong></div>
                </div>

                <a 
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(contactTopic)}&body=${encodeURIComponent('Hi Milan,\n\n')}`}
                  className="w-full action-pill-btn justify-center"
                >
                  Open Draft with Topic ({contactTopic})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
