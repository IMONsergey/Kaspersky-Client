import { useEffect, useRef, useState } from "react";
import { MorphIcon } from "morphicons/react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  Check,
  Circle,
  CircleCheck,
  Database,
  Download,
  Eye,
  Fingerprint,
  Focus,
  Link,
  Menu,
  Network,
  Orbit,
  ScanFace,
  ScanSearch,
  Sparkles,
  Target,
  TriangleAlert,
  X,
  Zap,
} from "lucide";
import { OrbitalField } from "./OrbitalField.jsx";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const shifts = [
  { title: "AI accelerating attacks", from: Sparkles, to: Zap },
  { title: "Governance of human and non-human identity", from: Fingerprint, to: Orbit },
  { title: "SaaS ecosystems and supply chain exposure", from: Boxes, to: Link },
  { title: "Attacks on AI, data leakage", from: Bot, to: ScanSearch },
];

const evidence = [
  { title: "The potential business impact", to: ChartNoAxesCombined },
  { title: "The decisions that require executive attention", to: Target },
  { title: "The functions to involve", to: Network },
  { title: "The actions to initiate within 30, 60 and 90 days", to: Activity },
  { title: "The evidence leadership requires to assess progress", to: CircleCheck },
];

const phases = [
  {
    day: "30",
    title: "Establish visibility via critical, urgent tasks",
    text: "What to fund in the first 30 days to block threats",
    from: Eye,
    to: ScanSearch,
  },
  {
    day: "60",
    title: "Strengthen and test once critical tasks are completed",
    text: "How to strengthen and test at 60 days",
    from: Activity,
    to: Target,
  },
  {
    day: "90",
    title: "Validate and embed at a more measured pace",
    text: "How to lower the temperature at 90 days",
    from: Focus,
    to: Check,
  },
];

const sectionLinks = [
  ["01", "The priority", "#priority"],
  ["02", "The four cyber shifts", "#shifts"],
  ["03", "The 90-day agenda", "#framework"],
  ["04", "Download", "#download"],
];

