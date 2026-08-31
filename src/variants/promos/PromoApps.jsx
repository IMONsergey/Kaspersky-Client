import { useMemo, useState } from "react";
import { MorphIcon } from "morphicons/react";
import { ArrowDown, ArrowRight, Bot, Check, Circle, Database, Download, Eye, Fingerprint, Focus, Globe2, MapPin, Network, Orbit, Play, Radar, Search, Sparkles, Target, Timer, Waypoints, Zap } from "lucide";
import { agenda, agendaHeading, agendaLead, assetUrl, downloadHeading, evidence, hero, shiftHeading, shifts } from "../round2/content.js";
import { FutureGlobe, JourneyPhysics, PartnerUniverse, PathwayMotion, StoryField, ThreatRadar, TransparencyField } from "./PromoCanvases.jsx";

const iconPairs = [[Bot, Zap], [Fingerprint, Eye], [Network, Waypoints], [Database, Radar]];
const pages = `${import.meta.env.BASE_URL}variants/`;

function Logo({ inverse = false }) {
  return <a className={`promo-logo ${inverse ? "is-inverse" : ""}`} href={pages}><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky" /><span>The Critical 90</span></a>;
}

function LivingArrow({ from = ArrowRight, to = Sparkles, size = 19 }) {
  const [active, setActive] = useState(false);
  return <span className="promo-living-icon" onPointerEnter={()=>setActive(true)} onPointerLeave={()=>setActive(false)}><MorphIcon icon={active ? to : from} size={size} spring="snappy" reducedMotion="user" /></span>;
}

function DownloadLink({ label = "Download The Critical 90", className = "" }) {
  return <a className={`promo-button ${className}`} href="#download"><span>{label}</span><MorphIcon icon={Download} size={19} spring="snappy" reducedMotion="user" /></a>;
}

function BasicFooter({ number }) {
  return <footer className="promo-footer"><Logo /><span>Concept {number} / Kaspersky promo-site study</span><a href={pages}>All 17 concepts <LivingArrow /></a></footer>;
}

export function FutureApp() {
  const [year, setYear] = useState(60);
  const active = year === 30 ? 0 : year === 60 ? 1 : 2;
  return <main className="future-site">
    <header className="future-header"><Logo inverse/><nav><a className="is-active" href="#priority">Map</a><a href="#shifts">Feed</a></nav><div><a href="#agenda">Agenda</a><a href="#download">Guide</a></div></header>
    <section className="future-hero" id="priority">
      <FutureGlobe />
      <div className="future-years" aria-label="Select time horizon">{[30,60,90].map(n=><button className={year===n?"is-active":""} onClick={()=>setYear(n)} key={n}>{n}</button>)}</div>
      <div className="future-title"><p>Concept 11 · Future map</p><h1>{hero.title}</h1><span>{hero.lead}</span><a href="#shifts">{hero.cta}<LivingArrow from={ArrowDown}/></a></div>
      <aside className="future-hot"><h2><MorphIcon icon={Zap} size={20} spring="snappy" reducedMotion="user"/> What matters now</h2>{shifts.map((shift,index)=><button key={shift} className={index===active?"is-active":""} onClick={()=>setYear([30,60,90,90][index])}><small>0{index+1} · horizon {index<2?30+index*30:90}</small><strong>{shift}</strong></button>)}</aside>
    </section>
    <section className="future-feed" id="shifts"><header><p>02 · Prediction feed</p><h2>{shiftHeading}</h2></header><div>{shifts.map((shift,index)=>{const [from,to]=iconPairs[index];return <article key={shift}><span>0{index+1}</span><MorphIcon icon={index===active?to:from} size={28} spring="snappy" reducedMotion="user"/><h3>{shift}</h3><p>{evidence[index]}</p><LivingArrow /></article>})}</div></section>
    <section className="future-agenda" id="agenda"><div><p>03 · Time protocol</p><h2>{agendaHeading}</h2><span>{agendaLead}</span></div><ol>{agenda.map((phase,index)=><li className={active===index?"is-active":""} key={phase.days} onPointerEnter={()=>setYear(Number(phase.days))}><b>{phase.days}</b><small>days</small><h3>{phase.title}</h3><p>{phase.copy}</p></li>)}</ol></section>
    <section className="future-download" id="download"><p>04 · Executive guide</p><h2>{downloadHeading}</h2><DownloadLink /></section><BasicFooter number="11"/>
  </main>;
}

