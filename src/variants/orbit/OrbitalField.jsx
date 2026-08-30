import { useEffect, useRef, useState } from "react";

const TAU = Math.PI * 2;

function rotatePoint(x, y, z, tiltX, tiltZ) {
  const cosX = Math.cos(tiltX);
  const sinX = Math.sin(tiltX);
  const cosZ = Math.cos(tiltZ);
  const sinZ = Math.sin(tiltZ);
  const y1 = y * cosX - z * sinX;
  const z1 = y * sinX + z * cosX;
  return [x * cosZ - y1 * sinZ, x * sinZ + y1 * cosZ, z1];
}

function buildOrbitGeometry(count = 128) {
  const positions = [];
  const energies = [];
  const orbitSettings = [
    [2.05, 0.7, -0.62, 0.12],
    [1.78, 0.58, 0.46, 0.78],
    [1.52, 0.74, 0.22, -0.7],
    [1.18, 0.88, -0.25, 1.38],
  ];

  orbitSettings.forEach(([radius, squash, tiltX, tiltZ], orbitIndex) => {
    for (let index = 0; index < count; index += 1) {
      const start = (index / count) * TAU;
      const end = ((index + 1) / count) * TAU;
      [start, end].forEach((angle) => {
        const point = rotatePoint(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * squash,
          Math.sin(angle * 2 + orbitIndex) * 0.08,
          tiltX,
          tiltZ,
        );
        positions.push(...point);
        energies.push(orbitIndex / 3);
      });
    }
  });

  return {
    position: new Float32Array(positions),
    energy: new Float32Array(energies),
  };
}

function buildParticleGeometry(total = 520) {
  const positions = [];
  const seeds = [];
  for (let index = 0; index < total; index += 1) {
    const orbit = index % 4;
    const angle = (index / total) * TAU * 5.7 + orbit * 0.73;
    const radius = 0.82 + orbit * 0.36 + ((index * 17) % 23) / 240;
    const point = rotatePoint(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * (0.58 + orbit * 0.08),
      Math.sin(angle * 2.4) * 0.14,
      [-0.62, 0.46, 0.22, -0.25][orbit],
      [0.12, 0.78, -0.7, 1.38][orbit],
    );
    positions.push(...point);
    seeds.push((index % 97) / 97, orbit / 3);
  }
  return {
    position: new Float32Array(positions),
    seed: new Float32Array(seeds),
  };
}

