import { useEffect, useRef, useState } from "react";
import { MorphIcon } from "morphicons/react";
import {
  Activity, ArrowDown, ArrowRight, Bot, Boxes, Check, Circle, Database, Download,
  Eye, Fingerprint, Focus, Menu, Network, ScanFace, ScanSearch, Sparkles, Target,
  TriangleAlert, X, Zap,
} from "lucide";
import { SignalField } from "./SignalField.jsx";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const navigation = [
  ["01", "The priority", "#signal-priority"],
  ["02", "The four cyber shifts", "#signal-shifts"],
  ["03", "The 90-day agenda", "#signal-framework"],
  ["04", "Download", "#signal-download"],
];

const shifts = [
  { title: "AI accelerating attacks", from: Bot, to: Zap },
  { title: "Governance of human and non-human identity", from: Fingerprint, to: ScanFace },
  { title: "SaaS ecosystems and supply chain exposure", from: Boxes, to: Network },
  { title: "Attacks on AI, data leakage", from: Database, to: TriangleAlert },
];

const evidence = [
  { title: "The potential business impact", from: Circle, to: Activity },
  { title: "The decisions that require executive attention", from: Circle, to: Target },
  { title: "The functions to involve", from: Circle, to: Network },
  { title: "The actions to initiate within 30, 60 and 90 days", from: Circle, to: ScanSearch },
  { title: "The evidence leadership requires to assess progress", from: Circle, to: Check },
];

const phases = [
  {
    day: "30", kicker: "30 days", title: "Establish visibility via critical, urgent tasks",
    text: "What to fund in the first 30 days to block threats", from: Eye, to: ScanSearch,
  },
  {
    day: "60", kicker: "60 days", title: "Strengthen and test once critical tasks are completed",
    text: "How to strengthen and test at 60 days", from: Activity, to: Target,
  },
  {
    day: "90", kicker: "90 days", title: "Validate and embed at a more measured pace",
    text: "How to lower the temperature at 90 days", from: Focus, to: Check,
  },
];

