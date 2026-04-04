# Cherry's Barbershop - Project Knowledge Base

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui  
**Theme:** Dark mode barbershop with cherry red accent

## Structure

```
app/
├── src/
│   ├── components/ui/     # 53 shadcn/ui components (see AGENTS.md there)
│   ├── sections/          # Page sections (Hero, Services, Shop, etc.)
│   ├── context/           # CartContext, BookingContext
│   ├── hooks/             # useScrollAnimation, use-mobile
│   ├── types/             # Product, CartItem, Service types
│   ├── data/              # Static data (products, services, hours)
│   └── lib/utils.ts       # cn() utility for Tailwind classes
├── index.html             # Entry point
├── vite.config.ts         # Vite + path aliases (@/src)
├── tailwind.config.js     # Custom cherry/noir theme
└── package.json
```

## Where to Look

| Task | Location | Notes |
|------|----------|-------|
| Add UI component | `components/ui/` | shadcn patterns, see subdirectory AGENTS.md |
| Add page section | `sections/` | Single-file section components |
| Global state | `context/` | Cart + Booking providers |
| Business data | `data/index.ts` | Products, services, hours, team |
| Shared types | `types/index.ts` | Domain types (Product, Service, etc.) |
| Styling utilities | `lib/utils.ts` | `cn()` for conditional classes |
| Theme colors | `tailwind.config.js` | cherry, noir palettes |
| Global styles | `index.css` | CSS variables, custom animations |

## Conventions

### Imports
- Use `@/` alias for all src imports: `import { Button } from '@/components/ui/button'`
- Never use relative imports like `../../components`

### Components
- **UI components:** PascalCase + kebab-case file (e.g., `button.tsx` exports `Button`)
- **Section components:** PascalCase files in `sections/` directory
- **Props:** Extend `React.ComponentProps<"element">` for native props

### Styling
- Use `cn()` utility from `@/lib/utils` for all className merging
- Tailwind custom colors: `cherry`, `cherry-bright`, `cherry-dark`, `noir-*`
- Animation easings via CSS vars: `var(--ease-sharp)`, `var(--ease-smooth)`

### State Management
- Context providers wrap App in `main.tsx`
- Custom hooks exported as `useXxx` from context files
- Always throw if hook used outside provider

## Commands

```bash
cd app
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint check
npm run preview    # Preview build
```

## Key Patterns

### Context Pattern
```tsx
// context/CartContext.tsx
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }) { /* ... */ }
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
```

### Component with Variants
```tsx
// Uses cva for variants, cn for merging
const buttonVariants = cva("base-classes", { variants: { /* ... */ } });
export function Button({ className, variant, ...props }) {
  return <button className={cn(buttonVariants({ variant }), className)} {...props} />;
}
```

## Notes

- **Path mapping:** `@/*` → `./src/*` (configured in vite.config.ts + tsconfig.json)
- **Dark theme only:** No light mode toggle; CSS variables set to dark values
- **External booking:** Uses Vagaro widget (see `BookingModal.tsx`)
- **Cart state:** In-memory only (no persistence)
- **Images:** Stored in `public/images/` (products, gallery, team)
