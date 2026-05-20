# monis.rent — Workspace Designer

Interactive workspace configurator for [monis.rent](https://monis.rent), a Bali-based office equipment rental service. Pick your desk, chair, accessories, and add-on zones — see a live visual preview, then submit your rental request.

## Features

- **Live CSS preview** — desk scene updates in real-time as you configure
- **Desks** — Electric Standing Desk / Mechanical Standing Desk
- **Chairs** — Ergonomic Office Chair / Basic Office Chair
- **Accessories** — monitors (24" FHD, 27" 4K), keyboard, mouse, lamp, plant
- **Zones** — Coffee Station, Relax Zone, Fitness Corner, Outdoor Bali (rendered in the scene)
- **Checkout modal** — duration selector (1wk–3mo) with tiered discounts, contact form
- **Weekly pricing** — all prices in $/wk

## Stack

- [Next.js 15](https://nextjs.org) — App Router
- [Tailwind CSS v4](https://tailwindcss.com)
- [tRPC v11](https://trpc.io)
- [Prisma](https://prisma.io)
- [Bun](https://bun.sh)

## Getting Started

```bash
bun install
cp .env.example .env
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
bun dev           # dev server (Turbopack)
bun build         # production build
bun typecheck     # tsc --noEmit
bun lint          # ESLint
bun check         # lint + typecheck
bun format:write  # Prettier
```
