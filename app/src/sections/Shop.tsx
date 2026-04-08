import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { products } from '@/data';

export default function Shop() {
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-noir-rich"
    >
      <div className="w-full section-padding">
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-display text-white tracking-tight">
                THE SHOP
              </h2>
              <p className="mt-2 font-body text-gray-text">
                Product display only for now. Ask in store if you want anything
                from the shelf.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-cherry" />
              <span className="font-mono text-xs tracking-ultra text-white/70">
                DISPLAY ONLY
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`product-card group overflow-hidden rounded-sm bg-noir-elevated transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`,
                transitionTimingFunction: 'var(--ease-sharp)',
              }}
            >
              <div className="flex aspect-square items-center justify-center bg-gradient-to-b from-noir-elevated to-noir-rich p-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  style={{ transitionTimingFunction: 'var(--ease-sharp)' }}
                />
              </div>

              <div className="p-6">
                <span className="font-mono text-xs tracking-ultra text-white/40">
                  {product.category.toUpperCase()}
                </span>
                <h3 className="mt-1 mb-1 font-display text-lg text-white">
                  {product.name}
                </h3>
                <p className="mb-4 line-clamp-2 font-body text-sm text-gray-text">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg text-cherry">
                    ${product.price}
                  </span>
                  <span className="rounded-sm border border-white/10 bg-white/5 px-3 py-2 font-mono text-xs tracking-wide text-white/50">
                    DISPLAY
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
