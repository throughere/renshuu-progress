import { integer, pgTable, primaryKey, smallint, text } from "drizzle-orm/pg-core"
import { profile } from "./profile"

export const sentenceTerm = pgTable(
  "sentence_term",
  {
    profile_id: integer()
      .notNull()
      .references(() => profile.id, { onDelete: "cascade" }),
    id: integer().notNull(),
    japanese: text().notNull(),
    meaning: text().notNull(),
    correct_count: integer().notNull(),
    missed_count: integer().notNull(),
    mastery_avg_perc: smallint().notNull()
  },
  (t) => [primaryKey({ columns: [t.profile_id, t.id] })]
)
