import { ArrowUpRight } from 'lucide-react';
import { BOOKING_PATH, warmBookingConnection } from '@/lib/booking';

export default function MobileBookingBar() {
  return (
    <div className="mobile-booking-bar fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-noir-rich/95 px-4 pt-3 backdrop-blur-md md:hidden">
      <a href={BOOKING_PATH} onPointerEnter={warmBookingConnection} onFocus={warmBookingConnection}
        className="flex min-h-14 items-center justify-between rounded-sm bg-cherry px-5 font-body font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
        Book appointment <ArrowUpRight className="size-5" aria-hidden="true" />
      </a>
    </div>
  );
}
