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
}

