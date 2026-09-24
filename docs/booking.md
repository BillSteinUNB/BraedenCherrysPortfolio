# Booking with Squire

Every website booking link uses `/book`. On Vercel, temporary redirects for `/book` and `/book/` go to the official Squire link `https://getsqr.co/braeden-taylor-3`. The edge redirect runs before the SPA rewrite, so clients do not have to load the React app, gallery or catalogue to begin booking. Squire resolves the shop and preselects Braeden. Service selection happens in Squire only.

The destination comes from the Squire barber profile's public Short Link. Keep `app/src/lib/booking.ts` and both redirects in `vercel.json` synchronized if that link changes. Do not copy a checkout/cart URL. The client-side `/book` route is a branded redirect fallback for local development and other hosts; `location.replace` prevents Back from getting caught in a redirect loop. Its Continue button remains usable if automatic navigation is blocked.

The homepage uses native links, a mobile bottom booking action with safe-area padding, and connection warming on pointer/focus intent. No Squire widget script loads on the homepage. All old provider scripts, iframe styles, modal code and public URLs were removed. The product section remains an in-shop catalogue.

## Why direct booking

During verification on 24 September 2026, the embedded booking page remained blank while the standalone flow reached service selection, available times and confirmation. Use the full-page Squire flow until an official custom-site embed has been supplied and tested. We cannot style or accelerate Squire's own screens. Narrow desktop-window testing is not a substitute for a phone: Squire served a fixed desktop viewport to this desktop browser.

## Verification and client acceptance

- Production TypeScript/Vite build and lint of changed source files pass.
- Full repository lint has eight existing errors in generated `components/ui` files (Fast Refresh export rules and sidebar render purity). Those files were not changed.
- Verified all six live Squire services and their prices; booking advances to available times and the confirmation screen. Pay in person is offered. No appointment, payment or notification was submitted.
- Verified homepage layouts at 320px, 390px and 1440px; no horizontal overflow at the narrow and desktop sizes. The mobile action is 56px tall and hidden on desktop.
- On the deployed site, test `/book`, `/book/`, each Book link, and browser Back. Test iPhone Safari and Android Chrome, including a fresh/private session to confirm the guest flow, keyboard and payment experience. The authenticated desktop session cannot prove first-time guest behavior.
- Squire selected a 20% tip by default in the inspected flow. Review that setting with the shop and verify the desired payment and cancellation policies. No financial settings were changed.
- Final appointment creation, confirmation delivery and cancellation need an owner-approved test booking. The client will perform this acceptance test.

Before retiring the old scheduling account, reconcile future appointments and outstanding obligations there. The supplied migration files did not establish a complete future appointment schedule. This website change does not close the old account or change its booking settings.
