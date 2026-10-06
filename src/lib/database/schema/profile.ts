import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core"

export const profile = pgTable("profile", {
  id: integer().primaryKey(),
  name: varchar({ length: 30 }),
  adventure_level: integer(),
  kao: text(),
  today_all: integer(),
  today_vocab: integer(),
  today_kanji: integer(),
  today_grammar: integer(),
  today_sent: integer(),
  today_conj: integer(),
  today_aconj: integer(),
  total: integer(),
  total_vocab: integer(),
  total_kanji: integer(),
  total_grammar: integer(),
  total_sent: integer()
})
