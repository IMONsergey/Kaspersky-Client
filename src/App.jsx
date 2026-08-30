import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, DownloadSimple, List, X } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const shifts = [
  "AI accelerating attacks",
  "Governance of human and non-human identity",
  "SaaS ecosystems and supply chain exposure",
  "Attacks on AI, data leakage",
];

const evidence = [
  "The potential business impact",
  "The decisions that require executive attention",
  "The functions to involve",
  "The actions to initiate within 30, 60 and 90 days",
  "The evidence leadership requires to assess progress",
];

const phases = [
  { day: "30", kicker: "First 30 days", title: "Establish visibility via critical, urgent tasks", text: "What to fund in the first 30 days to block threats" },
  { day: "60", kicker: "By 60 days", title: "Strengthen and test once critical tasks are completed", text: "How to strengthen and test at 60 days" },
  { day: "90", kicker: "By 90 days", title: "Validate and embed at a more measured pace", text: "How to lower the temperature at 90 days" },
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
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-24% 0px -50%", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function BrandLogo() {
  return (
    <a className="brand" href="#priority" aria-label="Kaspersky — The Critical 90">
      <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" />
      <span aria-hidden="true" />
      <small>The Critical 90</small>
    </a>
  );
}

function Header({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const activeIndex = sectionLinks.findIndex(([, , href]) => href === `#${active}`);

  return (
    <>
      <header className="site-header">
        <button className="icon-button menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} weight="bold" /> : <List size={21} weight="bold" />}
        </button>
        <BrandLogo />
        <div className="header-actions">
          <span className="section-status">{String(activeIndex + 1).padStart(2, "0")}<i>/</i>04</span>
          <a className="header-cta" href="#download">Download report <DownloadSimple size={18} weight="bold" /></a>
        </div>
      </header>

      <div className={`menu-panel ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Page sections">
          <p className="eyebrow">Navigate the report</p>
          {sectionLinks.map(([number, label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              <span>{number}</span>{label}<ArrowRight size={24} />
            </a>
          ))}
        </nav>
        <div className="menu-visual" aria-hidden="true"><img src={assetPath("assets/decision-prism.webp")} alt="" /></div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero dark-section" id="priority" data-section>
      <div className="hero-backdrop" aria-hidden="true"><img src={assetPath("assets/esg-hero-scene.webp")} alt="" /></div>
      <div className="section-frame hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">The Critical 90 · Executive guide</p>
          <h1>Focus your cyber budget on the four shifts that matter most</h1>
          <p className="lead">As you plan next year’s budget, the challenge isn’t deciding whether to spend on cybersecurity, but where to spend.</p>
          <p className="hero-support">Kaspersky has identified the four cyber shifts expected to have the greatest impact on businesses worldwide through late 2026 and early 2027 — turning them into a practical 90-day action plan.</p>
          <a className="primary-cta" href="#shifts">Get your priorities for the next 90 days <ArrowRight size={21} weight="bold" /></a>
        </div>
        <figure className="hero-visual reveal" aria-label="The Critical 90 visual system">
          <img src={assetPath("assets/critical90-cover.webp")} alt="Kaspersky cyber-resilience city rendered in dark glass and green light" />
          <figcaption><span>Revenue</span><span>Compliance</span><span>Customer trust</span></figcaption>
        </figure>
      </div>
      <a className="scroll-cue" href="#shifts">Explore the four shifts <ArrowDown size={18} /></a>
    </section>
  );
}

function Shifts() {
  const [activeShift, setActiveShift] = useState(0);

  return (
    <section className="shifts-section dark-section" id="shifts" data-section>
      <div className="section-frame">
        <div className="section-heading split-heading reveal">
          <div><p className="eyebrow">02 · The four cyber shifts</p><h2>Understand the four shifts reshaping business risk</h2></div>
          <p>The Critical 90 guide examines four closely connected cyber shifts through a business lens. It explains where exposure may arise, what the potential consequences are and which actions your business should prioritize over the next 90 days.</p>
        </div>
        <Swiper className="shift-swiper" modules={[Pagination, A11y]} pagination={{ clickable: true }} spaceBetween={12} slidesPerView={1.15} breakpoints={{ 640: { slidesPerView: 2.15 }, 1120: { slidesPerView: 4 } }} onSlideChange={(swiper) => setActiveShift(swiper.realIndex)}>
          {shifts.map((shift, index) => (
            <SwiperSlide key={shift}>
              <button className={`shift-card ${activeShift === index ? "is-active" : ""}`} type="button" onClick={() => setActiveShift(index)} aria-pressed={activeShift === index}>
                <span>{String(index + 1).padStart(2, "0")}</span><strong>{shift}</strong><i aria-hidden="true" />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="shift-stage reveal">
          <div className="shift-media">
            {activeShift === 0 ? (
              <video autoPlay muted loop playsInline poster={assetPath("assets/ai-domino.webp")} aria-label="AI accelerating attacks visual"><source src={assetPath("assets/ai-shift.mp4")} type="video/mp4" /></video>
            ) : (
              <img src={assetPath("assets/four-shifts.webp")} alt="Four connected cyber shifts represented as one technological system" />
            )}
            <div className="shift-index" aria-hidden="true">0{activeShift + 1}</div>
          </div>
          <div className="shift-evidence">
            <p className="eyebrow">For each shift, the guide identifies</p>
            <ul>{evidence.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="stage-summary">Get better visibility, clearer ownership and evidence that your business can respond when its operations, finances or trust are at stake.</p>
            <a className="text-link" href="#framework">See the 90-day agenda <ArrowRight size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Framework() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section className="framework-section" id="framework" data-section>
      <div className="section-frame framework-grid">
        <div className="framework-copy reveal">
          <p className="eyebrow">03 · The report: 90 days</p>
          <h2>From four shifts to one business agenda: Why the next 90 days?</h2>
          <p className="lead">Cyber risk is changing faster than many business controls, leading many cyber strategies to treat everything as “urgent”.</p>
          <p>Our three-month framework flips this entirely. You get a step-by-step timeline that dictates:</p>
          <div className="phase-tabs" role="tablist" aria-label="90-day action plan">
            {phases.map((phase, index) => <button key={phase.day} className={activePhase === index ? "is-active" : ""} role="tab" aria-selected={activePhase === index} onClick={() => setActivePhase(index)}>{phase.day}</button>)}
          </div>
          <div className="phase-detail" role="tabpanel" aria-live="polite">
            <span>{phases[activePhase].kicker}</span><h3>{phases[activePhase].title}</h3><p>{phases[activePhase].text}</p>
          </div>
          <a className="primary-cta dark-cta" href="#download">Start separating the critical from the noise <ArrowRight size={21} weight="bold" /></a>
        </div>
        <figure className="timeline-visual reveal">
          <span className="timeline-number">{phases[activePhase].day}</span>
          <img src={assetPath("assets/90-day-tower.webp")} alt="A glass 30, 60 and 90 day planning instrument" />
          <figcaption>Critical → moderate → measured</figcaption>
        </figure>
      </div>
    </section>
  );
}

function DownloadSection() {
  const dialogRef = useRef(null);

  return (
    <section className="download-section dark-section" id="download" data-section>
      <video className="download-video" autoPlay muted loop playsInline aria-hidden="true"><source src={assetPath("assets/kaspersky-finale.mp4")} type="video/mp4" /></video>
      <div className="download-shade" aria-hidden="true" />
      <div className="section-frame download-copy reveal">
        <p className="eyebrow">04 · The next 90 days</p>
        <h2>Start reducing cyber risk in the next 90 days</h2>
        <button className="primary-cta" type="button" onClick={() => dialogRef.current?.showModal()}>Download The Critical 90 <DownloadSimple size={21} weight="bold" /></button>
      </div>
      <dialog className="download-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}>
        <button className="dialog-close" type="button" aria-label="Close" onClick={() => dialogRef.current?.close()}><X size={22} /></button>
        <img src={assetPath("assets/kaspersky-logo.svg")} alt="Kaspersky" />
        <p className="eyebrow">The Critical 90</p>
        <h3>Download asset ready to connect</h3>
        <p>Add the final report PDF to <code>public/the-critical-90.pdf</code>; the production download action is already isolated here.</p>
      </dialog>
      <footer><BrandLogo /><span>Executive guide · 2026–2027</span></footer>
    </section>
  );
}

export function App() {
  const active = useActiveSection();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <><a className="skip-link" href="#priority">Skip to content</a><Header active={active} /><main><Hero /><Shifts /><Framework /><DownloadSection /></main></>;
}
