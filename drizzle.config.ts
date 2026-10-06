// `./drizzle.config.ts`:

import { defineConfig } from "drizzle-kit"
import { getDbUrl } from "./src/lib/utilities/constants"

// This Drizzle config is used for the drizzle-kit CLI tool, with which which we can generate migrations and migrate. In production, we're migrating with a custom migration script using Drizzle ORM, which is defined in our `db-server.ts` file in the app.
export default defineConfig({
  schema: "./src/lib/database/schema/index.ts",
  out: "./.drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: getDbUrl() as string,
    ssl: undefined
  },
  strict: true
})
