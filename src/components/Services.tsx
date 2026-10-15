import { useState } from "react";
import { services } from "../data/services";
export function Services({ onBook }: { onBook: (name: string) => void }) {
  const [filter, setFilter] = useState("all");
  return (
    <section id="services" className="section wrap">
      <div className="section-head">
        <div>
          <span className="eyebrow">The beauty menu</span>
          <h2>
            A little refresh.
            <br />
            <em>A whole new feeling.</em>
          </h2>
        </div>
        <p>
          From a signature cut to your finishing touches, find a ritual made for
          your kind of beautiful.
        </p>
      </div>
      <div className="filters" role="group" aria-label="Filter services">
        {[
          ["all", "All rituals"],
          ["hair", "Hair"],
          ["nails", "Nails"],
          ["beauty", "Beauty"],
        ].map(([id, label]) => (
          <button
            key={id}
            className={`filter ${filter === id ? "active" : ""}`}
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="services">
        {services
          .filter((s) => filter === "all" || s.category === filter)
          .map((s) => (
            <article className="service" key={s.name}>
              <div className="service-photo">
                <img loading="lazy" src={s.image} alt={s.alt} />
                <span>{s.tag}</span>
              </div>
              <div className="service-body">
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="service-bottom">
                  <span>{s.price}</span>
                  <button
                    onClick={() => onBook(s.name)}
                    aria-label={`Plan a ${s.name} appointment`}
                  >
                    ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
      </div>
      <p className="fineprint">
        Illustrative service menu and starting prices. Final pricing depends on
        your consultation.
      </p>
    </section>
  );
}
