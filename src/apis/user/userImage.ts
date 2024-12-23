import { Schema } from '@/apis'

export type UserImageType = 'PROFILE'

export interface UserImage extends Schema {
  type: UserImageType
  name: string
  url: string
}
