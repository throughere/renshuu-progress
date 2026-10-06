import { db } from "#lib/database/db-server.ts"
import { profile } from "#lib/database/schema/index.ts"
import { getData } from './client.ts'

export const sync = async () => {
  const renshuu = await getData();
  const row = {
    id: renshuu.id,
    name: renshuu.real_name,
    adventure_level: renshuu.adventure_level,
    kao: renshuu.kao,
    today_all: renshuu.studied.today_all,
    today_vocab: renshuu.studied.today_vocab,
    today_kanji: renshuu.studied.today_kanji,
    today_grammar: renshuu.studied.today_grammar,
    today_sent: renshuu.studied.today_sent,
    today_conj: renshuu.studied.today_conj,
    today_aconj: renshuu.studied.today_aconj,
    total: renshuu.studied.total,
    total_vocab: renshuu.studied.total_vocab,
    total_kanji: renshuu.studied.total_kanji,
    total_grammar: renshuu.studied.total_grammar,
    total_sent: renshuu.studied.total_sent

  }
  await db
    .insert(profile)
    .values(row)
    .onConflictDoUpdate({ target: profile.id, set: row })
}

