# Workspace

## Overview

Little Stars Daycare — a full professional daycare company website built with React + Vite frontend and Express 5 backend, connected to PostgreSQL via Drizzle ORM.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite, TailwindCSS, Framer Motion, Wouter routing, shadcn/ui components
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- `artifacts/daycare-website` — Main daycare website (React + Vite), served at `/`
- `artifacts/api-server` — REST API server, served at `/api`

## Pages

- `/` — Home page with hero, stats, program highlights, testimonials
- `/programs` — All daycare programs listing
- `/programs/:id` — Individual program detail page
- `/enroll` — Multi-step enrollment form
- `/staff` — Meet the team page
- `/gallery` — Photo gallery with category filters
- `/events` — Upcoming events
- `/contact` — Contact form + info
- `/about` — About the daycare, mission, values

## API Endpoints

- `GET /api/programs` — List all programs
- `POST /api/programs` — Create program
- `GET /api/programs/:id` — Get program by ID
- `GET /api/enrollments` — List enrollments
- `POST /api/enrollments` — Submit enrollment
- `GET /api/staff` — List staff members
- `GET /api/gallery` — Gallery photos
- `GET /api/testimonials` — Parent testimonials
- `GET /api/events` — Upcoming events
- `POST /api/contact` — Submit contact message
- `GET /api/stats` — Daycare-wide statistics

## Database Tables

- `programs` — Daycare programs with age ranges, pricing, capacity
- `enrollments` — Enrollment requests from parents
- `staff` — Staff member profiles
- `gallery` — Gallery photo entries
- `testimonials` — Parent reviews
- `events` — Upcoming events
- `contact_messages` — Contact form submissions

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
