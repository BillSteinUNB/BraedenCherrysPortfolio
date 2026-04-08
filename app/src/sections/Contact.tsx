import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { businessInfo, businessHours } from '@/data';

export default function Contact() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();
  const mapQuery = encodeURIComponent(
    `${businessInfo.address}, ${businessInfo.city}, ${businessInfo.country}`
  );
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`;
  const isAppleDevice =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const mapsDirectionsUrl = isAppleDevice
    ? `https://maps.apple.com/?q=${mapQuery}`
    : `https://maps.google.com/?q=${mapQuery}`;

  const getTodayHours = () => {
    const today = new Date().getDay();
    return businessHours[today];
  };

  const today = getTodayHours();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-noir-rich"
    >
      <div className="w-full section-padding">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
        >
          <h2 className="font-display text-display text-white tracking-tight">
            FIND US
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-12 opacity-0'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
          >
            <div className="overflow-hidden rounded-sm border border-white/[0.06] bg-noir-elevated shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="relative aspect-[4/3] lg:min-h-[400px]">
                <iframe
                  title={`${businessInfo.name} map`}
                  src={mapsEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm bg-black/70 px-3 py-2 backdrop-blur-sm transition-colors duration-200 hover:bg-black/85"
                >
                  <MapPin className="h-4 w-4 text-cherry" />
                  <span className="font-mono text-xs tracking-wide text-white/90">
                    {businessInfo.address}
                  </span>
                </a>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-noir-elevated px-4 py-4">
                <div className="min-w-0">
                  <p className="font-display text-lg text-white">
                    {businessInfo.city}
                  </p>
                  <a
                    href={mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-gray-text transition-colors duration-200 hover:text-cherry"
                  >
                    {businessInfo.address}
                  </a>
                </div>
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex shrink-0 items-center gap-2"
                >
                  OPEN IN MAPS
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Info */}
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
            <div className="space-y-8">
              {/* Address */}
              <div>
                <h3 className="font-display text-h2 text-white mb-4">
                  CHERRY'S BARBERSHOP
                </h3>
                <div className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-5 h-5 text-cherry mt-1 flex-shrink-0" />
                  <div className="font-body">
                    <p>{businessInfo.address}</p>
                    <p>{businessInfo.city}</p>
                    <p>{businessInfo.country}</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <a
                  href={`tel:${businessInfo.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-3 text-white/70 hover:text-cherry transition-colors duration-200"
                >
                  <Phone className="w-5 h-5 text-cherry flex-shrink-0" />
                  <span className="font-mono">{businessInfo.phone}</span>
                </a>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-cherry transition-colors duration-200"
                >
                  <Mail className="w-5 h-5 text-cherry flex-shrink-0" />
                  <span className="font-body">{businessInfo.email}</span>
                </a>
              </div>

              {/* Hours */}
              <div>
                <h4 className="font-mono text-sm text-white/40 tracking-ultra mb-4">
                  HOURS
                </h4>
                <div className="space-y-2">
                  {businessHours.map((day) => (
                    <div
                      key={day.day}
                      className={`flex justify-between font-body text-sm ${
                        day.day === today.day
                          ? 'text-white'
                          : 'text-white/60'
                      }`}
                    >
                      <span>{day.day}</span>
                      <span className={day.isOpen ? '' : 'text-white/40'}>
                        {day.hours}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Today's Status */}
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-cherry/10 rounded-sm">
                  <div className="w-2 h-2 bg-cherry rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-cherry">
                    TODAY: {today.hours}
                  </span>
                </div>
              </div>

              {/* Directions CTA */}
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-flex items-center gap-2"
              >
                GET DIRECTIONS
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
