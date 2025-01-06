import { Badge, Button, Flex, Image, Table, Text } from '@chakra-ui/react'
import {
  TeamJoinRequest,
  TeamJoinRequestStatusObj,
  useApproveTeamJoinRequest,
  useRejectTeamJoinRequest,
} from '@/apis/team/join'
import { useMemo } from 'react'
import { useInvalidate, UserPositionTypeObj } from '@/apis'
import moment from 'moment'
import { toaster } from '@/components/ui/toaster'
import { ApiV1Paths, toUrl } from '@/constants'

interface TeamJoinRequestListItemProps {
  request: TeamJoinRequest
}

const TeamJoinRequestListItem = ({ request }: TeamJoinRequestListItemProps) => {
  const invalidate = useInvalidate(toUrl(ApiV1Paths.TEAM_JOIN_REQUESTS))
  const usersInvalidate = useInvalidate(toUrl(ApiV1Paths.USERS))
  const { mutate: approveTeamJoinRequest } = useApproveTeamJoinRequest()
  const { mutate: rejectTeamJoinRequest } = useRejectTeamJoinRequest()

  const requester = useMemo(() => request.requester, [request])
  const mainPosition = useMemo(
    () => UserPositionTypeObj[requester.main_position],
    [requester],
  )
  const subPosition = useMemo(
    () => UserPositionTypeObj[requester.sub_position],
    [requester],
  )
  const status = useMemo(
    () => TeamJoinRequestStatusObj[request.status],
    [request],
  )
  const createdAt = useMemo(
    () => moment(request.created_at).format('YYYY-MM-DD'),
    [request],
  )
  return (
    <Table.Row>
      <Table.Cell textAlign={'center'}>{requester.nickname}</Table.Cell>
      <Table.Cell textAlign={'center'}>
        <Flex align={'center'} justify={'center'}>
          <Image
            w={'20px'}
            h={'20px'}
            src={mainPosition.icon}
            alt={mainPosition.label}
          />
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Flex align={'center'} justify={'center'}>
          <Image
            w={'20px'}
            h={'20px'}
            src={subPosition.icon}
            alt={subPosition.label}
          />
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Flex align={'center'} justify={'center'}>
          <Badge colorPalette={status.color} size={'lg'} fontWeight={'bold'}>
            {status.label}
          </Badge>
        </Flex>
      </Table.Cell>
      <Table.Cell textAlign={'center'}>
        <Text>{createdAt}</Text>
      </Table.Cell>
      <Table.Cell>
        <Flex align={'center'} justify={'center'} gap={2}>
          <Button
            size={'xs'}
            colorPalette={'green'}
            fontWeight={'bold'}
            disabled={request.status !== 'REQUESTED'}
            onClick={() => {
              approveTeamJoinRequest(
                {
                  team_join_request_id: request.id,
                },
                {
                  onSuccess: () => {
                    invalidate()
                    usersInvalidate()
                    toaster.create({
                      type: 'success',
                      title: '가입 신청 승인 완료',
                    })
                  },
                },
              )
            }}
          >
            승인
          </Button>
          <Button
            size={'xs'}
            colorPalette={'red'}
            fontWeight={'bold'}
            disabled={request.status !== 'REQUESTED'}
            onClick={() => {
              rejectTeamJoinRequest(
                {
                  team_join_request_id: request.id,
                  reason: '팀 모집 조건에 맞지 않아 거절되었습니다.',
                },
                {
                  onSuccess: () => {
                    invalidate()
                    usersInvalidate()
                    toaster.create({
                      type: 'success',
                      title: '가입 신청 거절 완료',
                    })
                  },
                },
              )
            }}
          >
            거절
          </Button>
        </Flex>
      </Table.Cell>
    </Table.Row>
  )
}

export default TeamJoinRequestListItem
