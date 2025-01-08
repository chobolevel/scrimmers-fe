import {
  Api,
  ApiPagingRequest,
  ApiPagingResponse,
  ApiResponse,
  ID,
  Schema,
  useInvalidate,
} from '@/apis'
import { TeamImage } from '@/apis/team/teamImage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type TeamOrderType = 'CREATED_AT_ASC' | 'CREATED_AT_DESC'
export type TeamUpdateMask = 'NAME' | 'DESCRIPTION' | 'MAX_HEAD_COUNT'

export interface Team extends Schema {
  owner_id: string
  owner_nickname: string
  name: string
  description: string
  head_count: number
  max_head_count: number
  logo?: TeamImage
}

export interface CreateTeamRequest {
  name: string
  description: string
  max_head_count: number
}

export interface GetTeamsParams extends ApiPagingRequest {
  ownerId?: ID
  name?: string
  orderTypes?: TeamOrderType[]
}

export interface GetTeamParams {
  id: ID
}

export interface UpdateTeamRequest {
  id: ID
  name?: string
  description?: string
  max_head_count?: number
  update_mask: TeamUpdateMask[]
}

export interface BanishTeamUsersRequest {
  team_id: ID
  user_ids: ID[]
}

export interface DeleteTeamRequest {
  id: ID
}

export const useCreateTeam = () => {
  return useMutation({
    mutationFn: (request: CreateTeamRequest) =>
      Api.post<ApiResponse<ID>>(toUrl(ApiV1Paths.TEAMS), request),
    onSettled: useInvalidate(toUrl(ApiV1Paths.TEAMS)),
  })
}

export const useGetTeams = (params?: GetTeamsParams) => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.TEAMS), params],
    queryFn: () =>
      Api.get<ApiPagingResponse<Team[]>>(toUrl(ApiV1Paths.TEAMS), params),
  })
}

export const useGetTeam = (params: GetTeamParams, enabled = true) => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.TEAMS, { id: params.id })],
    queryFn: () => Api.get<Team>(toUrl(ApiV1Paths.TEAMS, { id: params.id })),
    enabled,
  })
}

export const useUpdateTeam = () => {
  return useMutation({
    mutationFn: (request: UpdateTeamRequest) =>
      Api.put<ApiResponse<ID>>(
        toUrl(ApiV1Paths.TEAMS, { id: request.id }),
        request,
      ),
  })
}

export const useBanishTeamUsers = () => {
  return useMutation({
    mutationFn: (request: BanishTeamUsersRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.BANISH_TEAM_USERS, { id: request.team_id }),
        request,
      ),
  })
}

export const useDeleteTeam = () => {
  return useMutation({
    mutationFn: (request: DeleteTeamRequest) =>
      Api.delete<ApiResponse<ID>>(toUrl(ApiV1Paths.TEAMS, { id: request.id })),
  })
}
