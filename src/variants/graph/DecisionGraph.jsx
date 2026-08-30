import { useEffect, useRef } from "react";
import { shifts } from "../round2/content.js";

export function DecisionGraph({ onSelect }) {
  const hostRef = useRef(null);
  useEffect(() => {
    if (!hostRef.current) return undefined;
    let cy;
    let cancelled = false;
    import("cytoscape").then(({ default: cytoscape }) => {
      if (cancelled) return;
      const elements = [
        { data: { id: "core", label: "THE CRITICAL\n90", type: "core" }, position: { x: 460, y: 330 } },
        ...shifts.map((label, index) => ({ data: { id: `shift-${index}`, label: `0${index + 1}\n${label}`, type: "shift", index }, position: [{ x: 460, y: 72 }, { x: 760, y: 330 }, { x: 460, y: 588 }, { x: 160, y: 330 }][index] })),
        ...[30, 60, 90].map((days, index) => ({ data: { id: `day-${days}`, label: `${days}\nDAYS`, type: "day" }, position: [{ x: 630, y: 160 }, { x: 665, y: 500 }, { x: 260, y: 520 }][index] })),
        ...[0, 1, 2, 3].map((index) => ({ data: { id: `edge-${index}`, source: "core", target: `shift-${index}` } })),
        { data: { id: "edge-day-30", source: "core", target: "day-30" } },
        { data: { id: "edge-day-60", source: "core", target: "day-60" } },
        { data: { id: "edge-day-90", source: "core", target: "day-90" } },
      ];
      cy = cytoscape({
        container: hostRef.current,
        elements,
        layout: { name: "preset", fit: true, padding: 75 },
        minZoom: 0.65,
        maxZoom: 1.8,
        wheelSensitivity: 0.22,
        style: [
          { selector: "node", style: { "font-family": "Kaspersky Sans Display", "text-wrap": "wrap", "text-max-width": "120px", "text-valign": "center", "text-halign": "center", "label": "data(label)", "background-color": "#14161b", "color": "#f3f7f6", "border-color": "#42b899", "border-width": 3, "width": 135, "height": 96, "shape": "round-rectangle", "font-size": 15, "line-height": 1.15, "overlay-opacity": 0 } },
          { selector: "node[type = 'core']", style: { "width": 166, "height": 132, "font-size": 24, "border-width": 5, "box-shadow-blur": 28, "box-shadow-color": "#42b899", "box-shadow-opacity": .28 } },
          { selector: "node[type = 'day']", style: { "width": 62, "height": 62, "shape": "ellipse", "background-color": "#d4f0ea", "color": "#14161b", "border-width": 2, "font-size": 11 } },
          { selector: "edge", style: { "width": 3, "line-color": "#42b899", "opacity": .65, "curve-style": "bezier", "line-style": "dashed", "line-dash-pattern": [4, 7] } },
          { selector: ".selected-shift", style: { "background-color": "#0c8877", "border-color": "#8c75c9", "border-width": 5, "box-shadow-blur": 34, "box-shadow-color": "#8c75c9", "box-shadow-opacity": .35 } },
        ],
      });
      cy.nodes("[type = 'shift']").on("tap", (event) => {
        cy.nodes().removeClass("selected-shift");
        event.target.addClass("selected-shift");
        onSelect?.(event.target.data("index"));
      });
      cy.nodes("[type = 'shift']").first().addClass("selected-shift");
    });
    return () => { cancelled = true; cy?.destroy(); };
  }, [onSelect]);
  return <div className="decision-graph" ref={hostRef} role="img" aria-label="Interactive graph connecting four cyber shifts to one 90-day agenda" />;
}
