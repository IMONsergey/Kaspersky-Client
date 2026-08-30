import { useEffect, useRef, useState } from "react";
import { MorphIcon } from "morphicons/react";
import {
  Activity, ArrowDown, ArrowRight, Bot, Boxes, ChartNoAxesCombined, Check, Circle,
  Database, Download, Eye, Fingerprint, Focus, Menu, Network, ScanFace, ScanSearch,
  Sparkles, Target, TriangleAlert, X, Zap,
} from "lucide";

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
  { day: "30", kicker: "First 30 days", title: "Establish visibility via critical, urgent tasks", text: "What to fund in the first 30 days to block threats", from: Eye, to: ScanSearch },
  { day: "60", kicker: "By 60 days", title: "Strengthen and test once critical tasks are completed", text: "How to strengthen and test at 60 days", from: Activity, to: Target },
  { day: "90", kicker: "By 90 days", title: "Validate and embed at a more measured pace", text: "How to lower the temperature at 90 days", from: Focus, to: Check },
];

const sectionLinks = [
  ["01", "The priority", "#priority"],
  ["02", "Four cyber shifts", "#shifts"],
  ["03", "The 90-day agenda", "#framework"],
  ["04", "Get the report", "#download"],
];

function useActiveSection() {
  const [active, setActive] = useState("priority");
  useEffect(() => {
    const sections = [...document.querySelectorAll("[data-section]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-22% 0px -54%", threshold: [0.08, 0.3, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return active;
}

function MorphGlyph({ from, to, active = false, size = 20, label }) {
  const [engaged, setEngaged] = useState(false);
  return (
    <span className="morph-glyph" onPointerEnter={() => setEngaged(true)} onPointerLeave={() => setEngaged(false)} onFocus={() => setEngaged(true)} onBlur={() => setEngaged(false)}>
      <MorphIcon icon={active || engaged ? to : from} size={size} strokeWidth={1.7} spring="snappy" reducedMotion="user" label={label} />
    </span>
  );
}

function ActionIcon({ from = ArrowRight, to = Sparkles, size = 20 }) {
  const [active, setActive] = useState(false);
  return (
    <span className="action-icon" aria-hidden="true" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)}>
      <MorphIcon icon={active ? to : from} size={size} strokeWidth={1.8} spring="snappy" reducedMotion="user" />
    </span>
  );
}

function BrandLogo() {
  return (
    <a className="brand" href="#priority" aria-label="Kaspersky — The Critical 90">
      <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" /><span aria-hidden="true" /><small>The Critical 90</small>
    </a>
  );
}

function Header({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);
  const activeIndex = Math.max(0, sectionLinks.findIndex(([, , href]) => href === `#${active}`));
  return (
    <>
      <header className="site-header">
        <div className="header-grid site-grid">
          <button className="icon-button menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            <MorphIcon icon={menuOpen ? X : Menu} size={21} strokeWidth={2} spring="snappy" reducedMotion="user" />
          </button>
          <BrandLogo />
          <div className="header-actions">
            <span className="section-status">{String(activeIndex + 1).padStart(2, "0")}<i>/</i>04</span>
            <a className="header-cta interactive-icon" href="#download"><span>Download report</span><ActionIcon from={ArrowRight} to={Download} size={18} /></a>
          </div>
        </div>
      </header>
      <div className={`menu-panel ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-grid site-grid">
          <p className="eyebrow menu-kicker">Navigate the report</p>
          <nav aria-label="Page sections">
            {sectionLinks.map(([number, label, href]) => (
              <a className="interactive-icon" key={href} href={href} onClick={() => setMenuOpen(false)}><span>{number}</span><strong>{label}</strong><ActionIcon from={ArrowRight} to={Sparkles} size={25} /></a>
            ))}
          </nav>
          <div className="menu-orbit" aria-hidden="true"><span /><span /><span /><i>90</i></div>
        </div>
      </div>
    </>
  );
}

function DecisionCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0, height = 0, frame = 0, time = 0;
    let pointer = { x: 0.62, y: 0.46 };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width; height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr)); canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: (event.clientX - rect.left) / rect.width, y: (event.clientY - rect.top) / rect.height };
    };
    const point = (x, y, phase = 0) => ({ x: width * x + Math.sin(time * 0.017 + phase) * 5, y: height * y + Math.cos(time * 0.014 + phase) * 5 });
    const draw = () => {
      context.clearRect(0, 0, width, height);
      const px = (pointer.x - 0.5) * 16, py = (pointer.y - 0.5) * 16;
      const starts = [point(0.08, 0.22, 0), point(0.04, 0.46, 1.7), point(0.13, 0.74, 3.2), point(0.42, 0.9, 4.8)];
      const focus = point(0.72 + px / Math.max(width, 1), 0.48 + py / Math.max(height, 1), 2.2);
      context.save(); context.lineCap = "round";
      starts.forEach((start, index) => {
        const gradient = context.createLinearGradient(start.x, start.y, focus.x, focus.y);
        gradient.addColorStop(0, "rgba(61,232,202,0.04)"); gradient.addColorStop(0.68, index === 3 ? "rgba(111,103,255,0.28)" : "rgba(61,232,202,0.34)"); gradient.addColorStop(1, "rgba(61,232,202,0.82)");
        context.strokeStyle = gradient; context.lineWidth = index === 1 ? 1.5 : 1; context.beginPath(); context.moveTo(start.x, start.y);
        context.bezierCurveTo(width * (0.32 + index * 0.025), start.y, width * (0.46 - index * 0.018), focus.y, focus.x, focus.y); context.stroke();
      });
      starts.forEach((node, index) => { context.fillStyle = index === 3 ? "rgba(136,120,255,.9)" : "rgba(61,232,202,.88)"; context.beginPath(); context.arc(node.x, node.y, index === 1 ? 4 : 2.8, 0, Math.PI * 2); context.fill(); });
      const pulse = reduced ? 10 : 10 + Math.sin(time * 0.025) * 3;
      context.strokeStyle = "rgba(61,232,202,.55)"; context.lineWidth = 1; context.beginPath(); context.arc(focus.x, focus.y, pulse, 0, Math.PI * 2); context.stroke();
      context.strokeStyle = "rgba(61,232,202,.16)"; context.beginPath(); context.arc(focus.x, focus.y, pulse + 18, 0, Math.PI * 2); context.stroke(); context.restore();
      if (!reduced) { time += 1; frame = requestAnimationFrame(draw); }
    };
    const observer = new ResizeObserver(() => { resize(); draw(); });
    observer.observe(canvas); canvas.addEventListener("pointermove", onMove); resize(); draw();
    return () => { observer.disconnect(); canvas.removeEventListener("pointermove", onMove); cancelAnimationFrame(frame); };
  }, []);
  return <canvas className="decision-canvas" ref={canvasRef} aria-hidden="true" />;
}

function Hero() {
  return (
    <section className="hero dark-section" id="priority" data-section>
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-frame site-grid">
        <div className="hero-copy reveal"><p className="eyebrow">The Critical 90 · Executive guide</p><h1>Focus your cyber budget on the four shifts that matter most</h1>
          <a className="primary-cta interactive-icon" href="#decision"><span>Get your priorities for the next 90 days</span><ActionIcon from={ArrowRight} to={Sparkles} size={21} /></a>
        </div>
        <div className="hero-system reveal" aria-label="A decision engine bringing four cyber shifts into one focused 90-day plan">
          <DecisionCanvas /><img src={assetPath("assets/decision-engine-v2.png")} alt="A transparent glass and graphite decision engine with four connected nodes" />
          <div className="system-label system-label-a"><span>04</span> shifts</div><div className="system-label system-label-b"><span>90</span> days</div>
        </div>
      </div>
      <a className="scroll-cue interactive-icon" href="#decision"><span>Why these priorities</span><ActionIcon from={ArrowDown} to={Sparkles} size={18} /></a>
    </section>
  );
}

function DecisionSection() {
  return (
    <section className="decision-section" id="decision"><div className="section-frame site-grid">
      <p className="eyebrow decision-kicker reveal">01 · The priority</p>
      <div className="decision-statement reveal"><p>As you plan next year’s budget, the challenge isn’t deciding whether to spend on cybersecurity, but <em>where to spend.</em></p></div>
      <div className="decision-support reveal"><span className="support-line" aria-hidden="true" /><p>Kaspersky has identified the four cyber shifts expected to have the greatest impact on businesses worldwide through late 2026 and early 2027 — turning them into a practical 90-day action plan.</p>
        <a className="text-link interactive-icon" href="#shifts"><span>Understand the four shifts</span><ActionIcon from={ArrowRight} to={Sparkles} size={19} /></a>
      </div>
    </div></section>
  );
}

function Shifts() {
  const [activeShift, setActiveShift] = useState(0);
  return (
    <section className="shifts-section dark-section" id="shifts" data-section><div className="section-frame site-grid">
      <div className="shifts-heading reveal"><p className="eyebrow">02 · The four cyber shifts</p><h2>Understand the four shifts reshaping business risk</h2></div>
      <figure className="shifts-object reveal"><div className="object-aura" aria-hidden="true" /><img src={assetPath("assets/four-shifts-system-v2.png")} alt="Four linked technology modules representing connected cyber shifts" /><figcaption><span>0{activeShift + 1}</span>{shifts[activeShift].title}</figcaption></figure>
      <div className="shift-grid reveal">{shifts.map((shift, index) => (
        <button className={`shift-card ${activeShift === index ? "is-active" : ""}`} key={shift.title} type="button" onClick={() => setActiveShift(index)} onPointerEnter={() => setActiveShift(index)} onFocus={() => setActiveShift(index)} aria-pressed={activeShift === index}>
          <span className="shift-number">0{index + 1}</span><MorphGlyph from={shift.from} to={shift.to} active={activeShift === index} size={30} /><strong>{shift.title}</strong><i aria-hidden="true" />
        </button>
      ))}</div>
    </div></section>
  );
}

function EvidenceSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="evidence-section dark-section" id="evidence"><div className="section-frame site-grid">
      <div className="evidence-heading reveal"><p className="eyebrow">For each shift</p><h2>The guide identifies</h2></div>
      <div className="evidence-list reveal">{evidence.map((item, index) => (
        <button type="button" key={item.title} className={active === index ? "is-active" : ""} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
          <span>0{index + 1}</span><strong>{item.title}</strong><MorphGlyph from={item.from} to={item.to} active={active === index} size={25} />
        </button>
      ))}</div>
      <a className="primary-cta evidence-cta interactive-icon reveal" href="#framework"><span>See the 90-day agenda</span><ActionIcon from={ArrowRight} to={Sparkles} size={21} /></a>
    </div></section>
  );
}

function FrameworkIntro() {
  return (
    <section className="framework-intro" id="framework" data-section><div className="section-frame site-grid">
      <div className="framework-copy reveal"><p className="eyebrow">03 · The report: 90 days</p><h2>From four shifts to one business agenda: Why the next 90 days?</h2><p className="lead">Cyber risk is changing faster than many business controls, leading many cyber strategies to treat everything as “urgent”.</p></div>
      <figure className="timeline-object reveal"><span className="timeline-rail" aria-hidden="true"><i /><i /><i /></span><img src={assetPath("assets/90-day-instrument-v2.png")} alt="A three-stage glass and graphite 90-day planning instrument" /><figcaption>30 <span>→</span> 60 <span>→</span> 90</figcaption></figure>
    </div></section>
  );
}

function ActionPlan() {
  const [activePhase, setActivePhase] = useState(0);
  return (
    <section className="action-plan" id="action-plan"><div className="section-frame site-grid">
      <div className="plan-heading reveal"><p className="eyebrow">Critical → moderate → measured</p><h2>One practical 90-day action plan</h2></div>
      <div className="phase-grid reveal" role="tablist" aria-label="90-day action plan">{phases.map((phase, index) => (
        <button key={phase.day} type="button" role="tab" aria-selected={activePhase === index} className={`phase-card ${activePhase === index ? "is-active" : ""}`} onClick={() => setActivePhase(index)} onPointerEnter={() => setActivePhase(index)} onFocus={() => setActivePhase(index)}>
          <div className="phase-top"><span>{phase.day}</span><MorphGlyph from={phase.from} to={phase.to} active={activePhase === index} size={30} /></div><small>{phase.kicker}</small><h3>{phase.title}</h3><p>{phase.text}</p><i className="phase-progress" aria-hidden="true" />
        </button>
      ))}</div>
      <a className="primary-cta dark-cta interactive-icon reveal" href="#download"><span>Start separating the critical from the noise</span><ActionIcon from={ArrowRight} to={Sparkles} size={21} /></a>
    </div></section>
  );
}

function DownloadSection() {
  const dialogRef = useRef(null);
  return (
    <section className="download-section dark-section" id="download" data-section><div className="download-orbits" aria-hidden="true"><span /><span /><span /><i /></div>
      <div className="section-frame site-grid download-grid"><div className="download-copy reveal"><p className="eyebrow">04 · The next 90 days</p><h2>Start reducing cyber risk in the next 90 days</h2>
        <button className="primary-cta interactive-icon" type="button" onClick={() => dialogRef.current?.showModal()}><span>Download The Critical 90</span><ActionIcon from={ArrowRight} to={Download} size={21} /></button>
      </div><div className="download-mark reveal" aria-hidden="true"><span>90</span><i /></div></div>
      <dialog className="download-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}><button className="dialog-close" type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}><MorphIcon icon={X} size={22} strokeWidth={1.8} reducedMotion="user" /></button><img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" /><p className="eyebrow">The Critical 90</p><h3>Download asset ready to connect</h3><p>Add the final report PDF to <code>public/the-critical-90.pdf</code>; the production download action is already isolated here.</p></dialog>
      <footer><BrandLogo /><span>Executive guide · 2026–2027</span></footer>
    </section>
  );
}

export function App() {
  const active = useActiveSection();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <><a className="skip-link" href="#priority">Skip to content</a><Header active={active} /><main><Hero /><DecisionSection /><Shifts /><EvidenceSection /><FrameworkIntro /><ActionPlan /><DownloadSection /></main></>;
}
