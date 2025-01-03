import { Api, ApiResponse, ID, Schema, useInvalidate } from '@/apis'
import { useMutation } from '@tanstack/react-query'
import { ApiV1Paths, images, toUrl } from '@/constants'

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
export type UserSummonerUpdateMask =
  | 'SUMMONER_ID'
  | 'SUMMONER_NAME'
  | 'SUMMONER_TAG'
  | 'SUMMONER_LEVEL'
  | 'SUMMONER_ICON_ID'
  | 'SUMMONER_SOLO_RANK'
  | 'SUMMONER_FLEX_RANK'

export const UserSummonerRankTypeObj = {
  NONE: {
    label: '티어 없음',
    icon: images.un_rank.src,
  },
  IRON: {
    label: '아이언',
    icon: images.iron.src,
  },
  BRONZE: {
    label: '브론즈',
    icon: images.bronze.src,
  },
  SILVER: {
    label: '실버',
    icon: images.silver.src,
  },
  GOLD: {
    label: '골드',
    icon: images.gold.src,
  },
  PLATINUM: {
    label: '플레티넘',
    icon: images.platinum.src,
  },
  EMERALD: {
    label: '플레티넘',
    icon: images.emerald.src,
  },
  DIAMOND: {
    label: '다이아몬드',
    icon: images.diamond.src,
  },
  MASTER: {
    label: '마스터',
    icon: images.master.src,
  },
  GRAND_MASTER: {
    label: '그랜드 마스터',
    icon: images.grand_master.src,
  },
  CHALLENGER: {
    label: '챌린저',
    icon: images.challenger.src,
  },
}

export interface UserSummoner extends Schema {
  summoner_id: string
  summoner_name: string
  summoner_tag: string
  summoner_full_name: string
  summoner_level: number
  summoner_icon_id: number
  is_un_ranked: boolean
  summoner_solo_rank: UserSummonerRanKType
  summoner_flex_rank: UserSummonerRanKType
}

export interface CreateUserSummonerRequest {
  summoner_id: string
  summoner_name: string
  summoner_tag: string
  summoner_level: number
  summoner_icon_id: number
  summoner_solo_rank: UserSummonerRanKType
  summoner_flex_rank: UserSummonerRanKType
}

export interface UpdateUserSummonerRequest {
  id: ID
  summoner_name?: string
  summoner_tag?: string
  summoner_level?: number
  summoner_icon_id?: number
  summoner_solo_rank?: UserSummonerRanKType
  summoner_flex_rank?: UserSummonerRanKType
  update_mask: UserSummonerUpdateMask[]
}

export interface DeleteUserSummonerRequest {
  id: ID
}

export const useCreateUserSummoner = () => {
  return useMutation({
    mutationFn: (request: CreateUserSummonerRequest) =>
      Api.instance
        .post<ApiResponse<ID>>(toUrl(ApiV1Paths.USER_SUMMONERS), request)
        .then((res) => res.data.data),
    onSettled: useInvalidate(toUrl(ApiV1Paths.ME)),
  })
}

export const useUpdateUserSummoner = () => {
  return useMutation({
    mutationFn: (request: UpdateUserSummonerRequest) =>
      Api.instance
        .put<
          ApiResponse<ID>
        >(toUrl(ApiV1Paths.USER_SUMMONERS, { id: request.id }), request)
        .then((res) => res.data.data),
    onSettled: useInvalidate(toUrl(ApiV1Paths.ME)),
  })
}

export const useDeleteUserSummoner = () => {
  return useMutation({
    mutationFn: (request: DeleteUserSummonerRequest) =>
      Api.instance.delete<ApiResponse<boolean>>(
        toUrl(ApiV1Paths.USER_SUMMONERS, { id: request.id }),
      ),
    onSettled: useInvalidate(toUrl(ApiV1Paths.ME)),
  })
}
