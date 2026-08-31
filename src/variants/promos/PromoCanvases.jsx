import { useEffect, useRef } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const webglAvailable = () => {
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
  } catch { return false; }
};

export function FutureGlobe() {
  const ref = useRef(null);
  useEffect(() => {
    const host = ref.current;
    let frame;
    let renderer;
    let disposed = false;
    const boot = async () => {
      if (!webglAvailable()) { host?.classList.add("is-static"); return; }
      const THREE = await import("three");
      if (disposed || !host) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.z = 7.2;
      renderer = new THREE.WebGLRenderer({ canvas: host, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
      const points = [];
      for (let i = 0; i < 1500; i += 1) {
        const y = 1 - (i / 1499) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = Math.PI * (3 - Math.sqrt(5)) * i;
        points.push(Math.cos(theta) * radius * 2.25, y * 2.25, Math.sin(theta) * radius * 2.25);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
      const globe = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x72f4d0, size: 0.025, transparent: true, opacity: 0.84 }));
      scene.add(globe);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x8b75df, transparent: true, opacity: 0.42 });
      [2.65, 3.05, 3.42].forEach((r, index) => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.007, 6, 160), ringMaterial);
        ring.rotation.x = Math.PI / 2.1 + index * 0.18;
        ring.rotation.y = index * 0.38;
        globe.add(ring);
      });
      const resize = () => {
        const rect = host.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height, false);
        camera.aspect = rect.width / Math.max(rect.height, 1);
        camera.updateProjectionMatrix();
      };
      resize();
      const animate = () => {
        if (!reduced()) {
          globe.rotation.y += 0.0017;
          globe.rotation.x = Math.sin(performance.now() * 0.00018) * 0.08;
        }
        renderer.render(scene, camera);
        frame = requestAnimationFrame(animate);
      };
      animate();
      window.addEventListener("resize", resize);
      host.__cleanup = () => window.removeEventListener("resize", resize);
    };
    boot().catch(() => host?.classList.add("is-static"));
    return () => { disposed = true; cancelAnimationFrame(frame); host?.__cleanup?.(); renderer?.dispose(); };
  }, []);
  return <canvas ref={ref} className="promo-canvas" aria-label="Interactive future globe" />;
}

export function ThreatRadar() {
  const ref = useRef(null);
  useEffect(() => {
    let instance;
    let disposed = false;
    import("p5").then(({ default: P5 }) => {
      if (disposed || !ref.current) return;
      instance = new P5((p) => {
        const nodes = Array.from({ length: 54 }, (_, i) => ({ x: (i * 83) % 997 / 997, y: (i * 137) % 701 / 701, phase: i * 0.71 }));
        p.setup = () => { const c = p.createCanvas(ref.current.clientWidth, ref.current.clientHeight); c.parent(ref.current); p.pixelDensity(Math.min(devicePixelRatio, 1.4)); };
        p.windowResized = () => p.resizeCanvas(ref.current.clientWidth, ref.current.clientHeight);
        p.draw = () => {
          p.clear();
          const w = p.width; const h = p.height; const t = p.millis() * 0.001;
          p.strokeWeight(1); p.noFill();
          for (let i = 1; i < 9; i += 1) { p.stroke(83, 234, 199, i % 3 ? 24 : 50); p.line((w / 9) * i, 0, (w / 9) * i, h); }
          for (let i = 1; i < 6; i += 1) { p.stroke(83, 234, 199, 24); p.line(0, (h / 6) * i, w, (h / 6) * i); }
          nodes.forEach((n, i) => {
            const x = n.x * w; const y = n.y * h; const pulse = reduced() ? 3 : 3 + Math.sin(t * 2.2 + n.phase) * 2;
            p.noStroke(); p.fill(i % 7 ? 76 : 139, i % 7 ? 235 : 117, i % 7 ? 197 : 223, 155); p.circle(x, y, pulse);
            if (i % 9 === 0) { p.stroke(114, 244, 208, 75); p.line(w * 0.5, h * 0.52, x, y); }
          });
          p.noFill(); p.stroke(114, 244, 208, 150); p.circle(w * 0.5, h * 0.52, 110 + Math.sin(t) * 14); p.circle(w * 0.5, h * 0.52, 240 + Math.sin(t * .7) * 18);
          p.stroke(139, 117, 223, 190); p.line(w * 0.5, h * 0.52, w * 0.5 + Math.cos(t * .8) * w * .43, h * 0.52 + Math.sin(t * .8) * h * .43);
        };
      });
    });
    return () => { disposed = true; instance?.remove(); };
  }, []);
  return <div ref={ref} className="promo-canvas" role="img" aria-label="Live cyber risk radar" />;
}

