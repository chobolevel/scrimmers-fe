export const NaverLoginPageUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=${process.env.NEXT_PUBLIC_NAVER_API_STATE}`

export interface NaverTokenResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  error: string
  error_description: string
}

export interface NaverUserResponse {
  resultcode: string
  message: string
  response: {
    id: string
    email: string
  }
}
