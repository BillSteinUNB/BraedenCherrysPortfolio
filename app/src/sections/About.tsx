import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-noir-rich"
    >
      <div className="w-full section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="overflow-hidden">
            <div
              className={`relative transition-all duration-700 ${
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-12 opacity-0'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
            >
              <div className="aspect-[3/2] rounded-sm overflow-hidden">
                <img
                  src="/images/shop-interior.jpg"
                  alt="Cherry's Barbershop Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-cherry rounded-sm -z-10" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-12 opacity-0'
            }`}
            style={{
              transitionDelay: '0.2s',
              transitionTimingFunction: 'var(--ease-sharp)',
            }}
          >
            <h2 className="font-display text-display text-white tracking-tight mb-6">
              ABOUT CHERRY'S
            </h2>
            <div className="space-y-4 font-body text-white/70 leading-relaxed">
              <p className="text-xl text-white font-medium">
                Born in Moncton. Built on precision.
              </p>
              <p>
                We're not just cutting hair — we're crafting confidence. Every
                client leaves looking sharper and feeling better than when they
                walked in.
              </p>
              <p>
                Our shop is where streetwear culture meets classic barbering.
                No frills, no fuss. Just sharp cuts and good vibes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
