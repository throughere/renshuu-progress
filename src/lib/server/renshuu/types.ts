type ApiUsage = {
  calls_today: string
  daily_allowance: number
}

type LevelPercents = Record<string, number>

type Streak = {
  correct_in_a_row: number
  correct_in_a_row_alltime: number
  days_studied_in_a_row: number
  days_studied_in_a_row_alltime: number
}

export type RenshuuProfile = {
  id: number
  real_name: string
  adventure_level: number
  user_length: string
  kao: string
  studied: {
    today_all: number
    today_vocab: number
    today_grammar: number
    today_kanji: number
    today_sent: number
    today_conj: number
    today_aconj: number
    total: number
    total_vocab: number
    total_grammar: number
    total_kanji: number
    total_sent: number
  }
  level_progress_percs: {
    vocab: LevelPercents
    kanji: LevelPercents
    grammar: LevelPercents
    sent: LevelPercents
  }
  streaks: {
    vocab: Streak
    kanji: Streak
    grammar: Streak
    sent: Streak
    conj: Streak
    aconj: Streak
  }
  api_usage: ApiUsage
}

type TermType = "vocab" | "kanji" | "grammar" | "sent"

type StudyVector = {
  name: string
  correct_count: number
  missed_count: number
  mastery_perc: number
  last_quizzed: string
  next_quiz: string
}

export type UserData = {
  correct_count: number
  missed_count: number
  mastery_avg_perc: string
  study_vectors: Record<string, StudyVector>
}

export type VocabTerm = {
  id: string
  kanji_full: string
  hiragana_full: string
  edict_ent: string
  config: string[]
  reibuns: string
  pitch: string[]
  typeofspeech: string
  def: string[]
  user_data: UserData
}

export type KanjiTerm = {
  id: string
  kanji: string
  scount: string
  definition: string
  onyomi: string
  kunyomi: string
  onyomi_marked: string
  kunyomi_marked: string
  kanken: string
  jlpt: string
  radical: string
  radical_name: string
  user_data: UserData
}

export type GrammarTerm = {
  id: string
  title_english: string
  title_japanese: string
  meaning: { eng: string }
  meaning_long: { eng: string }
  url: string
  user_data: UserData
}

export type SentenceTerm = {
  id: string
  japanese: string
  meaning: { eng: string }
  user_data: UserData
}

type Term = VocabTerm | KanjiTerm | GrammarTerm | SentenceTerm

export type TermByType = {
  vocab: VocabTerm
  kanji: KanjiTerm
  grammar: GrammarTerm
  sent: SentenceTerm
}

type Contents<T extends Term> = {
  pg: number
  total_pg: number
  result_count: number
  per_pg: number
  terms: T[]
}

export type RenshuuAllTerms<T extends Term> = {
  contents: Contents<T>
  api_usage: ApiUsage
}

export type RenshuuListById<T extends Term> = {
  list_id: string
  title: string
  description: string
  termtype: TermType
  num_terms: string
  privacy: "public" | "private"
  contents: Contents<T>
  api_usage: ApiUsage
}
