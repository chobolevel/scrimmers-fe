import { Schema } from '@/apis'
import { TeamImage } from '@/apis/team/teamImage'

export interface Team extends Schema {
  owner_id: string
  owner_nickname: string
  name: string
  description: string
  head_count: number
  max_head_count: number
  logo?: TeamImage
}
