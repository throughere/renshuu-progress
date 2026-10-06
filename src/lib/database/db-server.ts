import { drizzle } from "drizzle-orm/node-postgres"
import { POSTGRES_DATABASE_URL } from "$app/env/private"
import { defineRelations } from "drizzle-orm"
import * as schema from "#lib/database/schema/index.ts"

export const db = drizzle(POSTGRES_DATABASE_URL, { relations: defineRelations(schema) })
