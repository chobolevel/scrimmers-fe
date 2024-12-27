import axios, { AxiosInstance } from 'axios'

export const KakaoLoginPageUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`

export interface KakaoTokenRequest {
  grant_type: 'authorization_code'
  client_id: string
  redirect_uri: string
  code: string
}

export interface KakaoTokenResponse {
  token_type: string
  access_token: string
  id_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_id: number
  scope: string
}

export class KakaoTokenApi {
  static instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_KAKAO_TOKEN_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  })
}

export interface KakaoUserResponse {
  id: string
  connected_at: string
  properties: {
    nickname: string
  }
  kakao_account: {
    profile_nickname_needs_agreement: boolean
    profile: {
      nickname: string
      is_default_nickname: boolean
    }
    has_email: boolean
    email_needs_agreement: boolean
    is_email_valid: boolean
    is_email_verified: boolean
    email: string
  }
}

export class KakaoUserApi {
  static instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_KAKAO_USER_API_URL,
    timeout: 100000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  })
}
