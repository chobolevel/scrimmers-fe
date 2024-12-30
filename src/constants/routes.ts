import { compile } from 'path-to-regexp'

export const toUrl = (path: ApiV1Paths | PagePaths, params?: object) =>
  compile(path, { encode: encodeURIComponent })(params)

export enum ApiV1Paths {
  LOGIN = '/api/v1/auth/login',
  LOGOUT = '/api/v1/auth/logout',
  REISSUE = '/api/v1/auth/reissue',

  USERS = '/api/v1/users/:id?',
}

export enum PagePaths {
  HOME = '/',

  // sign
  SignIn = '/sign/in',
  SignUp = '/sign/up',
}
