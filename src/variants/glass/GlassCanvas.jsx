import { useEffect, useRef } from "react";
import createREGL from "regl";

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (from, to, amount) => from + (to - from) * amount;

export function GlassCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.closest(".gv-hero");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let regl;
    let frame = 0;
    let visible = true;
    let pointer = [0, 0];
    let targetPointer = [0, 0];

    const contextAttributes = {
      alpha: true,
      antialias: true,
      depth: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    };
    const gl = canvas.getContext("webgl", contextAttributes) || canvas.getContext("experimental-webgl", contextAttributes);
    if (!gl) {
      canvas.dataset.webgl = "fallback";
      return undefined;
    }

    try {
      regl = createREGL({ gl });
      canvas.dataset.webgl = "ready";
    } catch {
      canvas.dataset.webgl = "fallback";
      return undefined;
    }

    const drawPane = regl({
      vert: `
        precision mediump float;
        attribute vec2 position;
        uniform vec2 offset;
        uniform vec2 scale;
        uniform vec2 pointer;
        uniform float angle;
        uniform float depth;
        uniform float time;
        varying vec2 uv;

        void main() {
          float wave = sin(time * 0.42 + depth * 4.0) * 0.008;
          float c = cos(angle + wave);
          float s = sin(angle + wave);
          mat2 rotation = mat2(c, -s, s, c);
          vec2 translated = rotation * (position * scale);
          translated += offset + pointer * depth * 0.045;
          gl_Position = vec4(translated, 0.0, 1.0);
          uv = position * 0.5 + 0.5;
        }
      `,
      frag: `
        precision mediump float;
        uniform vec3 tint;
        uniform float alpha;
        uniform float time;
        varying vec2 uv;

        void main() {
          float edgeDistance = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
          float edge = 1.0 - smoothstep(0.0, 0.045, edgeDistance);
          float sweep = smoothstep(0.0, 0.8, uv.x + sin(time * 0.25) * 0.08);
          vec3 body = mix(tint * 0.24, tint * 0.8, sweep * 0.38);
          vec3 color = mix(body, vec3(0.82, 1.0, 0.96), edge * 0.7);
          gl_FragColor = vec4(color, alpha + edge * 0.23);
        }
      `,
      attributes: {
        position: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1],
      },
      uniforms: {
        offset: regl.prop("offset"),
        scale: regl.prop("scale"),
        angle: regl.prop("angle"),
        depth: regl.prop("depth"),
        tint: regl.prop("tint"),
        alpha: regl.prop("alpha"),
        pointer: regl.prop("pointer"),
        time: regl.prop("time"),
      },
      count: 6,
      depth: { enable: false },
      blend: {
        enable: true,
        func: { srcRGB: "src alpha", srcAlpha: 1, dstRGB: "one minus src alpha", dstAlpha: 1 },
      },
    });

    const drawLink = regl({
      vert: `
        precision mediump float;
        attribute vec2 position;
        uniform vec2 pointer;
        void main() {
          gl_Position = vec4(position + pointer * 0.01, 0.0, 1.0);
        }
      `,
      frag: `
        precision mediump float;
        uniform vec4 color;
        void main() { gl_FragColor = color; }
      `,
      attributes: { position: regl.prop("points") },
      uniforms: { color: regl.prop("color"), pointer: regl.prop("pointer") },
      primitive: "lines",
      count: 2,
      lineWidth: 1,
      depth: { enable: false },
      blend: { enable: true, func: { src: "src alpha", dst: "one" } },
    });

    const drawNode = regl({
      vert: `
        precision mediump float;
        attribute vec2 position;
        uniform float size;
        uniform vec2 pointer;
        void main() {
          gl_Position = vec4(position + pointer * 0.012, 0.0, 1.0);
          gl_PointSize = size;
        }
      `,
      frag: `
        precision mediump float;
        uniform vec4 color;
        void main() {
          float distanceFromCenter = distance(gl_PointCoord, vec2(0.5));
          float mask = 1.0 - smoothstep(0.18, 0.5, distanceFromCenter);
          gl_FragColor = vec4(color.rgb, color.a * mask);
        }
      `,
      attributes: { position: regl.prop("points") },
      uniforms: {
        size: regl.prop("size"),
        color: regl.prop("color"),
        pointer: regl.prop("pointer"),
      },
      primitive: "points",
      count: regl.prop("count"),
      depth: { enable: false },
      blend: { enable: true, func: { src: "src alpha", dst: "one" } },
    });

    const render = (milliseconds = 0) => {
      const rect = host.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(rect.height * 0.82, 1));
      pointer = [mix(pointer[0], targetPointer[0], 0.06), mix(pointer[1], targetPointer[1], 0.06)];
      const focus = [mix(0.34, 0.16, progress), mix(-0.05, 0.02, progress)];
      const base = [
        { offset: [-0.52, 0.54], scale: [0.22, 0.12], angle: -0.2, depth: 0.3, tint: [0.24, 0.91, 0.79], alpha: 0.10 },
        { offset: [-0.48, 0.14], scale: [0.28, 0.16], angle: 0.08, depth: 0.55, tint: [0.24, 0.91, 0.79], alpha: 0.13 },
        { offset: [-0.42, -0.34], scale: [0.24, 0.14], angle: -0.1, depth: 0.78, tint: [0.32, 0.82, 0.91], alpha: 0.12 },
        { offset: [-0.13, -0.62], scale: [0.20, 0.12], angle: 0.18, depth: 1.0, tint: [0.52, 0.42, 0.91], alpha: 0.13 },
      ];
      const panes = base.map((pane, index) => ({
        ...pane,
        offset: [mix(pane.offset[0], focus[0] - index * 0.035, progress * 0.42), mix(pane.offset[1], focus[1] + (1.5 - index) * 0.08, progress * 0.42)],
        pointer,
        time: milliseconds / 1000,
      }));

      regl.poll();
      regl.clear({ color: [0, 0, 0, 0], depth: 1 });
      drawPane(panes);
      const links = panes.map((pane, index) => ({
        points: [pane.offset, focus],
        color: index === 3 ? [0.48, 0.40, 0.95, 0.22] : [0.24, 0.91, 0.79, 0.25],
        pointer,
      }));
      drawLink(links);
      drawNode({ points: panes.map((pane) => pane.offset), count: panes.length, size: 6, color: [0.24, 0.95, 0.81, 0.82], pointer });
      drawNode({ points: [focus], count: 1, size: 15 + Math.sin(milliseconds * 0.002) * 2, color: [0.24, 0.95, 0.81, 0.92], pointer });

      if (!reducedMotion.matches && visible && !document.hidden) frame = requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const mobile = window.innerWidth < 760;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      regl.poll();
      render(performance.now());
    };
    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      targetPointer = [clamp((event.clientX - rect.left) / rect.width, 0, 1) * 2 - 1, (1 - clamp((event.clientY - rect.top) / rect.height, 0, 1)) * 2 - 1];
    };
    const onPointerLeave = () => { targetPointer = [0, 0]; };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && visible) render(performance.now());
    };
    const onMotionChange = () => {
      cancelAnimationFrame(frame);
      render(performance.now());
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) render(performance.now());
    }, { threshold: 0.02 });
    const resizeObserver = new ResizeObserver(resize);

    observer.observe(canvas);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
      regl.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className="gv-canvas" aria-hidden="true" />;
}
