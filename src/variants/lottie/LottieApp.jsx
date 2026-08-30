import { useState } from "react";
import { MorphIcon } from "morphicons/react";
import { ArrowDownRight, ArrowRight, Check, Download, Eye, MoveRight, Play, RotateCw, Sparkles, Target } from "lucide";
import { agenda, agendaHeading, agendaLead, assetUrl, downloadHeading, evidence, hero, shifts, shiftHeading } from "../round2/content.js";
import { KineticAnimation } from "./KineticAnimation.jsx";

const iconPairs = [[Play, Sparkles], [Target, RotateCw], [Eye, Check], [ArrowRight, MoveRight]];

function LottieHeader() {
  return <header className="lottie-header"><a href="#priority" className="lottie-brand"><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky" /><span>The Critical 90</span></a><nav aria-label="Page sections"><a href="#shifts">The four shifts</a><a href="#agenda">The 90-day agenda</a><a href="#download">Resources</a></nav><a href="#download" className="lottie-header-cta">Download The Critical 90<MorphIcon icon={ArrowRight} size={18} spring="snappy" reducedMotion="user" /></a></header>;
}

function LottieHero() {
  return <section className="lottie-hero" id="priority">
    <aside className="lottie-side-label"><span>01</span><strong>The priority</strong><em>Kinetic dossier / 07</em></aside>
    <div className="lottie-hero-title"><h1>Focus your cyber<br />budget on the<br /><em>four shifts</em> that<br />matter most</h1><p>{hero.lead}</p><a href="#shifts">{hero.cta}<MorphIcon icon={ArrowRight} size={20} spring="snappy" reducedMotion="user" /></a></div>
    <div className="lottie-hero-motion"><KineticAnimation imagePath={assetUrl("variants/lottie/ninety-day-instrument.png")} /><div className="lottie-dial"><span>90</span><small>days to focus</small></div></div>
    <div className="lottie-folio"><span>01 / 04</span><strong>Actionable priorities.<br />Measurable impact.<br />Real protection.</strong></div>
    <a className="lottie-scroll" href="#context"><MorphIcon icon={ArrowDownRight} size={26} spring="snappy" reducedMotion="user" /></a>
  </section>;
}

function LottieBody() {
  const [selected, setSelected] = useState(0);
  return <>
    <div className="lottie-ticker" aria-hidden="true"><span>AI is accelerating risk.</span><i /> <span>Identity is expanding.</span><i /> <span>SaaS connects exposure.</span><i /> <span>Focus changes everything.</span></div>
    <section className="lottie-context" id="context"><p className="lottie-section-number">01 / Why now</p><blockquote>{hero.lead}</blockquote><p>{hero.support}</p></section>
    <section className="lottie-shifts" id="shifts">
      <header><p>02 · The four cyber shifts</p><h2>{shiftHeading}</h2><span>Hover, focus or tap to advance the motion score.</span></header>
      <div className="lottie-shift-stage">
        <ol>{shifts.map((shift, index) => { const [from, to] = iconPairs[index]; return <li key={shift}><button type="button" className={selected === index ? "is-active" : ""} onPointerEnter={() => setSelected(index)} onFocus={() => setSelected(index)} onClick={() => setSelected(index)}><span>0{index + 1}</span><strong>{shift}</strong><MorphIcon icon={selected === index ? to : from} size={26} spring="snappy" reducedMotion="user" /></button></li>; })}</ol>
        <figure><img src={assetUrl("variants/lottie/ninety-day-instrument.png")} alt="Graphite 90-day instrument moving through four strategic planes" loading="lazy" /><figcaption><span>Active movement</span><strong>0{selected + 1}</strong><p>{shifts[selected]}</p></figcaption></figure>
      </div>
    </section>
    <section className="lottie-evidence"><div><p>For each shift, the guide identifies:</p><span>Five frames / one motion sequence</span></div><ol>{evidence.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></section>
    <section className="lottie-agenda" id="agenda">
      <header><p>03 · The 90-day agenda</p><h2>{agendaHeading}</h2><span>{agendaLead}</span></header>
      <div className="lottie-agenda-strip">{agenda.map((phase, index) => <article key={phase.days}><span>{phase.days}</span><small>days / frame 0{index + 1}</small><h3>{phase.title}</h3><p>{phase.copy}</p><MorphIcon icon={index === agenda.length - 1 ? Check : ArrowRight} size={28} spring="snappy" reducedMotion="user" /></article>)}</div>
    </section>
    <section className="lottie-download" id="download"><div><p>04 · Download / final frame</p><h2>{downloadHeading}</h2><button type="button">Download The Critical 90<MorphIcon icon={Download} size={22} spring="snappy" reducedMotion="user" /></button></div><img src={assetUrl("variants/lottie/ninety-day-instrument.png")} alt="Graphite 90-day instrument resolving into forward motion" loading="lazy" /></section>
  </>;
}

export function LottieApp() {
  return <div className="lottie-site"><a className="lottie-skip" href="#priority">Skip to content</a><LottieHeader /><main><LottieHero /><LottieBody /></main><footer><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky" /><span>The Critical 90</span><span>Executive guide / 2026</span></footer></div>;
}
