# UI Components - Knowledge Base

**Domain:** shadcn/ui component library  
**Location:** `app/src/components/ui/`

## Overview

53 components following shadcn/ui patterns: Radix UI primitives + Tailwind + cva variants. All components use composition patterns via `@radix-ui/react-slot`.

## Naming Conventions

| Pattern | Example | Usage |
|---------|---------|-------|
| File naming | `button-group.tsx`, `navigation-menu.tsx` | kebab-case |
| Component naming | `Button`, `DialogContent` | PascalCase |
| Multi-part exports | `Card`, `CardHeader`, `CardTitle` | Named exports |

## Common Patterns

### Variant Components (cva)
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-white",
        outline: "border bg-background",
        secondary: "bg-secondary",
        ghost: "hover:bg-accent",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };
```

### Composition Pattern (Slot)
```tsx
import { Slot } from "@radix-ui/react-slot";

function Button({ asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" {...props} />;
}
```

### ClassName Merging
```tsx
import { cn } from "@/lib/utils";

// Always merge variants first, then className
className={cn(buttonVariants({ variant, size }), className)}
```

### Data Attributes
Components include `data-slot` attributes for styling hooks:
```tsx
<button data-slot="button" data-variant={variant} data-size={size} />
```

## Multi-Part Components

Components like Card, Dialog export multiple parts:

```tsx
// card.tsx
export const Card = React.forwardRef<...>...
export const CardHeader = React.forwardRef<...>...
export const CardTitle = React.forwardRef<...>...
export const CardContent = React.forwardRef<...>...
```

## Radix UI Integration

Many components wrap Radix primitives:

| Component | Radix Primitive |
|-----------|-----------------|
| Dialog | `@radix-ui/react-dialog` |
| Popover | `@radix-ui/react-popover` |
| Tooltip | `@radix-ui/react-tooltip` |
| Select | `@radix-ui/react-select` |
| Accordion | `@radix-ui/react-accordion` |
| Tabs | `@radix-ui/react-tabs` |

## Where to Look

| Task | Location | Notes |
|------|----------|-------|
| Button variants | `button.tsx` | Primary pattern for cva usage |
| Multi-part example | `card.tsx`, `dialog.tsx` | Sub-component composition |
| Simple component | `input.tsx` | No variants, basic pattern |
| Radix wrapper | `dialog.tsx`, `popover.tsx` | Complex primitive integration |
| Icons used | Any component | `lucide-react` icons |

## Adding New Components

1. Use kebab-case filename: `my-component.tsx`
2. Export PascalCase component
3. Use `cn()` for all className merging
4. Extend `React.ComponentProps<"element">` for types
5. Add `data-slot` attribute
6. Use cva if component has variants
7. Support `asChild` prop for composition

## Key Dependencies

- `class-variance-authority` - Variant definitions
- `@radix-ui/react-slot` - Composition primitive
- `lucide-react` - Icons
- `@/lib/utils` - `cn()` utility