export function TransparencyField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    let regl;
    let frame;
    let disposed = false;
    import("regl").then(({ default: createREGL }) => {
      if (disposed || !canvas) return;
      if (!webglAvailable()) { canvas.classList.add("is-static"); return; }
      regl = createREGL({ canvas, attributes: { alpha: true, antialias: true } });
      const points = [];
      for (let row = 0; row < 28; row += 1) for (let col = 0; col < 52; col += 1) {
        const x = col / 51 * 2 - 1; const y = row / 27 * 2 - 1;
        const band = Math.sin(col * .27) * .22 + Math.cos(row * .49) * .12;
        if (Math.abs(y - band) < .52 && ((col * 3 + row * 5) % 11 !== 0)) points.push([x, y]);
      }
      const draw = regl({
        vert: `precision mediump float; attribute vec2 position; uniform float tick; void main(){ float wave=sin(position.x*7.0+tick*.008)*.008; gl_Position=vec4(position.x,position.y+wave,0,1); gl_PointSize=4.5; }`,
        frag: `precision mediump float; void main(){ vec2 uv=gl_PointCoord-.5; if(length(uv)>.5) discard; gl_FragColor=vec4(.22,.62,.56,.62); }`,
        attributes: { position: points }, count: points.length, primitive: "points", uniforms: { tick: regl.context("tick") }, blend: { enable: true, func: { src: "src alpha", dst: "one minus src alpha" } }, depth: { enable: false },
      });
      const loop = regl.frame(() => { regl.clear({ color: [0,0,0,0], depth: 1 }); draw(); });
      frame = loop;
    }).catch(() => canvas?.classList.add("is-static"));
    return () => { disposed = true; frame?.cancel(); regl?.destroy(); };
  }, []);
  return <canvas ref={ref} className="promo-canvas" aria-label="Interactive transparency map" />;
}

export function PartnerUniverse() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    let engine; let scene; let disposed = false;
    Promise.all([
      import("@babylonjs/core/Engines/engine.js"), import("@babylonjs/core/scene.js"), import("@babylonjs/core/Cameras/freeCamera.js"),
      import("@babylonjs/core/Meshes/meshBuilder.js"), import("@babylonjs/core/Materials/standardMaterial.js"),
      import("@babylonjs/core/Maths/math.color.js"), import("@babylonjs/core/Maths/math.vector.js"),
    ]).then(([eng, scn, cam, mesh, mat, color, vec]) => {
      if (disposed || !canvas) return;
      if (!webglAvailable()) { canvas.classList.add("is-static"); return; }
      engine = new eng.Engine(canvas, true, { alpha: true, antialias: true }); scene = new scn.Scene(engine); scene.clearColor = new color.Color4(0,0,0,0);
      const camera = new cam.FreeCamera("universe-camera", new vec.Vector3(0, 0, -13), scene); camera.setTarget(vec.Vector3.Zero());
      const makeMat = (name, hex) => { const m = new mat.StandardMaterial(name, scene); m.emissiveColor = color.Color3.FromHexString(hex); m.diffuseColor = m.emissiveColor.scale(.28); return m; };
      const teal = makeMat("teal", "#3de8ca"); const violet = makeMat("violet", "#8774ff");
      const planets = [];
      [[0,0,0,1.5],[-3.7,1.8,1,.62],[3.5,-1.6,.5,.82],[4.4,2.4,2,.44],[-4.8,-2.4,2,.38]].forEach((p,i)=>{
        const sphere = mesh.MeshBuilder.CreateSphere(`planet-${i}`,{diameter:p[3]*2,segments:32},scene); sphere.position = new vec.Vector3(p[0],p[1],p[2]); sphere.material=i%2?violet:teal; planets.push(sphere);
        const ring=mesh.MeshBuilder.CreateTorus(`orbit-${i}`,{diameter:p[3]*3.2,thickness:.015,tessellation:96},scene); ring.position=sphere.position.clone(); ring.rotation.x=Math.PI/2.4+i*.16; ring.material=i%2?teal:violet;
      });
      engine.runRenderLoop(()=>{ if(!reduced()) planets.forEach((p,i)=>{p.rotation.y+=.0015+i*.0002; p.position.y+=Math.sin(performance.now()*.0007+i)*.0007;}); scene.render(); });
      const resize=()=>engine.resize(); window.addEventListener("resize",resize); canvas.__cleanup=()=>window.removeEventListener("resize",resize);
    }).catch(() => canvas?.classList.add("is-static"));
    return()=>{disposed=true; canvas?.__cleanup?.(); scene?.dispose(); engine?.dispose();};
  },[]);
  return <canvas ref={ref} className="promo-canvas" aria-label="Interactive strategic universe" />;
}

