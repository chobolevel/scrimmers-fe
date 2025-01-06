import { useQueryClient } from '@tanstack/react-query'

export type ID = string

export interface ApiResponse<T> {
  data: T
}

export interface ApiPagingResponse<T> {
  skip_count: number
  limit_count: number
  total_count: number
  data: T
}

export interface ApiErrorResponse {
  error_code: string
  error_message: string
}

export enum ApiErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface Schema {
  id: ID
  created_at: number
  updated_at: number
}

export interface ApiPagingRequest {
  skipCount?: number
  limitCount?: number
}

export const useInvalidate = (url: string, params?: object) => {
  const queryClient = useQueryClient()
  const queryKeyToInvalidate = params ? [url, params] : [url]

  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeyToInvalidate })
  }
}
