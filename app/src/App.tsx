import { CartProvider } from '@/context/CartContext';
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
import CartDrawer from '@/sections/CartDrawer';

function App() {
  return (
    <CartProvider>
      <BookingProvider>
        <div className="relative min-h-screen bg-noir-rich">
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

          {/* Drawers and Modals */}
          <CartDrawer />
          <BookingModal />
        </div>
      </BookingProvider>
    </CartProvider>
  );
}

export default App;
