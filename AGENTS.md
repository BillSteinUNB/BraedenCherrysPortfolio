# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-04
**Commit:** 5c68a82
**Branch:** main

## OVERVIEW

Cherry's Barbershop portfolio website — React 19 SPA with Vite, TypeScript, Tailwind CSS, and Shadcn/ui. Deployed on Vercel.

## STRUCTURE

```
/
├── app/                    # Main React app (NON-STANDARD: nested)
│   ├── src/
│   │   ├── components/ui/  # Shadcn components (53 files, AUTO-GENERATED)
│   │   ├── sections/       # Page sections (Hero, Services, Gallery, Shop, etc.)
│   │   ├── context/        # React contexts (CartContext, BookingContext)
│   │   ├── hooks/          # Custom hooks (useScrollAnimation, useIsMobile)
│   │   ├── types/          # TypeScript interfaces (Product, Service, etc.)
│   │   ├── data/           # Static business data (products, services, hours)
│   │   └── lib/            # Utilities (cn = clsx + tailwind-merge)
│   ├── public/             # Static assets (images)
│   └── dist/               # Build output (DO NOT COMMIT)
├── vercel.json             # Deployment config (targets /app)
└── *.xls                   # Unrelated Excel files (ignore)
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add/modify page sections | `app/src/sections/*.tsx` | Hero, Services, Gallery, Shop, About, Contact, Footer |
| Add new UI component | Run `npx shadcn@latest add <component>` in app/ | DO NOT edit ui/ directly |
| Business data (prices, hours) | `app/src/data/index.ts` | products, services, galleryItems, businessHours, businessInfo |
| Type definitions | `app/src/types/index.ts` | Product, CartItem, Service, GalleryItem, TeamMember, BusinessHours |
| Global state | `app/src/context/` | CartContext (cart), BookingContext (modal state) |
| Custom hooks | `app/src/hooks/` | useScrollAnimation, useIsMobile |
| Styling/theme | `app/tailwind.config.js` | Custom colors (cherry, noir), fonts, animations |
| Deployment config | `vercel.json` | Build command, output directory |

## CONVENTIONS

**Path Aliases:**
- `@/*` → `./src/*` (configured in tsconfig.json, vite.config.ts)

**Component Pattern:**
- Section components: default export from `sections/*.tsx`
- Use `useScrollAnimation` for scroll-triggered animations
- Context access via hooks: `useCart()`, `useBooking()`

**Styling:**
- Tailwind CSS with CSS variables for theming
- Custom colors: `cherry` (#C41E3A), `noir` (blacks/grays)
- Fonts: `font-display` (Bebas Neue), `font-body` (Inter), `font-mono` (Space Mono)
- Custom animations: `animate-slide-up`, `animate-fade-in`, `animate-scale-in`
- Utility: `cn()` from `@/lib/utils` for class merging

**State Management:**
- React Context (no Redux/Zustand)
- CartContext: items, total, addToCart, removeFromCart, updateQuantity
- BookingContext: isBookingOpen, openBooking, closeBooking

## ANTI-PATTERNS (THIS PROJECT)

- **NEVER** edit `app/src/components/ui/*` directly — use shadcn CLI to add/update
- **NEVER** commit `app/dist/` to VCS — it's build output
- **NEVER** assume root has package.json — project lives in `/app`
- **AVOID** using root Excel files — unrelated to the app

## COMMANDS

```bash
# Development (MUST cd into app/)
cd app && npm run dev

# Build
cd app && npm run build

# Preview production build
cd app && npm run preview

# Add Shadcn component
cd app && npx shadcn@latest add <component>

# Lint
cd app && npm run lint
```

## NOTES

- **Non-standard layout:** App is in `/app` subfolder, not repo root. All npm commands require `cd app` first.
- **Vercel config** at root handles the nested structure with `cd app && npm install && npm run build`
- **No tests** configured in this project
- **No backend** — pure client-side SPA, booking links to external Vagaro service
