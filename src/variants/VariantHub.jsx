const variants = [
  { number: "01", slug: "prism", title: "Cinematic Prism", idea: "Refractive decision protocol", engine: "Three.js", tone: "Cinematic / spatial" },
  { number: "02", slug: "editorial", title: "Swiss Kinetic", idea: "An executive editorial system", engine: "PixiJS", tone: "Editorial / typographic" },
  { number: "03", slug: "orbit", title: "Decision Room", idea: "Cyber priorities in orbit", engine: "OGL", tone: "Immersive / navigational" },
  { number: "04", slug: "glass", title: "Modular Glass", idea: "A live executive dashboard", engine: "regl", tone: "Modular / luminous" },
  { number: "05", slug: "signal", title: "Signal Intelligence", idea: "Risk as an evolving terrain", engine: "p5.js", tone: "Analytical / atmospheric" },
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
        <p className="variant-hub__eyebrow">Five independent experiments</p>
        <h1>One brief.<br />Five decision systems.</h1>
        <p className="variant-hub__lead">
          Identical strategic content, reinterpreted through five distinct grids, interaction models,
          image worlds and live canvas engines.
        </p>
      </section>

      <section className="variant-hub__grid" aria-label="Alternative website concepts">
        {variants.map((variant) => (
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

      <footer className="variant-hub__footer"><span>THE CRITICAL 90</span><span>Creative directions / 2026</span></footer>
    </main>
  );
}
