import {
  Api,
  ApiPagingRequest,
  ApiPagingResponse,
  ApiResponse,
  ID,
  Schema,
  UserImage,
  UserSummoner,
} from '@/apis'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type UserLoginType = 'GENERAL' | 'KAKAO' | 'NAVER' | 'GOOGLE'
export type UserGenderType = 'MALE' | 'FEMALE'
export type UserPositionType =
  | 'NONE'
  | 'TOP'
  | 'JUNGLE'
  | 'MID'
  | 'BOTTOM'
  | 'SUPPORT'
export type UserRoleType = 'ROLE_USER' | 'ROLE_ADMIN'
export type UserOrderType = 'CREATED_AT_ASC' | 'CREATED_AT_DESC'
export type UserUpdateMask =
  | 'NICKNAME'
  | 'BIRTH'
  | 'GENDER'
  | 'MAIN_POSITION'
  | 'SUB_POSITION'

export interface User extends Schema {
  email: string
  login_type: UserLoginType
  nickname: string
  age: number
  birth: string
  gender: UserGenderType
  main_position: UserPositionType
  sub_position: UserPositionType
  role: UserRoleType
  profile_image?: UserImage
}

export interface UserDetail extends Schema {
  email: string
  login_type: UserLoginType
  nickname: string
  age: number
  birth: string
  gender: UserGenderType
  main_position: UserPositionType
  sub_position: UserPositionType
  summoners: UserSummoner[]
  role: UserRoleType
  profile_image?: UserImage
}

export interface CreateUserRequest {
  email: string
  password?: string
  check_password?: string
  social_id?: string
  login_type: UserLoginType
  nickname: string
  birth: string
  gender: UserGenderType
}

export interface GetUsersParams extends ApiPagingRequest {
  teamId?: ID
  loginType?: UserLoginType
  role?: UserRoleType
  resigned?: boolean
  orderTypes?: UserOrderType[]
}

export interface UpdateUserRequest {
  id: ID
  nickname?: string
  birth?: string
  gender?: UserGenderType
  main_position?: UserPositionType
  sub_position?: UserPositionType
  update_mask: UserUpdateMask[]
}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}

export interface DeleteUserRequest {
  id: ID
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (request: CreateUserRequest) =>
      Api.instance
        .post(toUrl(ApiV1Paths.USERS), request)
        .then((res) => res.data.data),
  })
}

export const useGetUsers = (params?: GetUsersParams) => {
  return useQuery({
    queryKey: [ApiV1Paths.USERS],
    queryFn: () =>
      Api.instance
        .get<ApiPagingResponse<User[]>>(toUrl(ApiV1Paths.USERS), { params })
        .then((res) => res.data.data),
  })
}

export const useGetUser = (id: ID) => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.USERS, { id })],
    queryFn: () =>
      Api.instance
        .get<ApiResponse<UserDetail>>(toUrl(ApiV1Paths.USERS, { id }))
        .then((res) => res.data.data),
  })
}

export const useGetMe = () => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.ME)],
    queryFn: () =>
      Api.instance
        .get<ApiResponse<UserDetail>>(toUrl(ApiV1Paths.ME), {})
        .then((res) => res.data.data)
        .catch(() => null),
  })
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (request: UpdateUserRequest) =>
      Api.instance
        .put<
          ApiResponse<ID>
        >(toUrl(ApiV1Paths.USERS, { id: request.id }), request)
        .then((res) => res.data.data),
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) =>
      Api.instance
        .put<ApiResponse<ID>>(toUrl(ApiV1Paths.USER_CHANGE_PASSWORD), request)
        .then((res) => res.data.data),
  })
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (request: DeleteUserRequest) =>
      Api.instance
        .delete<ApiResponse<ID>>(toUrl(ApiV1Paths.USERS, { id: request.id }))
        .then((res) => res.data.data),
  })
}
