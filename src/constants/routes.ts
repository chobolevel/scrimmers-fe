import { compile } from 'path-to-regexp'

export const toUrl = (path: ApiV1Paths | PagePaths, params?: object) =>
  compile(path, { encode: encodeURIComponent })(params)

export enum ApiV1Paths {
  LOGIN = '/api/v1/auth/login',
  LOGOUT = '/api/v1/auth/logout',
  REISSUE = '/api/v1/auth/reissue',

  ME = '/api/v1/users/me',

  USERS = '/api/v1/users/:id?',
  USER_CHANGE_PASSWORD = '/api/v1/users/change-password',
}

export enum PagePaths {
  HOME = '/',

  // sign
  SignIn = '/sign/in',
  SignUp = '/sign/up',
  SocialSignUp = '/sign/up/social',
}
