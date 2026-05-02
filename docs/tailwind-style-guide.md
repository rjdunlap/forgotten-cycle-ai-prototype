# Tailwind CSS Style Guide

This document outlines the Tailwind CSS conventions used in the Forgotten Cycle project. All classes should follow these patterns to maintain visual and code consistency.

## Overview

The project uses a dark, atmospheric "ember" theme with warm accent colors against deep green-black backgrounds. Tailwind is configured with custom colors in `tailwind.config.ts` and extended in `src/styles.css`.

---

## Color Palette

Use only the custom `ember-*` colors defined in the config. Do not use Tailwind's default colors (e.g., `bg-red-500`) unless for specific effects like gradients.

### Backgrounds

| Class | Hex | Usage |
|-------|-----|-------|
| `bg-ember-bg` | `#101410` | Main page background, dialog backgrounds |
| `bg-ember-bg/90` | `rgba(16,20,16,0.9)` | Card/panel backgrounds (with opacity) |
| `bg-ember-panel` | `#1c241d` | Content panels, cards |
| `bg-ember-panel-strong` | `#253026` | Interactive elements (buttons, active states) |
| `bg-[#121812]` | — | Dark inset areas (e.g., cycle counter) |
| `bg-[#101510]` | — | Progress bar track |

### Text

| Class | Hex | Usage |
|-------|-----|-------|
| `text-ember-text` | `#f4f0e5` | Primary text |
| `text-ember-muted` | `#b8b19f` | Secondary text, labels, logs |
| `text-ember-accent-strong` | `#f0c86a` | Headings, important values, cycle counter |
| `text-ember-accent` | `#d6a84f` | Subtle accents |
| `text-ember-red` | `#c56b58` | Danger states, heat/urgency indicators |

### Borders & Lines

| Class | Hex | Usage |
|-------|-----|-------|
| `border-ember-line` | `#3a493d` | Default borders, dividers |
| `border-ember-accent` | `#d6a84f` | Accent borders |
| `border-ember-accent/20` | `rgba(214,168,79,0.2)` | Subtle accent borders |
| `border-ember-accent/40` | `rgba(214,168,79,0.4)` | Stronger accent borders |

### Gradients

- Use for progress bars and meter fills: `bg-gradient-to-r from-ember-red to-ember-accent-strong`

---

## Typography

### Font Family

Always use the custom sans stack:
- `font-sans` (includes Inter, falls back to system UI)

### Font Sizes

Use these specific sizes for consistency:

| Class | Size | Usage |
|-------|------|-------|
| `text-[0.72rem]` | ~11.5px | Labels, badges, small caps |
| `text-[0.86rem]` | ~13.8px | Log entries, secondary text |
| `text-[0.88rem]` | ~14px | Secondary descriptions |
| `text-base` | 16px | Standard body text |
| `text-sm` | 14px | Dialog body text |
| `text-xl` | 20px | Dialog headings |
| `text-[1.65rem]` | ~26px | Main title |
| `text-[1.6rem]` | ~25.6px | Large numbers (cycle counter) |

### Font Weights

| Class | Usage |
|-------|-------|
| `font-bold` | Headings, buttons |
| `font-extrabold` | Labels, badges (uppercase) |

### Line Height

| Class | Usage |
|-------|-------|
| `leading-none` | Tight headings (title, dialog title) |
| `leading-tight` | Large text with tight spacing |
| Default | Normal line height for body text |

### Text Transform

- `uppercase` for labels and badges
- Use sparingly (only for visual labels)

---

## Spacing

The project uses a custom spacing scale. Prefer these values:

### Padding

| Class | Value | Usage |
|-------|-------|-------|
| `p-2` | 8px | Tight padding (small containers) |
| `p-3` | 12px | Standard padding |
| `p-3.5` | 14px | Panel padding (preferred for cards) |
| `p-5` | 20px | Dialog padding |
| `sm:p-4` | 16px on sm+ | Responsive panel padding |

### Margins

| Class | Value | Usage |
|-------|-------|-------|
| `mb-0.5` | 2px | Tight spacing between related elements |
| `mt-2` | 8px | Section spacing |
| `mt-3.5` | 14px | Standard section gaps |

### Gaps

| Class | Value | Usage |
|-------|-------|-------|
| `gap-2` | 8px | Tight gaps |
| `gap-3` | 12px | Standard gaps |
| `gap-2.5` | 10px | Preferred grid gaps |
| `gap-4` | 16px | Section-level gaps |