export function ThreatMapApp() {
  const [active,setActive]=useState(0);
  return <main className="threat-site">
    <header className="threat-header"><Logo inverse/><span>Live strategic telemetry</span><a href={pages}>17 experiments ↗</a></header>
    <section className="threat-hero" id="priority"><ThreatRadar/><div className="threat-copy"><p><i/> Live / Concept 12</p><h1>{hero.title}</h1><span>{hero.lead}</span><a href="#shifts">Open live view <LivingArrow from={Radar} to={ArrowDown}/></a></div><div className="threat-counter"><span>Signal integrity</span><b>90</b><small>day response window</small></div><div className="threat-ticker">{shifts.map((s,i)=><span key={s}>0{i+1} / {s}</span>)}</div></section>
    <section className="threat-console" id="shifts"><aside><p>02 · Risk channels</p><h2>{shiftHeading}</h2>{shifts.map((s,i)=><button key={s} className={active===i?"is-active":""} onClick={()=>setActive(i)}><span>0{i+1}</span><strong>{s}</strong><MorphIcon icon={iconPairs[i][active===i?1:0]} size={24} spring="snappy" reducedMotion="user"/></button>)}</aside><article><span>Active channel / 0{active+1}</span><h3>{shifts[active]}</h3><ul>{evidence.map((e,i)=><li key={e}><i>{String(i+1).padStart(2,"0")}</i>{e}</li>)}</ul></article></section>
    <section className="threat-agenda" id="agenda"><header><p>03 · Response sequence</p><h2>{agendaHeading}</h2></header><div>{agenda.map((a,i)=><article key={a.days}><div><b>{a.days}</b><span>DAYS</span></div><p>{a.title}</p><small>{a.copy}</small><MorphIcon icon={i===2?Check:ArrowRight} size={25} spring="snappy" reducedMotion="user"/></article>)}</div></section>
    <section className="threat-download" id="download"><div><p>04 · Export</p><h2>{downloadHeading}</h2></div><DownloadLink label="Get the executive guide"/></section><BasicFooter number="12"/>
  </main>;
}

export function TransparencyApp() {
  const [active,setActive]=useState(0);
  const phase=agenda[active];
  return <main className="transparency-site">
    <section className="transparency-map" id="priority"><TransparencyField/><header><Logo/><a href={pages}>List / 17 concepts</a></header><nav aria-label="Timeline">{agenda.map((a,i)=><button key={a.days} className={active===i?"is-active":""} onClick={()=>setActive(i)}>Day {a.days}</button>)}</nav><div className="transparency-pin"><MorphIcon icon={MapPin} size={64} spring="snappy" reducedMotion="user"/><span>{phase.days}</span></div><aside><p>0{active+1} · What leadership needs next</p><h1>{phase.title}</h1><span>{phase.copy}</span><a href="#shifts">View the evidence <LivingArrow from={MapPin}/></a></aside><div className="transparency-hero-line"><strong>The Critical 90</strong><span>{hero.title}</span></div></section>
    <section className="transparency-list" id="shifts"><header><p>02 · Evidence ledger</p><h2>{shiftHeading}</h2></header><div className="transparency-table">{shifts.map((s,i)=><article key={s}><span>0{i+1}</span><h3>{s}</h3><p>{evidence[i]}</p><MorphIcon icon={iconPairs[i][1]} size={25} spring="snappy" reducedMotion="user"/></article>)}</div></section>
    <section className="transparency-detail" id="agenda"><div><p>03 · Transparent sequence</p><h2>{agendaHeading}</h2><span>{agendaLead}</span></div><ol>{agenda.map((a,i)=><li key={a.days} className={active===i?"is-active":""} onClick={()=>setActive(i)}><b>{a.days}</b><h3>{a.title}</h3><p>{a.copy}</p></li>)}</ol></section>
    <section className="transparency-download" id="download"><h2>{downloadHeading}</h2><DownloadLink/></section><BasicFooter number="13"/>
  </main>;
}

