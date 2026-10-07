import { RENSHUU_API_READ_KEY } from "$app/env/private"
import type { RenshuuProfile, RenshuuAllTerms, KanjiTerm, TermByType } from "./types"

export const getProfileData = async (): Promise<RenshuuProfile> => {
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

const fetchKanjiPage = async (pg: number): Promise<RenshuuAllTerms<KanjiTerm>> => {
  const url = `https://api.renshuu.org/v1/list/all/kanji?pg=${pg}`
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${RENSHUU_API_READ_KEY}` }
  })
  if (!response.ok) {
    throw new Error(`renshuu returned ${response.status}`)
  }
  return response.json()
}

export const getAllKanjiData = async (): Promise<RenshuuAllTerms<KanjiTerm>> => {
  const data = await fetchKanjiPage(1)
  for (let pg = 2; pg <= data.contents.total_pg; pg++) {
    const page = await fetchKanjiPage(pg)
    data.contents.terms.push(...page.contents.terms)
    data.api_usage = page.api_usage
  }
  return data
}

const fetchTermsPage = async <K extends keyof TermByType>(termtype: K, pg: number): Promise<RenshuuAllTerms<TermByType[K]>> => {
  const url = `https://api.renshuu.org/v1/list/all/${termtype}?pg=${pg}`
  const response = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${RENSHUU_API_READ_KEY}` }
  })
  if (!response.ok) {
    throw new Error(`renshuu returned ${response.status}`)
  }
  return response.json()
}

export const getAllTerms = async <K extends keyof TermByType>(termtype: K): Promise<RenshuuAllTerms<TermByType[K]>> => {
  const data = await fetchTermsPage(termtype, 1)
  for (let pg = 2; pg <= data.contents.total_pg; pg++) {
    const page = await fetchTermsPage(termtype, pg)
    data.contents.terms.push(...page.contents.terms)
    data.api_usage = page.api_usage
  }
  return data
}
