import { useMutation } from '@tanstack/react-query'
import { Api, ApiResponse, useInvalidate, UserLoginType } from '@/apis'
import { ApiV1Paths, PagePaths, toUrl } from '@/constants'
import { toaster } from '@/components/ui/toaster'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const invalidate = useInvalidate(toUrl(ApiV1Paths.ME))
  return useMutation({
    mutationFn: () =>
      Api.instance.post<ApiResponse<boolean>>(ApiV1Paths.LOGOUT),
    onSuccess: () => {
      invalidate()
      router.push(toUrl(PagePaths.HOME)).then(() => {
        toaster.create({
          title: '로그아웃',
          description: '로그아웃이 완료되었습니다.',
        })
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
