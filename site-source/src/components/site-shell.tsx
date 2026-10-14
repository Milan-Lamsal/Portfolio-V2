'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, Command, Mail, TerminalSquare, X, Copy, Check, Search, ChevronRight } from 'lucide-react';
import { profile, projects } from '@/content/portfolio';
import { Terminal } from './terminal';

type Overlay = 'commands' | 'terminal' | 'contact' | null;
const UI = createContext<{ open: (overlay: Overlay, chess?: boolean) => void; recruiter: boolean }>({ open: () => {}, recruiter: false });
export const useUI = () => useContext(UI);
export function CopyButton({ text, label = 'Copy email' }: { text: string; label?: string }) {
  const [status, setStatus] = useState('');
  async function copy() { try { await navigator.clipboard.writeText(text); setStatus('Copied'); } catch { setStatus('Copy unavailable — select the text'); } }
  useEffect(() => { if (!status) return; const t = setTimeout(() => setStatus(''), 3000); return () => clearTimeout(t); }, [status]);
  return <button className="text-button" onClick={copy}>{status === 'Copied' ? <Check size={15} /> : <Copy size={15} />}<span aria-live="polite">{status || label}</span></button>;
}
export function SiteShell({ children }: { children: ReactNode }) {
  const recruiter = false;
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [chess, setChess] = useState(false);
  const [time, setTime] = useState('New Jersey');
  const [active, setActive] = useState('work');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [topic, setTopic] = useState('Internship opportunity');
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const nav = [{ id: 'work', label: 'Selected work' }, { id: 'play', label: 'Labs' }, { id: 'about', label: 'About & education' }, { id: 'contact', label: 'Contact' }];
  useEffect(() => {
    document.documentElement.removeAttribute('data-recruiter'); document.documentElement.dataset.theme = 'dark';
    function tick() { setTime(new Intl.DateTimeFormat('en-US', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())); }
    tick(); const timer = setInterval(tick, 30000); return () => clearInterval(timer);
  }, []);
  function open(value: Overlay, showChess = false) { previousFocus.current = document.activeElement as HTMLElement; setChess(showChess); setQuery(''); setSelected(0); setOverlay(value); }
  useEffect(() => {
    const d = dialog.current;
    if (overlay && d) { if (!d.open) d.showModal(); d.querySelector<HTMLInputElement | HTMLSelectElement>('input,select')?.focus(); }
    if (!overlay && d?.open) { d.close(); previousFocus.current?.focus(); }
  }, [overlay]);
  useEffect(() => {
    const keyboard = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (overlay === 'commands') setOverlay(null); else open('commands'); return; }
      if (overlay || el.closest('input,textarea,select,[contenteditable="true"]') || e.metaKey || e.ctrlKey || e.altKey) return;
      const index = Number(e.key) - 1;
      if (index >= 0 && index < 4) { e.preventDefault(); router.push(index === 1 ? '/labs' : '/#' + ['work', 'play', 'about', 'contact'][index]); }
    };
    window.addEventListener('keydown', keyboard); return () => window.removeEventListener('keydown', keyboard);
  }, [overlay, router]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); }, { rootMargin: '-10% 0px -55% 0px' });
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s)); return () => observer.disconnect();
  }, [pathname, recruiter]);
  const go = (href: string) => { setOverlay(null); router.push(href === '/#play' && recruiter ? '/labs' : href); };
  const commands = [
    ...nav.map((n, i) => ({ label: n.label, detail: `0${i + 1} / Navigate`, run: () => go('/#' + n.id) })),
    ...projects.map(p => ({ label: p.name, detail: 'Project / Case study', run: () => go('/projects/' + p.slug) })),
    { label: 'Open interactive labs', detail: 'Explore / Labs', run: () => go('/labs') },
    { label: 'Open developer terminal', detail: 'Experiment', run: () => setOverlay('terminal') },
    { label: 'Play the chess puzzle', detail: 'White to move', run: () => { setChess(true); setOverlay('terminal'); } },
    { label: 'Write to Milan', detail: 'Contact', run: () => setOverlay('contact') },
    ...[{ label: 'GitHub', href: profile.github }, { label: 'LinkedIn', href: profile.linkedin }, ...(profile.resume ? [{ label: 'Download résumé', href: profile.resume }] : [])].map(s => ({ label: s.label, detail: 'Open link', run: () => { setOverlay(null); window.location.assign(s.href); } })),
  ].filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => { document.getElementById(`command-${selected}`)?.scrollIntoView({ block: 'nearest' }); }, [selected]);
  return <UI.Provider value={{ open, recruiter }}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar"><Link href="/" className="monogram" aria-label="Milan Lamsal home">ML</Link><span className="topbar-note">PORTFOLIO</span><button className="command-trigger" onClick={() => open('commands')}><Command size={16} /> Search <kbd>Ctrl K</kbd></button></header>
    <div className={`site-grid ${pathname !== '/' ? 'inner-page' : ''}`}>
      <aside className="intro">
        <div className="intro-label"><span className="status-dot"/> New Jersey, US</div>
        <Link href="/" className="name-link"><h1>Milan<br/> Lamsal</h1></Link>
        <p className="positioning">Computer Science student<br/>at Rowan University.</p>
        <p className="intro-copy">I build web applications, from a salon booking system to a news reader. I’m interested in how data, interfaces, and everyday workflows fit together.</p>
        <p className="student-line">Originally from Nepal.<br/>B.S. expected May 2029.</p>
        <nav className="section-nav" aria-label="Main navigation">{nav.map((n,i)=><Link key={n.id} href={i===1?'/labs':'/#'+n.id} className={pathname==='/'&&active===n.id?'active':''} aria-current={pathname==='/'&&active===n.id?'location':undefined}><span className="nav-line"/>{n.label}</Link>)}</nav>
        <div className="intro-bottom"><div className="social-row"><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a><button onClick={()=>open('contact')}>Email <Mail size={14}/></button></div><button className="chess-invite" onClick={()=>open('terminal',true)}><span className="knight" aria-hidden="true">♞</span> A small chess puzzle <ArrowUpRight size={14}/></button><span className="local-time">{time} / NEW JERSEY</span></div>
      </aside>
      <main id="main" tabIndex={-1}>{children}<footer><span>Milan Lamsal · Selected projects & experiments</span><Link href="/">Milan Lamsal <span className="accent">↗</span></Link></footer></main>
    </div>
    <dialog ref={dialog} className={`overlay ${overlay === 'terminal' ? 'terminal-dialog' : ''}`} onCancel={() => setOverlay(null)} onClick={e => { if (e.target === e.currentTarget) setOverlay(null); }} aria-labelledby="dialog-title"><div className="dialog-top"><span id="dialog-title" className="eyebrow">{overlay === 'commands' ? 'FIND YOUR WAY' : overlay === 'terminal' ? 'MILAN / DEVELOPER TERMINAL' : 'CONTACT'}</span><button className="icon-button" onClick={() => setOverlay(null)} aria-label="Close dialog"><X size={20} /></button></div>
      {overlay === 'commands' && <><div className="command-search"><Search size={20} /><input autoFocus value={query} placeholder="Where would you like to go?" aria-label="Search commands" role="combobox" aria-expanded="true" aria-controls="command-list" aria-activedescendant={commands.length ? `command-${Math.min(selected, commands.length - 1)}` : undefined} onChange={e => { setQuery(e.target.value); setSelected(0); }} onKeyDown={e => { if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => (s + 1) % Math.max(commands.length, 1)); } if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => (s - 1 + commands.length) % Math.max(commands.length, 1)); } if (e.key === 'Enter') { e.preventDefault(); commands[selected]?.run(); } }} /></div><div id="command-list" role="listbox" aria-label="Commands" className="command-list">{commands.map((c, i) => <button role="option" id={`command-${i}`} aria-selected={selected === i} key={c.label} onMouseEnter={() => setSelected(i)} onClick={c.run}><span>{c.label}<small>{c.detail}</small></span><ChevronRight size={17} /></button>)}{!commands.length && <p className="empty-state">No matching command. Try “labs”, “theme”, or “contact”.</p>}</div><div className="dialog-foot">↑ ↓ to navigate <span>↵ to open · Esc to close</span></div></>}
      {overlay === 'terminal' && <Terminal startChess={chess} />}
      {overlay === 'contact' && <div className="contact-drawer"><h2>Contact Milan<span className="accent">.</span></h2><p>Have an internship opportunity, a project idea, or a question about my work? I’d like to hear it.</p><label htmlFor="message-topic">What’s on your mind?</label><select id="message-topic" value={topic} onChange={e => setTopic(e.target.value)}><option>Internship opportunity</option><option>Project collaboration</option><option>Freelance project</option><option>Just saying hello</option></select><a className="primary-button" href={`mailto:${profile.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent('Hi Milan,\n\n')}`}>Open email draft <ArrowUpRight size={16} /></a><p className="small">Opens your email app. Nothing is sent automatically.</p><a className="contact-email" href={'mailto:' + profile.email}>{profile.email}</a><CopyButton text={profile.email} /></div>}
    </dialog>
  </UI.Provider>;
}
export function ContactButton() { const { open } = useUI(); return <button className="primary-button" onClick={() => open('contact')}>Start a conversation <ArrowUpRight size={17} /></button>; }
export function TerminalButton() { const { open } = useUI(); return <button className="text-button" onClick={() => open('terminal')}><TerminalSquare size={17} /> Open terminal <ArrowUpRight size={15} /></button>; }


