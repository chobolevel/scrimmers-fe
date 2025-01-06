import { Api, ID, Schema } from '@/apis'
import { useMutation } from '@tanstack/react-query'
import { ApiV1Paths, toUrl } from '@/constants'

export type TeamImageType = 'LOGO'
export type TeamImageUpdateMask = 'TYPE' | 'NAME' | 'URL'

export interface TeamImage extends Schema {
  type: TeamImageType
  name: string
  url: string
}

export interface CreateTeamImageRequest {
  team_id: ID
  type: TeamImageType
  name: string
  url: string
}

export interface UpdateTeamImageRequest {
  team_id: ID
  team_image_id: ID
  type?: TeamImageType
  name?: string
  url?: string
  update_mask: TeamImageUpdateMask[]
}

export interface DeleteTeamImageRequest {
  team_id: ID
  team_image_id: ID
}

export const useCreateTeamImage = () => {
  return useMutation({
    mutationFn: (request: CreateTeamImageRequest) =>
      Api.post<ID>(
        toUrl(ApiV1Paths.TEAM_IMAGES, { teamId: request.team_id }),
        request,
      ),
  })
}

export const useUpdateTeamImage = () => {
  return useMutation({
    mutationFn: (request: UpdateTeamImageRequest) =>
      Api.put<ID>(
        toUrl(ApiV1Paths.TEAM_IMAGES, {
          teamId: request.team_id,
          teamImageId: request.team_image_id,
        }),
      ),
  })
}

export const useDeleteTeamImage = () => {
  return useMutation({
    mutationFn: (request: DeleteTeamImageRequest) =>
      Api.delete<boolean>(
        toUrl(ApiV1Paths.TEAM_IMAGES, {
          teamId: request.team_id,
          teamImageId: request.team_image_id,
        }),
      ),
  })
}