function useScene() {
  const [scene, setScene] = useState("priority");
  useEffect(() => {
    const sections = [...document.querySelectorAll("[data-signal-scene]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setScene(visible.target.dataset.signalScene);
    }, { rootMargin: "-18% 0px -48%", threshold: [0.08, 0.25, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return scene;
}

function AnimatedIcon({ from, to, active = false, size = 22, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="signal-icon"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <MorphIcon
        icon={active || hovered ? to : from}
        size={size}
        strokeWidth={1.7}
        spring="smooth"
        reducedMotion="user"
        label={label}
      />
    </span>
  );
}

function ActionIcon({ from = ArrowRight, to = Sparkles, size = 20 }) {
  return <AnimatedIcon from={from} to={to} size={size} />;
}

function Brand() {
  return (
    <a className="signal-brand" href="#signal-priority" aria-label="Kaspersky — The Critical 90">
      <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" />
      <span>The Critical 90</span>
    </a>
  );
}

function Header({ scene }) {
  const [open, setOpen] = useState(false);
  const activeIndex = scene === "priority" || scene === "decision" ? 0 : scene === "shifts" || scene === "evidence" ? 1 : scene === "framework" || scene === "action" ? 2 : 3;

  useEffect(() => {
    document.body.classList.toggle("signal-menu-open", open);
    return () => document.body.classList.remove("signal-menu-open");
  }, [open]);

  return (
    <>
      <header className="signal-header">
        <div className="signal-grid signal-header-grid">
          <button className="signal-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="signal-menu" aria-label={open ? "Close menu" : "Open menu"}>
            <MorphIcon icon={open ? X : Menu} size={22} strokeWidth={1.9} spring="snappy" reducedMotion="user" />
          </button>
          <Brand />
          <nav className="signal-inline-nav" aria-label="Page sections">
            {navigation.map(([number, label, href], index) => <a className={index === activeIndex ? "is-active" : ""} key={href} href={href}><span>{number}</span>{label}</a>)}
          </nav>
          <a className="signal-header-cta signal-action" href="#signal-download"><span>Download The Critical 90</span><ActionIcon from={ArrowRight} to={Download} size={18} /></a>
        </div>
      </header>
      <div className={`signal-menu ${open ? "is-open" : ""}`} id="signal-menu" aria-hidden={!open}>
        <div className="signal-grid signal-menu-grid">
          <p className="signal-eyebrow">The Critical 90</p>
          <nav aria-label="Menu sections">
            {navigation.map(([number, label, href]) => (
              <a className="signal-action" key={href} href={href} onClick={() => setOpen(false)}>
                <span>{number}</span><strong>{label}</strong><ActionIcon size={28} />
              </a>
            ))}
          </nav>
          <img src={assetPath("variants/signal/resolved-signal.webp")} alt="" />
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="signal-hero signal-dark" id="signal-priority" data-signal-scene="priority">
      <div className="signal-grid signal-hero-grid">
        <div className="signal-hero-copy signal-reveal">
          <p className="signal-eyebrow">01 · The priority</p>
          <h1>Focus your cyber budget on the four shifts that matter most</h1>
          <a className="signal-primary-cta signal-action" href="#signal-decision">
            <span>Get your priorities for the next 90 days</span><ActionIcon size={21} />
          </a>
        </div>
        <figure className="signal-hero-object signal-reveal">
          <img src={assetPath("variants/signal/signal-array.webp")} alt="Four connected signal instruments converging into one decision field" />
          <figcaption><span>04</span> shifts <i>→</i> <span>90</span> days</figcaption>
        </figure>
      </div>
      <a className="signal-scroll signal-action" href="#signal-decision"><span>The priority</span><ActionIcon from={ArrowDown} to={Sparkles} size={18} /></a>
    </section>
  );
}

function Decision() {
  return (
    <section className="signal-decision signal-dark" id="signal-decision" data-signal-scene="decision">
      <div className="signal-grid signal-section-grid">
        <p className="signal-eyebrow signal-reveal">01 · The priority</p>
        <p className="signal-statement signal-reveal">As you plan next year’s budget, the challenge isn’t deciding whether to spend on cybersecurity, but <em>where to spend.</em></p>
        <div className="signal-support signal-reveal">
          <p>Kaspersky has identified the four cyber shifts expected to have the greatest impact on businesses worldwide through late 2026 and early 2027 — turning them into a practical 90-day action plan.</p>
          <a className="signal-text-link signal-action" href="#signal-shifts"><span>Understand the four shifts reshaping business risk</span><ActionIcon size={18} /></a>
        </div>
      </div>
    </section>
  );
}

function Shifts() {
  const [active, setActive] = useState(0);
  return (
    <section className="signal-shifts signal-dark" id="signal-shifts" data-signal-scene="shifts">
      <div className="signal-grid signal-shifts-grid">
        <div className="signal-heading signal-reveal"><p className="signal-eyebrow">02 · The four cyber shifts</p><h2>Understand the four shifts reshaping business risk</h2></div>
        <figure className="signal-shifts-object signal-reveal">
          <img src={assetPath("variants/signal/topology-chambers.webp")} alt="Four connected topographic modules representing the cyber shifts" />
          <figcaption><span>0{active + 1}</span>{shifts[active].title}</figcaption>
        </figure>
        <div className="signal-shift-list signal-reveal">
          {shifts.map((shift, index) => (
            <button
              type="button"
              key={shift.title}
              className={active === index ? "is-active" : ""}
              aria-pressed={active === index}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span><strong>{shift.title}</strong><AnimatedIcon {...shift} active={active === index} size={27} />
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
    <section className="signal-evidence signal-dark" id="signal-evidence" data-signal-scene="evidence">
      <div className="signal-grid signal-evidence-grid">
        <div className="signal-heading signal-reveal"><h2>For each shift, the guide identifies:</h2></div>
        <div className="signal-evidence-list signal-reveal">
          {evidence.map((item, index) => (
            <button
              type="button"
              key={item.title}
              className={active === index ? "is-active" : ""}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span><strong>{item.title}</strong><AnimatedIcon {...item} active={active === index} size={24} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Framework() {
  return (
    <section className="signal-framework" id="signal-framework" data-signal-scene="framework">
      <div className="signal-grid signal-framework-grid">
        <div className="signal-framework-copy signal-reveal">
          <p className="signal-eyebrow">03 · The 90-day agenda</p>
          <h2>From four shifts to one business agenda: Why the next 90 days?</h2>
          <p>Cyber risk is changing faster than many business controls, leading many cyber strategies to treat everything as “urgent”.</p>
        </div>
        <figure className="signal-framework-object signal-reveal">
          <img src={assetPath("variants/signal/contour-stack.webp")} alt="A transparent three-stage 90-day prioritization instrument" />
          <figcaption><span>30</span><i>→</i><span>60</span><i>→</i><span>90</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

function ActionPlan() {
  const [active, setActive] = useState(0);
  return (
    <section className="signal-action-plan" id="signal-action" data-signal-scene="action">
      <div className="signal-grid signal-action-grid">
        {phases.map((phase, index) => (
          <article
            className={`signal-phase signal-reveal ${active === index ? "is-active" : ""}`}
            key={phase.day}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <button type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
              <span className="signal-phase-day">{phase.day}</span>
              <AnimatedIcon {...phase} active={active === index} size={29} />
              <small>{phase.kicker}</small>
              <h3>{phase.title}</h3>
              <p>{phase.text}</p>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function DownloadSection() {
  const dialogRef = useRef(null);
  return (
    <section className="signal-download signal-dark" id="signal-download" data-signal-scene="download">
      <div className="signal-grid signal-download-grid">
        <div className="signal-download-copy signal-reveal">
          <p className="signal-eyebrow">04 · Download</p>
          <h2>Start reducing cyber risk in the next 90 days</h2>
          <button className="signal-primary-cta signal-action" type="button" onClick={() => dialogRef.current?.showModal()}>
            <span>Download The Critical 90</span><ActionIcon from={ArrowRight} to={Download} size={21} />
          </button>
        </div>
        <figure className="signal-download-object signal-reveal"><img src={assetPath("variants/signal/resolved-signal.webp")} alt="Four signal streams resolving into one precise core" /></figure>
      </div>
      <dialog className="signal-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}>
        <button className="signal-dialog-close" type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}><MorphIcon icon={X} size={22} strokeWidth={1.8} reducedMotion="user" /></button>
        <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" />
        <p className="signal-eyebrow">The Critical 90</p>
        <h3>Download asset ready to connect</h3>
        <p>Add the final report PDF to <code>public/the-critical-90.pdf</code>; the production download action is ready here.</p>
      </dialog>
      <footer className="signal-grid"><Brand /><span>2026–2027</span></footer>
    </section>
  );
}

export function SignalApp() {
  const scene = useScene();
  useEffect(() => {
    document.documentElement.dataset.variant = "signal";
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".signal-reveal").forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      delete document.documentElement.dataset.variant;
    };
  }, []);

  return (
    <div className={`signal-site signal-scene-${scene}`}>
      <a className="signal-skip" href="#signal-priority">Skip to content</a>
      <SignalField scene={scene} />
      <Header scene={scene} />
      <main><Hero /><Decision /><Shifts /><Evidence /><Framework /><ActionPlan /><DownloadSection /></main>
    </div>
  );
}
