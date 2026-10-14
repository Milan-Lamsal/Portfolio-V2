'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/content/portfolio';
import { ProjectVisual } from './project-visual';
const notes = {
  'hair-by-zoe': { category:'Full stack', purpose:'Booking, services, and appointment administration for a hair salon.', contribution:'Booking and administration workflows, supported by a React interface and Cloudflare database.', decision:'Appointment state is stored separately from notification delivery, so email retries do not remove a booking.' },
  'news-explorer': { category:'Frontend', purpose:'A news reader that combines provider data and remembers saved stories.', contribution:'React views, provider normalization, infinite scrolling, and browser-based bookmarks and caching.', decision:'Category-specific cache expiry balances repeat requests with freshness. A clear-cache control lets readers recover from stale results.' },
  'backend-project': { category:'Backend', purpose:'A learning backend for account authentication and media handling.', contribution:'Express user routes, controllers, Mongoose models, password hashing, and JWT token methods.', decision:'Authentication and upload middleware separate request boundaries from controller logic. Several handlers still need repair; this is a learning project.' },
};
const categories=['All','Full stack','Frontend','Backend'];
export function ProjectFeed(){
 const [category,setCategory]=useState('All');
 const shown=projects.filter(p=>category==='All'||notes[p.slug as keyof typeof notes].category===category);
 return <><div className="project-filters" role="group" aria-label="Filter projects by category">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div><p className="filter-status sr-only" role="status">{shown.length} {shown.length===1?'project':'projects'} shown</p><div className="project-feed">{shown.map((p,i)=>{const n=notes[p.slug as keyof typeof notes];return <article className="project" key={p.slug}><div className="project-heading"><h3><Link href={'/projects/'+p.slug}>{p.name}<ArrowUpRight size={19}/></Link></h3><span className="project-category">{n.category}</span></div>{p.image&&<Link className="visual-link" href={'/projects/'+p.slug} aria-label={'Read '+p.name+' case study'}><ProjectVisual project={p} priority={i===0}/></Link>}<p className="project-purpose">{n.purpose}</p><p className="project-contribution"><span>Contribution</span> {n.contribution}</p><p className="project-tech">{p.technologies.join(' · ')}</p><details className="project-details"><summary>Implementation details</summary><p><strong>One decision:</strong> {n.decision}</p><p className="project-status">{p.status}</p><Link href={'/projects/'+p.slug}>Read the full case study <ArrowUpRight size={15}/></Link></details><div className="project-links">{p.live&&<a href={p.live} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={15}/></a>}{p.repository&&<a href={p.repository} target="_blank" rel="noreferrer">Source <ArrowUpRight size={15}/></a>}<Link href={'/projects/'+p.slug}>Case study <ArrowUpRight size={15}/></Link></div></article>})}</div></>;
}