export function UniverseApp() {
  const [active,setActive]=useState(0); const [query,setQuery]=useState("");
  const visible=useMemo(()=>shifts.map((title,index)=>({title,index})).filter(x=>x.title.toLowerCase().includes(query.toLowerCase())),[query]);
  return <main className="universe-site">
    <section className="universe-hero" id="priority"><PartnerUniverse/><header><Logo inverse/><a href="#hall">Hall of priorities</a><a href="#agenda">90-day orbit</a><a className="universe-header-cta" href="#download">Get the guide</a></header><div className="universe-copy"><p>Concept 14 · The decision universe</p><h1>Four shifts.<br/><em>One strategic universe.</em></h1><span>{hero.lead}</span><label><MorphIcon icon={Search} size={18} spring="snappy" reducedMotion="user"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a strategic shift"/></label></div><div className="universe-planets">{visible.map(({title,index})=><button key={title} className={active===index?"is-active":""} onClick={()=>setActive(index)}><span>0{index+1}</span><strong>{title}</strong></button>)}</div><a className="universe-scroll" href="#hall"><MorphIcon icon={ArrowDown} size={20} spring="snappy" reducedMotion="user"/>Explore the universe</a></section>
    <section className="universe-hall" id="hall"><header><p>02 · Hall of priorities</p><h2>{shiftHeading}</h2></header><div><aside><b>0{active+1}</b><MorphIcon icon={iconPairs[active][1]} size={64} spring="snappy" reducedMotion="user"/></aside><article><h3>{shifts[active]}</h3><p>{hero.support}</p><ul>{evidence.map(e=><li key={e}>{e}</li>)}</ul></article></div></section>
    <section className="universe-orbits" id="agenda"><div><p>03 · 90-day orbit</p><h2>{agendaHeading}</h2></div><ol>{agenda.map((a,i)=><li key={a.days}><span><MorphIcon icon={Orbit} size={18} spring="snappy" reducedMotion="user"/>{a.days} days</span><h3>{a.title}</h3><p>{a.copy}</p><LivingArrow/></li>)}</ol></section>
    <section className="universe-download" id="download"><p>04 · Destination</p><h2>{downloadHeading}</h2><DownloadLink/></section><BasicFooter number="14"/>
  </main>;
}

export function PathwaysApp() {
  const [active,setActive]=useState(0);
  return <main className="pathways-site">
    <header className="pathways-header"><Logo/><nav><a href="#priority">Home</a><a href="#shifts">The shifts</a><a href="#agenda">90-day path</a></nav><a href={pages}>All concepts</a></header>
    <section className="pathways-hero" id="priority"><PathwayMotion/><p>Master the shifts that matter most</p><h1><span>FOCUS YOUR</span><em>CYBER BUDGET</em><span>ON THE FOUR</span><strong>SHIFTS</strong></h1><div className="pathways-people"><img src={assetUrl("variants/pathways/hero06.webp")} alt="Kaspersky Cyber Pathways character"/><img src={assetUrl("variants/pathways/hero01.webp")} alt="Kaspersky Cyber Pathways character"/><img src={assetUrl("variants/pathways/hero05.webp")} alt="Kaspersky Cyber Pathways character"/></div><div className="pathways-lead"><span>{hero.lead}</span><a href="#shifts">{hero.cta}<LivingArrow from={ArrowDown}/></a></div></section>
    <section className="pathways-cast" id="shifts"><header><p>02 · Choose the right priority</p><h2>{shiftHeading}</h2></header><div className="pathways-selector">{shifts.map((s,i)=><button className={active===i?"is-active":""} key={s} onClick={()=>setActive(i)}><span>0{i+1}</span><strong>{s}</strong></button>)}</div><article><div><img src={assetUrl(`variants/pathways/${["hero06.webp","hero01.webp","hero05.webp","hero06.webp"][active]}`)} alt="Cybersecurity path character"/></div><aside><p>Your selected shift</p><h3>{shifts[active]}</h3><ul>{evidence.map((e,i)=><li key={e}><span>0{i+1}</span>{e}</li>)}</ul></aside></article></section>
    <section className="pathways-agenda" id="agenda"><header><p>03 · Take the right path</p><h2>{agendaHeading}</h2></header><div>{agenda.map((a,i)=><article key={a.days}><b>{a.days}</b><span>DAYS</span><h3>{a.title}</h3><p>{a.copy}</p><MorphIcon icon={i===2?Check:ArrowRight} size={30} spring="snappy" reducedMotion="user"/></article>)}</div></section>
    <section className="pathways-download" id="download"><div><p>04 · Executive guide</p><h2>{downloadHeading}</h2><DownloadLink/></div><img src={assetUrl("variants/pathways/figure01.svg")} alt="Kaspersky Cyber Pathways geometric figure"/></section><BasicFooter number="15"/>
  </main>;
}

