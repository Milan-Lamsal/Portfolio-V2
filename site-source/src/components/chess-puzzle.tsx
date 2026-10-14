'use client';
import { useMemo, useState } from 'react';
import { Chess, type Square } from 'chess.js';
import { RotateCcw } from 'lucide-react';
export const PUZZLE_FEN = '7k/8/5KQ1/8/8/8/8/8 w - - 0 1';
const names: Record<string, string> = { k: 'king', q: 'queen', r: 'rook', b: 'bishop', n: 'knight', p: 'pawn' };
const glyphs: Record<string, string> = { wk: '♔', wq: '♕', bk: '♚' };
export function ChessPuzzle() {
  const [fen, setFen] = useState(PUZZLE_FEN);
  const [selected, setSelected] = useState<Square | null>(null);
  const [feedback, setFeedback] = useState('White to move. Find checkmate in one move.');
  const [attempted, setAttempted] = useState(false);
  const game = useMemo(() => new Chess(fen), [fen]);
  const legal = selected ? game.moves({ square: selected, verbose: true }).map(m => m.to) : [];
  const board = game.board();
  function choose(square: Square) {
    if (attempted) return;
    const piece = game.get(square);
    if (piece?.color === 'w') { setSelected(square); setFeedback(`Selected ${names[piece.type]} on ${square}. Highlighted squares are legal moves.`); return; }
    if (!selected) { setFeedback('Choose a white piece first.'); return; }
    try {
      const move = game.move({ from: selected, to: square });
      setFen(game.fen()); setSelected(null); setAttempted(true);
      setFeedback(game.isCheckmate() ? `${move.san} — checkmate. Nicely played! The queen covers the escape squares and the king protects her.` : `${move.san} is legal, but it isn’t checkmate. Reset and look for a square protected by the white king.`);
    } catch { setFeedback('That move is not legal. Choose a highlighted destination.'); }
  }
  function reset() { setFen(PUZZLE_FEN); setSelected(null); setAttempted(false); setFeedback('White to move. Find checkmate in one move.'); }
  return <div className="chess-puzzle"><div className="lab-title-row"><div><span className="eyebrow">ONE MOVE AHEAD</span><h3>A small endgame.</h3></div><button className="text-button" onClick={reset}><RotateCcw size={14} />Reset puzzle</button></div><div className="chess-board" role="group" aria-label="Chess puzzle. White king f6, queen g6; black king h8. Use arrow keys to move between squares.">{board.flatMap((row, r) => row.map((p, c) => {
    const square = `${'abcdefgh'[c]}${8 - r}` as Square;
    return <button key={square} className={`square ${(r + c) % 2 ? 'dark-square' : 'light-square'} ${selected === square ? 'selected' : ''} ${legal.includes(square) ? 'legal' : ''}`} aria-label={`${square}${p ? `, ${p.color === 'w' ? 'white' : 'black'} ${names[p.type]}` : ', empty'}${legal.includes(square) ? ', legal destination' : ''}`} aria-pressed={selected === square} onClick={() => choose(square)} onKeyDown={e => { const delta = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 8, ArrowUp: -8 }[e.key]; if (delta) { e.preventDefault(); const buttons = e.currentTarget.parentElement!.querySelectorAll('button'); (buttons[Math.max(0, Math.min(63, r * 8 + c + delta))] as HTMLElement).focus(); } }}><span className={p?.color === 'w' ? 'white-piece' : 'black-piece'}>{p ? glyphs[p.color + p.type] : ''}</span>{r === 7 && <small className="file-label">{'abcdefgh'[c]}</small>}{c === 0 && <small className="rank-label">{8 - r}</small>}</button>;
  }))}</div><p className="feedback" role="status">{feedback}</p><p className="small">Select a piece, then a destination. Legal moves are checked with chess.js. Inspired by Milan’s inter-college chess win.</p></div>;
}
