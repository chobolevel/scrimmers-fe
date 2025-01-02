import { Schema } from '@/apis'

export type TeamImageType = 'LOGO'

export interface TeamImage extends Schema {
  type: TeamImageType
  name: string
  url: string
}
