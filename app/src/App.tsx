import { lazy, Suspense } from 'react';
import BookingPage from '@/sections/BookingPage';

// Keep the gallery, product catalogue and home-page effects out of the booking bundle.
const Home = lazy(() => import('./Home'));

export default function App() {
  if (window.location.pathname.replace(/\/$/, '') === '/book') return <BookingPage />;
  return <Suspense fallback={<main className="min-h-screen bg-noir-rich" aria-label="Loading Cherry’s Barbershop" />}><Home /></Suspense>;
}
