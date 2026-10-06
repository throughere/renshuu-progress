import { sql } from "drizzle-orm"
import { check, integer, pgTable, primaryKey, smallint, varchar } from "drizzle-orm/pg-core"
import { profile } from "./profile"

export const levelProgress = pgTable(
  "level_progress",
  {
    profile_id: integer()
      .notNull()
      .references(() => profile.id, { onDelete: "cascade" }),
    category: varchar({ length: 10 }).notNull(), // vocab, kanji, grammar, sent
    level: varchar({ length: 10 }).notNull(), // n1 to n6, kana, kata
    percent: smallint().notNull()
  },
  (t) => [
    primaryKey({ columns: [t.profile_id, t.category, t.level] }),
    check("level_progress_percent_check", sql`${t.percent} BETWEEN 0 AND 100`)
  ]
)
