import { useState } from "react";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topline">
        A LITTLE SELF-CARE. A WHOLE NEW ENERGY. <span>✦</span> YOUR BEAUTY
        MOMENT AWAITS
      </div>
      <header>
        <nav className="nav wrap" aria-label="Main navigation">
          <a className="brand" href="#">
            aurélia<small>HAIR & BEAUTY ATELIER</small>
          </a>
          <div className={`navlinks ${open ? "open" : ""}`} id="navlinks">
            {[
              ["services", "Our services"],
              ["story", "The atelier"],
              ["gallery", "The lookbook"],
              ["booking", "Plan your visit"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </div>
          <a href="#booking" className="btn">
            Book an appointment <span>↗</span>
          </a>
          <button
            className="menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="navlinks"
            onClick={() => setOpen(!open)}
          >
            {open ? "×" : "☰"}
          </button>
        </nav>
      </header>
    </>
  );
}
