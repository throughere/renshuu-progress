// `./drizzle.config.ts`:

import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/lib/database/schema/index.ts",
  out: "./.drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_DATABASE_URL,
    ssl: undefined
  },
  strict: true
})
