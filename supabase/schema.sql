-- Run once in a NEW Supabase project's SQL Editor.
-- Guest requests are insert-only; contact details are not publicly readable.
begin;
create table public.booking_requests (
 id uuid primary key,
 customer_name text not null check (char_length(btrim(customer_name)) between 2 and 80),
 email text not null check (char_length(email) <= 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 service_name text not null check (service_name in ('Cut & Style','Color & Dimension','Nail Rituals','Makeup Artistry','The Self-Care Duo')),
 preferred_date date not null,
 preferred_time text not null check (preferred_time in ('10:00 AM','11:30 AM','1:00 PM','2:30 PM','4:00 PM')),
 status text not null default 'pending' check (status in ('pending','confirmed','cancelled')),
 created_at timestamptz not null default now()
);
alter table public.booking_requests enable row level security;
revoke all on public.booking_requests from anon, authenticated;
grant insert (id,customer_name,email,service_name,preferred_date,preferred_time) on public.booking_requests to anon, authenticated;
create policy "Guests can submit pending future requests"
on public.booking_requests for insert to anon, authenticated
with check (status = 'pending' and preferred_date >= (now() at time zone 'Asia/Manila')::date);
-- No SELECT/UPDATE/DELETE policies for public clients.
-- The project owner can review requests in the Supabase Table Editor.
create index booking_requests_date_idx on public.booking_requests (preferred_date);
commit;