export function OrbitalField({ className = "", activity = 0, variant = "hero" }) {
  const canvasRef = useRef(null);
  const activityRef = useRef(activity);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    activityRef.current = activity;
  }, [activity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = navigator.connection?.saveData;
    if (!canvas || reduced || saveData) {
      setFallback(true);
      return undefined;
    }

    let disposed = false;
    let renderer;
    let resizeObserver;
    let visibilityObserver;
    let animationFrame = 0;
    let running = true;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    import("ogl").then(({ Camera, Geometry, Mesh, Program, Renderer, Transform }) => {
      if (disposed) return;
      try {
        renderer = new Renderer({
          canvas,
          alpha: true,
          antialias: true,
          dpr: Math.min(window.devicePixelRatio || 1, 1.75),
          powerPreference: "high-performance",
          premultipliedAlpha: false,
        });
      } catch {
        setFallback(true);
        return;
      }

      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      const camera = new Camera(gl, { fov: 42, near: 0.1, far: 100 });
      camera.position.set(0, 0, variant === "compact" ? 6.6 : 5.8);
      const scene = new Transform();

      const orbitData = buildOrbitGeometry(132);
      const orbitGeometry = new Geometry(gl, {
        position: { size: 3, data: orbitData.position },
        energy: { size: 1, data: orbitData.energy },
      });
      const orbitProgram = new Program(gl, {
        transparent: true,
        depthTest: false,
        cullFace: null,
        vertex: `
          attribute vec3 position;
          attribute float energy;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          uniform float uActivity;
          varying float vEnergy;
          void main() {
            float pulse = sin(uTime * 0.34 + energy * 6.283) * 0.025;
            float convergence = 1.0 - clamp(uActivity, 0.0, 1.0) * 0.16;
            vec3 transformed = position * (convergence + pulse);
            transformed.z += sin(uTime * 0.18 + energy * 4.0) * 0.05;
            vEnergy = energy;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
          }
        `,
        fragment: `
          precision highp float;
          uniform float uActivity;
          varying float vEnergy;
          void main() {
            vec3 mint = vec3(0.16, 0.80, 0.69);
            vec3 cyan = vec3(0.38, 0.82, 0.92);
            vec3 violet = vec3(0.43, 0.31, 0.72);
            vec3 color = mix(mint, cyan, smoothstep(0.2, 0.72, vEnergy));
            color = mix(color, violet, smoothstep(0.78, 1.0, vEnergy) * 0.34);
            float alpha = 0.18 + 0.32 * (1.0 - abs(vEnergy - uActivity));
            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: {
          uTime: { value: 0 },
          uActivity: { value: activityRef.current },
        },
      });
      const orbitMesh = new Mesh(gl, { geometry: orbitGeometry, program: orbitProgram, mode: gl.LINES });
      orbitMesh.setParent(scene);

      const mobile = window.innerWidth < 700;
      const particleData = buildParticleGeometry(mobile ? 190 : 560);
      const particleGeometry = new Geometry(gl, {
        position: { size: 3, data: particleData.position },
        seed: { size: 2, data: particleData.seed },
      });
      const particleProgram = new Program(gl, {
        transparent: true,
        depthTest: false,
        cullFace: null,
        vertex: `
          attribute vec3 position;
          attribute vec2 seed;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          uniform float uActivity;
          varying float vAlpha;
          varying float vTint;
          void main() {
            float travel = uTime * (0.025 + seed.x * 0.018);
            float wave = sin(travel + seed.x * 12.0) * 0.035;
            vec3 transformed = position * (1.0 - uActivity * 0.12 + wave);
            vec4 view = modelViewMatrix * vec4(transformed, 1.0);
            gl_Position = projectionMatrix * view;
            gl_PointSize = (2.0 + seed.x * 3.4) * (6.0 / -view.z);
            vAlpha = 0.32 + seed.x * 0.56;
            vTint = seed.y;
          }
        `,
        fragment: `
          precision highp float;
          varying float vAlpha;
          varying float vTint;
          void main() {
            float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
            float alpha = smoothstep(0.5, 0.04, distanceToCenter) * vAlpha;
            vec3 mint = vec3(0.24, 0.91, 0.78);
            vec3 cyan = vec3(0.45, 0.83, 0.96);
            vec3 color = mix(mint, cyan, vTint * 0.62);
            gl_FragColor = vec4(color, alpha);
          }
        `,
        uniforms: {
          uTime: { value: 0 },
          uActivity: { value: activityRef.current },
        },
      });
      const particleMesh = new Mesh(gl, { geometry: particleGeometry, program: particleProgram, mode: gl.POINTS });
      particleMesh.setParent(scene);

      const resize = () => {
        const bounds = canvas.getBoundingClientRect();
        renderer.setSize(Math.max(1, bounds.width), Math.max(1, bounds.height));
        camera.perspective({ aspect: Math.max(0.1, bounds.width / Math.max(1, bounds.height)) });
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();

      const draw = (time) => {
        if (!running || !visible || disposed) return;
        pointerX += (targetX - pointerX) * 0.045;
        pointerY += (targetY - pointerY) * 0.045;
        const seconds = time * 0.001;
        scene.rotation.y = seconds * 0.035 + pointerX * 0.065;
        scene.rotation.x = pointerY * 0.05;
        scene.rotation.z = Math.sin(seconds * 0.09) * 0.035;
        orbitProgram.uniforms.uTime.value = seconds;
        orbitProgram.uniforms.uActivity.value = activityRef.current;
        particleProgram.uniforms.uTime.value = seconds;
        particleProgram.uniforms.uActivity.value = activityRef.current;
        renderer.render({ scene, camera });
        animationFrame = requestAnimationFrame(draw);
      };
      const start = () => {
        if (running && visible && !animationFrame) animationFrame = requestAnimationFrame(draw);
      };
      const stop = () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      };
      visibilityObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start(); else stop();
      }, { rootMargin: "160px" });
      visibilityObserver.observe(canvas);

      const onVisibility = () => {
        running = !document.hidden;
        if (running) start(); else stop();
      };
      document.addEventListener("visibilitychange", onVisibility);
      canvas.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
      canvas.__orbitCleanup = () => {
        stop();
        document.removeEventListener("visibilitychange", onVisibility);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
      };
      start();
    }).catch(() => setFallback(true));

    return () => {
      disposed = true;
      running = false;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      canvas.__orbitCleanup?.();
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      renderer?.gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [variant]);

  return <canvas ref={canvasRef} className={`orbit-webgl ${fallback ? "is-fallback" : ""} ${className}`} aria-hidden="true" />;
}
