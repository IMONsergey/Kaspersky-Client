import { useEffect, useRef, useState } from "react";
import { MorphIcon } from "morphicons/react";
import {
  Activity, ArrowRight, Bot, Boxes, ChartNoAxesCombined, Check, Circle,
  Database, Download, Eye, Fingerprint, Focus, Menu, Network, ScanFace,
  ScanSearch, Target, TriangleAlert, X, Zap,
} from "lucide";

const asset = (name) => `${import.meta.env.BASE_URL}variants/editorial/${name}`;
const logo = `${import.meta.env.BASE_URL}assets/kaspersky-logo.svg`;

const sections = [
  ["01", "The priority", "#editorial-priority"],
  ["02", "The four cyber shifts", "#editorial-shifts"],
  ["03", "The 90-day agenda", "#editorial-framework"],
  ["04", "Download", "#editorial-download"],
];

const shifts = [
  { title: "AI accelerating attacks", from: Bot, to: Zap },
  { title: "Governance of human and non-human identity", from: Fingerprint, to: ScanFace },
  { title: "SaaS ecosystems and supply chain exposure", from: Boxes, to: Network },
  { title: "Attacks on AI, data leakage", from: Database, to: TriangleAlert },
];

const evidence = [
  { title: "The potential business impact", to: ChartNoAxesCombined },
  { title: "The decisions that require executive attention", to: Target },
  { title: "The functions to involve", to: Network },
  { title: "The actions to initiate within 30, 60 and 90 days", to: Activity },
  { title: "The evidence leadership requires to assess progress", to: Check },
];

const phases = [
  { day: "30", title: "Establish visibility via critical, urgent tasks", text: "What to fund in the first 30 days to block threats.", from: Eye, to: ScanSearch },
  { day: "60", title: "Strengthen and test once critical tasks are completed", text: "How to strengthen and test at 60 days.", from: Activity, to: Target },
  { day: "90", title: "Validate and embed at a more measured pace", text: "How to lower the temperature at 90 days.", from: Focus, to: Check },
];

function useActiveSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-editorial-section]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number(visible.target.dataset.editorialSection));
    }, { rootMargin: "-18% 0px -58%", threshold: [0.08, 0.3, 0.6] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return active;
}

function LivingIcon({ from, to, active = false, size = 22, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span className="ed-living-icon" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <MorphIcon icon={active || hovered ? to : from} size={size} strokeWidth={1.75} spring="snappy" reducedMotion="user" label={label} />
    </span>
  );
}

function ActionIcon({ from = ArrowRight, to = Download, size = 20 }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const control = ref.current?.closest(".ed-interactive");
    if (!control) return undefined;
    const on = () => setActive(true);
    const off = () => setActive(false);
    control.addEventListener("pointerenter", on);
    control.addEventListener("pointerleave", off);
    control.addEventListener("focusin", on);
    control.addEventListener("focusout", off);
    return () => {
      control.removeEventListener("pointerenter", on);
      control.removeEventListener("pointerleave", off);
      control.removeEventListener("focusin", on);
      control.removeEventListener("focusout", off);
    };
  }, []);
  return <span ref={ref} className="ed-action-icon" aria-hidden="true"><MorphIcon icon={active ? to : from} size={size} strokeWidth={1.8} spring="snappy" reducedMotion="user" /></span>;
}

function EditorialCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let app;
    let graphic;
    let disposed = false;
    let pointerX = 0.72;
    let pointerY = 0.48;
    let scroll = 0;
    let visible = true;

    const boot = async () => {
      const { Application, Graphics } = await import("pixi.js");
      if (disposed) return;
      app = new Application();
      await app.init({ canvas, resizeTo: host, antialias: true, backgroundAlpha: 0, autoDensity: true, resolution: Math.min(window.devicePixelRatio || 1, 1.5), preference: "webgl" });
      if (disposed) { app.destroy(false); return; }
      graphic = new Graphics();
      app.stage.addChild(graphic);

      const draw = () => {
        const w = app.screen.width;
        const h = app.screen.height;
        const t = reduced ? 0 : app.ticker.lastTime * 0.001;
        const focusX = w * (0.72 + (pointerX - 0.5) * 0.025);
        const focusY = h * (0.49 + (pointerY - 0.5) * 0.02);
        graphic.clear();

        const column = w / 12;
        for (let i = 1; i < 12; i += 1) {
          const alpha = i === 8 ? 0.22 : 0.07;
          graphic.moveTo(column * i, 0).lineTo(column * i, h).stroke({ width: 1, color: 0x3de8ca, alpha });
        }

        const lines = [0.2, 0.38, 0.59, 0.78];
        lines.forEach((ratio, index) => {
          const wave = reduced ? 0 : Math.sin(t * 0.65 + index * 1.8) * 8;
          const startY = h * ratio + wave;
          const bend = 0.28 + index * 0.035 + scroll * 0.05;
          graphic.moveTo(0, startY)
            .bezierCurveTo(w * bend, startY, w * 0.49, focusY, focusX, focusY)
            .stroke({ width: index === 1 ? 2 : 1, color: index === 3 ? 0x8774ff : 0x3de8ca, alpha: 0.35 + index * 0.08 });
          graphic.circle(w * 0.04, startY, index === 1 ? 4 : 2.5).fill({ color: index === 3 ? 0x8774ff : 0x3de8ca, alpha: 0.9 });
        });

        const pulse = reduced ? 13 : 13 + Math.sin(t * 1.4) * 3;
        graphic.circle(focusX, focusY, 4).fill({ color: 0x3de8ca, alpha: 1 });
        graphic.circle(focusX, focusY, pulse).stroke({ width: 1, color: 0x3de8ca, alpha: 0.65 });
        graphic.circle(focusX, focusY, pulse + 22).stroke({ width: 1, color: 0x3de8ca, alpha: 0.16 });
      };

      app.ticker.add(draw);
      draw();
      if (reduced) app.ticker.stop();
    };

    const onPointer = (event) => {
      const rect = host.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / Math.max(rect.width, 1);
      pointerY = (event.clientY - rect.top) / Math.max(rect.height, 1);
    };
    const onScroll = () => { scroll = Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight, 1))); };
    const onVisibility = () => {
      if (!app || reduced) return;
      if (document.hidden || !visible) app.ticker.stop(); else app.ticker.start();
    };
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; onVisibility(); }, { rootMargin: "160px" });
    intersection.observe(host);
    host.addEventListener("pointermove", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    onScroll();
    boot().catch(() => host.classList.add("is-static"));

    return () => {
      disposed = true;
      intersection.disconnect();
      host.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      app?.destroy(false, { children: true });
    };
  }, []);
  return <canvas ref={canvasRef} className="ed-canvas" aria-hidden="true" />;
}

