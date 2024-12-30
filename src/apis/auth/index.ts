import { useMutation } from '@tanstack/react-query'
import { Api, ApiResponse, useInvalidate, UserLoginType } from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'
import { toaster } from '@/components/ui/toaster'

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
  const invalidate = useInvalidate(toUrl(ApiV1Paths.ME))
  return useMutation({
    mutationFn: () =>
      Api.instance.post<ApiResponse<boolean>>(ApiV1Paths.LOGOUT),
    onSuccess: () => {
      invalidate()
      toaster.create({
        title: '로그아웃',
        description: '로그아웃이 완료되었습니다.',
      })
    },
  })
}

export const useReissue = () => {
  return useMutation({
    mutationFn: () =>
      Api.instance.post<ApiResponse<boolean>>(ApiV1Paths.REISSUE),
  })
}
