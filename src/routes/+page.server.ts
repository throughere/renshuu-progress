import { db } from "#lib/database/db-server.ts"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  const salo_profile = await db.query.profile.findFirst({ where: { id: 2164204 } })
  console.log(salo_profile)

  return { salo_profile }
}


