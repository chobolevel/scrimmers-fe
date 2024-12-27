import { useMutation } from '@tanstack/react-query'
import { Api, ApiResponse, UserLoginType } from '@/apis'
import { ApiV1Paths } from '@/constants'

export interface LoginRequest {
  email: string
  password?: string
  social_id?: string
  login_type: UserLoginType
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (params: LoginRequest) =>
      Api.instance.post<ApiResponse<boolean>>(ApiV1Paths.LOGIN, params),
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: () =>
      Api.instance.post<ApiResponse<boolean>>(ApiV1Paths.LOGOUT),
  })
}

export const useReissue = () => {
  return useMutation({
    mutationFn: () =>
      Api.instance.post<ApiResponse<boolean>>(ApiV1Paths.REISSUE),
  })
}
