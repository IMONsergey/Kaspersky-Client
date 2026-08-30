import { useEffect, useRef, useState } from "react";
import { MorphIcon } from "morphicons/react";
import {
  Activity, ArrowDown, ArrowRight, Bot, Boxes, Check, Circle, Database, Download,
  Eye, Fingerprint, Focus, Menu, Network, ScanFace, ScanSearch, Sparkles, Target,
  TriangleAlert, X, Zap,
} from "lucide";
import { PrismScene } from "./PrismScene.jsx";

const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const shifts = [
  { title: "AI accelerating attacks", from: Bot, to: Zap },
  { title: "Governance of human and non-human identity", from: Fingerprint, to: ScanFace },
  { title: "SaaS ecosystems and supply chain exposure", from: Boxes, to: Network },
  { title: "Attacks on AI, data leakage", from: Database, to: TriangleAlert },
];

const evidence = [
  { title: "The potential business impact", from: Circle, to: Target },
  { title: "The decisions that require executive attention", from: Circle, to: Sparkles },
  { title: "The functions to involve", from: Circle, to: Network },
  { title: "The actions to initiate within 30, 60 and 90 days", from: Circle, to: Activity },
  { title: "The evidence leadership requires to assess progress", from: Circle, to: Check },
];

const phases = [
  { day: "30", kicker: "First 30 days", title: "Establish visibility via critical, urgent tasks", text: "What to fund in the first 30 days to block threats", from: Eye, to: ScanSearch },
  { day: "60", kicker: "By 60 days", title: "Strengthen and test once critical tasks are completed", text: "How to strengthen and test at 60 days", from: Activity, to: Target },
  { day: "90", kicker: "By 90 days", title: "Validate and embed at a more measured pace", text: "How to lower the temperature at 90 days", from: Focus, to: Check },
];

const navigation = [
  ["01", "The priority", "#pv-priority"],
  ["02", "Four cyber shifts", "#pv-shifts"],
  ["03", "The 90-day agenda", "#pv-framework"],
  ["04", "Get the report", "#pv-download"],
];

