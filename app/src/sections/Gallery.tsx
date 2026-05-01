import { useCallback, useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { galleryItems } from '@/data';
import { cn } from '@/lib/utils';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  const count = galleryItems.length;
  const prevIndex = (focusedIndex - 1 + count) % count;
  const nextIndex = (focusedIndex + 1) % count;

  const goPrev = useCallback(() => {
    setFocusedIndex((i) => (i === 0 ? count - 1 : i - 1));
  }, [count]);

  const goNext = useCallback(() => {
    setFocusedIndex((i) => (i === count - 1 ? 0 : i + 1));
  }, [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedImage !== null) return;
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext, selectedImage]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage((prev) => {
      if (prev !== null) setFocusedIndex(prev);
      return null;
    });
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex =
      direction === 'prev'
        ? selectedImage === 0
          ? galleryItems.length - 1
          : selectedImage - 1
        : selectedImage === galleryItems.length - 1
          ? 0
          : selectedImage + 1;
    setSelectedImage(newIndex);
  };

  const focused = galleryItems[focusedIndex];
  const prevItem = galleryItems[prevIndex];
  const nextItem = galleryItems[nextIndex];

  const peekLeftIndices = [2, 3].map((k) => (focusedIndex - k + count) % count);
  const peekRightIndices = [2, 3].map((k) => (focusedIndex + k) % count);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-noir-rich py-24 md:py-32"
    >
      <div className="w-full section-padding">
        {/* Section Header */}
        <div
          className={`mb-12 flex items-end justify-between transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
        >
          <div>
            <h2 className="font-display text-display tracking-tight text-white">
              THE WORK
            </h2>
            <p className="mt-2 font-body text-gray-text">
              Portfolio of precision.
            </p>
          </div>
          <button
            type="button"
            className="hidden font-body text-sm text-white/60 transition-colors duration-200 hover:text-cherry md:block"
          >
            View All →
          </button>
        </div>

        {/* Carousel: side previews + hero center */}
        <div
          className={cn(
            'transition-all duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          )}
          style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
        >
          <div className="mx-auto grid w-full max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-2 sm:items-center sm:gap-3 md:gap-4 lg:max-w-6xl">
            {/* Prev arrow + faded “deck” hinting more slides */}
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-cherry hover:bg-white/5 hover:text-white md:size-12"
                aria-label="Previous haircut"
              >
                <ChevronLeft className="size-5 md:size-6" />
              </button>
              <div
                key={`peek-left-${focusedIndex}`}
                className="flex flex-col gap-1.5 animate-fade-in"
                aria-hidden="true"
              >
                {peekLeftIndices.map((idx) => (
                  <div
                    key={idx}
                    className="pointer-events-none relative aspect-[3/4] w-7 overflow-hidden rounded-sm border border-white/5 opacity-30 sm:w-9 md:w-10"
                  >
                    <img
                      src={galleryItems[idx].image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/55" />
                  </div>
                ))}
              </div>
            </div>

            {/* Three-up: sides smaller than center; center still ~10% wider than each side slot */}
            <div className="grid min-w-0 grid-cols-[1fr_1.1fr_1fr] items-center gap-2 sm:gap-3 md:gap-4">
              <div className="flex min-h-0 min-w-0 justify-end">
                <button
                  type="button"
                  onClick={() => setFocusedIndex(prevIndex)}
                  className="cut-card relative aspect-[3/4] w-[62%] max-w-[9.5rem] min-w-0 overflow-hidden rounded-sm border border-white/10 opacity-80 transition-opacity duration-300 hover:opacity-100 sm:w-[68%] sm:max-w-[11rem] md:max-w-[12rem]"
                  aria-label={`View previous: ${prevItem.title}`}
                >
                  <img
                    key={prevIndex}
                    src={prevItem.image}
                    alt=""
                    className="h-full w-full object-cover animate-fade-in"
                    loading="lazy"
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={() => openLightbox(focusedIndex)}
                className="cut-card relative aspect-[3/4] w-full min-w-0 overflow-hidden rounded-sm border border-white/15 bg-noir-elevated shadow-lift"
                aria-label={`Open ${focused.title} in full screen`}
              >
                <div
                  key={focusedIndex}
                  className="absolute inset-0 animate-fade-in"
                >
                  <img
                    src={focused.image}
                    alt={focused.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-left sm:p-4 md:p-5">
                  <span className="font-mono text-[10px] uppercase tracking-ultra text-white/65 sm:text-xs">
                    {focused.category.toUpperCase()}
                  </span>
                  <h3 className="font-display text-lg text-white sm:text-xl md:text-2xl lg:text-3xl">
                    {focused.title}
                  </h3>
                </div>
              </button>

              <div className="flex min-h-0 min-w-0 justify-start">
                <button
                  type="button"
                  onClick={() => setFocusedIndex(nextIndex)}
                  className="cut-card relative aspect-[3/4] w-[62%] max-w-[9.5rem] min-w-0 overflow-hidden rounded-sm border border-white/10 opacity-80 transition-opacity duration-300 hover:opacity-100 sm:w-[68%] sm:max-w-[11rem] md:max-w-[12rem]"
                  aria-label={`View next: ${nextItem.title}`}
                >
                  <img
                    key={nextIndex}
                    src={nextItem.image}
                    alt=""
                    className="h-full w-full object-cover animate-fade-in"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={goNext}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-cherry hover:bg-white/5 hover:text-white md:size-12"
                aria-label="Next haircut"
              >
                <ChevronRight className="size-5 md:size-6" />
              </button>
              <div
                key={`peek-right-${focusedIndex}`}
                className="flex flex-col gap-1.5 animate-fade-in"
                aria-hidden="true"
              >
                {peekRightIndices.map((idx) => (
                  <div
                    key={idx}
                    className="pointer-events-none relative aspect-[3/4] w-7 overflow-hidden rounded-sm border border-white/5 opacity-30 sm:w-9 md:w-10"
                  >
                    <img
                      src={galleryItems[idx].image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/55" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {galleryItems.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show haircut ${i + 1}`}
                aria-current={i === focusedIndex}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors duration-200',
                  i === focusedIndex
                    ? 'bg-cherry'
                    : 'bg-white/25 hover:bg-white/50'
                )}
                onClick={() => setFocusedIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <button
            type="button"
            className="font-body text-sm text-white/60 transition-colors duration-200 hover:text-cherry"
          >
            View All →
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex min-h-[44px] min-w-[44px] items-center justify-center p-3 text-white/60 transition-colors hover:text-white sm:right-6 sm:top-6"
            aria-label="Close lightbox"
          >
            <X className="size-6 sm:size-8" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('prev');
            }}
            className="absolute left-4 rounded-full p-3 text-white/60 transition-all hover:bg-white/10 hover:text-white md:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-8" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox('next');
            }}
            className="absolute right-4 rounded-full p-3 text-white/60 transition-all hover:bg-white/10 hover:text-white md:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="size-8" />
          </button>

          <div
            className="max-h-[80vh] max-w-4xl px-4 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[selectedImage].image}
              alt={galleryItems[selectedImage].title}
              className="max-h-[80vh] max-w-full animate-scale-in object-contain"
            />
            <div className="mt-4 text-center">
              <span className="font-mono text-xs tracking-ultra text-white/60">
                {galleryItems[selectedImage].category.toUpperCase()}
              </span>
              <h3 className="mt-1 font-display text-xl text-white sm:text-2xl">
                {galleryItems[selectedImage].title}
              </h3>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-white/40">
            {selectedImage + 1} / {galleryItems.length}
          </div>
        </div>
      )}
    </section>
  );
}
