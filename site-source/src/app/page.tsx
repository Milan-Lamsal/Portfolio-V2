import Link from 'next/link';
import {profile} from '@/content/portfolio';
import {ProjectFeed} from '@/components/project-feed';
import {ContactButton,CopyButton} from '@/components/site-shell';
export default function Home(){return <>
<section id="work"><div className="section-heading"><h2>Selected projects</h2><span className="section-note">2026</span></div><ProjectFeed/></section>
<section id="play"><h2>Experiments</h2><p className="section-copy">Explore a shared-inventory POS simulation, a terminal with a legal chess puzzle, and an indexed lookup visualizer.</p><Link className="text-button" href="/labs/">Open the labs ↗</Link></section>
<section id="about"><h2>About & education</h2><p className="section-copy">{profile.about}</p><h3 className="subheading">Skills</h3><div className="skill-grid">{Object.entries(profile.skills).map(([group,skills])=><div key={group}><h4>{group}</h4><p>{skills.join(' · ')}</p></div>)}</div><h3 className="subheading">Education & experience</h3><div className="timeline">{[...profile.education,...profile.experience].map(item=><div className="timeline-item" key={item.institution}><div><small>{item.date}</small><h4>{item.institution}</h4><p>{item.title}</p></div></div>)}</div><p className="achievement">{profile.achievement}</p></section>
<section id="contact"><h2>Contact</h2><p className="section-copy">For internship opportunities, project collaborations, or questions about my work, email me.</p><ContactButton/><div className="email-row"><a href={'mailto:'+profile.email}>{profile.email}</a><CopyButton text={profile.email}/></div>{profile.resume&&<a className="text-button" href={profile.resume} download>Download résumé ↗</a>}</section></>;}
