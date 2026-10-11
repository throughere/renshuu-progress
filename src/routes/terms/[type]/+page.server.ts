import { error } from "@sveltejs/kit"
import { dev } from "$app/env"
import { eq, sql } from "drizzle-orm"
import { db } from "#lib/database/db-server.ts"
import { kanjiTerm } from "#lib/database/schema/kanji-term.ts"
import type { PageServerLoad } from "./$types"

// Making sure that non jlpt goes last
const jlpt_order = sql`case ${kanjiTerm.jlpt}
  when 'N5' then 1
  when 'N4' then 2
  when 'N3' then 3
  when 'N2' then 4
  when 'N1' then 5
  else 6
end`

export const load: PageServerLoad = async ({ parent, url }) => {
  const { id } = await parent()
  if (id === undefined) error(404, "No profile found")

  const kanjis = await db
    .select()
    .from(kanjiTerm)
    .where(eq(kanjiTerm.profile_id, id))
    .orderBy(jlpt_order, kanjiTerm.jlpt, kanjiTerm.id)

  const kanji_by_level = [...Map.groupBy(kanjis, (kanji) => kanji.jlpt)]
  return { kanji_by_level }
}
