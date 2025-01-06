import {
  Api,
  ApiPagingRequest,
  ApiPagingResponse,
  ID,
  Schema,
  Team,
  User,
} from '@/apis'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type TeamJoinRequestStatus = 'REQUESTED' | 'APPROVED' | 'REJECTED'
export type TeamJoinRequestOrderType = 'CREATED_AT_ASC' | 'CREATED_AT_DESC'
export type TeamJoinRequestUpdateMask = 'COMMENT'

export const TeamJoinRequestStatusObj = {
  REQUESTED: {
    label: '요청',
    color: 'orange',
  },
  APPROVED: {
    label: '승인',
    color: 'green',
  },
  REJECTED: {
    label: '거절',
    color: 'red',
  },
}

export const TeamJoinRequestStatusArr = [
  {
    label: '요청',
    value: 'REQUESTED',
  },
  {
    label: '승인',
    value: 'APPROVED',
  },
  {
    label: '거절',
    color: 'REJECTED',
  },
]

export interface TeamJoinRequest extends Schema {
  team: Team
  requester: User
  status: TeamJoinRequestStatus
  comment: string
  reject_reason?: string
}

export interface CreateTeamJoinRequest {
  team_id: ID
  comment: string
}

export interface GetTeamJoinRequestsParams extends ApiPagingRequest {
  teamId?: ID
  userId?: ID
  orderTypes?: TeamJoinRequestOrderType[]
}

export interface GetTeamJoinRequestParams {
  team_join_request_id: ID
}

export interface UpdateTeamJoinRequest {
  team_join_request_id: ID
  comment?: string
  update_mask: TeamJoinRequestUpdateMask[]
}

export interface ApproveTeamJoinRequest {
  team_join_request_id: ID
}

export interface RejectTeamJoinRequest {
  team_join_request_id: ID
  reason: string
}

export interface DeleteTeamJoinRequest {
  team_join_request_id: ID
}

export const useCreateTeamJoinRequest = () => {
  return useMutation({
    mutationFn: (request: CreateTeamJoinRequest) =>
      Api.post<ID>(toUrl(ApiV1Paths.TEAM_JOIN_REQUESTS), request),
  })
}

export const useGetTeamJoinRequests = (
  params?: GetTeamJoinRequestsParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.TEAM_JOIN_REQUESTS), params],
    queryFn: () =>
      Api.get<ApiPagingResponse<TeamJoinRequest[]>>(
        toUrl(ApiV1Paths.TEAM_JOIN_REQUESTS),
        params,
      ),
    enabled,
  })
}

export const useGetTeamJoinRequest = (
  params: GetTeamJoinRequestParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: [
      toUrl(ApiV1Paths.TEAM_JOIN_REQUESTS, { id: params.team_join_request_id }),
    ],
    queryFn: () =>
      Api.get<TeamJoinRequest>(
        toUrl(ApiV1Paths.TEAM_JOIN_REQUESTS, {
          id: params.team_join_request_id,
        }),
      ),
    enabled,
  })
}

export const useUpdateTeamJoinRequest = () => {
  return useMutation({
    mutationFn: (request: UpdateTeamJoinRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.TEAM_JOIN_REQUESTS, {
          id: request.team_join_request_id,
        }),
        request,
      ),
  })
}

export const useApproveTeamJoinRequest = () => {
  return useMutation({
    mutationFn: (request: ApproveTeamJoinRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.APPROVE_TEAM_JOIN_REQUEST, {
          id: request.team_join_request_id,
        }),
        request,
      ),
  })
}

export const useRejectTeamJoinRequest = () => {
  return useMutation({
    mutationFn: (request: RejectTeamJoinRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.REJECT_TEAM_JOIN_REQUEST, {
          id: request.team_join_request_id,
        }),
        request,
      ),
  })
}

export const useDeleteTeamJoinRequest = () => {
  return useMutation({
    mutationFn: (request: DeleteTeamJoinRequest) =>
      Api.delete<ID>(
        toUrl(ApiV1Paths.TEAM_JOIN_REQUESTS, {
          id: request.team_join_request_id,
        }),
      ),
  })
}
