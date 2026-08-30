import { useEffect, useState } from "react";
import { MorphIcon } from "morphicons/react";
import { ArrowDown, ArrowRight, Check, Download, MoveRight, Sparkles } from "lucide";
import { agenda, agendaHeading, agendaLead, assetUrl, downloadHeading, evidence, hero, shifts, shiftHeading } from "../round2/content.js";
import { PosterCanvas } from "./PosterCanvas.jsx";

const scenes=["priority","shifts","agenda","download"];
function useScene(){const [scene,setScene]=useState(0);useEffect(()=>{const nodes=scenes.map(id=>document.getElementById(id)).filter(Boolean);const observer=new IntersectionObserver(entries=>{const current=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(current)setScene(scenes.indexOf(current.target.id));},{threshold:[.25,.5,.75]});nodes.forEach(n=>observer.observe(n));return()=>observer.disconnect()},[]);return scene}

function PosterRail({active}){return <aside className="poster-rail"><a href="#priority"><img src={assetUrl("assets/kaspersky-logo.svg")} alt="Kaspersky"/><span>The Critical 90</span></a><nav>{scenes.map((id,index)=><a key={id} className={active===index?"is-active":""} href={`#${id}`}><span>0{index+1}</span><small>{["Focus","Shifts","Agenda","Guide"][index]}</small></a>)}</nav><a className="poster-rail-cta" href="#download"><MorphIcon icon={ArrowDown} size={22} spring="snappy" reducedMotion="user"/></a></aside>}

function PosterHero(){return <section className="poster-hero" id="priority"><PosterCanvas src={assetUrl("variants/poster/kinetic-ribbon.png")}/><div className="poster-meta"><span>The Critical 90</span><span>01 / 04 · Focus</span></div><h1><span>Focus your</span><em>cyber budget</em><span>on the four</span><span>shifts that</span><strong>matter most</strong></h1><div className="poster-hero-note"><p>{hero.lead}</p><a href="#shifts">{hero.cta}<MorphIcon icon={ArrowRight} size={20} spring="snappy" reducedMotion="user"/></a></div></section>}

function PosterIntro(){return <section className="poster-intro"><span>01 · The priority</span><p>{hero.support}</p></section>}

function PosterShifts(){return <section className="poster-shifts" id="shifts"><header><p>02 / 04 · The four cyber shifts</p><h2>{shiftHeading}</h2></header><div className="poster-shift-wall">{shifts.map((shift,index)=><article key={shift}><span>0{index+1}</span><h3>{shift}</h3><MorphIcon icon={index%2?MoveRight:Sparkles} size={30} spring="snappy" reducedMotion="user"/></article>)}</div><div className="poster-evidence"><h3>For each shift, the guide identifies:</h3><ol>{evidence.map((item,index)=><li key={item}><span>0{index+1}</span>{item}<MorphIcon icon={index===evidence.length-1?Check:ArrowRight} size={20} spring="snappy" reducedMotion="user"/></li>)}</ol></div></section>}

function PosterAgenda(){return <section className="poster-agenda" id="agenda"><header><p>03 / 04 · The 90-day agenda</p><h2>{agendaHeading}</h2><span>{agendaLead}</span></header><div>{agenda.map((phase,index)=><article key={phase.days}><span>{phase.days}</span><small>days / scene 0{index+1}</small><h3>{phase.title}</h3><p>{phase.copy}</p></article>)}</div></section>}

function PosterDownload(){return <section className="poster-download" id="download"><img src={assetUrl("variants/poster/kinetic-ribbon.png")} alt="Graphite monolith resolving a violet beam into focus" loading="lazy"/><div><p>04 / 04 · Executive guide</p><h2>{downloadHeading}</h2><button type="button">Download The Critical 90<MorphIcon icon={Download} size={23} spring="snappy" reducedMotion="user"/></button></div></section>}

export function PosterApp(){const active=useScene();return <div className="poster-site"><a className="poster-skip" href="#priority">Skip to content</a><PosterRail active={active}/><main><PosterHero/><PosterIntro/><PosterShifts/><PosterAgenda/><PosterDownload/></main></div>}
