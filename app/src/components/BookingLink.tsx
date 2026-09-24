import type { ComponentProps } from 'react';
import { BOOKING_PATH, warmBookingConnection } from '@/lib/booking';

export default function BookingLink(props: Omit<ComponentProps<'a'>, 'href'>) {
  return <a {...props} href={BOOKING_PATH} onPointerEnter={warmBookingConnection} onFocus={warmBookingConnection} />;
}
