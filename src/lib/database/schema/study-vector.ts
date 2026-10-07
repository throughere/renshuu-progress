import { date, integer, pgTable, primaryKey, smallint, varchar } from "drizzle-orm/pg-core"
import { profile } from "./profile"

export const studyVector = pgTable(
  "study_vector",
  {
    profile_id: integer()
      .notNull()
      .references(() => profile.id, { onDelete: "cascade" }),
    termtype: varchar({ length: 10 }).notNull(), // vocab, kanji, grammar, sent
    term_id: integer().notNull(),
    name: varchar({ length: 30 }).notNull(),
    correct_count: integer().notNull(),
    missed_count: integer().notNull(),
    mastery_perc: smallint().notNull(),
    last_quizzed: date(),
    next_quiz: date()
  },
  (t) => [primaryKey({ columns: [t.profile_id, t.termtype, t.term_id, t.name] })]
)
