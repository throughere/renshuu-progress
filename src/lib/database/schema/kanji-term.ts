import { integer, pgTable, primaryKey, smallint, text, varchar } from "drizzle-orm/pg-core"
import { profile } from "./profile"

export const kanjiTerm = pgTable(
  "kanji_term",
  {
    profile_id: integer()
      .notNull()
      .references(() => profile.id, { onDelete: "cascade" }),
    id: integer().notNull(),
    kanji: text().notNull(),
    scount: smallint().notNull(),
    definition: text().notNull(),
    onyomi: text().notNull(),
    kunyomi: text().notNull(),
    kanken: varchar({ length: 10 }).notNull(),
    jlpt: varchar({ length: 5 }).notNull(),
    radical: text().notNull(),
    radical_name: text().notNull(),
    correct_count: integer().notNull(),
    missed_count: integer().notNull(),
    mastery_avg_perc: smallint().notNull()
  },
  (t) => [primaryKey({ columns: [t.profile_id, t.id] })]
)
