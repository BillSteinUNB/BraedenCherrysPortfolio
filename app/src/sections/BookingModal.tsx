import { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { useBooking } from '@/context/BookingContext';

const VAGARO_SCRIPT_SRC =
  'https://www.vagaro.com//resources/WidgetEmbeddedLoader/OZqqCZKnEJWcT3qmV35y79oz34mC2PeFJ4mC30m9dSycvCu7gevEhAJDXwOapcUbfY?v=XhhXr0v1haqd457gVaCoQgkDkWX7zDkTDWGPDVjYtss#';
const BOOKING_FALLBACK_URL = 'https://www.vagaro.com/cherrysbarber';

function VagaroWidget({ instanceKey }: { instanceKey: number }) {
  const widgetContainerRef = useRef<HTMLDivElement>(null);
  const vagaroRootRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const [widgetState, setWidgetState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (scriptLoadedRef.current || !widgetContainerRef.current || !vagaroRootRef.current) return;

    const container = widgetContainerRef.current;
    const vagaroRoot = vagaroRootRef.current;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = VAGARO_SCRIPT_SRC;
    script.async = true;

    const observeIframe = () => {
      const iframe = container.querySelector('iframe');
      if (!iframe) return;

      setWidgetState('ready');
      iframe.addEventListener('load', () => setWidgetState('ready'), { once: true });
    };

    const iframeObserver = new MutationObserver(() => observeIframe());
    iframeObserver.observe(container, { childList: true, subtree: true });

    script.addEventListener('error', () => setWidgetState('error'));
    setWidgetState('loading');
    vagaroRoot.appendChild(script);
    observeIframe();
    scriptLoadedRef.current = true;

    const timeoutId = window.setTimeout(() => {
      setWidgetState((current) => (current === 'loading' ? 'error' : current));
    }, 15000);

    return () => {
      window.clearTimeout(timeoutId);
      iframeObserver.disconnect();

      if (vagaroRoot.contains(script)) {
        vagaroRoot.removeChild(script);
      }
      scriptLoadedRef.current = false;
    };
  }, [instanceKey]);

  const handleVagaroMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== 'https://www.vagaro.com') return;

    try {
      const message = event.data;
      if (message?.eventName === 'BookingCompleted') {
        console.log('[Cherry\'s] Booking completed:', message.data);
      }
    } catch {
      // Silently ignore non-Vagaro messages.
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleVagaroMessage);
    return () => window.removeEventListener('message', handleVagaroMessage);
  }, [handleVagaroMessage]);

  return (
    <div className="vagaro-widget-frame relative overflow-hidden rounded-sm border border-white/[0.06] bg-white">
      <div className="absolute top-0 left-0 right-0 z-[2] h-[2px] bg-gradient-to-r from-transparent via-cherry to-transparent" />

      <div ref={widgetContainerRef} className="vagaro-widget-container">
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

        <div
          ref={vagaroRootRef}
          className="vagaro"
          style={{
            width: '100%',
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
          <a href="https://www.vagaro.com/pro/salon-software">Salon Software</a>,&nbsp;
          <a href="https://www.vagaro.com/pro/spa-software">Spa Software</a>
          &nbsp;&amp;&nbsp;
          <a href="https://www.vagaro.com/pro/fitness-software">Fitness Software</a>
        </div>
      </div>

      <div
        className={`vagaro-widget-loading absolute inset-0 z-[3] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
          widgetState === 'ready'
            ? 'pointer-events-none opacity-0'
            : widgetState === 'error'
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-100'
        }`}
      >
        {widgetState === 'error' ? (
          <>
            <span className="mb-4 font-mono text-xs tracking-wide text-gray-500">BOOKING WIDGET UNAVAILABLE</span>
            <a
              href={BOOKING_FALLBACK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-sm bg-cherry px-4 py-2 font-mono text-xs tracking-wide text-white transition-colors duration-200 hover:bg-cherry-bright"
            >
              OPEN BOOKING PAGE
            </a>
          </>
        ) : (
          <>
            <Calendar className="mb-3 h-8 w-8 animate-pulse text-cherry/40" />
            <span className="font-mono text-xs tracking-wide text-gray-400">LOADING BOOKING...</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function BookingModal() {
  const { isBookingOpen, openBooking, closeBooking } = useBooking();
  const [widgetInstanceKey, setWidgetInstanceKey] = useState(0);

  useEffect(() => {
    if (isBookingOpen) {
      setWidgetInstanceKey((current) => current + 1);
    }
  }, [isBookingOpen]);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openBooking();
      return;
    }

    closeBooking();
  };

  return (
    <Dialog open={isBookingOpen} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <DialogContent
          showCloseButton={false}
          className="fixed inset-0 z-50 !top-0 !left-0 !max-w-none !translate-x-0 !translate-y-0 !rounded-none !border-0 !bg-transparent !p-4 !shadow-none !outline-none sm:!p-6"
        >
          <div className="flex min-h-full w-full items-center justify-center py-6">
            <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-sm border border-white/[0.06] bg-noir-elevated shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.5),0_0_80px_rgba(196,30,58,0.06)] max-h-[90vh] animate-slide-up-fade">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cherry to-transparent" />

              <div className="flex items-start justify-between gap-6 border-b border-white/10 px-5 py-5 sm:px-8">
                <div>
                  <div className="mb-3 inline-flex items-center gap-3">
                    <div className="h-px w-8 bg-cherry" />
                    <span className="font-mono text-xs uppercase tracking-ultra text-cherry">APPOINTMENTS</span>
                    <div className="h-px w-8 bg-cherry" />
                  </div>
                  <DialogTitle className="font-display text-3xl tracking-tight text-white">BOOK YOUR CUT</DialogTitle>
                  <DialogDescription className="sr-only">
                    Schedule your appointment using the embedded Vagaro booking widget.
                  </DialogDescription>
                </div>

                <DialogClose asChild>
                  <button
                    type="button"
                    className="rounded-sm p-2 text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white"
                    aria-label="Close booking modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </DialogClose>
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-5">
                {isBookingOpen ? <VagaroWidget instanceKey={widgetInstanceKey} /> : null}
              </div>

              <div className="border-t border-white/10 px-5 py-4 text-center sm:px-8">
                <p className="font-body text-sm text-white/40">
                  Prefer to call?{' '}
                  <a href="tel:6394142877" className="text-cherry transition-colors duration-200 hover:text-cherry-bright">
                    (639) 414-2877
                  </a>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
