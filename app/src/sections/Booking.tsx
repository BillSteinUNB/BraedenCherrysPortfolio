import { useEffect, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Calendar } from 'lucide-react';

const VAGARO_SCRIPT_SRC =
  'https://www.vagaro.com//resources/WidgetEmbeddedLoader/OZqqCZKnEJWcT3qmV35y79oz34mC2PeFJ4mC30m9dSycvCu7gevEhAJDXwOapcUbfY?v=XhhXr0v1haqd457gVaCoQgkDkWX7zDkTDWGPDVjYtss#';

export default function Booking() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();
  const vagaroDivRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  // Load Vagaro widget script
  useEffect(() => {
    if (scriptLoadedRef.current || !vagaroDivRef.current) return;

    const vagaroDiv = vagaroDivRef.current;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = VAGARO_SCRIPT_SRC;
    script.async = true;

    vagaroDiv.appendChild(script);
    scriptLoadedRef.current = true;

    return () => {
      if (vagaroDiv.contains(script)) {
        vagaroDiv.removeChild(script);
      }
      scriptLoadedRef.current = false;
    };
  }, []);

  // Listen for Vagaro booking widget events
  const handleVagaroMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== 'https://www.vagaro.com') return;

    try {
      const message = event.data;
      if (message?.eventName === 'BookingCompleted') {
        // Could trigger analytics, toast, etc.
        console.log('[Cherry\'s] Booking completed:', message.data);
      }
    } catch {
      // Silently ignore non-Vagaro messages
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleVagaroMessage);
    return () => window.removeEventListener('message', handleVagaroMessage);
  }, [handleVagaroMessage]);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-noir-rich overflow-hidden"
    >
      {/* Ambient glow behind widget */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cherry/[0.04] blur-3xl pointer-events-none" />

      <div className="w-full section-padding relative z-10">
        {/* Section Header */}
        <div
          className={`mb-12 text-center transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-cherry" />
            <span className="font-mono text-xs text-cherry tracking-ultra uppercase">
              APPOINTMENTS
            </span>
            <div className="h-px w-8 bg-cherry" />
          </div>
          <h2 className="font-display text-display text-white tracking-tight">
            BOOK YOUR CUT
          </h2>
          <p className="font-body text-gray-text mt-3 max-w-md mx-auto">
            Pick your service, choose a time, and you're locked in. Simple.
          </p>
        </div>

        {/* Widget Container */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-12 opacity-0'
          }`}
          style={{
            transitionDelay: '0.2s',
            transitionTimingFunction: 'var(--ease-sharp)',
          }}
        >
          {/* Framed widget card */}
          <div className="vagaro-widget-frame relative rounded-sm border border-white/[0.06] bg-white overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cherry to-transparent" />

            {/* Vagaro embed */}
            <div
              className="vagaro-widget-container"
            >
              {/* frameTitle div — Vagaro uses this for header text (left empty) */}
              <div
                id="frameTitle"
                className="embedded-widget-title"
                style={{
                  fontSize: '23px',
                  color: '#333',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  lineHeight: '24px',
                  padding: '18px 10px 8px',
                  textAlign: 'center',
                  boxSizing: 'border-box',
                }}
              />

              {/* Vagaro widget target */}
              <div
                ref={vagaroDivRef}
                className="vagaro"
                style={{
                  width: '250px',
                  padding: 0,
                  border: 0,
                  margin: '0 auto',
                  textAlign: 'center',
                }}
              >
                <style
                  dangerouslySetInnerHTML={{
                    __html: '.vagaro a { font-size: 12px; color: #999; text-decoration: none; }',
                  }}
                />
                <a href="https://www.vagaro.com/pro/">Powered by Vagaro</a>
                &nbsp;
                <a href="https://www.vagaro.com/pro/salon-software">
                  Salon Software
                </a>
                ,&nbsp;
                <a href="https://www.vagaro.com/pro/spa-software">
                  Spa Software
                </a>
                &nbsp;&amp;&nbsp;
                <a href="https://www.vagaro.com/pro/fitness-software">
                  Fitness Software
                </a>
              </div>
            </div>

            {/* Loading state — shown until widget loads */}
            <div className="vagaro-widget-loading absolute inset-0 flex flex-col items-center justify-center bg-white pointer-events-none transition-opacity duration-500">
              <Calendar className="w-8 h-8 text-cherry/40 mb-3 animate-pulse" />
              <span className="font-mono text-xs text-gray-400 tracking-wide">
                LOADING BOOKING...
              </span>
            </div>
          </div>

          {/* Phone fallback */}
          <p
            className={`text-center mt-6 font-body text-sm text-white/40 transition-all duration-700 ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
            style={{
              transitionDelay: '0.4s',
              transitionTimingFunction: 'var(--ease-sharp)',
            }}
          >
            Prefer to call?{' '}
            <a
              href="tel:6394142877"
              className="text-cherry hover:text-cherry-bright transition-colors duration-200"
            >
              (639) 414-2877
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
