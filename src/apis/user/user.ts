import { Schema } from '@/apis'
import { UserImage } from '@/apis/user/userImage'
import { UserSummoner } from '@/apis/user/userSummoner'

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

export interface User extends Schema {
  email: string
  login_type: UserLoginType
  nickname: string
  phone: string
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
  phone: string
  age: number
  birth: string
  gender: UserGenderType
  main_position: UserPositionType
  sub_position: UserPositionType
  summoners: UserSummoner[]
  role: UserRoleType
  profile_image?: UserImage
}
