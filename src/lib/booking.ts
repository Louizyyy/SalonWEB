import { serviceNames, timeOptions } from "../data/services";
export type BookingInput = {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
};
export function manilaDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
export function validateBooking(
  input: BookingInput,
  today = manilaDate(),
): string | null {
  if (input.name.trim().length < 2 || input.name.trim().length > 80)
    return "Please enter a name between 2 and 80 characters.";
  if (
    input.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())
  )
    return "Please enter a valid email address.";
  if (!serviceNames.includes(input.service))
    return "Please choose a service from the menu.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date))
    return "Please choose a valid date.";
  const parsed = new Date(input.date + "T12:00:00Z");
  if (
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== input.date
  )
    return "Please choose a valid date.";
  if (input.date < today) return "Please choose today or a future date.";
  if (!timeOptions.includes(input.time))
    return "Please choose a time from the list.";
  return null;
}
