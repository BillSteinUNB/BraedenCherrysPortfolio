import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { products } from '@/data';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

const familyDefinitions = [
  { id: 'beard-balm', category: 'Beard Balm', label: 'Beard Balm' },
  { id: 'beard-body-wash', category: 'Wash', label: 'Beard Body Wash' },
  { id: 'beard-oil', category: 'Beard Oil', label: 'Beard Oil' },
  { id: 'fiber-cream', category: 'Styling Cream', label: 'Fiber Cream' },
  { id: 'pomade', category: 'Pomade', label: 'Pomade' },
] as const;

interface ProductFamily {
  id: string;
  label: string;
  products: Product[];
}

function getScentClass(scent?: string) {
  if (!scent) return 'text-gray-text';

  const normalizedScent = scent.toLowerCase();

  if (normalizedScent.includes('bergamot') || normalizedScent.includes('grapefruit')) {
    return 'text-[#f4a261]';
  }

  if (normalizedScent.includes('peppermint') || normalizedScent.includes('cedarwood')) {
    return 'text-[#9be7c4]';
  }

  if (normalizedScent.includes('eclipse')) {
    return 'text-[#8f6bdc]';
  }

  return 'text-gray-text';
}

export default function Shop() {
  const [variantIndexes, setVariantIndexes] = useState<Record<string, number>>({});
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id);
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))),
    []
  );

  const productFamilies = useMemo<ProductFamily[]>(
    () =>
      familyDefinitions.map((family) => ({
        id: family.id,
        label: family.label,
        products: products.filter((product) => product.category === family.category),
      })),
    []
  );

  const visibleProducts = useMemo(
    () =>
      productFamilies
        .map((family) => {
          const activeIndex = variantIndexes[family.id] ?? 0;
          return family.products[activeIndex] ?? family.products[0];
        })
        .filter(Boolean),
    [productFamilies, variantIndexes]
  );

  const selectedProduct =
    visibleProducts.find((product) => product.id === selectedProductId) ??
    visibleProducts[0] ??
    products[0];

  const selectedIndex = Math.max(
    visibleProducts.findIndex((product) => product.id === selectedProduct.id),
    0
  );

  const navigateFeatured = (direction: 'previous' | 'next') => {
    if (!visibleProducts.length) return;

    const offset = direction === 'previous' ? -1 : 1;
    const nextIndex =
      (selectedIndex + offset + visibleProducts.length) % visibleProducts.length;

    setSelectedProductId(visibleProducts[nextIndex].id);
  };

  const navigateFamilyVariant = (family: ProductFamily, direction: 'previous' | 'next') => {
    if (family.products.length < 2) return;

    const currentIndex = variantIndexes[family.id] ?? 0;
    const offset = direction === 'previous' ? -1 : 1;
    const nextIndex =
      (currentIndex + offset + family.products.length) % family.products.length;
    const nextProduct = family.products[nextIndex];

    setVariantIndexes((current) => ({
      ...current,
      [family.id]: nextIndex,
    }));
    setSelectedProductId(nextProduct.id);
  };

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="relative overflow-hidden bg-noir-rich py-24 md:py-32"
    >
      <div className="w-full section-padding">
        <div
          className={cn(
            'mb-12 transition-all duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
          style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-ultra text-cherry">
                Shelf lineup
              </span>
              <h2 className="mt-2 font-display text-display text-white">
                OUR PRODUCTS
              </h2>
              <p className="mt-3 max-w-xl font-body text-sm leading-6 text-gray-text md:text-base">
                A rotating in-shop product shelf featuring beard care from
                Educated Beards and styling essentials from REUZEL.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 border-y border-white/10 py-4 sm:flex sm:border sm:bg-white/[0.03] sm:px-5">
              <div>
                <span className="font-mono text-2xl text-white">
                  {products.length}
                </span>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-ultra text-white/45">
                  Products
                </p>
              </div>
              <div>
                <span className="font-mono text-2xl text-white">
                  {brands.length}
                </span>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-ultra text-white/45">
                  Brands
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]',
            'transition-all duration-700',
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          )}
          style={{
            transitionDelay: '0.16s',
            transitionTimingFunction: 'var(--ease-sharp)',
          }}
        >
          <div className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_45%,rgba(196,30,58,0.08))] p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div className="flex h-full min-h-[468px] items-center justify-center">
              <img
                key={selectedProduct.id}
                src={selectedProduct.image}
                alt={`${selectedProduct.brand} ${selectedProduct.name}${
                  selectedProduct.scent ? ` ${selectedProduct.scent}` : ''
                }`}
                className="max-h-[460px] w-full max-w-[620px] animate-scale-in object-contain drop-shadow-[0_28px_55px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>

          <div className="flex min-h-[520px] flex-col justify-between border border-white/10 bg-noir-elevated p-6 sm:p-8">
            <div>
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-ultra text-cherry">
                    {selectedProduct.brand}
                  </p>
                  <h3 className="mt-3 font-display text-4xl text-white sm:text-5xl">
                    {selectedProduct.name}
                  </h3>
                  {selectedProduct.scent && (
                    <p
                      className={cn(
                        'mt-2 font-body text-lg',
                        getScentClass(selectedProduct.scent)
                      )}
                    >
                      {selectedProduct.scent}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right font-mono text-xs text-white/35">
                  {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                  {String(visibleProducts.length).padStart(2, '0')}
                </div>
              </div>

              <p className="font-body text-base leading-7 text-gray-text">
                {selectedProduct.detail}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs uppercase tracking-wide text-white/60">
                  {selectedProduct.category}
                </span>
                {selectedProduct.finish && (
                  <span className="border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs uppercase tracking-wide text-white/60">
                    {selectedProduct.finish}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
              <button
                type="button"
                className="flex size-11 items-center justify-center border border-white/10 text-white/60 transition-colors duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
                onClick={() => navigateFeatured('previous')}
                aria-label="Previous product"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span className="font-mono text-xs uppercase tracking-ultra text-white/40">
                Display only
              </span>
              <button
                type="button"
                className="flex size-11 items-center justify-center border border-white/10 text-white/60 transition-colors duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white"
                onClick={() => navigateFeatured('next')}
                aria-label="Next product"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productFamilies.map((family, index) => {
            const product =
              family.products[variantIndexes[family.id] ?? 0] ?? family.products[0];
            const hasVariants = family.products.length > 1;

            if (!product) return null;

            return (
            <button
              key={family.id}
              type="button"
              className={cn(
                'group flex min-h-[275px] flex-col overflow-hidden border bg-noir-elevated text-left transition-all duration-500',
                product.id === selectedProduct.id
                  ? 'border-cherry/70 shadow-cherry-sm'
                  : 'border-white/10 hover:border-white/25 hover:bg-white/[0.06]',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              )}
              style={{
                transitionDelay: `${0.2 + index * 0.04}s`,
                transitionTimingFunction: 'var(--ease-sharp)',
              }}
              onClick={() => setSelectedProductId(product.id)}
            >
              <div className="relative flex h-40 items-center justify-center bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.16),rgba(255,255,255,0.03)_60%,rgba(0,0,0,0)_100%)] p-5">
                {hasVariants && (
                  <>
                    <span
                      role="button"
                      tabIndex={0}
                      className="absolute left-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/35 text-white/55 transition-colors duration-200 hover:border-white/30 hover:bg-black/60 hover:text-white"
                      aria-label={`Previous ${family.label} variant`}
                      onClick={(event) => {
                        event.stopPropagation();
                        navigateFamilyVariant(family, 'previous');
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          event.stopPropagation();
                          navigateFamilyVariant(family, 'previous');
                        }
                      }}
                    >
                      <ChevronLeft className="size-4" />
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      className="absolute right-2 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center border border-white/10 bg-black/35 text-white/55 transition-colors duration-200 hover:border-white/30 hover:bg-black/60 hover:text-white"
                      aria-label={`Next ${family.label} variant`}
                      onClick={(event) => {
                        event.stopPropagation();
                        navigateFamilyVariant(family, 'next');
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          event.stopPropagation();
                          navigateFamilyVariant(family, 'next');
                        }
                      }}
                    >
                      <ChevronRight className="size-4" />
                    </span>
                  </>
                )}
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.name}${
                    product.scent ? ` ${product.scent}` : ''
                  }`}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-ultra text-white/40">
                    {product.brand}
                  </p>
                  <h4 className="mt-2 font-display text-xl text-white">
                    {family.label}
                  </h4>
                  {(product.scent || product.name !== family.label) && (
                    <p
                      className={cn(
                        'mt-1 font-body text-xs leading-5',
                        getScentClass(product.scent)
                      )}
                    >
                      {product.scent ?? product.name}
                    </p>
                  )}
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-cherry">
                  {hasVariants
                    ? `${(variantIndexes[family.id] ?? 0) + 1} / ${family.products.length}`
                    : product.finish ?? product.category}
                </p>
              </div>
            </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
