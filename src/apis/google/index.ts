import axios, { AxiosInstance } from 'axios'

export const GoogleLoginPageUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`

export class GoogleUserApi {
  static instance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_GOOGLE_USER_API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  })
}
