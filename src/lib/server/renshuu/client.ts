import { RENSHUU_API_READ_KEY } from "$app/env/private"
import type { RenshuuProfile } from "./types"

export const getData = async (): Promise<RenshuuProfile> => {
  const url = "https://api.renshuu.org/v1/profile";
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${RENSHUU_API_READ_KEY}` }
  });
  if (!response.ok) {
    throw new Error(`renshuu returned ${response.status}`)
  }
  return await response.json()
}

