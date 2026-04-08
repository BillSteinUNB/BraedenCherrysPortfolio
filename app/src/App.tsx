import { BookingProvider } from '@/context/BookingContext';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Gallery from '@/sections/Gallery';
import Services from '@/sections/Services';
import BookingModal from '@/sections/BookingModal';
import Shop from '@/sections/Shop';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function App() {
  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-noir-rich overflow-x-hidden">
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

        {/* Modals */}
        <BookingModal />
      </div>
    </BookingProvider>
  );
}

export default App;