export function JourneyApp() {
  return <main className="journey-site">
    <aside className="journey-rail"><Logo inverse/><nav>{["priority","shifts","agenda","download"].map((id,i)=><a href={`#${id}`} key={id}><span>0{i+1}</span></a>)}</nav></aside>
    <section className="journey-hero" id="priority"><div className="journey-texture"/><JourneyPhysics/><div className="journey-awards">PROMO STUDY · 16</div><h1><span>THE</span><span>CRITICAL</span><strong>90</strong></h1><p>{hero.title}</p><a href="#shifts"><MorphIcon icon={ArrowDown} size={22} spring="snappy" reducedMotion="user"/>Scroll the 90-day journey</a></section>
    <section className="journey-story" id="shifts"><header><p>02 · The route</p><h2>{shiftHeading}</h2><span>{hero.support}</span></header><div>{shifts.map((s,i)=><article key={s}><span>0{i+1}</span><MorphIcon icon={iconPairs[i][1]} size={33} spring="snappy" reducedMotion="user"/><h3>{s}</h3><p>{evidence[i]}</p></article>)}</div></section>
    <section className="journey-agenda" id="agenda"><div className="journey-texture"/><header><p>03 · Three chapters</p><h2>{agendaHeading}</h2></header><ol>{agenda.map((a,i)=><li key={a.days}><b>{a.days}</b><span>days</span><h3>{a.title}</h3><p>{a.copy}</p><LivingArrow from={Timer}/></li>)}</ol></section>
    <section className="journey-download" id="download"><p>04 · The destination</p><h2>{downloadHeading}</h2><DownloadLink/></section><BasicFooter number="16"/>
  </main>;
}

export function UnlockedApp() {
  const [active,setActive]=useState(0);
  return <main className="unlocked-site">
    <header className="unlocked-header"><Logo/><nav><a href="#priority">Home</a><a href="#shifts">Stories</a><a href="#agenda">Series</a></nav><a href={pages}>Design lab ↗</a></header>
    <section className="unlocked-hero" id="priority"><StoryField/><div className="unlocked-copy"><p>Tomorrow’s decisions, unlocked</p><h1>{hero.title}</h1><span>{hero.lead}</span><a href="#shifts">Explore the four stories <LivingArrow from={Play}/></a></div><button className="unlocked-feature" onClick={()=>setActive((active+1)%4)}><img src={assetUrl(active%2?"variants/unlocked/story-b.jpg":"variants/unlocked/story-a.jpg")} alt="Kaspersky technology story"/><span><MorphIcon icon={Play} size={31} spring="snappy" reducedMotion="user"/></span><div><small>Featured strategic shift · 0{active+1}</small><strong>{shifts[active]}</strong></div></button></section>
    <section className="unlocked-stories" id="shifts"><header><p>02 · Four strategic stories</p><h2>{shiftHeading}</h2></header><div>{shifts.map((s,i)=><button className={active===i?"is-active":""} onClick={()=>setActive(i)} key={s}><img src={assetUrl(i%2?"variants/unlocked/story-b.jpg":"variants/unlocked/story-a.jpg")} alt="Kaspersky editorial technology story"/><span>0{i+1} / Strategic shift</span><h3>{s}</h3><p>{evidence[i]}</p><LivingArrow from={Play}/></button>)}</div></section>
    <section className="unlocked-agenda" id="agenda"><div><p>03 · The executive series</p><h2>{agendaHeading}</h2><span>{agendaLead}</span></div><ol>{agenda.map((a,i)=><li key={a.days}><b>{a.days}</b><span>MIN / DAYS</span><h3>{a.title}</h3><p>{a.copy}</p><MorphIcon icon={i===2?Check:Play} size={24} spring="snappy" reducedMotion="user"/></li>)}</ol></section>
    <section className="unlocked-download" id="download"><div><p>04 · Download</p><h2>{downloadHeading}</h2><DownloadLink/></div><img src={assetUrl("variants/unlocked/story-a.jpg")} alt="Kaspersky technology feature"/></section><BasicFooter number="17"/>
  </main>;
}