function useActiveSection() {
  const [active, setActive] = useState("priority");
  useEffect(() => {
    const sections = [...document.querySelectorAll("[data-orbit-section]")];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-24% 0px -58%", threshold: [0.06, 0.24, 0.5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return active;
}

function useReveal() {
  useEffect(() => {
    const targets = [...document.querySelectorAll("[data-orbit-reveal]")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.1 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function MorphGlyph({ from, to, active = false, size = 21 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="orbit-morph-glyph"
      aria-hidden="true"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <MorphIcon icon={active || hovered ? to : from} size={size} strokeWidth={1.75} spring="smooth" reducedMotion="user" />
    </span>
  );
}

function InteractiveGlyph({ from = ArrowRight, to = Sparkles, size = 20 }) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const parent = ref.current?.closest(".orbit-interactive");
    if (!parent) return undefined;
    const engage = () => setActive(true);
    const release = () => setActive(false);
    parent.addEventListener("pointerenter", engage);
    parent.addEventListener("pointerleave", release);
    parent.addEventListener("focusin", engage);
    parent.addEventListener("focusout", release);
    return () => {
      parent.removeEventListener("pointerenter", engage);
      parent.removeEventListener("pointerleave", release);
      parent.removeEventListener("focusin", engage);
      parent.removeEventListener("focusout", release);
    };
  }, []);
  return (
    <span ref={ref} className="orbit-action-glyph" aria-hidden="true">
      <MorphIcon icon={active ? to : from} size={size} strokeWidth={1.8} spring="snappy" reducedMotion="user" />
    </span>
  );
}

function Brand() {
  return (
    <a className="orbit-brand" href="#priority" aria-label="Kaspersky — The Critical 90">
      <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" />
      <span aria-hidden="true" />
      <small>The Critical 90</small>
    </a>
  );
}

function Header({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const activeIndex = Math.max(0, sectionLinks.findIndex(([, , href]) => href === `#${active}`));

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.activeElement;
    document.body.classList.add("orbit-menu-open");
    const panel = menuRef.current;
    const focusable = [...panel.querySelectorAll("a[href], button:not([disabled])")];
    focusable[0]?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key !== "Tab" || !focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("orbit-menu-open");
      (previous || menuButtonRef.current)?.focus?.();
    };
  }, [menuOpen]);

  return (
    <>
      <header className="orbit-header">
        <div className="orbit-site-grid orbit-header-grid">
          <button
            ref={menuButtonRef}
            className="orbit-icon-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="orbit-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MorphIcon icon={menuOpen ? X : Menu} size={21} strokeWidth={1.9} spring="snappy" reducedMotion="user" />
          </button>
          <Brand />
          <div className="orbit-header-actions">
            <span className="orbit-section-count"><b>{String(activeIndex + 1).padStart(2, "0")}</b><i>/</i>04</span>
            <a className="orbit-header-cta orbit-interactive" href="#download">
              <span>Download The Critical 90</span>
              <InteractiveGlyph from={ArrowRight} to={Download} size={18} />
            </a>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div ref={menuRef} id="orbit-menu" className="orbit-menu" role="dialog" aria-modal="true" aria-label="Page navigation">
          <div className="orbit-site-grid orbit-menu-grid">
            <p className="orbit-eyebrow orbit-menu-label">The Critical 90</p>
            <nav aria-label="Page sections">
              {sectionLinks.map(([number, label, href]) => (
                <a key={href} className="orbit-interactive" href={href} onClick={() => setMenuOpen(false)}>
                  <span>{number}</span><strong>{label}</strong><InteractiveGlyph from={Circle} to={ArrowRight} size={26} />
                </a>
              ))}
            </nav>
            <div className="orbit-menu-system" aria-hidden="true">
              <OrbitalField variant="compact" activity={activeIndex / 3} />
              <img src={assetPath("variants/orbit/orbital-decision-core.webp")} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DownloadDialog({ dialogRef }) {
  return (
    <dialog ref={dialogRef} className="orbit-dialog">
      <button className="orbit-dialog-close" type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}>
        <MorphIcon icon={X} size={19} strokeWidth={1.9} spring="snappy" reducedMotion="user" />
      </button>
      <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" />
      <p className="orbit-eyebrow">The Critical 90</p>
      <h3>Download The Critical 90</h3>
      <p>The final report file has not been added yet. Add <code>public/the-critical-90.pdf</code> to enable the download.</p>
    </dialog>
  );
}

export function OrbitApp() {
  const activeSection = useActiveSection();
  const [activeShift, setActiveShift] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const [activeEvidence, setActiveEvidence] = useState(0);
  const dialogRef = useRef(null);
  useReveal();

  const openDownload = () => dialogRef.current?.showModal();

  return (
    <div className="orbit-app">
      <Header active={activeSection} />
      <main>
        <section id="priority" className="orbit-hero" data-orbit-section>
          <div className="orbit-coordinate-rail" aria-hidden="true"><span>01</span><i /><span>04</span></div>
          <div className="orbit-site-grid orbit-hero-grid">
            <div className="orbit-hero-copy" data-orbit-reveal>
              <p className="orbit-eyebrow">The priority</p>
              <h1>Focus your cyber budget on the four shifts that matter most</h1>
              <p className="orbit-lead">As you plan next year’s budget, the challenge isn’t deciding whether to spend on cybersecurity, but where to spend.</p>
              <a className="orbit-primary-cta orbit-interactive" href="#framework">
                <span>Get your priorities for the next 90 days</span>
                <InteractiveGlyph from={ArrowRight} to={ArrowDown} size={22} />
              </a>
            </div>
            <div className="orbit-hero-system" aria-hidden="true">
              <OrbitalField activity={0.18} />
              <div className="orbit-hero-aura" />
              <img src={assetPath("variants/orbit/orbital-decision-core.webp")} alt="" fetchPriority="high" />
              <span className="orbit-signal orbit-signal-a"><i />04</span>
              <span className="orbit-signal orbit-signal-b"><i />90</span>
            </div>
          </div>
          <a className="orbit-scroll-cue orbit-interactive" href="#decision">
            <InteractiveGlyph from={Circle} to={ArrowDown} size={19} /><span>The priority</span>
          </a>
        </section>

        <section id="decision" className="orbit-decision">
          <div className="orbit-site-grid orbit-section-frame">
            <p className="orbit-eyebrow orbit-decision-label" data-orbit-reveal>The priority</p>
            <div className="orbit-decision-copy" data-orbit-reveal>
              <p>Kaspersky has identified the four cyber shifts expected to have the greatest impact on businesses worldwide through late 2026 and early 2027 — turning them into a practical 90-day action plan.</p>
            </div>
            <div className="orbit-decision-scale" data-orbit-reveal aria-hidden="true">
              <span><b>04</b><i /></span><span><b>90</b><i /></span><span><b>01</b></span>
            </div>
          </div>
        </section>

        <section id="shifts" className="orbit-shifts" data-orbit-section>
          <div className="orbit-site-grid orbit-section-frame orbit-shifts-frame">
            <div className="orbit-shifts-heading" data-orbit-reveal>
              <p className="orbit-eyebrow">The four cyber shifts</p>
              <h2>Understand the four shifts reshaping business risk</h2>
            </div>
            <div className="orbit-shift-stage" data-orbit-reveal>
              <OrbitalField variant="compact" activity={activeShift / 3} />
              <img src={assetPath("variants/orbit/four-shift-orbital-assembly.webp")} alt="" loading="lazy" />
              <span aria-hidden="true">0{activeShift + 1}<i>/04</i></span>
            </div>
            <div className="orbit-shift-list" role="group" aria-label="Four cyber shifts">
              {shifts.map((shift, index) => (
                <button
                  key={shift.title}
                  className={index === activeShift ? "is-active" : ""}
                  type="button"
                  aria-pressed={index === activeShift}
                  onClick={() => setActiveShift(index)}
                  onPointerEnter={() => setActiveShift(index)}
                >
                  <span>0{index + 1}</span>
                  <strong>{shift.title}</strong>
                  <MorphGlyph from={shift.from} to={shift.to} active={index === activeShift} size={24} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="orbit-evidence">
          <div className="orbit-site-grid orbit-section-frame orbit-evidence-frame">
            <div className="orbit-evidence-heading" data-orbit-reveal>
              <p className="orbit-eyebrow">The four cyber shifts</p>
              <h2>For each shift, the guide identifies:</h2>
            </div>
            <div className="orbit-evidence-list" role="group" aria-label="Evidence leadership can use to assess progress">
              {evidence.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={index === activeEvidence ? "is-active" : ""}
                  aria-pressed={index === activeEvidence}
                  onClick={() => setActiveEvidence(index)}
                  onPointerEnter={() => setActiveEvidence(index)}
                >
                  <span>0{index + 1}</span>
                  <strong>{item.title}</strong>
                  <MorphGlyph from={Circle} to={item.to} active={index === activeEvidence} size={23} />
                </button>
              ))}
            </div>
            <div className="orbit-evidence-orbit" aria-hidden="true">
              <OrbitalField variant="compact" activity={activeEvidence / 4} />
              <span>{String(activeEvidence + 1).padStart(2, "0")}</span>
            </div>
          </div>
        </section>

        <section id="framework" className="orbit-framework" data-orbit-section>
          <div className="orbit-site-grid orbit-section-frame orbit-framework-intro">
            <div className="orbit-framework-copy" data-orbit-reveal>
              <p className="orbit-eyebrow">The 90-day agenda</p>
              <h2>From four shifts to one business agenda: Why the next 90 days?</h2>
              <p className="orbit-lead">Cyber risk is changing faster than many business controls, leading many cyber strategies to treat everything as “urgent”.</p>
            </div>
            <figure className="orbit-framework-object" data-orbit-reveal>
              <img src={assetPath("variants/orbit/orbital-90-day-instrument.webp")} alt="" loading="lazy" />
              <figcaption aria-hidden="true"><span>30</span><span>60</span><span>90</span></figcaption>
            </figure>
          </div>
          <div className="orbit-plan-wrap">
            <div className="orbit-site-grid orbit-plan-grid">
              <div className="orbit-phase-tabs" role="tablist" aria-label="90-day agenda">
                {phases.map((phase, index) => (
                  <button
                    id={`orbit-phase-tab-${phase.day}`}
                    key={phase.day}
                    type="button"
                    role="tab"
                    aria-selected={index === activePhase}
                    aria-controls={`orbit-phase-panel-${phase.day}`}
                    tabIndex={index === activePhase ? 0 : -1}
                    onClick={() => setActivePhase(index)}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                      event.preventDefault();
                      const direction = event.key === "ArrowRight" ? 1 : -1;
                      const next = (index + direction + phases.length) % phases.length;
                      setActivePhase(next);
                      document.getElementById(`orbit-phase-tab-${phases[next].day}`)?.focus();
                    }}
                  >
                    <span>{phase.day}</span>
                    <MorphGlyph from={phase.from} to={phase.to} active={index === activePhase} size={22} />
                  </button>
                ))}
              </div>
              <div
                id={`orbit-phase-panel-${phases[activePhase].day}`}
                className="orbit-phase-panel"
                role="tabpanel"
                aria-labelledby={`orbit-phase-tab-${phases[activePhase].day}`}
              >
                <span className="orbit-phase-number">{phases[activePhase].day}</span>
                <div>
                  <h3>{phases[activePhase].title}</h3>
                  <p>{phases[activePhase].text}</p>
                </div>
              </div>
              <div className="orbit-plan-system" aria-hidden="true">
                <OrbitalField variant="compact" activity={activePhase / 2} />
                <span>{phases[activePhase].day}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="orbit-download" data-orbit-section>
          <div className="orbit-download-art" aria-hidden="true">
            <OrbitalField activity={1} />
            <img src={assetPath("variants/orbit/final-convergence-aperture.webp")} alt="" loading="lazy" />
          </div>
          <div className="orbit-site-grid orbit-section-frame orbit-download-grid">
            <div className="orbit-download-copy" data-orbit-reveal>
              <p className="orbit-eyebrow">Download</p>
              <h2>Start reducing cyber risk in the next 90 days</h2>
              <button className="orbit-primary-cta orbit-interactive" type="button" onClick={openDownload}>
                <span>Download The Critical 90</span>
                <InteractiveGlyph from={Download} to={CircleCheck} size={22} />
              </button>
            </div>
          </div>
          <footer>
            <Brand />
            <span>© 2026 AO Kaspersky Lab</span>
          </footer>
        </section>
      </main>
      <DownloadDialog dialogRef={dialogRef} />
    </div>
  );
}

export { OrbitApp as App };
