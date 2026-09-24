import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Gallery from '@/sections/Gallery';
import Services from '@/sections/Services';
import MobileBookingBar from '@/sections/MobileBookingBar';
import Shop from '@/sections/Shop';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
      <div className="relative min-h-screen bg-noir-rich overflow-x-hidden pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-0">
        {/* Grain Overlay */}
        <div className="grain-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          <Hero />
          <Services />
          <Gallery />
          <Shop />
          <About />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Persistent mobile booking */}
        <MobileBookingBar />
      </div>
  );
}
