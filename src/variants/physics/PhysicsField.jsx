import { useEffect, useRef } from "react";

export function PhysicsField() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let stop = () => {};
    let cancelled = false;
    import("matter-js").then((Matter) => {
      if (cancelled) return;
      const { Bodies, Composite, Engine, Mouse, MouseConstraint, Render, Runner } = Matter;
      const width = host.clientWidth;
      const height = host.clientHeight;
      const engine = Engine.create({ gravity: { x: 0, y: 0.35 } });
      const render = Render.create({ element: host, engine, options: { width, height, wireframes: false, background: "transparent", pixelRatio: Math.min(window.devicePixelRatio, 2) } });
      const palette = ["#14161b", "#0c8877", "#152b30", "#633391"];
      const bodies = Array.from({ length: 11 }, (_, index) => Bodies.circle(
        width * (0.18 + (index % 5) * 0.15),
        70 + Math.floor(index / 5) * 95,
        24 + (index % 4) * 8,
        { restitution: 0.78, friction: 0.06, render: { fillStyle: palette[index % palette.length], strokeStyle: index % 3 === 0 ? "#42b899" : "#b0e7dd", lineWidth: 3 } },
      ));
      const walls = [
        Bodies.rectangle(width / 2, height + 20, width + 80, 40, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(-20, height / 2, 40, height, { isStatic: true, render: { visible: false } }),
        Bodies.rectangle(width + 20, height / 2, 40, height, { isStatic: true, render: { visible: false } }),
      ];
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.13, render: { visible: false } } });
      render.mouse = mouse;
      Composite.add(engine.world, [...bodies, ...walls, mouseConstraint]);
      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);
      const resize = () => {
        render.canvas.style.width = "100%";
        render.canvas.style.height = "100%";
      };
      window.addEventListener("resize", resize);
      stop = () => {
        window.removeEventListener("resize", resize);
        Render.stop(render);
        Runner.stop(runner);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        render.canvas.remove();
      };
    });
    return () => { cancelled = true; stop(); };
  }, []);

  return <div className="physics-field" ref={hostRef} aria-label="Interactive physics canvas. Drag the moving risk tokens." />;
}
