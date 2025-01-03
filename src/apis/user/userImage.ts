import { Api, ApiResponse, ID, Schema, useInvalidate } from '@/apis'
import { useMutation } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type UserImageType = 'PROFILE'
export type UserImageUpdateMask = 'TYPE' | 'NAME' | 'URL'

export interface UserImage extends Schema {
  type: UserImageType
  name: string
  url: string
}

export interface CreateUserImageRequest {
  type: UserImageType
  name: string
  url: string
}

export interface UpdateUserImageRequest {
  id: ID
  type?: UserImageType
  name?: string
  url?: string
  update_mask: UserImageUpdateMask[]
}

export interface DeleteUserImageRequest {
  id: ID
}

export const useCreateUserImage = () => {
  return useMutation({
    mutationFn: (request: CreateUserImageRequest) =>
      Api.instance
        .post<ApiResponse<ID>>(toUrl(ApiV1Paths.USER_IMAGES), request)
        .then((res) => res.data.data),
    onSettled: useInvalidate(toUrl(ApiV1Paths.ME)),
  })
}

export const useUpdateUserImage = () => {
  return useMutation({
    mutationFn: (request: UpdateUserImageRequest) =>
      Api.instance
        .put<
          ApiResponse<ID>
        >(toUrl(ApiV1Paths.USER_IMAGES, { id: request.id }), request)
        .then((res) => res.data.data),
    onSettled: useInvalidate(toUrl(ApiV1Paths.ME)),
  })
}

export const useDeleteUserImage = () => {
  return useMutation({
    mutationFn: (request: DeleteUserImageRequest) =>
      Api.instance
        .delete<
          ApiResponse<boolean>
        >(toUrl(ApiV1Paths.USER_IMAGES, { id: request.id }))
        .then((res) => res.data.data),
    onSettled: useInvalidate(toUrl(ApiV1Paths.ME)),
  })
}
