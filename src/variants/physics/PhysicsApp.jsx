import { useState } from "react";
import { MorphIcon } from "morphicons/react";
import { ArrowDown, ArrowRight, Download, FlaskConical, Gauge, Grab, Network, RotateCcw, Sparkles, Target } from "lucide";
import { agenda, agendaHeading, agendaLead, assetUrl, downloadHeading, evidence, hero, shifts, shiftHeading } from "../round2/content.js";
import { PhysicsField } from "./PhysicsField.jsx";

const shiftIconPairs = [[Sparkles, Gauge], [Target, Network], [Network, RotateCcw], [FlaskConical, Sparkles]];

function PhysicsHeader() {
  return <header className="physics-header"><a href="#priority"><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky" /><span>The Critical 90</span></a><nav><a href="#shifts">The four shifts</a><a href="#agenda">The 90-day agenda</a></nav><span>Risk Physics Lab / 08</span><a className="physics-header-cta" href="#download">Explore the guide<MorphIcon icon={ArrowRight} size={18} spring="snappy" reducedMotion="user" /></a></header>;
}

function PhysicsHero() {
  return <section className="physics-hero" id="priority"><div className="physics-hero-copy"><p>Concept 08 · Live simulation</p><h1>{hero.title}</h1><p>{hero.lead}</p><a href="#shifts">{hero.cta}<MorphIcon icon={ArrowRight} size={21} spring="snappy" reducedMotion="user" /></a></div><div className="physics-hero-stage"><PhysicsField /><img src={assetUrl("variants/physics/risk-tokens.png")} alt="Glossy risk tokens and signal capsules" fetchPriority="high" /><span><MorphIcon icon={Grab} size={18} spring="snappy" reducedMotion="user" />Drag to stress-test</span></div><a className="physics-scroll" href="#context"><MorphIcon icon={ArrowDown} size={19} spring="snappy" reducedMotion="user" /></a></section>;
}

function PhysicsContent() {
  const [active, setActive] = useState(0);
  return <>
    <section className="physics-context" id="context"><span>System readout / 01</span><p>{hero.lead}</p><p>{hero.support}</p></section>
    <section className="physics-shifts" id="shifts"><header><p>02 · Risk input</p><h2>{shiftHeading}</h2><span>Move the weight. Change the system.</span></header><div className="physics-bench"><img src={assetUrl("variants/physics/risk-tokens.png")} alt="Four weighted strategic risk tokens" loading="lazy" /><ol>{shifts.map((shift,index) => {const [from,to]=shiftIconPairs[index];return <li key={shift}><button type="button" className={active===index?"is-active":""} onPointerEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)}><span>0{index+1}</span><strong>{shift}</strong><MorphIcon icon={active===index?to:from} size={26} spring="snappy" reducedMotion="user" /></button></li>;})}</ol><aside><small>Active mass</small><b>0{active+1}</b><p>{shifts[active]}</p><i style={{transform:`translateX(${active*73}%)`}} /></aside></div></section>
    <section className="physics-evidence"><div><p>For each shift, the guide identifies:</p><span>Evidence chamber / five readings</span></div><ol>{evidence.map((item,index)=><li key={item}><span>0{index+1}</span><p>{item}</p><b style={{width:`${54+index*9}%`}} /></li>)}</ol></section>
    <section className="physics-agenda" id="agenda"><header><p>03 · Balance control</p><h2>{agendaHeading}</h2><span>{agendaLead}</span></header><div className="physics-scale">{agenda.map((phase,index)=><article key={phase.days}><span>{phase.days}</span><small>days</small><h3>{phase.title}</h3><p>{phase.copy}</p><i aria-hidden="true" style={{height:`${34+index*24}%`}} /></article>)}</div></section>
    <section className="physics-download" id="download"><div><p>04 · Output</p><h2>{downloadHeading}</h2><button type="button">Download The Critical 90<MorphIcon icon={Download} size={22} spring="snappy" reducedMotion="user" /></button></div><img src={assetUrl("variants/physics/risk-tokens.png")} alt="Risk tokens balanced into one business agenda" loading="lazy" /></section>
  </>;
}

export function PhysicsApp(){return <div className="physics-site"><a className="physics-skip" href="#priority">Skip to content</a><PhysicsHeader/><main><PhysicsHero/><PhysicsContent/></main><footer><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky"/><span>The Critical 90 / Risk Physics Lab</span></footer></div>}
