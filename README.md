# monis.rent — Workspace Designer

Interactive workspace configurator for [monis.rent](https://monis.rent), a Bali-based office equipment rental service. Users build their ideal remote work setup, see it rendered live, and submit a rental request — all in one flow.

## Approach

The brief said "user-centric over technical prowess" — so I optimized for **feel**, not feature count.

A few deliberate decisions:

**Live CSS scene instead of static images.** A real product photo grid would've been faster to build, but a desk that visually changes when you add a monitor or switch to a standing desk makes the configurator feel alive. The scene uses layered divs with matching colors per product variant — no canvas, no SVG, just CSS.

**Zones as scene elements, not just checkboxes.** Coffee Station, Relax Zone, Fitness Corner, Outdoor Bali each render as illustrated objects in the corners of the preview — so users can actually *see* what they're adding to their space, not just read a label.

**Weekly pricing with duration discounts.** monis.rent prices by week, so the checkout reflects that reality: 1wk / 2wk (-5%) / 1mo (-10%) / 3mo (-20%). Makes the rental decision concrete rather than abstract.

**Real product data.** Pulled actual product names, taglines, and images from monis.rent's Strapi CMS. The configurator reflects what they actually rent, not placeholder content.

## Tech Choices

- **Next.js 15 App Router** — standard choice, good fit for a static-feeling UI with potential for server rendering later
- **Tailwind CSS v4** — utility-first keeps component styles colocated and consistent
- **No state management library** — `useState` + prop drilling is sufficient for this scope; adding Zustand/Redux would be over-engineering a 5-component tree
- **No animation library** — a single `@keyframes fadeIn` in globals.css handles all scene transitions; Framer Motion would be overkill
- **No UI component kit** — bespoke components kept the design coherent with monis.rent's warm tropical aesthetic (sand, terracotta, bark tones)

## What I'd Improve With More Time

**Real form submission.** The checkout currently mocks success. Production path: tRPC mutation → store inquiry in DB → trigger email notification (Resend) → optionally push to Slack/WhatsApp for the ops team.

**Drag-to-arrange.** Let users position items on the desk surface. Currently items have fixed slots (plant left, keyboard center, lamp right). Drag handles + snap zones would make it genuinely fun.

**3D view toggle.** A flat 2D scene is clear and readable, but a subtle isometric perspective on hover would add depth without the confusion of full 3D. CSS 3D transforms get weird fast — a proper approach would use Three.js or React Three Fiber with low-poly furniture models.

**Saved configurations.** Auth + DB-backed configs so users can share a link to their exact setup ("here's my Bali office build"). Natural upsell moment for monis.rent.

**Mobile configurator UX.** Current layout collapses gracefully on mobile but the zone strip is hard to interact with on small screens. A bottom sheet drawer pattern would work better.

## Running Locally

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000). No database or auth setup needed — the designer is fully client-side.

## Stack

Next.js 15 · Tailwind CSS v4 · TypeScript · Bun
