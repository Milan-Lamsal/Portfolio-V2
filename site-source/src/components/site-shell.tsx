'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowUpRight, Command, Mail, TerminalSquare, Copy, Check, X, ChevronRight } from 'lucide-react';
import { profile, projects } from '@/content/portfolio';
import { Terminal } from './terminal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Command as CommandMenu, CommandInput, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

type Overlay = 'commands' | 'terminal' | 'contact' | null;
const UI = createContext<{ open: (overlay: Overlay, chess?: boolean) => void; recruiter: boolean }>({ open: () => {}, recruiter: false });
export const useUI = () => useContext(UI);
export function CopyButton({ text, label = 'Copy email' }: { text: string; label?: string }) {
  const [status, setStatus] = useState('');
  async function copy() { try { await navigator.clipboard.writeText(text); setStatus('Copied'); } catch { setStatus('Copy unavailable — select the text'); } }
  useEffect(() => { if (!status) return; const t = setTimeout(() => setStatus(''), 3000); return () => clearTimeout(t); }, [status]);
  return <Button variant="ghost" className="text-button" onClick={copy}>{status === 'Copied' ? <Check size={15} /> : <Copy size={15} />}<span aria-live="polite">{status || label}</span></Button>;
}
export function SiteShell({ children }: { children: ReactNode }) {
  const recruiter = false;
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [chess, setChess] = useState(false);
  const [time, setTime] = useState('New Jersey');
  const [active, setActive] = useState('work');
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('Internship opportunity');
  const dialog = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!overlay) return;
    const frame = requestAnimationFrame(() => {
      (dialog.current?.querySelector<HTMLElement>('input,select') || dialog.current?.querySelector<HTMLElement>('button'))?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [overlay]);
  const router = useRouter();
  const pathname = usePathname();
  const nav = [{ id: 'work', label: 'Selected work' }, { id: 'play', label: 'Labs' }, { id: 'about', label: 'About & education' }, { id: 'contact', label: 'Contact' }];
  useEffect(() => {
    document.documentElement.removeAttribute('data-recruiter'); document.documentElement.dataset.theme = 'dark';
    function tick() { setTime(new Intl.DateTimeFormat('en-US', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())); }
    tick(); const timer = setInterval(tick, 30000); return () => clearInterval(timer);
  }, []);
  function open(value: Overlay, showChess = false) { previousFocus.current = document.activeElement as HTMLElement; setChess(showChess); setQuery(''); setOverlay(value); }
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
    ...nav.map((n, i) => ({ label: n.label, detail: `0${i + 1} / Navigate`, run: () => go(i === 1 ? '/labs' : '/#' + n.id) })),
    ...projects.map(p => ({ label: p.name, detail: 'Project / Case study', run: () => go('/projects/' + p.slug) })),
    { label: 'Open interactive labs', detail: 'Explore / Labs', run: () => go('/labs') },
    { label: 'Open developer terminal', detail: 'Experiment', run: () => setOverlay('terminal') },
    { label: 'Play the chess puzzle', detail: 'White to move', run: () => { setChess(true); setOverlay('terminal'); } },
    { label: 'Write to Milan', detail: 'Contact', run: () => setOverlay('contact') },
    ...[{ label: 'GitHub', href: profile.github }, { label: 'LinkedIn', href: profile.linkedin }, ...(profile.resume ? [{ label: 'Download résumé', href: profile.resume }] : [])].map(s => ({ label: s.label, detail: 'Open link', run: () => { setOverlay(null); window.location.assign(s.href); } })),
  ].filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
  return <UI.Provider value={{ open, recruiter }}><TooltipProvider delayDuration={400}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="topbar"><Link href="/" className="monogram" aria-label="Milan Lamsal home">ML</Link><span className="topbar-note">PORTFOLIO</span><Tooltip><TooltipTrigger asChild><Button variant="ghost" className="command-trigger" onClick={() => open('commands')}><Command size={16} /> Search <kbd>Ctrl K</kbd></Button></TooltipTrigger><TooltipContent className="editorial-tooltip" side="bottom" sideOffset={8}>Search pages and actions · Ctrl+K / Cmd+K</TooltipContent></Tooltip></header>
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
    <Dialog open={overlay !== null} onOpenChange={isOpen => { if (!isOpen) setOverlay(null); }}>
    <DialogContent ref={dialog} showCloseButton={false} className={`overlay editorial-dialog ${overlay === 'terminal' ? 'terminal-dialog' : ''}`}
      onOpenAutoFocus={event => { event.preventDefault(); (dialog.current?.querySelector<HTMLElement>('input,select') || dialog.current?.querySelector<HTMLElement>('button'))?.focus(); }}
      onCloseAutoFocus={event => { event.preventDefault(); previousFocus.current?.focus(); }}>
      <div className="dialog-top"><DialogTitle className="eyebrow">{overlay === 'commands' ? 'FIND YOUR WAY' : overlay === 'terminal' ? 'MILAN / DEVELOPER TERMINAL' : 'CONTACT'}</DialogTitle><DialogClose asChild><Button variant="ghost" size="icon" className="icon-button" aria-label="Close dialog"><X size={20}/></Button></DialogClose></div>
      <DialogDescription className="sr-only">{overlay === 'commands' ? 'Search pages and actions. Use arrow keys to select a result and Enter to open it.' : overlay === 'terminal' ? 'Browser-local developer terminal and optional chess puzzle.' : 'Choose a topic to open a draft in your email app, or copy the email address.'}</DialogDescription>
      {overlay === 'commands' && <CommandMenu className="editorial-command" loop shouldFilter={false}>
        <CommandInput autoFocus aria-label="Search commands" value={query} onValueChange={setQuery} placeholder="Search projects, pages, or actions…"/>
        <CommandList className="editorial-command-list"><CommandEmpty>No matching command. Try “labs”, “chess”, or “contact”.</CommandEmpty>{commands.map(c=><CommandItem key={c.label} value={c.label} onSelect={c.run}><span>{c.label}<small>{c.detail}</small></span><ChevronRight size={17}/></CommandItem>)}</CommandList>
        <div className="dialog-foot">↑ ↓ to navigate <span>↵ to open · Esc to close</span></div>
      </CommandMenu>}
      {overlay === 'terminal' && <Terminal startChess={chess} />}
      {overlay === 'contact' && <div className="contact-drawer"><h2>Contact Milan<span className="accent">.</span></h2><p>Have an internship opportunity, a project idea, or a question about my work? I’d like to hear it.</p><label htmlFor="message-topic">What’s on your mind?</label><select id="message-topic" value={topic} onChange={e => setTopic(e.target.value)}><option>Internship opportunity</option><option>Project collaboration</option><option>Freelance project</option><option>Just saying hello</option></select><a className="primary-button" href={`mailto:${profile.email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent('Hi Milan,\n\n')}`}>Open email draft <ArrowUpRight size={16} /></a><p className="small">Opens your email app. Nothing is sent automatically.</p><a className="contact-email" href={'mailto:' + profile.email}>{profile.email}</a><CopyButton text={profile.email} /></div>}
    </DialogContent></Dialog>
  </TooltipProvider></UI.Provider>;
}
export function ContactButton() { const { open } = useUI(); return <Button className="primary-button" onClick={() => open('contact')}>Start a conversation <ArrowUpRight size={17} /></Button>; }
export function TerminalButton() { const { open } = useUI(); return <Button variant="ghost" className="text-button" onClick={() => open('terminal')}><TerminalSquare size={17} /> Open terminal <ArrowUpRight size={15} /></Button>; }


