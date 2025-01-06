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

export type TeamLeaveRequestStatus = 'REQUESTED' | 'APPROVED' | 'REJECTED'
export type TeamLeaveRequestOrderType = 'CREATED_AT_ASC' | 'CREATED_AT_DESC'
export type TeamLeaveRequestUpdateMask = 'COMMENT'

export interface TeamLeaveRequest extends Schema {
  team: Team
  requester: User
  status: TeamLeaveRequestStatus
  comment: string
  reject_reason?: string
}

export interface CreateTeamLeaveRequest {
  team_id: ID
  comment: string
}

export interface GetTeamLeaveRequestsParams extends ApiPagingRequest {
  teamId?: ID
  userId?: ID
  orderTypes?: TeamLeaveRequestOrderType[]
}

export interface GetTeamLeaveRequestParams {
  team_leave_request_id: ID
}

export interface UpdateTeamLeaveRequest {
  team_leave_request_id: ID
  comment?: string
  update_mask: TeamLeaveRequestUpdateMask[]
}

export interface ApproveTeamLeaveRequest {
  team_leave_request_id: ID
}

export interface RejectTeamLeaveRequest {
  team_leave_request_id: ID
  reject_reason: string
}

export interface DeleteTeamLeaveRequest {
  team_leave_request_id: ID
}

export const useCreateTeamLeaveRequest = () => {
  return useMutation({
    mutationFn: (request: CreateTeamLeaveRequest) =>
      Api.post<ID>(toUrl(ApiV1Paths.TEAM_LEAVE_REQUESTS), request),
  })
}

export const useGetTeamLeaveRequests = (
  params?: GetTeamLeaveRequestsParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.TEAM_LEAVE_REQUESTS), params],
    queryFn: () =>
      Api.get<ApiPagingResponse<TeamLeaveRequest[]>>(
        toUrl(ApiV1Paths.TEAM_LEAVE_REQUESTS),
        params,
      ),
    enabled,
  })
}

export const useGetTeamLeaveRequest = (params: GetTeamLeaveRequestParams) => {
  return useQuery({
    queryKey: [
      toUrl(ApiV1Paths.TEAM_LEAVE_REQUESTS, {
        id: params.team_leave_request_id,
      }),
    ],
    queryFn: () =>
      Api.get<TeamLeaveRequest>(
        toUrl(ApiV1Paths.TEAM_LEAVE_REQUESTS, {
          id: params.team_leave_request_id,
        }),
      ),
  })
}

export const useUpdateTeamLeaveRequest = () => {
  return useMutation({
    mutationFn: (request: UpdateTeamLeaveRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.TEAM_LEAVE_REQUESTS, {
          id: request.team_leave_request_id,
        }),
        request,
      ),
  })
}

export const useApproveTeamLeaveRequest = () => {
  return useMutation({
    mutationFn: (request: ApproveTeamLeaveRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.APPROVE_TEAM_LEAVE_REQUEST, {
          id: request.team_leave_request_id,
        }),
        request,
      ),
  })
}

export const useRejectTeamLeaveRequest = () => {
  return useMutation({
    mutationFn: (request: RejectTeamLeaveRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.REJECT_TEAM_LEAVE_REQUEST, {
          id: request.team_leave_request_id,
        }),
        request,
      ),
  })
}

export const useDeleteTeamLeaveRequest = () => {
  return useMutation({
    mutationFn: (request: DeleteTeamLeaveRequest) =>
      Api.delete<ID>(
        toUrl(ApiV1Paths.TEAM_LEAVE_REQUESTS, {
          id: request.team_leave_request_id,
        }),
      ),
  })
}
