import { Schema } from '@/apis'

export type UserSummonerRanKType =
  | 'NONE'
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'PLATINUM'
  | 'EMERALD'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRAND_MASTER'
  | 'CHALLENGER'

export interface UserSummoner extends Schema {
  summoner_id: string
  summoner_name: string
  summoner_tag: string
  summoner_full_name: string
  summoner_level: number
  summoner_icon_url: string
  is_un_ranked: boolean
  summoner_solo_rank: UserSummonerRanKType
  summoner_flex_rank: UserSummonerRanKType
}
