import Link from 'next/link';
export default function NotFound() { return <div className="not-found"><span className="eyebrow accent">404 / AN UNEXPECTED MOVE</span><div className="not-found-knight">♞</div><h2>This square is empty.</h2><p>The page may have moved. There’s still plenty to explore.</p><Link className="primary-button" href="/">Back to the board ↗</Link></div>; }
