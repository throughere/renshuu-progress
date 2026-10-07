import { eq } from "drizzle-orm"
import { db } from "#lib/database/db-server.ts"
import {
  profile,
  streak,
  levelProgress,
  vocabTerm,
  kanjiTerm,
  grammarTerm,
  sentenceTerm,
  studyVector
} from "#lib/database/schema/index.ts"
import { getProfileData, getAllTerms } from './client.ts'
import type { TermByType, UserData } from "./types"

// Splits rows into groups of 1000. Postgres allows at most 65535 values in one query,
// so this works for tables with up to 65 columns (1000 × 65 = 65000)
const inBatches = <T>(rows: T[]) => {
  const batches: T[][] = []
  for (let i = 0; i < rows.length; i += 1000) {
    batches.push(rows.slice(i, i + 1000))
  }
  return batches
}

const toDate = (value: string) => (value === "Not yet" ? null : value)

const toVectorRows = (profile_id: number, termtype: keyof TermByType, terms: { id: string; user_data: UserData }[]) =>
  terms.flatMap((term) =>
    Object.values(term.user_data.study_vectors).map((vector) => ({
      profile_id,
      termtype,
      term_id: Number(term.id),
      name: vector.name,
      correct_count: vector.correct_count,
      missed_count: vector.missed_count,
      mastery_perc: vector.mastery_perc,
      last_quizzed: toDate(vector.last_quizzed),
      next_quiz: toDate(vector.next_quiz)
    }))
  )

export const sync = async () => {
  const profile_data = await getProfileData();
  const vocab_data = await getAllTerms("vocab")
  const kanji_data = await getAllTerms("kanji")
  const grammar_data = await getAllTerms("grammar")
  const sent_data = await getAllTerms("sent")

  const row = {
    id: profile_data.id,
    name: profile_data.real_name,
    adventure_level: profile_data.adventure_level,
    kao: profile_data.kao,
    today_all: profile_data.studied.today_all,
    today_vocab: profile_data.studied.today_vocab,
    today_kanji: profile_data.studied.today_kanji,
    today_grammar: profile_data.studied.today_grammar,
    today_sent: profile_data.studied.today_sent,
    today_conj: profile_data.studied.today_conj,
    today_aconj: profile_data.studied.today_aconj,
    total: profile_data.studied.total,
    total_vocab: profile_data.studied.total_vocab,
    total_kanji: profile_data.studied.total_kanji,
    total_grammar: profile_data.studied.total_grammar,
    total_sent: profile_data.studied.total_sent
  }

  const streak_rows = Object.entries(profile_data.streaks).map(([category, streak_data]) => ({
    profile_id: profile_data.id,
    category,
    correct_in_a_row: streak_data.correct_in_a_row,
    correct_in_a_row_alltime: streak_data.correct_in_a_row_alltime,
    days_studied_in_a_row: streak_data.days_studied_in_a_row,
    days_studied_in_a_row_alltime: streak_data.days_studied_in_a_row_alltime
  }))

  const level_rows = Object.entries(profile_data.level_progress_percs).flatMap(([category, levels]) =>
    Object.entries(levels).map(([level, percent]) => ({
      profile_id: profile_data.id,
      category,
      level,
      percent
    }))
  )

  const vocab_rows = vocab_data.contents.terms.map((term) => ({
    profile_id: profile_data.id,
    id: Number(term.id),
    kanji_full: term.kanji_full,
    hiragana_full: term.hiragana_full,
    typeofspeech: term.typeofspeech,
    def: term.def,
    pitch: term.pitch,
    correct_count: term.user_data.correct_count,
    missed_count: term.user_data.missed_count,
    mastery_avg_perc: Number(term.user_data.mastery_avg_perc)
  }))

  const kanji_rows = kanji_data.contents.terms.map((term) => ({
    profile_id: profile_data.id,
    id: Number(term.id),
    kanji: term.kanji,
    scount: Number(term.scount),
    definition: term.definition,
    onyomi: term.onyomi,
    kunyomi: term.kunyomi,
    kanken: term.kanken,
    jlpt: term.jlpt,
    radical: term.radical,
    radical_name: term.radical_name,
    correct_count: term.user_data.correct_count,
    missed_count: term.user_data.missed_count,
    mastery_avg_perc: Number(term.user_data.mastery_avg_perc)
  }))

  const grammar_rows = grammar_data.contents.terms.map((term) => ({
    profile_id: profile_data.id,
    id: Number(term.id),
    title_english: term.title_english,
    title_japanese: term.title_japanese,
    meaning: term.meaning.eng,
    meaning_long: term.meaning_long.eng,
    url: term.url,
    correct_count: term.user_data.correct_count,
    missed_count: term.user_data.missed_count,
    mastery_avg_perc: Number(term.user_data.mastery_avg_perc)
  }))

  const sent_rows = sent_data.contents.terms.map((term) => ({
    profile_id: profile_data.id,
    id: Number(term.id),
    japanese: term.japanese,
    meaning: term.meaning.eng,
    correct_count: term.user_data.correct_count,
    missed_count: term.user_data.missed_count,
    mastery_avg_perc: Number(term.user_data.mastery_avg_perc)
  }))

  const vector_rows = [
    ...toVectorRows(profile_data.id, "vocab", vocab_data.contents.terms),
    ...toVectorRows(profile_data.id, "kanji", kanji_data.contents.terms),
    ...toVectorRows(profile_data.id, "grammar", grammar_data.contents.terms),
    ...toVectorRows(profile_data.id, "sent", sent_data.contents.terms)
  ]

  await db.transaction(async (tx) => {
    // Cascade delete
    await tx.delete(profile).where(eq(profile.id, profile_data.id))

    await tx.insert(profile).values(row)
    await tx.insert(streak).values(streak_rows)
    await tx.insert(levelProgress).values(level_rows)
    for (const batch of inBatches(vocab_rows)) await tx.insert(vocabTerm).values(batch)
    for (const batch of inBatches(kanji_rows)) await tx.insert(kanjiTerm).values(batch)
    for (const batch of inBatches(grammar_rows)) await tx.insert(grammarTerm).values(batch)
    for (const batch of inBatches(sent_rows)) await tx.insert(sentenceTerm).values(batch)
    for (const batch of inBatches(vector_rows)) await tx.insert(studyVector).values(batch)
  })
}
