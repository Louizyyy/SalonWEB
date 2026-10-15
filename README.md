# Aurélia — React + TypeScript + Supabase

A responsive salon website with the original rich burgundy/ivory design, service filters, photo lightbox, mobile navigation, and database-backed appointment requests. Designed as a learning project.

## 1. Run in VS Code

Install **Node.js 22.12+** (Node 24 also works). Extract this ZIP, open the `aurelia-react` folder in VS Code, then open Terminal → New Terminal:

```bash
npm ci
npm run dev
```

Open the localhost URL printed by Vite (normally http://localhost:5173).

You do NOT need Supabase just to run the design. With empty environment values, the booking form clearly runs in demo mode. Images and Google Fonts require internet access.

Other commands:

```bash
npm run typecheck
npm test
npm run build
npm run preview
```

`npm run preview` previews the production build locally. Run `npm run build` first. Do not use a Live Server extension to open TSX files directly: Vite compiles them.

## 2. Connect Supabase (real database)

1. Create a free project at https://supabase.com/dashboard. Use sample data while learning.
2. Open SQL Editor → New query. Copy the **entire** `supabase/schema.sql` file and click Run. Run it once on a fresh project; it deliberately does not overwrite an existing table.
3. Find your project URL and **publishable key** in the project's Connect/API Keys interface. A legacy `anon` key also works. Do not use a secret or service-role key.
4. Copy `.env.example` to `.env.local` in the project root, beside `package.json`.
5. Add your own values:

```dotenv
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR-PUBLISHABLE-KEY
```

6. Stop Vite with Ctrl+C, then run `npm run dev` again. Vite reads environment variables at startup/build time.
7. Fill in the form with a test name and email, select a service and date, then submit.
8. Open Supabase → Table Editor → `booking_requests`. Your new row should have `status = pending`.
9. As the project owner, review and change a request's status in the Table Editor. There is no public admin dashboard in this starter.

**What happens:** React validates the form → Supabase JS sends an insert → PostgreSQL constraints and Row Level Security (RLS) validate it → a pending request is stored → the UI shows its reference ID.

**What does not happen:** No payment, email notification, guaranteed availability, staff assignment, or automatic confirmation. The displayed times are preferred times, not a live availability calendar. Multiple requests can ask for the same time.

## 3. Deploy to Vercel

This project is prepared for Vercel, but no Vercel account or Supabase project is created by the ZIP.

1. Create a new repository in your personal GitHub account.
2. Upload/push the contents of `aurelia-react`. Keep `package.json` at the repository root. Do not upload `node_modules`, `.env.local`, or the ZIP itself.
3. At https://vercel.com/new, import the repository.
4. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`. Node version: 22.x or 24.x.
5. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in the project's environment variables. Enable them for the environments you use (Production and optionally Preview).
6. Deploy. If you edit environment variables later, redeploy: Vite embeds them during the build.
7. Open the deployed URL and submit a test request. Verify the row in Supabase.

`vercel.json` includes the build settings and SPA fallback. No Express server or paid database is required for this learning starter.

### Free plan scope

Vercel Hobby is for **personal, non-commercial projects**. Use it for learning or a portfolio demo. A real salon business website is commercial and needs a suitable plan/provider; “free forever for commercial use” is not promised. Supabase Free is enough to start learning, subject to current quotas and inactivity policies. Check the official pages before a real launch:

- https://vercel.com/docs/plans/hobby
- https://vercel.com/docs/limits/fair-use-guidelines
- https://supabase.com/pricing

## 4. Learn the structure

| File                              | What to learn/edit                                         |
| --------------------------------- | ---------------------------------------------------------- |
| `src/main.tsx`                    | Mounts React into the HTML page                            |
| `src/App.tsx`                     | Composes sections and shares selected-service state        |
| `src/components/Header.tsx`       | React state for the mobile menu                            |
| `src/components/Presentation.tsx` | Hero, story, promo and footer content                      |
| `src/components/Services.tsx`     | Filtering arrays and rendering cards                       |
| `src/components/Gallery.tsx`      | React refs and native accessible dialog                    |
| `src/components/BookingForm.tsx`  | Form handling, async inserts, loading/error/success states |
| `src/data/services.ts`            | Editable services, starting prices, images, time options   |
| `src/lib/supabase.ts`             | Supabase browser client and demo-mode configuration        |
| `src/lib/booking.ts`              | Pure validation and Asia/Manila date handling              |
| `src/lib/booking.test.ts`         | Tests for date boundaries and invalid inputs               |
| `src/styles.css`                  | Original responsive design, breakpoints, focus styles      |
| `supabase/schema.sql`             | Table, constraints, privileges and RLS policy              |
| `.env.example`                    | Environment variable template                              |
| `vercel.json`                     | Hosting configuration                                      |

Suggested learning order: edit text → change a service price → explore filter state → follow `onBook` props → inspect form data → run SQL → inspect a saved row → add a field with both SQL and TypeScript validation.

## 5. Why this is not literal MERN

MERN means MongoDB + Express + React + Node. You asked for Supabase, whose database is PostgreSQL. This project uses **React + TypeScript + Vite + Supabase**. Node runs development/build tools; Supabase supplies the database API. A separate Express backend is unnecessary for these insert-only learning flows. You can add a server later when you need payment integrations, trusted business workflows, or private API credentials.

## 6. Security and production boundaries

- Only a browser-safe publishable key goes into `VITE_*`. All such values are visible in the browser bundle by design. Never place a service-role/secret key in frontend code.
- RLS is enabled. Guests can insert valid pending requests but cannot read, edit, or delete requests through the public API.
- Column grants prevent guests from setting `status` or `created_at`. Constraints enforce names, emails, allowed services and preferred times; RLS blocks past dates using Manila time.
- The honeypot is a lightweight bot trap, **not rate limiting**. Anonymous inserts can still be automated. Before accepting public business traffic, add a server/Edge Function with verified CAPTCHA and rate limiting, and remove the direct anonymous insert policy so it cannot be bypassed.
- Before a real launch, add your privacy notice/retention process, real contact details, salon-owned images, verified pricing, staff permissions, and any required confirmations.
- No secrets are included. The sample brand, menu and editorial images are not claims about a real salon or real client results.

## 7. Troubleshooting

| Symptom                                  | Cause / fix                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `npm` not recognized                     | Install Node, then restart VS Code                                                                           |
| `npm ci` fails                           | Check internet and supported Node version; use the included lockfile                                         |
| Form still says Demo                     | Both environment values are empty; check `.env.local` location and restart Vite                              |
| Config error                             | One value is missing or URL does not start with `https://`                                                   |
| Save request fails                       | Check project/key values, that SQL ran successfully, project is active, and selected date is not in the past |
| SELECT requests return permission errors | Expected: guest access is insert-only. Inspect data in the owner's Table Editor                              |
| SQL says table already exists            | Schema was already run; do not drop a table containing data. Inspect the existing schema first               |
| Vercel shows demo but localhost works    | Set production environment variables in Vercel and redeploy                                                  |
| Image/font missing                       | Remote Unsplash/Google assets need internet; replace with local assets if desired                            |

## Validation

TypeScript check, production build, and booking-validation tests are included. End-to-end inserts and RLS behavior require your own Supabase project; they have not been exercised against a live database for this ZIP. Responsive breakpoints are preserved from the original design; browser/device visual QA remains recommended.

Official technical references:

- https://supabase.com/docs/guides/getting-started/api-keys
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://vite.dev/guide/
- https://vercel.com/docs/frameworks/frontend/vite