function useActiveSection() {
  const [active, setActive] = useState("pv-priority");
  useEffect(() => {
    const nodes = [...document.querySelectorAll(".prism-site [data-pv-section]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-20% 0px -58%", threshold: [0.08, 0.32, 0.58] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return active;
}

function MorphGlyph({ from, to, active = false, size = 24, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span className="pv-morph" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onFocus={() => setHovered(true)} onBlur={() => setHovered(false)}>
      <MorphIcon icon={active || hovered ? to : from} size={size} strokeWidth={1.7} spring="snappy" reducedMotion="user" label={label} />
    </span>
  );
}

function ActionMorph({ from = ArrowRight, to = Sparkles, size = 20 }) {
  const [active, setActive] = useState(false);
  return (
    <span className="pv-action-morph" aria-hidden="true" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)}>
      <MorphIcon icon={active ? to : from} size={size} strokeWidth={1.8} spring="snappy" reducedMotion="user" />
    </span>
  );
}

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const index = Math.max(0, navigation.findIndex(([, , href]) => href === `#${active}`));
  useEffect(() => {
    document.body.classList.toggle("pv-menu-open", open);
    return () => document.body.classList.remove("pv-menu-open");
  }, [open]);
  return (
    <>
      <header className="pv-header">
        <div className="pv-grid pv-header-grid">
          <button className="pv-icon-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <MorphIcon icon={open ? X : Menu} size={21} strokeWidth={2} spring="snappy" reducedMotion="user" />
          </button>
          <a className="pv-brand" href="#pv-priority" aria-label="Kaspersky — The Critical 90"><img src={asset("assets/kaspersky-logo.svg")} alt="Kaspersky" /><span /><small>The Critical 90</small></a>
          <div className="pv-header-progress" aria-hidden="true"><span style={{ width: `${((index + 1) / navigation.length) * 100}%` }} /></div>
          <div className="pv-header-actions"><span>{String(index + 1).padStart(2, "0")} <i>/ 04</i></span><a href="#pv-download"><b>Download The Critical 90</b><ActionMorph from={ArrowRight} to={Download} size={18} /></a></div>
        </div>
      </header>
      <div className={`pv-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="pv-grid pv-menu-grid">
          <p className="pv-kicker">The Critical 90</p>
          <nav aria-label="Page sections">
            {navigation.map(([number, title, href]) => <a key={href} href={href} onClick={() => setOpen(false)}><span>{number}</span><strong>{title}</strong><ActionMorph size={26} /></a>)}
          </nav>
          <img src={asset("variants/prism/resolved-aperture.webp")} alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
      </div>
    </>
  );
}

function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    const nodes = document.querySelectorAll(".prism-site .pv-reveal");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}

function Hero() {
  return (
    <section className="pv-hero" id="pv-priority" data-pv-section>
      <div className="pv-grid pv-hero-grid">
        <div className="pv-hero-copy pv-reveal"><p className="pv-kicker">01 · The priority</p><h1>Focus your cyber budget on the four shifts that matter most</h1><a className="pv-primary-cta" href="#pv-decision"><span>Get your priorities for the next 90 days</span><ActionMorph /></a></div>
        <div className="pv-hero-visual"><PrismScene fallbackSrc={asset("variants/prism/prism-conductor.webp")} /><span className="pv-orbit-label pv-label-four">04 <i>shifts</i></span><span className="pv-orbit-label pv-label-one">01 <i>agenda</i></span></div>
      </div>
      <a className="pv-scroll-cue" href="#pv-decision"><span>The priority</span><ActionMorph from={ArrowDown} to={Sparkles} size={17} /></a>
    </section>
  );
}

function Decision() {
  return (
    <section className="pv-decision" id="pv-decision"><div className="pv-grid pv-section-grid">
      <p className="pv-kicker pv-reveal">01 · The priority</p>
      <div className="pv-decision-statement pv-reveal"><p>As you plan next year’s budget, the challenge isn’t deciding whether to spend on cybersecurity, but <em>where to spend.</em></p></div>
      <div className="pv-decision-support pv-reveal"><p>Kaspersky has identified the four cyber shifts expected to have the greatest impact on businesses worldwide through late 2026 and early 2027 — turning them into a practical 90-day action plan.</p></div>
    </div></section>
  );
}

function Shifts() {
  const [active, setActive] = useState(0);
  return (
    <section className="pv-shifts" id="pv-shifts" data-pv-section><div className="pv-grid pv-shifts-grid">
      <div className="pv-shifts-heading pv-reveal"><p className="pv-kicker">02 · The four cyber shifts</p><h2>Understand the four shifts reshaping business risk</h2></div>
      <figure className="pv-chambers pv-reveal"><img src={asset("variants/prism/refractive-chambers.webp")} alt="Four connected glass chambers representing connected cyber shifts" loading="lazy" decoding="async" /><figcaption><span>0{active + 1}</span>{shifts[active].title}</figcaption></figure>
      <div className="pv-shift-list pv-reveal">{shifts.map((shift, index) => <button key={shift.title} type="button" className={active === index ? "is-active" : ""} aria-pressed={active === index} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>0{index + 1}</span><strong>{shift.title}</strong><MorphGlyph from={shift.from} to={shift.to} active={active === index} size={27} /></button>)}</div>
    </div></section>
  );
}

function Evidence() {
  const [active, setActive] = useState(0);
  return (
    <section className="pv-evidence"><div className="pv-grid pv-evidence-grid">
      <div className="pv-evidence-heading pv-reveal"><h2>For each shift, the guide identifies:</h2></div>
      <div className="pv-evidence-list pv-reveal">{evidence.map((item, index) => <button key={item.title} type="button" className={active === index ? "is-active" : ""} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}><span>0{index + 1}</span><strong>{item.title}</strong><MorphGlyph from={item.from} to={item.to} active={active === index} size={24} /></button>)}</div>
    </div></section>
  );
}

function Framework() {
  const [phase, setPhase] = useState(0);
  return (
    <>
      <section className="pv-framework" id="pv-framework" data-pv-section><div className="pv-grid pv-framework-grid">
        <div className="pv-framework-copy pv-reveal"><p className="pv-kicker">03 · The 90-day agenda</p><h2>From four shifts to one business agenda: Why the next 90 days?</h2><p>Cyber risk is changing faster than many business controls, leading many cyber strategies to treat everything as “urgent”.</p></div>
        <figure className="pv-focus-stack pv-reveal"><div className="pv-stage-rail"><i className={phase === 0 ? "is-active" : ""} /><i className={phase === 1 ? "is-active" : ""} /><i className={phase === 2 ? "is-active" : ""} /></div><img src={asset("variants/prism/focus-stack.webp")} alt="A three-stage glass prioritization instrument" loading="lazy" decoding="async" /><figcaption><span>30</span><span>60</span><span>90</span></figcaption></figure>
      </div></section>
      <section className="pv-plan"><div className="pv-grid pv-plan-grid">
        <div className="pv-plan-heading pv-reveal"><p className="pv-kicker">30 · 60 · 90</p></div>
        <div className="pv-phase-list pv-reveal">{phases.map((item, index) => <button key={item.day} type="button" className={phase === index ? "is-active" : ""} aria-pressed={phase === index} onPointerEnter={() => setPhase(index)} onFocus={() => setPhase(index)} onClick={() => setPhase(index)}><span className="pv-day">{item.day}</span><span className="pv-phase-copy"><small>{item.kicker}</small><strong>{item.title}</strong><em>{item.text}</em></span><MorphGlyph from={item.from} to={item.to} active={phase === index} size={30} /></button>)}</div>
        <a className="pv-primary-cta pv-dark-cta pv-reveal" href="#pv-download"><span>Get your priorities for the next 90 days</span><ActionMorph /></a>
      </div></section>
    </>
  );
}

function DownloadSection() {
  const dialogRef = useRef(null);
  return (
    <section className="pv-download" id="pv-download" data-pv-section><div className="pv-grid pv-download-grid">
      <div className="pv-download-copy pv-reveal"><p className="pv-kicker">04 · Download</p><h2>Start reducing cyber risk in the next 90 days</h2><button className="pv-primary-cta" type="button" onClick={() => dialogRef.current?.showModal()}><span>Download The Critical 90</span><ActionMorph from={ArrowRight} to={Download} /></button></div>
      <div className="pv-aperture pv-reveal"><img src={asset("variants/prism/resolved-aperture.webp")} alt="Four refracted streams resolving into one focused emerald core" loading="lazy" decoding="async" /></div>
    </div>
    <dialog className="pv-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}><button className="pv-dialog-close" type="button" aria-label="Close download dialog" onClick={() => dialogRef.current?.close()}><MorphIcon icon={X} size={21} strokeWidth={2} spring="snappy" reducedMotion="user" /></button><img src={asset("assets/kaspersky-logo.svg")} alt="Kaspersky" /><p className="pv-kicker">The Critical 90</p><h3>Download will be available when the final PDF is connected.</h3><p>The page is ready for the report file.</p></dialog>
    <footer><img src={asset("assets/kaspersky-logo.svg")} alt="Kaspersky" /><span>The Critical 90</span></footer>
    </section>
  );
}

export function PrismApp() {
  const active = useActiveSection();
  return (
    <div className="prism-site">
      <a className="pv-skip" href="#pv-main">Skip to content</a>
      <RevealObserver />
      <Header active={active} />
      <main id="pv-main"><Hero /><Decision /><Shifts /><Evidence /><Framework /><DownloadSection /></main>
    </div>
  );
}
