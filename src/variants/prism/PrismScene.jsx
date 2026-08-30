import { useEffect, useRef, useState } from "react";

export function PrismScene({ fallbackSrc }) {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    let disposed = false;
    let cleanup = () => {};

    async function mountScene() {
      try {
        const THREE = await import("three");
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0.1, 7.4);

        const rig = new THREE.Group();
        rig.position.set(0.35, -0.05, 0);
        scene.add(rig);

        const glass = new THREE.MeshPhysicalMaterial({
          color: 0x76ffe2,
          transmission: 0.92,
          opacity: 0.9,
          transparent: true,
          roughness: 0.08,
          metalness: 0.03,
          ior: 1.45,
          thickness: 1.2,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          side: THREE.DoubleSide,
        });
        const prism = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.55, 0.7, 3, 1, false), glass);
        prism.rotation.set(Math.PI / 2, 0.15, Math.PI / 2);
        rig.add(prism);

        const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x202523, metalness: 0.86, roughness: 0.2 });
        const frame = new THREE.Mesh(new THREE.TorusGeometry(1.73, 0.075, 12, 3), frameMaterial);
        frame.rotation.set(Math.PI / 2, 0.15, Math.PI / 2);
        rig.add(frame);

        const core = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.22, 0),
          new THREE.MeshBasicMaterial({ color: 0x54f3d6, transparent: true, opacity: 0.92 }),
        );
        core.position.set(0.38, 0, 0.24);
        rig.add(core);

        const beamGroup = new THREE.Group();
        const beamColors = [0x3de8ca, 0x60d9ff, 0x8378ff, 0x3de8ca];
        [-1.2, -0.4, 0.4, 1.2].forEach((y, index) => {
          const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-4.2, y, -0.08),
            new THREE.Vector3(-2.4, y * 0.82, 0),
            new THREE.Vector3(-0.5, y * 0.2, 0.05),
            new THREE.Vector3(0.35, 0, 0.18),
          ]);
          beamGroup.add(new THREE.Mesh(
            new THREE.TubeGeometry(curve, 32, index === 0 ? 0.027 : 0.021, 6, false),
            new THREE.MeshBasicMaterial({ color: beamColors[index], transparent: true, opacity: index === 2 ? 0.62 : 0.78 }),
          ));
        });
        const outputCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.35, 0, 0.18),
          new THREE.Vector3(1.7, 0.02, 0.1),
          new THREE.Vector3(4.8, 0.03, 0),
        ]);
        beamGroup.add(new THREE.Mesh(
          new THREE.TubeGeometry(outputCurve, 30, 0.035, 7, false),
          new THREE.MeshBasicMaterial({ color: 0x3de8ca, transparent: true, opacity: 0.95 }),
        ));
        rig.add(beamGroup);

        scene.add(new THREE.AmbientLight(0xb8fff0, 1.3));
        const key = new THREE.DirectionalLight(0xffffff, 3.2);
        key.position.set(2, 4, 5);
        scene.add(key);
        const rim = new THREE.PointLight(0x3de8ca, 14, 10);
        rim.position.set(-1.2, -1.6, 2.6);
        scene.add(rim);

        const pointer = { x: 0, y: 0 };
        let scrollProgress = 0;
        let inView = true;
        let animationFrame = 0;
        let hasRendered = false;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const resize = () => {
          const rect = canvas.getBoundingClientRect();
          const mobile = rect.width < 720;
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.6));
          renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false);
          camera.aspect = Math.max(1, rect.width) / Math.max(1, rect.height);
          camera.updateProjectionMatrix();
        };
        const onPointer = (event) => {
          const rect = canvas.getBoundingClientRect();
          pointer.x = ((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
          pointer.y = ((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
        };
        const onScroll = () => {
          const rect = canvas.closest(".pv-hero-visual")?.getBoundingClientRect();
          if (!rect) return;
          scrollProgress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
        };
        const render = (time = 0) => {
          if (disposed) return;
          if (inView && !document.hidden) {
            const t = reducedMotion ? 0 : time * 0.00032;
            rig.rotation.y += ((pointer.x * 0.07 + scrollProgress * 0.34) - rig.rotation.y) * 0.035;
            rig.rotation.x += ((-pointer.y * 0.045 + Math.sin(t) * 0.018) - rig.rotation.x) * 0.035;
            prism.rotation.z = Math.PI / 2 + Math.sin(t * 1.4) * 0.035;
            core.scale.setScalar(1 + Math.sin(t * 4) * 0.08);
            renderer.render(scene, camera);
            if (!hasRendered) {
              hasRendered = true;
              setStatus("ready");
            }
          }
          if (!reducedMotion) animationFrame = requestAnimationFrame(render);
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        const viewObserver = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { rootMargin: "150px" });
        viewObserver.observe(canvas);
        canvas.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        canvas.addEventListener("webglcontextlost", () => setStatus("fallback"), { once: true });
        resize();
        onScroll();
        render();

        cleanup = () => {
          cancelAnimationFrame(animationFrame);
          resizeObserver.disconnect();
          viewObserver.disconnect();
          canvas.removeEventListener("pointermove", onPointer);
          window.removeEventListener("scroll", onScroll);
          scene.traverse((object) => {
            object.geometry?.dispose?.();
            if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
            else object.material?.dispose?.();
          });
          renderer.dispose();
        };
      } catch (error) {
        console.warn("Prism WebGL scene unavailable; using generated fallback.", error);
        setStatus("fallback");
      }
    }

    mountScene();
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className={`pv-webgl ${status === "ready" ? "is-ready" : "is-fallback"}`} aria-hidden="true">
      <img src={fallbackSrc} alt="" />
      <canvas ref={canvasRef} />
    </div>
  );
}
