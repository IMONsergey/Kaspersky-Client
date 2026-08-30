import { useEffect, useRef, useState } from "react";
import { MorphIcon } from "morphicons/react";
import {
  Activity, ArrowDown, ArrowRight, Bot, Boxes, ChartNoAxesCombined, Check,
  Circle, Database, Download, Eye, Fingerprint, Focus, Menu, Network,
  ScanFace, ScanSearch, Sparkles, Target, TriangleAlert, X, Zap,
} from "lucide";
import { GlassCanvas } from "./GlassCanvas.jsx";
import "./glass.css";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const shifts = [
  { title: "AI accelerating attacks", from: Bot, to: Zap },
  { title: "Governance of human and non-human identity", from: Fingerprint, to: ScanFace },
  { title: "SaaS ecosystems and supply chain exposure", from: Boxes, to: Network },
  { title: "Attacks on AI, data leakage", from: Database, to: TriangleAlert },
];

const evidence = [
  { title: "The potential business impact", from: Circle, to: ChartNoAxesCombined },
  { title: "The decisions that require executive attention", from: Circle, to: Target },
  { title: "The functions to involve", from: Circle, to: Network },
  { title: "The actions to initiate within 30, 60 and 90 days", from: Circle, to: Activity },
  { title: "The evidence leadership requires to assess progress", from: Circle, to: Check },
];

const phases = [
  { day: "30", title: "Establish visibility via critical, urgent tasks", text: "What to fund in the first 30 days to block threats.", from: Eye, to: ScanSearch },
  { day: "60", title: "Strengthen and test once critical tasks are completed", text: "How to strengthen and test at 60 days.", from: Activity, to: Target },
  { day: "90", title: "Validate and embed at a more measured pace", text: "How to lower the temperature at 90 days.", from: Focus, to: Check },
];

const sectionLinks = [
  ["01", "The priority", "#glass-priority"],
  ["02", "The four cyber shifts", "#glass-shifts"],
  ["03", "The 90-day agenda", "#glass-framework"],
  ["04", "Download", "#glass-download"],
];