function Header({ active }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("ed-menu-open", open);
    return () => document.body.classList.remove("ed-menu-open");
  }, [open]);
  return (
    <>
      <header className="ed-header">
        <div className="ed-grid ed-header-grid">
          <button type="button" className="ed-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <MorphIcon icon={open ? X : Menu} size={20} strokeWidth={1.9} spring="snappy" reducedMotion="user" />
          </button>
          <a className="ed-brand" href="#editorial-priority"><img src={logo} alt="Kaspersky" /></a>
          <a className="ed-active-label" href={sections[active][2]}>{sections[active][1]}</a>
          <span className="ed-counter">{String(active + 1).padStart(2, "0")} / 04</span>
          <a className="ed-header-cta ed-interactive" href="#editorial-download"><span>Download The Critical 90</span><ActionIcon /></a>
        </div>
      </header>
      <div className={`ed-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="ed-grid" aria-label="Page sections">
          {sections.map(([number, title, href]) => <a key={href} className="ed-menu-link ed-interactive" href={href} onClick={() => setOpen(false)}><span>{number}</span><strong>{title}</strong><ActionIcon from={ArrowRight} to={Download} size={28} /></a>)}
        </nav>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="ed-hero" id="editorial-priority" data-editorial-section="0">
      <div className="ed-canvas-stage"><EditorialCanvas /></div>
      <div className="ed-grid ed-hero-grid">
        <div className="ed-hero-copy">
          <h1><span>Focus your cyber budget{" "}</span><span>on the <em>four shifts</em>{" "}</span><span>that <em>matter most</em></span></h1>
          <a className="ed-primary-cta ed-interactive" href="#editorial-decision"><span>Get your priorities for the next 90 days</span><ActionIcon from={ArrowRight} to={Download} size={22} /></a>
        </div>
        <figure className="ed-hero-object"><img src={asset("decision-lens.webp")} alt="Four transparent decision planes converging into one focused path" /></figure>
      </div>
    </section>
  );
}

function Decision() {
  return (
    <section className="ed-decision" id="editorial-decision">
      <div className="ed-grid ed-decision-grid">
        <p className="ed-display-statement">As you plan next year’s budget, the challenge isn’t deciding whether to spend on cybersecurity, but <em>where to spend.</em></p>
        <p className="ed-support">Kaspersky has identified the four cyber shifts expected to have the greatest impact on businesses worldwide through late 2026 and early 2027 — turning them into a practical 90-day action plan.</p>
      </div>
    </section>
  );
}

function Shifts() {
  const [active, setActive] = useState(0);
  return (
    <section className="ed-shifts" id="editorial-shifts" data-editorial-section="1">
      <div className="ed-grid ed-shifts-grid">
        <h2>Understand the four shifts reshaping business risk</h2>
        <div className="ed-shift-index">
          {shifts.map((shift, index) => (
            <button type="button" key={shift.title} className={`ed-shift-row ${active === index ? "is-active" : ""}`} aria-pressed={active === index} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
              <span>0{index + 1}</span><strong>{shift.title}</strong><LivingIcon from={shift.from} to={shift.to} active={active === index} size={27} />
            </button>
          ))}
        </div>
        <figure className="ed-shifts-visual"><img src={asset("four-shift-compositor.webp")} alt="Four connected glass modules representing the four cyber shifts" /><span aria-hidden="true">0{active + 1}</span></figure>
      </div>
    </section>
  );
}

function Evidence() {
  const [active, setActive] = useState(0);
  return (
    <section className="ed-evidence">
      <div className="ed-grid ed-evidence-grid">
        <h2>For each shift, the guide identifies:</h2>
        <div className="ed-evidence-list">
          {evidence.map((item, index) => (
            <button type="button" key={item.title} className={active === index ? "is-active" : ""} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
              <span>0{index + 1}</span><strong>{item.title}</strong><LivingIcon from={Circle} to={item.to} active={active === index} size={24} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Framework() {
  return (
    <section className="ed-framework" id="editorial-framework" data-editorial-section="2">
      <div className="ed-grid ed-framework-grid">
        <div className="ed-framework-copy"><h2>From four shifts to one business agenda: Why the next 90 days?</h2><p>Cyber risk is changing faster than many business controls, leading many cyber strategies to treat everything as “urgent”.</p></div>
        <figure className="ed-folio"><img src={asset("90-day-folio.webp")} alt="Three editorial layers showing a structured 90-day progression" /></figure>
      </div>
    </section>
  );
}

function Phase({ phase, index }) {
  const [active, setActive] = useState(false);
  return (
    <article className={`ed-phase ed-phase-${index + 1}`} tabIndex="0" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
      <div className="ed-grid ed-phase-grid">
        <span className="ed-phase-day">{phase.day}</span>
        <div className="ed-phase-copy"><h3>{phase.title}</h3><p>— {phase.text}</p></div>
        <LivingIcon from={phase.from} to={phase.to} active={active} size={38} />
      </div>
    </article>
  );
}

function DownloadSection() {
  const dialog = useRef(null);
  return (
    <section className="ed-download" id="editorial-download" data-editorial-section="3">
      <div className="ed-grid ed-download-grid">
        <div className="ed-download-copy"><h2>Start reducing cyber risk in the next 90 days</h2><button className="ed-download-button ed-interactive" type="button" onClick={() => dialog.current?.showModal()}><span>Download The Critical 90</span><ActionIcon from={ArrowRight} to={Download} size={24} /></button></div>
        <figure><img src={asset("resolved-monolith.webp")} alt="Four risk inputs converging into one precise decision point" /></figure>
      </div>
      <footer className="ed-grid"><img src={logo} alt="Kaspersky" /></footer>
      <dialog ref={dialog} className="ed-dialog" onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}><button type="button" aria-label="Close" onClick={() => dialog.current?.close()}><MorphIcon icon={X} size={22} strokeWidth={1.8} reducedMotion="user" /></button><img src={logo} alt="Kaspersky" /></dialog>
    </section>
  );
}

export function EditorialApp() {
  const active = useActiveSection();
  return (
    <div className="editorial-site">
      <a className="ed-skip" href="#editorial-priority">Focus your cyber budget on the four shifts that matter most</a>
      <Header active={active} />
      <main><Hero /><Decision /><Shifts /><Evidence /><Framework />{phases.map((phase, index) => <Phase key={phase.day} phase={phase} index={index} />)}<DownloadSection /></main>
    </div>
  );
}
