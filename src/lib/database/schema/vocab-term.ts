import { integer, pgTable, primaryKey, smallint, text } from "drizzle-orm/pg-core"
import { profile } from "./profile"

export const vocabTerm = pgTable(
  "vocab_term",
  {
    profile_id: integer()
      .notNull()
      .references(() => profile.id, { onDelete: "cascade" }),
    id: integer().notNull(),
    kanji_full: text().notNull(),
    hiragana_full: text().notNull(),
    typeofspeech: text().notNull(),
    def: text().array().notNull(),
    pitch: text().array().notNull(),
    correct_count: integer().notNull(),
    missed_count: integer().notNull(),
    mastery_avg_perc: smallint().notNull()
  },
  (t) => [primaryKey({ columns: [t.profile_id, t.id] })]
)
