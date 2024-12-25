import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ApiResponse, UserLoginType } from '@/apis'

export interface LoginRequest {
  email: string
  password: string
  social_id?: string
  login_type: UserLoginType
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (params: LoginRequest) =>
      axios.post<ApiResponse<boolean>>(
        'http://localhost:8080/api/v1/login',
        params,
      ),
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: () => axios.post('http://localhost:8080/api/v1/logout'),
  })
}

export const useReissue = () => {
  return useMutation({
    mutationFn: () => axios.post('http://localhost:8080/api/v1/reissue'),
  })
}
