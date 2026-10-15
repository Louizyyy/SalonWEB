import test from "node:test";
import assert from "node:assert/strict";
import { manilaDate, validateBooking } from "./booking";
const valid = {
  name: "Alex Santos",
  email: "alex@example.com",
  service: "Cut & Style",
  date: "2026-10-15",
  time: "10:00 AM",
};
test("accepts a valid request", () =>
  assert.equal(validateBooking(valid, "2026-10-14"), null));
test("rejects past date", () =>
  assert.match(
    validateBooking({ ...valid, date: "2026-10-13" }, "2026-10-14")!,
    /future/,
  ));
test("rejects impossible date", () =>
  assert.match(
    validateBooking({ ...valid, date: "2026-02-30" }, "2026-01-01")!,
    /valid date/,
  ));
test("rejects unsupported service and time", () => {
  assert.ok(validateBooking({ ...valid, service: "Unknown" }, "2026-10-14"));
  assert.ok(validateBooking({ ...valid, time: "3:00 AM" }, "2026-10-14"));
});
test("rejects invalid email and blank name", () => {
  assert.ok(validateBooking({ ...valid, email: "invalid" }, "2026-10-14"));
  assert.ok(validateBooking({ ...valid, name: " " }, "2026-10-14"));
});
test("uses Manila calendar date across UTC midnight boundary", () =>
  assert.equal(manilaDate(new Date("2026-10-14T17:00:00Z")), "2026-10-15"));
