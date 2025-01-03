import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { ApiErrorResponse } from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'

export class Api {
  static instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })
}

Api.instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }
    const { request, response } = error

    // 이전 요청이 Reissiue 요청이라면 에러를 반환합니다.
    // 저장된 모든 토큰을 삭제합니다.
    if (request?.responseURL?.includes(toUrl(ApiV1Paths.REISSUE))) {
      await Api.instance.post(toUrl(ApiV1Paths.LOGOUT))
      return Promise.reject(error)
    }

    if (response?.status === 401 && !originalRequest._retry) {
      // 재시도 플래그를 설정하여 무한 루프를 방지합니다.
      originalRequest._retry = true

      try {
        // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급합니다.
        await Api.instance.post(toUrl(ApiV1Paths.REISSUE))
        return Api.instance(originalRequest)
      } catch {
        console.error('refresh token is invalid')
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  },
)
