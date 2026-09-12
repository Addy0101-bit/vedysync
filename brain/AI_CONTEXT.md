# Vedasync AI Context

This file serves as the core context and instructions for any AI assistant working on the Vedasync project.

## Tech Stack
- **Framework**: TanStack Start (React 19)
- **Routing**: TanStack Router (File-based routing)
- **Styling**: Tailwind CSS v4, Shadcn UI
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma (with `@prisma/adapter-pg`)
- **Package Manager**: pnpm

## Architecture & Codebase Rules
1. **Routing**: Use `src/routes/` for all file-based routing.
2. **Components**: UI components (Shadcn) live in `src/components/ui/`. Feature-specific components should be modularized in `src/components/`.
3. **Database**: The Prisma Client is uniquely generated in `src/generated/prisma/` (not the default `node_modules` path). Always import the client from this folder. The database connection is instantiated in `src/lib/db.ts`.

## Instructions for AI
- Always review `brain/progress.md` to understand the current state of the project before making large structural changes.
- When generating code, ensure that imports use the correct paths.
- When modifying the Prisma schema (`prisma/schema.prisma`), remind the user to run `npx prisma db push` and `npx prisma generate`.
