import { ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-noir-rich"
    >
      <div className="w-full">
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 md:grid-cols-[1fr_0.85fr]">
          <div
            className={`section-padding flex items-center py-24 md:py-0 transition-all duration-700 ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-12 opacity-0'
            }`}
            style={{
              transitionDelay: '0.2s',
              transitionTimingFunction: 'var(--ease-sharp)',
            }}
          >
            <div className="w-full max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-ultra text-cherry">
                Cut culture
              </span>
              <h2 className="mb-6 mt-2 font-display text-display text-white">
                ABOUT CHERRY'S
              </h2>
              <div className="space-y-4 font-body leading-relaxed text-white/70">
                <p className="text-xl font-medium text-white">
                  Born in Moncton. Built on precision.
                </p>
                <p>
                  We're not just cutting hair. We're crafting confidence. Every
                  client leaves looking sharper and feeling better than when they
                  walked in.
                </p>
                <p>
                  The shop mixes classic barbering with a looser, personality-led
                  atmosphere: clean fades, sharp lines, conversation, and enough
                  character to make the chair feel like part of the brand.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`relative md:pr-16 lg:pr-24 xl:pr-28 2xl:pr-32 transition-all duration-700 ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : 'translate-x-12 opacity-0'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
          >
            <div className="relative h-[56vh] w-full overflow-hidden border-y border-white/10 bg-black md:min-h-screen md:border-y-0 md:border-l md:shadow-lift">
              <video
                className="h-full w-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/about/shop-chair-wide.jpg"
                aria-label="Cherry's Barbershop video montage"
              >
                <source src="/videos/cherrys-barber-ad.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/10" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] uppercase tracking-ultra text-white/65">
                  Video spot
                </span>
                <a
                  href="/videos/cherrys-barber-ad.mp4"
                  className="inline-flex items-center gap-2 border border-white/15 bg-black/45 px-3 py-2 font-mono text-[10px] uppercase tracking-wide text-white/75 backdrop-blur transition-colors duration-200 hover:border-cherry hover:text-white"
                >
                  Watch spot
                  <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="absolute -bottom-4 -right-4 -z-10 hidden h-24 w-24 border-2 border-cherry md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