function useActiveSection() {
  const [active, setActive] = useState("glass-priority");
  useEffect(() => {
    const sections = [...document.querySelectorAll(".glass-variant [data-glass-section]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-24% 0px -56%", threshold: [0.08, 0.3, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return active;
}

function MorphGlyph({ from, to, active = false, size = 22, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span className="gv-morph" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <MorphIcon icon={active || hovered ? to : from} size={size} strokeWidth={1.65} spring="snappy" reducedMotion="user" label={label} />
    </span>
  );
}

function ActionIcon({ from = ArrowRight, to = Sparkles, size = 20 }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const parent = ref.current?.closest(".gv-interactive");
    if (!parent) return undefined;
    const on = () => setActive(true);
    const off = () => setActive(false);
    parent.addEventListener("pointerenter", on);
    parent.addEventListener("pointerleave", off);
    parent.addEventListener("focusin", on);
    parent.addEventListener("focusout", off);
    return () => {
      parent.removeEventListener("pointerenter", on);
      parent.removeEventListener("pointerleave", off);
      parent.removeEventListener("focusin", on);
      parent.removeEventListener("focusout", off);
    };
  }, []);
  return <span className="gv-action-icon" ref={ref} aria-hidden="true"><MorphIcon icon={active ? to : from} size={size} strokeWidth={1.8} spring="snappy" reducedMotion="user" /></span>;
}

function GlassBrand() {
  return (
    <a className="gv-brand" href="#glass-priority" aria-label="Kaspersky — The Critical 90">
      <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" />
      <span aria-hidden="true" />
      <small>The Critical 90</small>
    </a>
  );
}

function GlassHeader({ active }) {
  const [open, setOpen] = useState(false);
  const activeIndex = Math.max(0, sectionLinks.findIndex(([, , href]) => href === `#${active}`));
  useEffect(() => {
    document.body.classList.toggle("gv-menu-open", open);
    return () => document.body.classList.remove("gv-menu-open");
  }, [open]);
  return (
    <>
      <header className="gv-header">
        <div className="gv-header-grid gv-grid">
          <button className="gv-menu-button" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <MorphIcon icon={open ? X : Menu} size={21} strokeWidth={1.9} spring="snappy" reducedMotion="user" />
          </button>
          <GlassBrand />
          <nav className="gv-inline-nav" aria-label="Page sections">
            {sectionLinks.slice(0, 3).map(([, label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <span className="gv-counter" aria-label={`Section ${activeIndex + 1} of 4`}>{String(activeIndex + 1).padStart(2, "0")} <i>/</i> 04</span>
          <a className="gv-header-cta gv-interactive" href="#glass-download" aria-label="Download The Critical 90"><span>Download report</span><ActionIcon to={Download} size={18} /></a>
        </div>
      </header>
      <div className={`gv-menu-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="gv-menu-links gv-grid" aria-label="Expanded page sections">
          {sectionLinks.map(([number, label, href]) => (
            <a className="gv-interactive" key={href} href={href} onClick={() => setOpen(false)}><span>{number}</span><strong>{label}</strong><ActionIcon size={25} /></a>
          ))}
        </nav>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="gv-hero" id="glass-priority" data-glass-section>
      <GlassCanvas />
      <div className="gv-grid gv-hero-grid">
        <div className="gv-hero-copy gv-reveal">
          <p className="gv-eyebrow">The Critical 90 · Executive guide</p>
          <h1>Focus your cyber budget on the four shifts that matter most</h1>
          <a className="gv-primary-cta gv-interactive" href="#glass-decision"><span>Get your priorities for the next 90 days</span><ActionIcon size={22} /></a>
        </div>
        <figure className="gv-hero-object gv-reveal">
          <img src={assetPath("variants/glass/decision-atrium.webp")} alt="Four suspended glass chambers converging into one decision axis" width="1122" height="1402" fetchPriority="high" />
        </figure>
      </div>
      <a className="gv-scroll gv-interactive" href="#glass-decision" aria-label="Continue to the budget decision"><ActionIcon from={ArrowDown} size={19} /></a>
    </section>
  );
}

function Decision() {
  return (
    <section className="gv-decision" id="glass-decision">
      <div className="gv-grid gv-section-grid">
        <p className="gv-eyebrow gv-reveal">01 · The priority</p>
        <p className="gv-decision-lead gv-reveal">As you plan next year’s budget, the challenge isn’t deciding whether to spend on cybersecurity, but where to spend.</p>
        <div className="gv-decision-support gv-reveal"><p>Kaspersky has identified the four cyber shifts expected to have the greatest impact on businesses worldwide through late 2026 and early 2027 — turning them into a practical 90-day action plan.</p></div>
      </div>
    </section>
  );
}

function Shifts() {
  const [active, setActive] = useState(0);
  return (
    <section className="gv-shifts" id="glass-shifts" data-glass-section>
      <div className="gv-grid gv-section-grid">
        <div className="gv-section-heading gv-reveal"><p className="gv-eyebrow">02 · The four cyber shifts</p><h2>Understand the four shifts reshaping business risk</h2></div>
        <figure className="gv-chambers gv-reveal"><img src={assetPath("variants/glass/risk-chambers.webp")} alt="Four linked glass risk chambers" width="1536" height="1024" loading="lazy" /></figure>
        <div className="gv-shift-grid gv-reveal">
          {shifts.map((shift, index) => (
            <button type="button" key={shift.title} className={`gv-shift-card ${active === index ? "is-active" : ""}`} aria-pressed={active === index} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <span>0{index + 1}</span><MorphGlyph from={shift.from} to={shift.to} active={active === index} size={30} /><strong>{shift.title}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  const [active, setActive] = useState(0);
  return (
    <section className="gv-evidence" id="glass-evidence">
      <div className="gv-grid gv-section-grid">
        <div className="gv-evidence-heading gv-reveal"><p className="gv-eyebrow">For each shift</p><h2>The guide identifies</h2></div>
        <div className="gv-evidence-list gv-reveal">
          {evidence.map((item, index) => (
            <button type="button" key={item.title} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <span>0{index + 1}</span><strong>{item.title}</strong><MorphGlyph from={item.from} to={item.to} active={active === index} size={25} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Framework() {
  const [active, setActive] = useState(0);
  return (
    <section className="gv-framework" id="glass-framework" data-glass-section>
      <div className="gv-grid gv-section-grid">
        <div className="gv-framework-copy gv-reveal"><p className="gv-eyebrow">03 · The 90-day agenda</p><h2>From four shifts to one business agenda: Why the next 90 days?</h2><p>Cyber risk is changing faster than many business controls, leading many cyber strategies to treat everything as “urgent”.</p></div>
        <figure className="gv-instrument gv-reveal"><img src={assetPath("variants/glass/ninety-day-instrument.webp")} alt="A three-stage glass prioritization instrument" width="1122" height="1402" loading="lazy" /></figure>
        <div className="gv-phases gv-reveal" role="tablist" aria-label="90-day action plan">
          {phases.map((phase, index) => (
            <button type="button" role="tab" aria-selected={active === index} key={phase.day} className={`gv-phase ${active === index ? "is-active" : ""}`} onClick={() => setActive(index)} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <div><span>{phase.day}</span><MorphGlyph from={phase.from} to={phase.to} active={active === index} size={30} /></div><h3>{phase.title}</h3><p>{phase.text}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  const dialogRef = useRef(null);
  return (
    <section className="gv-download" id="glass-download" data-glass-section>
      <div className="gv-grid gv-download-grid">
        <div className="gv-download-copy gv-reveal"><p className="gv-eyebrow">04 · Download</p><h2>Start reducing cyber risk in the next 90 days</h2><button className="gv-primary-cta gv-interactive" type="button" onClick={() => dialogRef.current?.showModal()}><span>Download The Critical 90</span><ActionIcon to={Download} size={22} /></button></div>
        <figure className="gv-lens gv-reveal" aria-hidden="true"><img src={assetPath("variants/glass/decision-lens.webp")} alt="" width="1254" height="1254" loading="lazy" /></figure>
      </div>
      <dialog className="gv-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}>
        <button type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}><MorphIcon icon={X} size={22} strokeWidth={1.8} spring="snappy" reducedMotion="user" /></button>
        <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" />
        <h3>The Critical 90</h3>
        <p>Add the final report PDF to <code>public/the-critical-90.pdf</code>.</p>
      </dialog>
      <footer className="gv-grid"><GlassBrand /></footer>
    </section>
  );
}

export function GlassVariant() {
  const active = useActiveSection();
  useEffect(() => {
    document.documentElement.classList.add("gv-page");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.1 });
    document.querySelectorAll(".glass-variant .gv-reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("gv-page");
    };
  }, []);
  return (
    <div className="glass-variant">
      <a className="gv-skip" href="#glass-priority">Skip to content</a>
      <GlassHeader active={active} />
      <main><Hero /><Decision /><Shifts /><Evidence /><Framework /><DownloadSection /></main>
    </div>
  );
}

export default GlassVariant;
