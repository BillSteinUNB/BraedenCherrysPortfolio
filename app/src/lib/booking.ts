// Official public short link from the Squire barber profile; Braeden is preselected.
// Preserve the short link so Squire can manage destination changes.
export const SQUIRE_BOOKING_URL = 'https://getsqr.co/braeden-taylor-3';
export const BOOKING_PATH = '/book';

let warmed = false;
export function warmBookingConnection() {
  if (warmed) return;
  warmed = true;
  for (const origin of [new URL(SQUIRE_BOOKING_URL).origin, 'https://getsquire.com']) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    document.head.appendChild(link);
  }
}
