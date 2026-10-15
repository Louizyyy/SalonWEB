import { useRef, useState, type FormEvent } from "react";
import { serviceNames, timeOptions } from "../data/services";
import { supabase, configurationError } from "../lib/supabase";
import { manilaDate, validateBooking, type BookingInput } from "../lib/booking";
export function BookingForm({
  service,
  onServiceChange,
}: {
  service: string;
  onServiceChange: (value: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);
  const requestId = useRef(crypto.randomUUID());
  const inFlight = useRef(false);
  const connected = Boolean(supabase);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget,
      data = new FormData(form);
    const input: BookingInput = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "")
        .trim()
        .toLowerCase(),
      service,
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
    };
    const validation = configurationError || validateBooking(input);
    setFailed(false);
    setMessage("");
    if (validation) {
      setFailed(true);
      setMessage(validation);
      return;
    }
    if (String(data.get("website") ?? "")) return; // Simple bot trap; not a substitute for rate limiting.
    if (!supabase) {
      setMessage(
        `Demo preview: ${input.service} on ${input.date} at ${input.time} (Manila time). Nothing was sent or reserved. Add Supabase credentials to save requests.`,
      );
      return;
    }
    inFlight.current = true;
    setBusy(true);
    try {
      // INSERT only: never request a SELECT of guest contact information.
      const { error } = await supabase
        .from("booking_requests")
        .insert({
          id: requestId.current,
          customer_name: input.name,
          email: input.email,
          service_name: input.service,
          preferred_date: input.date,
          preferred_time: input.time,
        });
      if (error && error.code !== "23505") throw error;
      setMessage(
        `Request received. Reference: ${requestId.current}. This is a pending request, not a confirmed appointment. The salon must confirm availability; no automatic email has been sent.`,
      );
      requestId.current = crypto.randomUUID();
      form.reset();
      onServiceChange("");
    } catch {
      setFailed(true);
      setMessage(
        "Could not save your request. Check your internet connection and Supabase setup, then retry. No appointment has been confirmed.",
      );
    } finally {
      setBusy(false);
      inFlight.current = false;
    }
  }
  return (
    <section id="booking" className="booking">
      <div className="wrap booking-inner">
        <div className="booking-copy">
          <span className="eyebrow">Your chair is calling</span>
          <h2>
            Let's make it
            <br />
            <em>your moment.</em>
          </h2>
          <p>
            Choose your ritual and preferred time. Start planning a little
            something just for you.
          </p>
          <span className="ornament" aria-hidden="true">
            ✳
          </span>
          <p>
            <strong>Aurélia concept salon</strong>
            <br />
            Sample brand, prices, and schedule. Add your actual location and
            contact details before a business launch.
          </p>
        </div>
        <form className="booking-form" onSubmit={submit}>
          <span className="eyebrow">
            {connected
              ? "Request an appointment"
              : "Plan your appointment · Demo"}
          </span>
          <fieldset disabled={busy}>
            <div className="form-grid">
              <label>
                YOUR NAME
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="e.g. Alex Santos"
                  required
                  minLength={2}
                  maxLength={80}
                />
              </label>
              <label>
                EMAIL ADDRESS
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={254}
                  required
                />
              </label>
              <label className="full">
                YOUR BEAUTY RITUAL
                <select
                  id="service"
                  name="service"
                  value={service}
                  onChange={(e) => onServiceChange(e.target.value)}
                  required
                >
                  <option value="">Choose a service</option>
                  {serviceNames.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                PREFERRED DATE
                <input type="date" name="date" min={manilaDate()} required />
              </label>
              <label>
                PREFERRED TIME
                <select name="time" required defaultValue="">
                  <option value="">Choose a time</option>
                  {timeOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label>
                Leave empty
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <button className="btn" type="submit">
              {busy
                ? "Saving request…"
                : connected
                  ? "Send appointment request"
                  : "Preview my appointment"}{" "}
              <span>↗</span>
            </button>
          </fieldset>
          <p className="form-note">
            {connected
              ? "Submitting stores your name, email, and visit preferences for the salon to review. All times are Asia/Manila. Requests are subject to confirmation."
              : "Demo mode. Nothing is sent, saved, or reserved. All times are Asia/Manila."}
          </p>
          {message && (
            <div
              className={`result ${failed ? "error" : ""}`}
              role={failed ? "alert" : "status"}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
