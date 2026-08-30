const variants = [
  { number: "01", group: "First study", slug: "prism", title: "Cinematic Prism", idea: "Refractive decision protocol", engine: "Three.js", tone: "Cinematic / spatial" },
  { number: "02", group: "First study", slug: "editorial", title: "Swiss Kinetic", idea: "An executive editorial system", engine: "PixiJS", tone: "Editorial / typographic" },
  { number: "03", group: "First study", slug: "orbit", title: "Decision Room", idea: "Cyber priorities in orbit", engine: "OGL", tone: "Immersive / navigational" },
  { number: "04", group: "First study", slug: "glass", title: "Modular Glass", idea: "A live executive dashboard", engine: "regl", tone: "Modular / luminous" },
  { number: "05", group: "First study", slug: "signal", title: "Signal Intelligence", idea: "Risk as an evolving terrain", engine: "p5.js", tone: "Analytical / atmospheric" },
  { number: "06", group: "Independent systems", slug: "spatial", title: "Spatial Command", idea: "Walk through four decision gates", engine: "Babylon.js", tone: "3D / spatial console", image: "variants/spatial/command-architecture.png" },
  { number: "07", group: "Independent systems", slug: "lottie", title: "Kinetic Dossier", idea: "The guide as a living motion score", engine: "Lottie", tone: "Motion / editorial", image: "variants/lottie/ninety-day-instrument.png" },
  { number: "08", group: "Independent systems", slug: "physics", title: "Risk Physics Lab", idea: "Stress-test the weight of every shift", engine: "Matter.js", tone: "Physics / tactile", image: "variants/physics/risk-tokens.png" },
  { number: "09", group: "Independent systems", slug: "graph", title: "Decision Graph", idea: "Navigate risk as a connected system", engine: "Cytoscape.js", tone: "Graph / exploratory", image: "variants/graph/network-constellation.png" },
  { number: "10", group: "Independent systems", slug: "poster", title: "Kinetic Poster", idea: "Four fullscreen typographic scenes", engine: "Konva", tone: "Poster / scene-based", image: "variants/poster/kinetic-ribbon.png" },
];

const routeHref = (slug) => `${import.meta.env.BASE_URL}variants/${slug}/`;

export function VariantHub() {
  return (
    <main className="variant-hub">
      <header className="variant-hub__header">
        <a className="variant-hub__brand" href={import.meta.env.BASE_URL} aria-label="Back to the main concept">
          <img src={`${import.meta.env.BASE_URL}assets/kaspersky-logo.svg`} alt="Kaspersky" />
          <span>Critical 90 / Design lab</span>
        </a>
        <a className="variant-hub__main-link" href={import.meta.env.BASE_URL}>
          Main concept <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="variant-hub__intro">
        <p className="variant-hub__eyebrow">Ten independent experiments</p>
        <h1>One brief.<br />Ten decision systems.</h1>
        <p className="variant-hub__lead">
          Identical strategic content, reinterpreted through ten grids, interaction models,
          image worlds and live engines — all grounded in the supplied Kaspersky slides.
        </p>
      </section>

      <div className="variant-hub__group-label"><span>01—05</span><p>First study</p></div>
      <section className="variant-hub__grid variant-hub__grid--first" aria-label="First website study">
        {variants.slice(0, 5).map((variant) => (
          <a className={`variant-card variant-card--${variant.slug}`} href={routeHref(variant.slug)} key={variant.slug}>
            <span className="variant-card__number">{variant.number}</span>
            <div className="variant-card__signal" aria-hidden="true"><span /><span /><span /></div>
            <div className="variant-card__copy"><p>{variant.idea}</p><h2>{variant.title}</h2></div>
            <dl>
              <div><dt>Canvas</dt><dd>{variant.engine}</dd></div>
              <div><dt>Mode</dt><dd>{variant.tone}</dd></div>
            </dl>
            <span className="variant-card__open">Open experiment <b aria-hidden="true">↗</b></span>
          </a>
        ))}
      </section>

      <div className="variant-hub__group-label variant-hub__group-label--second"><span>06—10</span><p>Independent systems / new study</p></div>
      <section className="variant-hub__grid variant-hub__grid--second" aria-label="Five independent website systems">
        {variants.slice(5).map((variant) => (
          <a className={`variant-card variant-card--${variant.slug}`} href={routeHref(variant.slug)} key={variant.slug}>
            <span className="variant-card__number">{variant.number}</span>
            {variant.image ? <img className="variant-card__image" src={`${import.meta.env.BASE_URL}${variant.image}`} alt="" aria-hidden="true" /> : <div className="variant-card__signal" aria-hidden="true"><span /><span /><span /></div>}
            <div className="variant-card__copy"><p>{variant.idea}</p><h2>{variant.title}</h2></div>
            <dl>
              <div><dt>Canvas</dt><dd>{variant.engine}</dd></div>
              <div><dt>Mode</dt><dd>{variant.tone}</dd></div>
            </dl>
            <span className="variant-card__open">Open experiment <b aria-hidden="true">↗</b></span>
          </a>
        ))}
      </section>

      <footer className="variant-hub__footer"><span>THE CRITICAL 90</span><span>Creative directions / 2026</span></footer>
    </main>
  );
}
