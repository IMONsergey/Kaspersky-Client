#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "client", "index.html");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");

for (const file of [index, worker, hosting]) {
  if (!existsSync(file)) throw new Error("Missing Sites build input: " + file);
}

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });
copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

const appRoutes = [
  "variants",
  "variants/prism",
  "variants/editorial",
  "variants/orbit",
  "variants/glass",
  "variants/signal",
  "variants/spatial",
  "variants/lottie",
  "variants/physics",
  "variants/graph",
  "variants/poster",
  "variants/future",
  "variants/threatmap",
  "variants/transparency",
  "variants/universe",
  "variants/pathways",
  "variants/journey",
  "variants/unlocked",
];

for (const route of appRoutes) {
  const routeDir = path.join(dist, "client", route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(index, path.join(routeDir, "index.html"));
}

copyFileSync(index, path.join(dist, "client", "404.html"));

console.log("Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json");
