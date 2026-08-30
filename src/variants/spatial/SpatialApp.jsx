import { useEffect, useState } from "react";
import { MorphIcon } from "morphicons/react";
import { ArrowDown, ArrowRight, Boxes, Download, Fingerprint, Menu, Network, Sparkles, TriangleAlert, X, Zap } from "lucide";
import { agenda, agendaHeading, agendaLead, assetUrl, chapters, downloadHeading, evidence, hero, shifts, shiftHeading } from "../round2/content.js";
import { SpatialScene } from "./SpatialScene.jsx";

const shiftIcons = [[Zap, Sparkles], [Fingerprint, Network], [Boxes, Network], [TriangleAlert, Zap]];

function SpatialHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("spatial-menu-open", open);
    return () => document.body.classList.remove("spatial-menu-open");
  }, [open]);
  return (
    <>
      <header className="spatial-header">
        <a className="spatial-brand" href="#priority"><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky" /><span>The Critical 90</span></a>
        <div className="spatial-status"><span><i />System secure</span><span>04 / 04 zones</span><span>Late 2026 → 2027</span></div>
        <a className="spatial-download" href="#download">Download the report <MorphIcon icon={Download} size={18} spring="snappy" reducedMotion="user" /></a>
        <button type="button" className="spatial-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><MorphIcon icon={open ? X : Menu} size={23} spring="snappy" reducedMotion="user" /></button>
      </header>
      <nav className={`spatial-menu ${open ? "is-open" : ""}`} aria-label="Page sections">
        {chapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`} onClick={() => setOpen(false)}><span>{chapter.number}</span>{chapter.label}<MorphIcon icon={ArrowRight} size={21} spring="snappy" reducedMotion="user" /></a>)}
      </nav>
    </>
  );
}

function Rail() {
  return <nav className="spatial-rail" aria-label="Chapter navigation">{chapters.map((chapter) => <a key={chapter.id} href={`#${chapter.id}`}><span>{chapter.number}</span><small>{chapter.label}</small></a>)}</nav>;
}

function SpatialHero() {
  return (
    <section className="spatial-hero" id="priority">
      <SpatialScene />
      <img className="spatial-hero-asset" src={assetUrl("variants/spatial/command-architecture.png")} alt="Abstract command architecture built from transparent planes" fetchPriority="high" />
      <div className="spatial-hero-copy">
        <p className="spatial-kicker">01 · The priority / Spatial command</p>
        <h1>Focus your<br />cyber budget<br />on the <em>four shifts</em><br />that matter most</h1>
        <p>{hero.lead}</p>
        <a href="#shifts">{hero.cta}<MorphIcon icon={ArrowRight} size={21} spring="snappy" reducedMotion="user" /></a>
      </div>
      <div className="spatial-console" aria-label="Command summary"><span>04<strong>Shifts</strong></span><span>90<strong>Days</strong></span><span>01<strong>Agenda</strong></span></div>
      <a className="spatial-scroll" href="#context"><MorphIcon icon={ArrowDown} size={18} spring="snappy" reducedMotion="user" /> Descend into the system</a>
    </section>
  );
}

function SpatialAppContent() {
  const [activeShift, setActiveShift] = useState(0);
  return (
    <>
      <section className="spatial-context" id="context"><p>{hero.lead}</p><p>{hero.support}</p></section>
      <section className="spatial-shifts" id="shifts">
        <div className="spatial-section-head"><span>02 / 04</span><h2>{shiftHeading}</h2></div>
        <div className="spatial-doorway">
          <div className="spatial-shift-list">{shifts.map((shift, index) => {
            const [from, to] = shiftIcons[index];
            return <button key={shift} type="button" className={activeShift === index ? "is-active" : ""} onPointerEnter={() => setActiveShift(index)} onFocus={() => setActiveShift(index)} onClick={() => setActiveShift(index)}><span>0{index + 1}</span><strong>{shift}</strong><MorphIcon icon={activeShift === index ? to : from} size={30} spring="snappy" reducedMotion="user" /></button>;
          })}</div>
          <aside><span>Active zone / 0{activeShift + 1}</span><strong>{shifts[activeShift]}</strong><p>Move through the four shifts as one connected executive decision space.</p></aside>
        </div>
      </section>
      <section className="spatial-evidence">
        <div><p>For each shift, the guide identifies:</p><span>Decision evidence / live chain</span></div>
        <ol>{evidence.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol>
      </section>
      <section className="spatial-agenda" id="agenda">
        <div className="spatial-agenda-copy"><p>03 · The 90-day agenda</p><h2>{agendaHeading}</h2><span>{agendaLead}</span></div>
        <div className="spatial-agenda-runway">{agenda.map((phase) => <article key={phase.days}><b>{phase.days}</b><div><small>Days</small><h3>{phase.title}</h3><p>{phase.copy}</p></div></article>)}</div>
      </section>
      <section className="spatial-final" id="download">
        <img src={assetUrl("variants/spatial/command-architecture.png")} alt="Command architecture resolving into one focused path" loading="lazy" />
        <div><p>04 · Executive guide</p><h2>{downloadHeading}</h2><button type="button">Download The Critical 90<MorphIcon icon={Download} size={22} spring="snappy" reducedMotion="user" /></button></div>
      </section>
    </>
  );
}

export function SpatialApp() {
  return <div className="spatial-site"><a className="spatial-skip" href="#priority">Skip to content</a><SpatialHeader /><Rail /><main><SpatialHero /><SpatialAppContent /></main></div>;
}
