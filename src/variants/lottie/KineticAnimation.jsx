import { useEffect, useRef } from "react";

export function KineticAnimation({ imagePath }) {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) return undefined;
    let animation;
    let disposed = false;
    import("lottie-web").then(({ default: lottie }) => {
      if (disposed || !hostRef.current) return;
      const animationData = {
        v: "5.12.2", fr: 60, ip: 0, op: 300, w: 900, h: 900, nm: "Critical 90 kinetic instrument", ddd: 0,
        assets: [{ id: "instrument", w: 1254, h: 1254, u: "", p: imagePath, e: 0 }],
        layers: [
          {
            ddd: 0, ind: 1, ty: 2, nm: "Graphite 90-day instrument", refId: "instrument", sr: 1, ao: 0,
            ks: {
              o: { a: 1, k: [{ t: 0, s: [0], e: [100] }, { t: 28, s: [100], e: [100] }, { t: 300, s: [100] }] },
              r: { a: 1, k: [{ t: 0, s: [-5], e: [2] }, { t: 150, s: [2], e: [-5] }, { t: 300, s: [-5] }] },
              p: { a: 1, k: [{ t: 0, s: [440, 475, 0], e: [470, 430, 0] }, { t: 150, s: [470, 430, 0], e: [440, 475, 0] }, { t: 300, s: [440, 475, 0] }] },
              a: { a: 0, k: [627, 627, 0] },
              s: { a: 1, k: [{ t: 0, s: [68, 68, 100], e: [73, 73, 100] }, { t: 150, s: [73, 73, 100], e: [68, 68, 100] }, { t: 300, s: [68, 68, 100] }] },
            }, ip: 0, op: 300, st: 0, bm: 0,
          },
          {
            ddd: 0, ind: 2, ty: 4, nm: "Progress ring", sr: 1,
            ks: { o: { a: 0, k: [100] }, r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 300, s: [360] }] }, p: { a: 0, k: [450, 450, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
            shapes: [{ ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [770, 770] }, nm: "Ellipse" }, { ty: "st", c: { a: 0, k: [0.04, 0.67, 0.57, 1] }, o: { a: 0, k: [65] }, w: { a: 0, k: [2] }, lc: 2, lj: 1, ml: 4, nm: "Stroke" }, { ty: "tm", s: { a: 0, k: [0] }, e: { a: 1, k: [{ t: 0, s: [14], e: [76] }, { t: 150, s: [76], e: [14] }, { t: 300, s: [14] }] }, o: { a: 0, k: [0] }, m: 1, nm: "Trim" }],
            ip: 0, op: 300, st: 0, bm: 0,
          },
        ],
      };
      animation = lottie.loadAnimation({ container: hostRef.current, renderer: "canvas", loop: true, autoplay: !window.matchMedia("(prefers-reduced-motion: reduce)").matches, animationData });
    });
    return () => { disposed = true; animation?.destroy(); };
  }, [imagePath]);

  return <div className="lottie-instrument" ref={hostRef} role="img" aria-label="Animated graphite instrument moving through a 90-day arc" />;
}
