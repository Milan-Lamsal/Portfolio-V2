'use client';
import { useState, useRef, useEffect } from 'react';
import { profile, projects } from '@/content/portfolio';
import { ChessPuzzle } from './chess-puzzle';
const commandNames = ['help', 'about', 'skills', 'projects', 'experience', 'chess', 'contact', 'clear'];
export function Terminal({ startChess = false }: { startChess?: boolean }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(0);
  const [lines, setLines] = useState<{ command: string; response: string }[]>([]);
  const [chess, setChess] = useState(startChess);
  const output = useRef<HTMLDivElement>(null);
  useEffect(() => { if (output.current) output.current.scrollTop = output.current.scrollHeight; }, [lines]);
  const responses: Record<string, string> = {
    help: 'about      The person behind the code\nskills     Explore my toolkit\nprojects   Selected project summaries\nexperience Education & experience\nchess      A checkmate-in-one puzzle\ncontact    Get in touch\nclear      Clear this session\n\n↑ ↓ history · Tab autocomplete · Enter execute',
    about: `${profile.name}\n${profile.role}\n\n${profile.about}`,
    skills: Object.entries(profile.skills).map(([k, v]) => `${k}: ${v.join(', ')}`).join('\n'),
    projects: projects.map((p, i) => `${i + 1}. ${p.name}\n   ${p.description}\n   /projects/${p.slug}/`).join('\n\n'),
    experience: [...profile.education, ...profile.experience].map(e => `${e.institution}\n${e.title} · ${e.date}`).join('\n\n'),
    contact: `Email: ${profile.email}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}\n\nThe normal Contact section has clickable links and a copy action.`,
    chess: 'Setting up the board. White to move; mate in one. Scroll below to play.',
  };
  function run() {
    const cmd = input.trim().toLowerCase(); if (!cmd) return;
    setHistory(h => [...h, input]); setCursor(history.length + 1); setInput('');
    if (cmd === 'clear') { setLines([]); setChess(false); return; }
    if (cmd === 'chess') setChess(true);
    setLines(l => [...l, { command: input, response: responses[cmd] || `Command not found: ${cmd}\nType help to see supported commands.` }]);
  }
  return <div className="terminal"><div className="terminal-welcome"><span className="accent">milan@portfolio</span> ~<p>A small window into how I think.<br />Type <strong>help</strong> to explore, or <strong>chess</strong> to make your move.</p></div><div className="terminal-output" ref={output} role="log" aria-label="Terminal output">{lines.map((l, i) => <div className="terminal-entry" key={i}><p><span className="accent">❯</span> {l.command}</p><pre>{l.response}</pre></div>)}</div><form className="terminal-input" onSubmit={e => { e.preventDefault(); run(); }}><span aria-hidden="true">❯</span><input aria-label="Terminal command" autoComplete="off" spellCheck={false} value={input} placeholder="Type a command…" onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'ArrowUp') { e.preventDefault(); const next = Math.max(0, cursor - 1); setCursor(next); setInput(history[next] || ''); } if (e.key === 'ArrowDown') { e.preventDefault(); const next = Math.min(history.length, cursor + 1); setCursor(next); setInput(history[next] || ''); } if (e.key === 'Tab' && input && !e.shiftKey) { const options = commandNames.filter(c => c.startsWith(input.toLowerCase())); if (options.length === 1) { e.preventDefault(); setInput(options[0]); } } }} /><button type="submit" className="text-button">Run ↵</button></form><p className="small terminal-help">Browser-local commands only. No shell access. Tab completes a unique match.</p>{chess && <ChessPuzzle />}</div>;
}

