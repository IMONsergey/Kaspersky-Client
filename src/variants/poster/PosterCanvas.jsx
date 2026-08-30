import { useEffect, useRef } from "react";

export function PosterCanvas({ src }) {
  const hostRef = useRef(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;
    let stage;
    let frame;
    let cleanup = () => {};
    import("konva").then(({ default: Konva }) => {
      if (cancelled) return;
      const create = () => {
        const width = host.clientWidth;
        const height = host.clientHeight;
        stage = new Konva.Stage({ container: host, width, height });
        const layer = new Konva.Layer();
        const group = new Konva.Group({ x: width * .58, y: height * .47, offsetX: 420, offsetY: 420 });
        const glow = new Konva.Rect({ x: 130, y: 245, width: 720, height: 14, fill: "#8c75c9", shadowColor: "#8c75c9", shadowBlur: 32, opacity: .72 });
        group.add(glow);
        Konva.Image.fromURL(src, (image) => {
          image.setAttrs({ x: 0, y: 0, width: 840, height: 840, listening: false });
          group.add(image);
          layer.batchDraw();
        }, "anonymous");
        layer.add(group);
        stage.add(layer);
        const start = performance.now();
        const tick = (now) => {
          const t = (now - start) * .00035;
          group.rotation(Math.sin(t) * 2.4);
          group.scale({ x: 1 + Math.sin(t * .7) * .018, y: 1 + Math.sin(t * .7) * .018 });
          glow.opacity(.48 + Math.sin(t * 1.7) * .2);
          layer.batchDraw();
          frame = requestAnimationFrame(tick);
        };
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) frame = requestAnimationFrame(tick);
        const resize = () => { stage.width(host.clientWidth); stage.height(host.clientHeight); group.position({ x: host.clientWidth * .58, y: host.clientHeight * .47 }); };
        window.addEventListener("resize", resize);
        cleanup = () => { window.removeEventListener("resize", resize); cancelAnimationFrame(frame); stage.destroy(); };
      };
      create();
    });
    return () => { cancelled = true; cleanup(); };
  }, [src]);
  return <div className="poster-canvas" ref={hostRef} aria-hidden="true" />;
}
