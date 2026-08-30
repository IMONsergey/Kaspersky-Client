import React from "react";
import { createRoot } from "react-dom/client";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const requestPath = window.location.pathname;
const localPath = requestPath.startsWith(basePath)
  ? requestPath.slice(basePath.length) || "/"
  : requestPath;

const variantRoutes = [
  {
    match: "/variants/prism",
    className: "prism-page",
    load: async () => {
      const [{ PrismApp }] = await Promise.all([
        import("./variants/prism/PrismApp.jsx"),
        import("./variants/prism/prism.css"),
      ]);
      return PrismApp;
    },
  },
  {
    match: "/variants/editorial",
    className: "editorial-page",
    load: async () => {
      const [{ EditorialApp }] = await Promise.all([
        import("./variants/editorial/EditorialApp.jsx"),
        import("./variants/editorial/editorial.css"),
      ]);
      return EditorialApp;
    },
  },
  {
    match: "/variants/orbit",
    className: "orbit-page",
    load: async () => {
      const [{ OrbitApp }] = await Promise.all([
        import("./variants/orbit/OrbitApp.jsx"),
        import("./variants/orbit/orbit.css"),
      ]);
      return OrbitApp;
    },
  },
  {
    match: "/variants/glass",
    className: "glass-page",
    load: async () => {
      const [{ GlassVariant }] = await Promise.all([
        import("./variants/glass/GlassVariant.jsx"),
        import("./variants/glass/glass.css"),
      ]);
      return GlassVariant;
    },
  },
  {
    match: "/variants/signal",
    className: "signal-page",
    load: async () => {
      const [{ SignalApp }] = await Promise.all([
        import("./variants/signal/SignalApp.jsx"),
        import("./variants/signal/signal.css"),
      ]);
      return SignalApp;
    },
  },
];

async function resolveRoute() {
  const variantRoute = variantRoutes.find(({ match }) => localPath.startsWith(match));

  if (variantRoute) {
    document.body.classList.add(variantRoute.className);
    return variantRoute.load();
  }

  if (localPath === "/variants" || localPath === "/variants/") {
    const [{ VariantHub }] = await Promise.all([
      import("./variants/VariantHub.jsx"),
      import("./variants/variant-hub.css"),
    ]);
    document.body.classList.add("variant-hub-page");
    return VariantHub;
  }

  const [{ App }] = await Promise.all([import("./App.jsx"), import("./styles.css")]);
  return App;
}

resolveRoute()
  .then((RootApp) => {
    createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <RootApp />
      </React.StrictMode>,
    );
  })
  .catch((error) => {
    console.error(error);
    document.getElementById("root").innerHTML =
      '<main style="font:16px/1.5 system-ui;padding:32px">Unable to load this route. Please refresh the page.</main>';
  });
