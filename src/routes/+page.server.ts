import { db } from "#lib/database/db-server.ts"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ parent }) => {
  const { id } = await parent()
  const profile = await db.query.profile.findFirst({ where: { id: id } })

  return { profile }
}