---

## Layout

### Grid

- Main layout: `grid min-h-screen place-items-center` (centers content vertically and horizontally)
- Card grids: `grid gap-2.5` (preferred gap)
- Two-column layouts: `grid grid-cols-[1fr_92px]` (content + fixed sidebar)
- Dialogs: `grid gap-4`

### Flex

- Use `flex` for row layouts where grid is overkill
- Common pattern: `flex items-center justify-between gap-4`
- Lists: `space-y-1.5` (vertical spacing between items)

### Sizing

- Card width: `w-[min(94vw,440px)]` (responsive max-width)
- Dialog width: `w-[min(90vw,390px)]`
- Minimum touch targets: ensure `min-height: 44px` for interactive elements

---

## Components

### Panels / Cards

```html
<section class="border border-ember-line bg-ember-panel p-3.5">
  <!-- content -->
</section>
```

- Border: `border border-ember-line`
- Background: `bg-ember-panel`
- Padding: `p-3.5`

### Buttons

Buttons use base styles from `src/styles.css` (not utility classes):

```html
<button type="button">Label</button>
```

- Min height: `44px` (accessibility)
- Border, background, hover states defined in CSS

### Progress Bars

```html
<div class="border border-ember-line bg-[#101510]">
  <div class="meter-fill h-full bg-gradient-to-r from-ember-red to-ember-accent-strong"></div>
</div>
```

- Track: `bg-[#101510]`
- Fill: `bg-gradient-to-r from-ember-red to-ember-accent-strong`
- Component class: `meter-fill` (defined in styles.css)

### Dialogs

```html
<dialog class="border border-ember-accent/40 bg-ember-bg p-0 text-ember-text backdrop:bg-ember-bg/70">
  <form method="dialog" class="grid gap-4 p-5">
    <!-- content -->
  </form>
</dialog>
```

- Border: `border-ember-accent/40`
- Backdrop: `backdrop:bg-ember-bg/70`

### Activity Log

```html
<ol class="min-h-24 max-h-[132px] space-y-1.5 overflow-auto border border-ember-line bg-ember-panel py-3 pl-7 pr-3">
```

- Min/max height constraints for scrollable areas
- List padding: `py-3 pl-7 pr-3`
- Item spacing: `space-y-1.5`

---

## Transitions & Effects

### Animations

- Page transitions: `transition-opacity duration-300`
- Progress bar: `transition: width 120ms linear` (in `.meter-fill` component)

### Background Images

```html
<body class="bg-cover bg-center">
```

- Background set in `src/styles.css` via custom CSS (not utility class)
- Body uses `grid min-h-screen place-items-center` to center content

### Opacity Variants

- Use `/20`, `/40`, `/70` for transparency (e.g., `border-ember-accent/20`)

---

## Accessibility

- Use `aria-label` on interactive or unlabeled elements
- Use `aria-labelledby` linking to headings (e.g., `aria-labelledby="title"`)
- Minimum touch target: `44px` height for buttons
- Ensure sufficient color contrast (ember palette is designed for this)

---

## Responsive Design

- Use `sm:` breakpoint for larger screens
- Example: `sm:p-4` (padding increases on larger screens)

---

## Best Practices

1. **Prefer custom colors** — Always use `ember-*` colors, not default Tailwind colors
2. **Consistent padding** — Use `p-3.5` for panels, `p-5` for dialogs
3. **Semantic labels** — Use uppercase `text-[0.72rem]` with `font-extrabold` for labels
4. **Component classes** — Use `.meter-fill` component class for progress bars (defined in CSS)
5. **Avoid magic numbers** — Stick to the defined spacing and sizing scale
6. **Accessibility first** — Include ARIA attributes, ensure touch targets meet 44px minimum

---

## Common Patterns Quick Reference

| Element | Classes |
|----------|---------|
| Main container | `grid min-h-screen place-items-center` |
| Card/Panel | `border border-ember-line bg-ember-panel p-3.5` |
| Label | `text-[0.72rem] font-extrabold uppercase text-ember-accent-strong` |
| Heading | `text-[1.65rem] font-bold leading-none` |
| Body text | `text-base text-ember-text` |
| Muted text | `text-[0.88rem] text-ember-muted` |
| Button | `<button>` (styled via CSS) |
| Progress bar | `.meter-fill` + gradient |
| Dialog | `border border-ember-accent/40 bg-ember-bg backdrop:bg-ember-bg/70` |