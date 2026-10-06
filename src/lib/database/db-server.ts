import { drizzle } from "drizzle-orm/node-postgres"
import { POSTGRES_DATABASE_URL } from "$app/env/private"

export const db = drizzle(POSTGRES_DATABASE_URL)
