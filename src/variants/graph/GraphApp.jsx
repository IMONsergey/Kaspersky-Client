import { useCallback, useState } from "react";
import { MorphIcon } from "morphicons/react";
import { ArrowRight, Check, Download, Grab, Maximize2, Network, Search, Sparkles, Target, ZoomIn } from "lucide";
import { agenda, agendaHeading, agendaLead, assetUrl, downloadHeading, evidence, hero, shifts } from "../round2/content.js";
import { DecisionGraph } from "./DecisionGraph.jsx";

function GraphHeader(){return <header className="graph-header"><a href="#priority"><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky"/><span>The Critical 90</span></a><nav><a href="#priority"><b>01</b>The priority</a><a href="#shifts"><b>02</b>The four shifts</a><a href="#agenda"><b>03</b>The 90-day agenda</a><a href="#download"><b>04</b>Download</a></nav><a className="graph-header-cta" href="#download">Get the guide<MorphIcon icon={ArrowRight} size={18} spring="snappy" reducedMotion="user"/></a></header>}

function GraphHero(){
  const [selected,setSelected]=useState(0);const onSelect=useCallback((index)=>setSelected(index),[]);
  return <section className="graph-hero" id="priority"><div className="graph-copy"><p>The Critical 90 / Decision graph</p><h1>{hero.title}</h1><span>{hero.lead}</span><a href="#shifts">Explore the four shifts<MorphIcon icon={ArrowRight} size={20} spring="snappy" reducedMotion="user"/></a></div><div className="graph-stage"><img src={assetUrl("variants/graph/network-constellation.png")} alt="Four connected decision nodes"/><DecisionGraph onSelect={onSelect}/><div className="graph-tools"><span><MorphIcon icon={Grab} size={17} spring="snappy" reducedMotion="user"/>Drag</span><span><MorphIcon icon={ZoomIn} size={17} spring="snappy" reducedMotion="user"/>Zoom</span><span><MorphIcon icon={Maximize2} size={17} spring="snappy" reducedMotion="user"/>Focus</span></div></div><aside className="graph-inspector"><p>Focus / inspector</p><span>0{selected+1}</span><h2>{shifts[selected]}</h2><p>{hero.support}</p><a href="#agenda">View actions<MorphIcon icon={ArrowRight} size={18} spring="snappy" reducedMotion="user"/></a></aside></section>
}

function GraphContent(){return <>
  <section className="graph-context"><span>One graph / four connected shifts</span><p>{hero.support}</p></section>
  <section className="graph-shifts" id="shifts"><header><p>02 · The four cyber shifts</p><h2>Understand the four shifts reshaping business risk</h2></header><ol>{shifts.map((shift,index)=><li key={shift}><span>0{index+1}</span><strong>{shift}</strong><MorphIcon icon={index%2?Network:Sparkles} size={27} spring="snappy" reducedMotion="user"/></li>)}</ol></section>
  <section className="graph-evidence"><header><p>Evidence signals</p><h2>For each shift, the guide identifies:</h2></header><div>{evidence.map((item,index)=><article key={item}><span>0{index+1}</span><p>{item}</p><MorphIcon icon={index===evidence.length-1?Check:index%2?Search:Target} size={24} spring="snappy" reducedMotion="user"/></article>)}</div></section>
  <section className="graph-agenda" id="agenda"><header><p>03 · The 90-day agenda</p><h2>{agendaHeading}</h2><span>{agendaLead}</span></header><div>{agenda.map((phase,index)=><article key={phase.days}><span>{phase.days}</span><small>days / action node</small><h3>{phase.title}</h3><p>{phase.copy}</p><i aria-hidden="true" style={{width:`${44+index*25}%`}}/></article>)}</div></section>
  <section className="graph-download" id="download"><img src={assetUrl("variants/graph/network-constellation.png")} alt="Five connected decision nodes resolving into one focus" loading="lazy"/><div><p>04 · Download</p><h2>{downloadHeading}</h2><button type="button">Download The Critical 90<MorphIcon icon={Download} size={22} spring="snappy" reducedMotion="user"/></button></div></section>
  </>}

export function GraphApp(){return <div className="graph-site"><a className="graph-skip" href="#priority">Skip to content</a><GraphHeader/><main><GraphHero/><GraphContent/></main><footer><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky"/><span>The Critical 90 / Decision Graph</span></footer></div>}
