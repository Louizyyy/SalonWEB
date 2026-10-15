import { useState } from "react";
import { Header } from "./components/Header";
import { Hero, Story, Ritual, Footer } from "./components/Presentation";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { BookingForm } from "./components/BookingForm";
export default function App() {
  const [service, setService] = useState("");
  function book(name: string) {
    setService(name);
    document
      .getElementById("booking")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    document.getElementById("service")?.focus({ preventScroll: true });
  }
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services onBook={book} />
        <Story />
        <Gallery />
        <Ritual onBook={book} />
        <BookingForm service={service} onServiceChange={setService} />
        <section className="faq">
          <h2>
            A few little <em>details.</em>
          </h2>
          <details>
            <summary>How do I choose the right service?</summary>
            <p>
              Choose Cut & Style for a refresh, Color & Dimension for a new
              tone, or a finishing ritual for nails and makeup. Final prices and
              duration should be confirmed by your salon.
            </p>
          </details>
          <details>
            <summary>Can I combine services?</summary>
            <p>
              The sample Self-Care Duo pairs Cut & Style with Nail Rituals.
              Availability must be reviewed by the salon.
            </p>
          </details>
          <details>
            <summary>Is my appointment automatically confirmed?</summary>
            <p>
              No. With Supabase connected, the form saves a pending request.
              Without credentials it shows a demo preview only. There are no
              automatic confirmation emails or guaranteed time slots.
            </p>
          </details>
        </section>
      </main>
      <Footer />
    </>
  );
}
