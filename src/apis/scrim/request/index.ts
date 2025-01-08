import {
  Api,
  ApiPagingRequest,
  ApiPagingResponse,
  ID,
  Schema,
  Team,
} from '@/apis'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type ScrimRequestStatus = 'REQUESTED' | 'APPROVED' | 'REJECTED'
export type ScrimReqOrderType = 'CREATED_AT_ASC' | 'CREATED_AT_DESC'
export type ScrimReqUpdateMask = 'COMMENT'

export const ScrimReqStatusObj = {
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

export interface ScrimReq extends Schema {
  from_team: Team
  to_team: Team
  status: ScrimRequestStatus
  comment: string
  reject_reason?: string
}

export interface CreateScrimReqRequest {
  from_team_id: ID
  to_team_id: ID
  comment: string
}

export interface GetScrimReqsParams extends ApiPagingRequest {
  fromTeamId?: ID
  toTeamId?: ID
  orderTypes?: ScrimReqOrderType[]
}

export interface GetScrimReqParams {
  id: ID
}

export interface UpdateScrimReqRequest {
  id: ID
  comment?: string
  update_mask: ScrimReqUpdateMask[]
}

export interface ApproveScrimReqRequest {
  id: ID
}

export interface RejectScrimReqRequest {
  id: ID
  reject_reason: string
}

export interface DeleteScrimReqRequest {
  id: ID
}

export const useCreateScrimReq = () => {
  return useMutation({
    mutationFn: (request: CreateScrimReqRequest) =>
      Api.post<ID>(toUrl(ApiV1Paths.SCRIM_REQUESTS), request),
  })
}

export const useGetScrimReqs = (
  params?: GetScrimReqsParams,
  enabled = true,
) => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.SCRIM_REQUESTS), params],
    queryFn: () =>
      Api.get<ApiPagingResponse<ScrimReq[]>>(
        toUrl(ApiV1Paths.SCRIM_REQUESTS),
        params,
      ),
    enabled,
  })
}

export const useGetScrimReq = (params: GetScrimReqParams) => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.SCRIM_REQUESTS, { id: params.id })],
    queryFn: () =>
      Api.get<ScrimReq>(toUrl(ApiV1Paths.SCRIM_REQUESTS, { id: params.id })),
  })
}

export const useUpdateScrimReq = () => {
  return useMutation({
    mutationFn: (request: UpdateScrimReqRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.SCRIM_REQUESTS, { id: request.id }),
        request,
      ),
  })
}

export const useApproveScrimReq = () => {
  return useMutation({
    mutationFn: (request: ApproveScrimReqRequest) =>
      Api.put<ID>(toUrl(ApiV1Paths.APPROVE_SCRIM_REQUEST, { id: request.id })),
  })
}

export const useRejectScrimReq = () => {
  return useMutation({
    mutationFn: (request: RejectScrimReqRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.REJECT_SCRIM_REQUEST, { id: request.id }),
        request,
      ),
  })
}

export const useDeleteScrimReq = () => {
  return useMutation({
    mutationFn: (request: DeleteScrimReqRequest) =>
      Api.delete<boolean>(toUrl(ApiV1Paths.SCRIM_REQUESTS, { id: request.id })),
  })
}
