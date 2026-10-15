// Static editorial sections. The original salon design is preserved.
export function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A little luxury, just for you</span>
          <h1>
            Your beauty.
            <br />
            Your moment.<em>Beautifully you.</em>
          </h1>
          <p>
            Fresh hair. Polished details. A little time to yourself. Step into
            your next era of confidence.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#booking">
              Find your glow <span>↗</span>
            </a>
            <a className="textlink" href="#services">
              Explore our services
            </a>
          </div>
          <div className="hero-note">
            <span className="flower">✳</span>
            <span>
              Thoughtful care. Personal style.
              <br />A beauty ritual that feels like you.
            </span>
          </div>
        </div>
        <div className="hero-photo">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85"
            alt="Beauty portrait with long flowing hair"
            fetchPriority="high"
          />
          <div className="seal">
            MADE TO FEEL<strong>beautiful</strong>INSIDE & OUT
          </div>
          <div className="image-caption">
            THE AURÉLIA STATE OF MIND<b>Effortless. Expressive. You.</b>
          </div>
        </div>
      </section>
      <div className="ribbon">
        <span>HAIR THAT TURNS HEADS</span>
        <i>✧</i>
        <span>A MOMENT TO UNWIND</span>
        <i>✧</i>
        <span>BEAUTY IN EVERY DETAIL</span>
        <i>✧</i>
        <span>YOUR EVERYDAY, ELEVATED</span>
      </div>
    </>
  );
}
export function Story() {
  return (
    <>
      <section id="story" className="story">
        <div className="story-photos">
          <img
            className="story-main"
            loading="lazy"
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=900&q=85"
            alt="Warm and welcoming salon interior"
          />
          <img
            className="story-small"
            loading="lazy"
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80"
            alt="Salon styling chairs and mirrors"
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">More than a salon</span>
          <h2>
            A space to pause.
            <br />
            <em>A place to bloom.</em>
          </h2>
          <p>
            Welcome to Aurélia, a beauty atelier imagined around one simple
            idea: taking care of yourself should feel as beautiful as the
            result.
          </p>
          <p>
            Settle in, share your inspiration, and discover a look that feels
            like you. Every detail is an invitation to slow down and enjoy your
            moment.
          </p>
          <div className="story-points">
            <div>
              <b>Made personal</b>
              <span>Your style comes first.</span>
            </div>
            <div>
              <b>Never rushed</b>
              <span>Space for a little self-care.</span>
            </div>
          </div>
          <a className="btn light" href="#booking">
            Make time for yourself <span>↗</span>
          </a>
        </div>
      </section>
    </>
  );
}
export function Ritual({ onBook }: { onBook: (name: string) => void }) {
  return (
    <>
      <div className="wrap">
        <section className="ritual">
          <div className="ritual-copy">
            <span className="eyebrow">The self-care agenda</span>
            <h2>
              Clear your calendar.
              <br />
              <em>Keep the glow.</em>
            </h2>
            <p>
              Make a little room for a full reset. Pair a fresh cut with a nail
              ritual and leave feeling beautifully put together.
            </p>
            <span className="small">
              CUT & STYLE + NAIL RITUAL · FROM ₱1,100
            </span>
            <button className="btn" onClick={() => onBook("The Self-Care Duo")}>
              Plan my self-care day <span>↗</span>
            </button>
          </div>
          <div className="ritual-photo">
            <img
              loading="lazy"
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=85"
              alt="A salon setting for a relaxing beauty day"
            />
          </div>
        </section>
      </div>
    </>
  );
}
export function Footer() {
  return (
    <>
      <footer>
        <div className="wrap">
          <div className="footer-top">
            <div>
              <a className="brand" href="#">
                aurélia<small>HAIR & BEAUTY ATELIER</small>
              </a>
              <p>A little care. A little confidence. Beautifully you.</p>
            </div>
            <div className="footer-links">
              <a href="#services">Our services</a>
              <a href="#story">Our space</a>
              <a href="#gallery">Inspiration</a>
              <a href="#booking">Plan a visit ↗</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Aurélia. A salon website concept.</span>
            <span>Created with care, down to the last detail. ✧</span>
          </div>
        </div>
      </footer>
      <a className="mobile-book" href="#booking">
        <span>YOUR NEXT BEAUTY MOMENT</span>
        <span>Plan a visit ↗</span>
      </a>
    </>
  );
}
