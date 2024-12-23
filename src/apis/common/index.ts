export type ID = string

export interface ApiResponse<T> {
  data: T
}

export interface ApiPagingResponse<T> {
  skip_count: number
  limit_count: number
  total_count: number
  data: T[]
}

export interface ApiErrorResponse {
  error_code: string
  error_message: string
}

export interface Schema {
  id: ID
  created_at: number
  updated_at: number
}
