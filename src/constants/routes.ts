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
  USER_IMAGES = '/api/v1/users/images/:id?',

  USER_SUMMONERS = '/api/v1/users/summoners',

  PRESIGNED_URL = '/api/v1/upload/presigned-url',
}

export enum PagePaths {
  HOME = '/',

  // sign
  SignIn = '/sign/in',
  SignUp = '/sign/up',
  SocialSignUp = '/sign/up/social',

  // my
  MyProfile = '/my/profile',

  // user
  UserProfile = '/users/:id?',
}
