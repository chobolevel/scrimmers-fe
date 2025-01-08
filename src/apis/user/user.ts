import {
  Api,
  ApiPagingRequest,
  ApiPagingResponse,
  ApiResponse,
  ID,
  Schema,
  Team,
  useInvalidate,
  UserImage,
  UserSummoner,
} from '@/apis'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ApiV1Paths, images, toUrl } from '@/constants'

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

export const UserGenderTypeArr = [
  { label: '남성', value: 'MALE' },
  { label: '여성', value: 'FEMALE' },
]

export const UserPositionTypeObj = {
  NONE: {
    label: '미선택',
    icon: images.none_position.src,
  },
  TOP: {
    label: '탑',
    icon: images.top.src,
  },
  JUNGLE: {
    label: '정글',
    icon: images.jungle.src,
  },
  MID: {
    label: '미드',
    icon: images.mid.src,
  },
  BOTTOM: {
    label: '원딜',
    icon: images.bottom.src,
  },
  SUPPORT: {
    label: '서폿',
    icon: images.support.src,
  },
}

export const UserGenderTypeObj = {
  MALE: {
    label: '남성',
    color: 'blue',
  },
  FEMALE: {
    label: '여성',
    color: 'pink',
  },
}

export const UserPositionTypeArr = [
  { label: '상관없음', value: 'NONE' },
  { label: '탑', value: 'TOP' },
  { label: '정글', value: 'JUNGLE' },
  { label: '미드', value: 'MID' },
  { label: '원딜', value: 'BOTTOM' },
  { label: '서폿', value: 'SUPPORT' },
]

export interface User extends Schema {
  email: string
  login_type: UserLoginType
  nickname: string
  age_range: number
  birth: string
  gender: UserGenderType
  main_position: UserPositionType
  sub_position: UserPositionType
  role: UserRoleType
  profile_image?: UserImage
}

export interface UserDetail extends Schema {
  team?: Team
  team_joined_at?: number
  email: string
  login_type: UserLoginType
  nickname: string
  age_range: number
  birth: string
  gender: UserGenderType
  main_position: UserPositionType
  sub_position: UserPositionType
  summoners: UserSummoner[]
  role: UserRoleType
  profile_image?: UserImage
  is_team_owner: boolean
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
  new_password_check: string
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
    onSettled: useInvalidate(toUrl(ApiV1Paths.USERS)),
  })
}

export const useGetUsers = (params?: GetUsersParams, enabled = true) => {
  return useQuery({
    queryKey: [toUrl(ApiV1Paths.USERS), params],
    queryFn: () =>
      Api.get<ApiPagingResponse<User[]>>(toUrl(ApiV1Paths.USERS), params),
    enabled,
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
