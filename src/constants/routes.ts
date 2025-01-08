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

  USER_SUMMONERS = '/api/v1/users/summoners/:id?',

  TEAMS = '/api/v1/teams/:id?',
  BANISH_TEAM_USERS = '/api/v1/teams/:id?/banish',

  TEAM_IMAGES = '/api/v1/teams/:teamId?/images/:teamImageId?',

  TEAM_JOIN_REQUESTS = '/api/v1/teams/join-requests/:id?',
  APPROVE_TEAM_JOIN_REQUEST = '/api/v1/teams/join-requests/:id?/approve',
  REJECT_TEAM_JOIN_REQUEST = '/api/v1/teams/join-requests/:id?/reject',
  TEAM_LEAVE_REQUESTS = '/api/v1/teams/leave-requests/:id?',
  APPROVE_TEAM_LEAVE_REQUEST = '/api/v1/teams/leave-requests/:id?/approve',
  REJECT_TEAM_LEAVE_REQUEST = '/api/v1/teams/leave-requests/:id?/reject',

  PRESIGNED_URL = '/api/v1/upload/presigned-url',

  SCRIM_REQUESTS = '/api/v1/scrims/requests/:id?',
  APPROVE_SCRIM_REQUEST = '/api/v1/scrims/requests/:id?/approve',
  REJECT_SCRIM_REQUEST = '/api/v1/scrims/requests/:id?/reject',
}

export enum PagePaths {
  HOME = '/',

  // sign
  SignIn = '/sign/in',
  SignUp = '/sign/up',
  SocialSignUp = '/sign/up/social',

  // my
  MyProfile = '/my/profile',
  MyPassword = '/my/password',

  // user
  UserProfile = '/users/:id?',

  // team
  Teams = '/teams/',
  TeamDetail = '/teams/:id?',
  TeamRegistration = '/teams/registration',
  ModifyTeam = '/teams/:id?/modify',
}
