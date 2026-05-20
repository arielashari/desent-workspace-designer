# CLAUDE.md — T3 App (Next.js + tRPC + Prisma)

## ⚠️ SYSTEM PROTOCOLS

- **BE CAVEMAN**: Terse comms. No fluff. Pattern: `[thing] [action] [reason]. [next step].`
- **NO BLIND SCANNING**: NEVER run `ls -R`, `find .`, `cat` whole file, or `read_file` on project.
- **PROGRAM, DON'T READ**: File >100 lines → `sed -n 'X,Yp'` or `rg`. Never read whole file.
- **CLEAN SESSION**: Context >20k tokens → tell user `/clear`.
- **NO SUB-AGENTS**: Never spawn parallel explore agents. No chaining explores.

---

## 🚦 STARTUP GATE — MANDATORY FOR EVERY NEW TASK

Run ONLY these before anything else. No exceptions.

```bash
# 1. Identify scope
echo "ROUTER: src/server/api/routers/ | UI: src/app/ | SCHEMA: prisma/schema.prisma"

# 2. Find relevant files for THIS task only
rg -l "[keyword]" src/ --max-count=5

# 3. Read ONLY the entry-point (first 50 lines)
sed -n '1,50p' src/server/api/routers/[file].ts
```

**FORBIDDEN at startup:**
- `ls -R` / `find . -type f` (full tree scan)
- `cat` any file >50 lines
- Reading `node_modules/`, `.next/`, `generated/prisma/`, `*.lock`
- Opening >3 files before outputting Blueprint
- Saying "Need to check X before blueprint" → ask user instead

**TOKEN BUDGET PER TASK:**

| Phase | Max Tokens |
|---|---|
| Startup / orientation | 2k |
| Blueprint | 1k |
| Code generation | 10k |
| Type-check + fix | 3k |
| **Total cap** | **~16k** |

Hit 16k before done → stop, summarize state, tell user `/clear` and continue.

---

## 1. PROJECT SCOPE

**T3 Stack:** Next.js 15 App Router · tRPC v11 · Prisma · NextAuth v5 · Tailwind v4

| Layer | Location |
|---|---|
| tRPC routers | `src/server/api/routers/` |
| Router registry | `src/server/api/root.ts` |
| tRPC setup + middleware | `src/server/api/trpc.ts` |
| DB client (Prisma) | `src/server/db.ts` |
| Client tRPC hook | `src/trpc/react.tsx` |
| Server tRPC caller | `src/trpc/server.ts` |
| Env validation | `src/env.js` |
| Prisma schema | `prisma/schema.prisma` |
| Prisma generated client | `generated/prisma/` (never edit) |

---

## 2. PATH MAP

```
src/
├── app/                        # Next.js App Router pages + layouts
│   ├── layout.tsx              # Root layout
│   └── [routes]/
├── server/
│   ├── api/
│   │   ├── routers/            # tRPC routers — one file per domain
│   │   ├── root.ts             # Merges all routers → AppRouter type
│   │   └── trpc.ts             # createTRPCRouter, publicProcedure, protectedProcedure
│   ├── auth/                   # NextAuth v5 config
│   └── db.ts                   # Prisma client singleton (ctx.db)
├── trpc/
│   ├── react.tsx               # Client-side tRPC hooks (api.x.useQuery)
│   └── server.ts               # Server-side tRPC caller (no HTTP)
└── env.js                      # Env var validation (@t3-oss/env-nextjs)
prisma/
└── schema.prisma               # Source of truth for DB schema
generated/
└── prisma/                     # GENERATED — never edit directly
```

**Path alias:** `~/*` → `src/*`

---

## 3. FILE LOOKUP CHEATSHEET

Never guess. Never scan. Use these:

```bash
# Find a tRPC router
rg -l "createTRPCRouter" src/server/api/routers/ --max-count=5

# Find a procedure in a router
rg -n "[procedureName]" src/server/api/routers/[router].ts

# Find where a router is registered
rg -n "[routerName]" src/server/api/root.ts

# Find a Prisma model usage
rg -rn "ctx\.db\.[model]" src/server/ --max-count=10

# Find a client tRPC call
rg -rn "api\.[router]\." src/app/ --max-count=10

# Find a schema model
rg -n "model [Name]" prisma/schema.prisma

# Check env var definition
rg -n "[VAR_NAME]" src/env.js

# Read only what you need
sed -n '1,50p' [file]
sed -n '50,100p' [file]
```

---

## 4. ARCHITECTURE (STRICT)

**Data flow:**
```
Client component  →  api.x.useQuery()     →  src/trpc/react.tsx  →  HTTP  →  router
Server component  →  api.x()              →  src/trpc/server.ts  →  direct call
Router            →  ctx.db.[model].*     →  Prisma  →  MySQL/Postgres
```

