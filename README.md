# Vedasync

Vedasync is a modern full-stack web application built with a bleeding-edge tech stack, featuring Server-Side Rendering, robust database integrations, and a beautiful UI.

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Prisma ORM](https://www.prisma.io/) with `@prisma/adapter-pg`
- **Package Manager**: [pnpm](https://pnpm.io/)

## 🛠️ Project Structure

- `src/routes/` - TanStack Router file-based routing.
- `src/components/ui/` - Shadcn UI components.
- `src/lib/` - Utility functions and database setup (`db.ts`).
- `prisma/` - Prisma schema (`schema.prisma`) and migrations.
- `src/generated/prisma/` - Custom output directory for the generated Prisma Client.

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- **pnpm** (Required package manager for this project)

> [!WARNING]
> This project strictly uses **pnpm**. Do not use `npm` or `yarn` as it will create conflicting lockfiles and cause dependency issues.

To install `pnpm` globally, run:
```bash
npm install -g pnpm
```

### 1. Clone & Install

```bash
git clone https://github.com/Addy0101-bit/vedysync.git
cd vedasync
pnpm install
```

### 2. Environment Variables

Create a `.env` file in the root of the project and add your Neon PostgreSQL database URL:

```env
DATABASE_URL="postgresql://user:password@host/db_name?sslmode=require"
```

### 3. Database Setup

Push the Prisma schema to your database and generate the Prisma Client:

```bash
npx prisma db push
npx prisma generate
```

*(Note: Ensure you have run `pnpm approve-builds` if prompted by pnpm during installation so the Prisma engines can download correctly).*

### 4. Run the Development Server

Start the Vite development server:

```bash
pnpm dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

## 📜 Scripts

- `pnpm dev` - Starts the development server.
- `pnpm build` - Builds the app for production.
- `pnpm preview` - Previews the production build.
- `pnpm generate-routes` - Generates TanStack Router types.
- `pnpm format` & `pnpm lint` - Code formatting and linting.
