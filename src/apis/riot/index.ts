export interface RiotAccountResponse {
  puuid: string
  gameName: string
  tagLine: string
}

export interface RiotSummonerResponse {
  id: string
  accountId: string
  puuid: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}

export interface RiotSummonerRankResponse {
  leagueId: string
  queueType: string
  tier: string
  rank: string
  summonerId: string
  leaguePoints: number
  wins: number
  losses: number
  veteran: boolean
  inactive: boolean
  freshBlood: boolean
}
