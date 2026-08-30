import { useEffect, useRef } from "react";

const FIELD_SCENES = {
  priority: [
    [0.16, 0.25, 1.05], [0.78, 0.2, 0.92], [0.22, 0.76, 0.98], [0.82, 0.72, 1.08],
  ],
  decision: [
    [0.18, 0.24, 0.82], [0.74, 0.26, 0.78], [0.34, 0.76, 0.72], [0.62, 0.58, 1.28],
  ],
  shifts: [
    [0.18, 0.22, 1.12], [0.72, 0.25, 1.12], [0.24, 0.74, 1.12], [0.79, 0.7, 1.12],
  ],
  evidence: [
    [0.16, 0.18, 0.72], [0.36, 0.38, 0.84], [0.53, 0.55, 1.04], [0.76, 0.72, 1.2],
  ],
  framework: [
    [0.5, 0.2, 0.72], [0.5, 0.46, 0.98], [0.5, 0.72, 1.22], [0.5, 0.88, 0.54],
  ],
  action: [
    [0.22, 0.5, 0.74], [0.5, 0.5, 1], [0.78, 0.5, 1.24], [0.5, 0.5, 0.48],
  ],
  download: [
    [0.42, 0.42, 0.74], [0.58, 0.42, 0.74], [0.42, 0.58, 0.74], [0.58, 0.58, 1.34],
  ],
};

const CASES = {
  1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]],
  5: [[3, 2], [0, 1]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]],
  9: [[0, 2]], 10: [[0, 3], [1, 2]], 11: [[1, 2]], 12: [[1, 3]],
  13: [[0, 1]], 14: [[3, 0]],
};

export function SignalField({ scene }) {
  const hostRef = useRef(null);
  const sceneRef = useRef(scene);

  useEffect(() => {
    sceneRef.current = scene;
  }, [scene]);

  useEffect(() => {
    let instance;
    let resizeObserver;
    let visibilityObserver;
    let cancelled = false;
    const host = hostRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const load = async () => {
      const { default: P5 } = await import("p5");
      if (cancelled) return;

      instance = new P5((p) => {
        let width = 1;
        let height = 1;
        let sources = FIELD_SCENES.priority.map((source) => [...source]);
        let pointer = { x: 0.5, y: 0.5 };
        let isVisible = true;

        const resize = () => {
          const bounds = host.getBoundingClientRect();
          width = Math.max(1, bounds.width);
          height = Math.max(1, bounds.height);
          p.resizeCanvas(width, height, true);
          if (reducedMotion) p.redraw();
        };

        const fieldValue = (x, y, time) => {
          let value = 0;
          sources.forEach(([sx, sy, power], index) => {
            const drift = reducedMotion ? 0 : Math.sin(time * 0.00032 + index * 1.7) * 0.011;
            const dx = x - sx - drift - (pointer.x - 0.5) * 0.018;
            const dy = y - sy + drift - (pointer.y - 0.5) * 0.012;
            value += power / (1 + (dx * dx + dy * dy) * 36);
          });
          return value + p.noise(x * 2.2, y * 2.2, reducedMotion ? 0 : time * 0.00008) * 0.1;
        };

        const edgePoint = (edge, x, y, cellW, cellH) => {
          if (edge === 0) return [x + cellW * 0.5, y];
          if (edge === 1) return [x + cellW, y + cellH * 0.5];
          if (edge === 2) return [x + cellW * 0.5, y + cellH];
          return [x, y + cellH * 0.5];
        };

        const drawContours = (time) => {
          const compact = width < 760;
          const columns = compact ? 25 : 43;
          const rows = compact ? 17 : 27;
          const cellW = width / columns;
          const cellH = height / rows;
          const values = Array.from({ length: rows + 1 }, (_, row) =>
            Array.from({ length: columns + 1 }, (_, column) =>
              fieldValue(column / columns, row / rows, time),
            ),
          );
          const levels = compact ? [0.38, 0.5, 0.64, 0.8, 0.98, 1.18] : [0.34, 0.43, 0.53, 0.65, 0.79, 0.95, 1.14, 1.36];

          levels.forEach((level, levelIndex) => {
            const alpha = 46 + levelIndex * 9;
            p.stroke(levelIndex > levels.length - 3 ? 61 : 41, levelIndex > levels.length - 3 ? 232 : 204, levelIndex > levels.length - 3 ? 202 : 177, alpha);
            p.strokeWeight(levelIndex > levels.length - 3 ? 1.2 : 0.7);
            for (let row = 0; row < rows; row += 1) {
              for (let column = 0; column < columns; column += 1) {
                const v0 = values[row][column];
                const v1 = values[row][column + 1];
                const v2 = values[row + 1][column + 1];
                const v3 = values[row + 1][column];
                const mask = (v0 > level ? 1 : 0) | (v1 > level ? 2 : 0) | (v2 > level ? 4 : 0) | (v3 > level ? 8 : 0);
                const segments = CASES[mask];
                if (!segments) continue;
                segments.forEach(([edgeA, edgeB]) => {
                  const a = edgePoint(edgeA, column * cellW, row * cellH, cellW, cellH);
                  const b = edgePoint(edgeB, column * cellW, row * cellH, cellW, cellH);
                  p.line(a[0], a[1], b[0], b[1]);
                });
              }
            }
          });
        };

        const drawNodes = () => {
          p.noStroke();
          sources.forEach(([x, y, power], index) => {
            const selected = power > 1.2;
            p.fill(selected ? 61 : 41, selected ? 232 : 204, selected ? 202 : 177, selected ? 215 : 150);
            p.circle(x * width, y * height, selected ? 8 : index === 3 ? 6 : 4);
          });
        };

        p.setup = () => {
          const bounds = host.getBoundingClientRect();
          width = Math.max(1, bounds.width);
          height = Math.max(1, bounds.height);
          const canvas = p.createCanvas(width, height);
          canvas.parent(host);
          p.pixelDensity(Math.min(window.devicePixelRatio || 1, width < 760 ? 1.25 : 1.5));
          p.frameRate(30);
          p.noFill();
          p.strokeCap(p.ROUND);
          if (reducedMotion) p.noLoop();
        };

        p.draw = () => {
          p.clear();
          const target = FIELD_SCENES[sceneRef.current] || FIELD_SCENES.priority;
          sources = sources.map((source, index) => source.map((value, axis) => p.lerp(value, target[index][axis], reducedMotion ? 1 : 0.055)));
          drawContours(p.millis());
          drawNodes();
        };

        const onPointerMove = (event) => {
          pointer = { x: event.clientX / Math.max(window.innerWidth, 1), y: event.clientY / Math.max(window.innerHeight, 1) };
          if (reducedMotion) p.redraw();
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(host);
        visibilityObserver = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          if (!reducedMotion) {
            if (isVisible && !document.hidden) p.loop();
            else p.noLoop();
          }
        });
        visibilityObserver.observe(host);
        const onVisibility = () => {
          if (reducedMotion) return;
          if (document.hidden || !isVisible) p.noLoop();
          else p.loop();
        };
        document.addEventListener("visibilitychange", onVisibility);

        p.removeSignalListeners = () => {
          window.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("visibilitychange", onVisibility);
        };
      }, host);
    };

    load();
    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      instance?.removeSignalListeners?.();
      instance?.remove();
    };
  }, []);

  return <div className="signal-field" ref={hostRef} aria-hidden="true" />;
}