export function PathwayMotion() {
  const ref = useRef(null);
  useEffect(()=>{
    let animation; let disposed=false;
    import("lottie-web").then(({default:lottie})=>{
      if(disposed||!ref.current)return;
      const circles=[0,1,2,3].map((i)=>({ty:"el",p:{a:0,k:[180+i*150,280+(i%2)*120]},s:{a:0,k:[36+i*5,36+i*5]},nm:`node-${i}`}));
      const animationData={v:"5.12.2",fr:60,ip:0,op:240,w:760,h:640,ddd:0,assets:[],layers:[{ddd:0,ind:1,ty:4,nm:"living path",sr:1,ks:{o:{a:0,k:[100]},r:{a:0,k:[0]},p:{a:0,k:[0,0,0]},a:{a:0,k:[0,0,0]},s:{a:0,k:[100,100,100]}},shapes:[...circles,{ty:"st",c:{a:0,k:[.24,.91,.79,1]},o:{a:0,k:[90]},w:{a:0,k:[4]},lc:2,lj:2,nm:"stroke"},{ty:"tm",s:{a:0,k:[0]},e:{a:1,k:[{t:0,s:[8],e:[100]},{t:180,s:[100],e:[8]},{t:240,s:[8]}]},o:{a:0,k:[0]},m:1,nm:"trim"}],ip:0,op:240,st:0,bm:0}]};
      animation=lottie.loadAnimation({container:ref.current,renderer:"canvas",loop:true,autoplay:!reduced(),animationData});
    });
    return()=>{disposed=true;animation?.destroy();};
  },[]);
  return <div ref={ref} className="promo-canvas" role="img" aria-label="Animated decision pathway" />;
}

export function JourneyPhysics() {
  const ref = useRef(null);
  useEffect(()=>{
    let engine; let render; let runner; let Matter; let disposed=false;
    import("matter-js").then(({default:m})=>{
      if(disposed||!ref.current)return; Matter=m; const {Engine,Render,Runner,Bodies,Composite}=m;
      engine=Engine.create({gravity:{x:0,y:.32}}); const w=ref.current.clientWidth; const h=ref.current.clientHeight;
      render=Render.create({element:ref.current,engine,options:{width:w,height:h,wireframes:false,background:"transparent",pixelRatio:Math.min(devicePixelRatio,1.4)}});
      const tokens=[30,60,90,4].map((n,i)=>Bodies.circle(w*(.25+i*.16),h*.22-i*12,28+i*5,{restitution:.92,friction:.01,render:{fillStyle:i===3?"#8774ff":"#3de8ca",strokeStyle:"#111",lineWidth:2},label:String(n)}));
      const floor=Bodies.rectangle(w/2,h+20,w,50,{isStatic:true,render:{visible:false}}); const left=Bodies.rectangle(-20,h/2,40,h,{isStatic:true,render:{visible:false}}); const right=Bodies.rectangle(w+20,h/2,40,h,{isStatic:true,render:{visible:false}});
      Composite.add(engine.world,[...tokens,floor,left,right]); render.canvas.setAttribute("aria-hidden","true"); Render.run(render); runner=Runner.create(); Runner.run(runner,engine);
    });
    return()=>{disposed=true;if(Matter&&render){Matter.Render.stop(render);Matter.Runner.stop(runner);Matter.Engine.clear(engine);render.canvas.remove();}};
  },[]);
  return <div ref={ref} className="promo-canvas" role="img" aria-label="Physical 90-day journey" />;
}

export function StoryField() {
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current; let app; let disposed=false;
    import("pixi.js").then(async({Application,Graphics})=>{
      if(disposed||!canvas)return; app=new Application(); await app.init({canvas,resizeTo:canvas.parentElement,backgroundAlpha:0,antialias:true,resolution:Math.min(devicePixelRatio,1.4)}); if(disposed)return;
      const g=new Graphics(); app.stage.addChild(g); app.ticker.add(()=>{const w=app.screen.width,h=app.screen.height,t=app.ticker.lastTime*.001;g.clear();for(let i=0;i<14;i++){const x=(i/13)*w;const y=h*(.25+.5*((Math.sin(i*.7+t*.2)+1)/2));g.moveTo(x,0).lineTo(x,y).stroke({width:i%4===0?2:1,color:i%4===0?0x8774ff:0x3de8ca,alpha:.12+i*.018});g.circle(x,y,2+(i%3)).fill({color:i%4===0?0x8774ff:0x3de8ca,alpha:.55});}});
    });
    return()=>{disposed=true;app?.destroy(false,{children:true});};
  },[]);
  return <canvas ref={ref} className="promo-canvas" aria-label="Living editorial signal field" />;
}
