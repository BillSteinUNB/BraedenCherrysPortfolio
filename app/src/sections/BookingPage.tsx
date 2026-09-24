import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SQUIRE_BOOKING_URL, warmBookingConnection } from '@/lib/booking';

// Vercel redirects /book at the edge. This is the fallback for local development
// and hosts without that redirect. replace() keeps Back from redirecting again.
export default function BookingPage() {
  useEffect(() => {
    document.title = "Book an appointment | Cherry's Barbershop";
    warmBookingConnection();
    window.location.replace(SQUIRE_BOOKING_URL);
  }, []);

  return (
    <main className="booking-page bg-noir-rich px-6 text-white">
      <a href="/" className="absolute left-6 top-6 flex min-h-11 items-center gap-2 text-sm text-white/70">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to the shop
      </a>
      <div className="w-full max-w-md">
        <p className="font-mono text-xs uppercase tracking-ultra text-cherry">Cherry's Barbershop</p>
        <h1 className="mt-4 font-display text-5xl">YOUR NEXT CUT STARTS HERE.</h1>
        <p className="mt-4 leading-relaxed text-white/70" role="status">Opening booking with Braeden. Choose your service, find your time, and you're set.</p>
        <a href={SQUIRE_BOOKING_URL} className="mt-8 flex min-h-14 items-center justify-between rounded-sm bg-cherry px-5 font-semibold text-white">
          Continue to booking <ArrowUpRight className="size-5" aria-hidden="true" />
        </a>
        <p className="mt-4 text-sm text-white/50">If booking hasn't opened, use the button above.</p>
      </div>
    </main>
  );
}
