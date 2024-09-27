<img src="public/logo.svg" width="300">

# Setup project

Copy `.env.example` to `.env` and fill it.

Install `pnpm`

Install dependencies `pnpm i`

Init database with `pnpm db:push`

Feed the database with `seed.sql` content

Run the project with `pnpm dev`

## How to update database ?

Edit `src/server/db/schema.ts` then update the database with `pnpm db:push`

If everything is fine you can create a new migration file from your last database changes with `pnpm db:generate`

## Project architecture

```
src/
├── app # pages and API
│   ├── _components # All custom components
│   ├── api # API
├── components # shadcn components
├── lib # shadcn helper
├── server
│   ├── api # trpc routers
│   ├── db # drizzle schemas and migrations
├── styles # css files
├── trpc # trpc hooks and types
└── utils # custom helper
```