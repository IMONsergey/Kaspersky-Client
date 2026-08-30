import { Engine } from "@babylonjs/core/Engines/engine.js";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { Scene } from "@babylonjs/core/scene.js";
import { useEffect, useRef } from "react";

export function SpatialScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const engine = new Engine(canvas, true, { preserveDrawingBuffer: false, stencil: false }, true);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.015, 0.027, 0.027, 0);
    scene.fogMode = Scene.FOGMODE_EXP2;
    scene.fogDensity = 0.016;
    scene.fogColor = new Color3(0.01, 0.05, 0.055);

    const camera = new FreeCamera("command-camera", new Vector3(0, 0.35, -8.5), scene);
    camera.setTarget(new Vector3(0.45, 0.3, 3));
    camera.fov = 0.9;

    const teal = new StandardMaterial("teal-glass", scene);
    teal.diffuseColor = new Color3(0.02, 0.28, 0.28);
    teal.emissiveColor = new Color3(0.02, 0.48, 0.43);
    teal.alpha = 0.28;
    teal.backFaceCulling = false;

    const violet = teal.clone("violet-glass");
    violet.emissiveColor = new Color3(0.25, 0.08, 0.5);
    violet.diffuseColor = new Color3(0.12, 0.04, 0.24);
    violet.alpha = 0.2;

    const signal = new StandardMaterial("violet-signal", scene);
    signal.emissiveColor = new Color3(0.46, 0.24, 0.88);

    const floor = MeshBuilder.CreateGround("floor", { width: 15, height: 30, subdivisions: 24 }, scene);
    floor.position.z = 7;
    const grid = new StandardMaterial("grid", scene);
    grid.diffuseColor = new Color3(0.01, 0.12, 0.12);
    grid.emissiveColor = new Color3(0.02, 0.19, 0.17);
    grid.wireframe = true;
    grid.alpha = 0.28;
    floor.material = grid;

    const planes = [];
    for (let index = 0; index < 11; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const panel = MeshBuilder.CreatePlane(`plane-${index}`, { width: 2.2 + (index % 3) * 0.8, height: 3.4 + (index % 4) * 0.55 }, scene);
      panel.position = new Vector3(side * (2.3 + (index % 3) * 0.8), 1.05 + (index % 2) * 0.35, 0.5 + index * 1.7);
      panel.rotation.y = side * (-0.34 - (index % 2) * 0.18);
      panel.material = index % 4 === 0 ? violet : teal;
      planes.push(panel);
    }

    const beam = MeshBuilder.CreateTube("violet-beam", {
      path: [new Vector3(-5, 1.2, 3), new Vector3(0, 0.55, 8), new Vector3(5.3, 1.65, 13)],
      radius: 0.017,
      tessellation: 8,
    }, scene);
    beam.material = signal;

    const rings = [0, 1, 2].map((index) => {
      const ring = MeshBuilder.CreateTorus(`ring-${index}`, { diameter: 3.6 + index * 1.85, thickness: 0.018, tessellation: 112 }, scene);
      ring.position = new Vector3(0.6, 1.2, 7.4 + index * 2.1);
      ring.rotation.x = Math.PI / 2;
      ring.material = index === 1 ? signal : teal;
      return ring;
    });

    const pointer = { x: 0, y: 0 };
    const move = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", move, { passive: true });

    engine.runRenderLoop(() => {
      const time = performance.now() * 0.00018;
      camera.position.x += (pointer.x * 0.42 - camera.position.x) * 0.018;
      camera.position.y += (0.35 - pointer.y * 0.2 - camera.position.y) * 0.018;
      planes.forEach((panel, index) => { panel.position.y += Math.sin(time * 5 + index) * 0.0008; });
      rings.forEach((ring, index) => { ring.rotation.z = time * (index % 2 ? -0.3 : 0.22); });
      scene.render();
    });

    const resize = () => engine.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return <canvas className="spatial-canvas" ref={canvasRef} aria-hidden="true" />;
}