**Rules:**
- DB access ONLY inside routers via `ctx.db`. Never import Prisma client directly in components.
- Authenticated endpoints → always `protectedProcedure`. `ctx.session.user` is non-nullable inside it.
- Public endpoints → `publicProcedure`.
- New router → create `src/server/api/routers/[name].ts` + register in `src/server/api/root.ts`.
- New env var → add to BOTH `schema` and `runtimeEnv` in `src/env.js` before using `process.env`.
- Import Prisma types from `@prisma/client` (custom output path is handled internally).
- Never edit `generated/prisma/` directly.

---

## 5. ESSENTIAL COMMANDS

```bash
# Dev
bun dev              # dev server (Turbopack)
bun build            # production build

# Quality (run after every file edit)
bun typecheck        # tsc --noEmit
bun lint             # ESLint
bun check            # lint + typecheck together
bun format:write     # Prettier auto-fix

# Database
bun db:generate      # prisma migrate dev (creates migration file)
bun db:push          # push schema without migration (dev only)
bun db:migrate       # prisma migrate deploy (production)
bun db:studio        # Prisma Studio GUI
```

**After ANY `prisma/schema.prisma` edit** → `bun db:generate` or `bun db:push`, then `bun typecheck`.

---

## 6. TASK EXECUTION PROTOCOL

### Step 1 — Classify
- Which layer? (`router` / `ui` / `schema` / `auth` / `env`)
- Which domain? (`post`, `user`, `payment`, …)
- Task type? (`new procedure` / `new router` / `schema change` / `ui feature` / `bug fix`)

### Step 2 — Targeted Lookup (max 3 files, use §3 cheatsheet)

### Step 3 — Blueprint (STOP — output this, then wait)

```
BLUEPRINT: [Feature Name]

LAYER: router | ui | schema | auth | env
DOMAIN: [name]

TODO:
[ ] step 1
[ ] step 2

FILES TO CHANGE:
- src/[path]/[file].ts  → [what changes]

FILES TO CREATE:
- src/[path]/[file].ts  → [purpose]

SCHEMA CHANGE NEEDED: yes | no
  → prisma/schema.prisma: [model + fields]
  → run: bun db:generate

ENV VAR NEEDED: yes | no
  → src/env.js: [var name + type]

ROOT REGISTRATION NEEDED: yes | no
  → src/server/api/root.ts: [router name]

LOGIC SUMMARY:
- [layer]: [change]

APPROVAL REQUIRED → reply "Approved" or "Go" to proceed.
```

### Step 4 — Wait for "Approved" / "Go"

### Step 5 — Batch Execute
Group all file writes in one pass. Then in order:
```bash
# If schema changed
bun db:generate   # or bun db:push in dev

# Always after edits
bun check
```

### Step 6 — Fix errors
Read `bun check` output → fix inline → re-run. Never report done with open errors.

### Step 7 — Git diff
```bash
git diff
```

---

## 7. WHAT TO DO WHEN STUCK

| Situation | Command |
|---|---|
| Can't find a router | `rg -l "createTRPCRouter" src/server/api/routers/` |
| Can't find a procedure | `rg -rn "[name]:" src/server/api/routers/` |
| Router not accessible on client | Check `src/server/api/root.ts` — may not be registered |
| Prisma type error | Run `bun db:generate` — client may be stale |
| Env var undefined at runtime | Check `src/env.js` — must be in both `schema` + `runtimeEnv` |
| Auth not working | Check `protectedProcedure` vs `publicProcedure` in router |
| Still can't find it | Ask user: "Which router owns [thing]?" |

**NEVER say "I couldn't find it" without running `rg` first.**

---

## 8. TYPE-CHECK PROTOCOL (MANDATORY)

- After EVERY file edit → `bun check` (lint + typecheck together)
- After ANY schema change → `bun db:generate` first, then `bun check`
- Never report done with outstanding TS or lint errors.
- Never edit `generated/prisma/` to fix type errors — fix the schema or query instead.

---

## 9. HEADLESS AGENT PROTOCOLS

- Full clearance: `bash`, `sed`, `rg`, `bun`, file writing tools.
- **Never say** "Please add this to your file." Write it directly.
- Terminal is source of truth. Check fails → read output → fix → no questions.
- `git diff` after every change set.

---

## 10. DELEGATION MODE

1. Classify (layer, domain, type).
2. Scout — `rg` + `sed` on entry points only. Max 3 files. **One path only — no `or`.**
3. Blueprint (§6 format).
4. **HALT** — "Do you approve this Blueprint?" No code until `Approved`.
5. Execute → `db:generate` (if needed) → `bun check` → `git diff`.