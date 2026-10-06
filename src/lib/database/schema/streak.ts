import { integer, pgTable, primaryKey, varchar } from "drizzle-orm/pg-core"
import { profile } from "./profile"

export const streak = pgTable(
  "streak",
  {
    profile_id: integer()
      .notNull()
      .references(() => profile.id, { onDelete: "cascade" }),
    category: varchar({ length: 10 }).notNull(), // vocab, kanji, grammar, sent, conj, aconj
    correct_in_a_row: integer().notNull(),
    correct_in_a_row_alltime: integer().notNull(),
    days_studied_in_a_row: integer().notNull(),
    days_studied_in_a_row_alltime: integer().notNull()
  },
  (t) => [primaryKey({ columns: [t.profile_id, t.category] })]
)
