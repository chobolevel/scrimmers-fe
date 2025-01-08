import {
  Button,
  Flex,
  Image,
  Input,
  Separator,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react'
import {
  Team,
  useCreateTeamImage,
  useDeleteTeam,
  useDeleteTeamImage,
  useGetUsers,
  useInvalidate,
  useUpdateTeam,
  useUpdateTeamImage,
} from '@/apis'
import React, { useMemo, useRef, useState } from 'react'
import { RiTeamFill } from 'react-icons/ri'
import {
  ConfirmDialog,
  ImageUploader,
  ReceivedScrimReqList,
  SentScrimReqList,
  TeamJoinRequestList,
  TeamLeaveRequestList,
  TeamUserList,
} from '@/components'
import { ApiV1Paths, PagePaths, toUrl } from '@/constants'
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input'
import { toaster } from '@/components/ui/toaster'
import { useGetTeamJoinRequests } from '@/apis/team/join'
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination'
import { useGetTeamLeaveRequests } from '@/apis/team/leave'
import { router } from 'next/client'
import { useGetScrimReqs } from '@/apis/scrim'
import { IoMdRefreshCircle } from 'react-icons/io'

interface ModifyTeamFormProps {
  team: Team
}

const LIMIT_COUNT = 5

const ModifyTeamForm = ({ team }: ModifyTeamFormProps) => {
  const [name, setName] = useState<string>(team.name)
  const [maxHeadCount, setMaxHeadCount] = useState<number>(team.max_head_count)
  const [description, setDescription] = useState<string>(team.description)
  const logoImageUploaderRef = useRef<HTMLInputElement>(null)
  const [teamJoinRequestPage, setTeamJoinRequestPage] = useState<number>(1)
  const [teamLeaveRequestPage, setTeamLeaveRequestPage] = useState<number>(1)
  const [sentScrimReqsPage, setSentScrimReqsPage] = useState<number>(1)
  const [receivedScrimReqsPage, setReceivedScrimReqsPage] = useState<number>(1)

  const invalidateTeam = useInvalidate(toUrl(ApiV1Paths.TEAMS, { id: team.id }))
  const { data: users, isFetching: usersIsFetching } = useGetUsers(
    {
      teamId: team.id,
      limitCount: team.head_count,
    },
    !!team.id,
  )
  const {
    data: teamJoinRequests,
    isFetching: teamJoinRequestsIsFetching,
    refetch: refetchTeamJoinRequests,
  } = useGetTeamJoinRequests(
    {
      teamId: team.id,
      skipCount: (teamJoinRequestPage - 1) * LIMIT_COUNT,
      limitCount: LIMIT_COUNT,
    },
    !!team.id,
  )
  const {
    data: teamLeaveRequests,
    isFetching: teamLeaveRequestsIsFetching,
    refetch: refetchTeamLeaveRequests,
  } = useGetTeamLeaveRequests(
    {
      teamId: team.id,
      skipCount: (teamLeaveRequestPage - 1) * LIMIT_COUNT,
      limitCount: LIMIT_COUNT,
    },
    !!team.id,
  )
  const {
    data: sentScrimReqs,
    isFetching: isSentScrimReqsFetching,
    refetch: refetchSentScrimReqs,
  } = useGetScrimReqs(
    {
      fromTeamId: team.id,
    },
    !!team.id,
  )
  const {
    data: receivedScrimReqs,
    isFetching: isReceivedScrimReqsFetching,
    refetch: refetchReceivedScrimReq,
  } = useGetScrimReqs(
    {
      toTeamId: team.id,
    },
    !!team.id,
  )
  const { mutate: updateTeam } = useUpdateTeam()
  const { mutate: deleteTeam } = useDeleteTeam()
  const { mutate: createTeamImage } = useCreateTeamImage()
  const { mutate: updateTeamImage } = useUpdateTeamImage()
  const { mutate: deleteTeamImage } = useDeleteTeamImage()

  const logo = useMemo(() => team?.logo, [team])
  return (
    <Flex direction={'column'} gap={6}>
      <Flex direction={'column'} gap={6}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          팀 정보
        </Text>
        <Flex
          align={{ base: 'center', lg: 'start' }}
          direction={{ base: 'column', lg: 'row' }}
          gap={10}
        >
          <Flex
            w={150}
            h={150}
            direction={'column'}
            align={'center'}
            gap={4}
            mt={10}
          >
            {logo ? (
              <Image
                src={logo.url}
                alt={`${team.name} 로고 이미지`}
                objectFit={'contain'}
              />
            ) : (
              <RiTeamFill size={150} />
            )}
            <ImageUploader
              inputRef={logoImageUploaderRef}
              onUpload={(url, filename) => {
                if (logo) {
                  updateTeamImage(
                    {
                      team_id: team.id,
                      team_image_id: logo.id,
                      url,
                      name: filename,
                      update_mask: ['URL', 'NAME'],
                    },
                    {
                      onSuccess: () => {
                        invalidateTeam()
                      },
                    },
                  )
                } else {
                  createTeamImage(
                    {
                      team_id: team.id,
                      type: 'LOGO',
                      url,
                      name: filename,
                    },
                    {
                      onSuccess: () => {
                        invalidateTeam()
                      },
                    },
                  )
                }
              }}
            />
            {logo && (
              <Button
                size={'xs'}
                fontWeight={'bold'}
                onClick={() => {
                  deleteTeamImage(
                    {
                      team_id: team.id,
                      team_image_id: logo.id,
                    },
                    {
                      onSuccess: () => {
                        invalidateTeam()
                      },
                    },
                  )
                }}
              >
                기본 로고
              </Button>
            )}
            <Button
              size={'xs'}
              fontWeight={'bold'}
              onClick={() => {
                logoImageUploaderRef.current?.click()
              }}
            >
              {logo ? '팀 로고 수정' : '팀 로고 등록'}
            </Button>
          </Flex>
          <Flex w={'100%'} flex={1} direction={'column'} gap={6}>
            <Flex direction={'column'} gap={2}>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                팀 이름
              </Text>
              <Flex align={'center'} gap={2}>
                <Input
                  type={'text'}
                  placeholder={'팀 이름'}
                  maxW={200}
                  value={name}
                  onChange={(e) => {
                    const val = e.target.value
                    setName(val)
                  }}
                />
                <Button
                  size={'sm'}
                  fontWeight={'bold'}
                  colorPalette={'green'}
                  disabled={
                    name.length < 1 ||
                    name.toLowerCase() === team.name.toLowerCase()
                  }
                  onClick={() => {
                    updateTeam(
                      {
                        id: team.id,
                        name,
                        update_mask: ['NAME'],
                      },
                      {
                        onSuccess: () => {
                          invalidateTeam()
                          toaster.create({
                            type: 'success',
                            title: '팀 이름 수정 완료',
                          })
                        },
                      },
                    )
                  }}
                >
                  수정
                </Button>
              </Flex>
            </Flex>
            <Flex direction={'column'} gap={2}>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                {`팀 총원(현재 팀원 ${team.head_count}명)`}
              </Text>
              <Flex align={'center'} gap={2}>
                <NumberInputRoot
                  maxW={100}
                  step={1}
                  min={team.head_count}
                  max={100}
                  value={maxHeadCount.toString()}
                  onValueChange={(e) => {
                    setMaxHeadCount(Number(e.value))
                  }}
                >
                  <NumberInputField />
                </NumberInputRoot>
                <Button
                  size={'sm'}
                  fontWeight={'bold'}
                  colorPalette={'green'}
                  onClick={() => {
                    updateTeam(
                      {
                        id: team.id,
                        max_head_count: maxHeadCount,
                        update_mask: ['MAX_HEAD_COUNT'],
                      },
                      {
                        onSuccess: () => {
                          invalidateTeam()
                          toaster.create({
                            type: 'success',
                            title: '팀 총원 수정 완료',
                          })
                        },
                      },
                    )
                  }}
                >
                  수정
                </Button>
              </Flex>
            </Flex>
            <Flex direction={'column'} gap={2}>
              <Flex align={'center'} justify={'space-between'} gap={2}>
                <Text fontSize={'sm'} fontWeight={'bold'}>
                  팀 소개
                </Text>
                <Button
                  size={'sm'}
                  fontWeight={'bold'}
                  colorPalette={'green'}
                  disabled={description.length < 10}
                  onClick={() => {
                    updateTeam(
                      {
                        id: team.id,
                        description,
                        update_mask: ['DESCRIPTION'],
                      },
                      {
                        onSuccess: () => {
                          invalidateTeam()
                          toaster.create({
                            type: 'success',
                            title: '팀 소개글 수정 완료',
                          })
                        },
                      },
                    )
                  }}
                >
                  수정
                </Button>
              </Flex>
              <Textarea
                placeholder={'팀 소개'}
                minH={100}
                value={description}
                onChange={(e) => {
                  const val = e.target.value
                  setDescription(val)
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Separator />
      <Flex direction={'column'} gap={6}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          팀원
        </Text>
        {users ? (
          <TeamUserList modifiable={true} team={team} users={users.data} />
        ) : (
          <Flex h={200} justify={'center'} align={'center'}>
            {usersIsFetching ? (
              <Spinner size={'lg'} />
            ) : (
              <Text fontWeight={'bold'}>검색 조건에 맞는 팀원이 없습니다.</Text>
            )}
          </Flex>
        )}
      </Flex>
      <Separator />
      <Flex direction={'column'} gap={6}>
        <Flex align={'center'} gap={2}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            팀 가입 신청
          </Text>
          <IoMdRefreshCircle
            size={30}
            cursor={'pointer'}
            onClick={() => {
              refetchTeamJoinRequests()
            }}
          />
        </Flex>
        {teamJoinRequests ? (
          <>
            <TeamJoinRequestList requests={teamJoinRequests.data} />
            <Flex align={'center'} justify={'center'}>
              <PaginationRoot
                page={teamJoinRequestPage}
                pageSize={LIMIT_COUNT}
                count={teamJoinRequests.total_count}
                onPageChange={(e) => setTeamJoinRequestPage(e.page)}
                variant={'subtle'}
              >
                <Flex align={'center'} gap={2}>
                  <PaginationPrevTrigger />
                  <PaginationItems />
                  <PaginationNextTrigger />
                </Flex>
              </PaginationRoot>
            </Flex>
          </>
        ) : (
          <Flex h={200} justify={'center'} align={'center'}>
            {teamJoinRequestsIsFetching ? (
              <Spinner size={'lg'} />
            ) : (
              <Text fontWeight={'bold'}>
                검색 조건에 맞는 가입 신청이 없습니다.
              </Text>
            )}
          </Flex>
        )}
      </Flex>
      <Flex direction={'column'} gap={6}>
        <Flex align={'center'} gap={2}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            팀 탈퇴 신청
          </Text>
          <IoMdRefreshCircle
            size={30}
            cursor={'pointer'}
            onClick={() => {
              refetchTeamLeaveRequests()
            }}
          />
        </Flex>
        {teamLeaveRequests ? (
          <>
            <TeamLeaveRequestList requests={teamLeaveRequests.data} />
            <Flex align={'center'} justify={'center'}>
              <PaginationRoot
                page={teamLeaveRequestPage}
                pageSize={LIMIT_COUNT}
                count={teamLeaveRequests.total_count}
                onPageChange={(e) => setTeamLeaveRequestPage(e.page)}
                variant={'subtle'}
              >
                <Flex align={'center'} gap={2}>
                  <PaginationPrevTrigger />
                  <PaginationItems />
                  <PaginationNextTrigger />
                </Flex>
              </PaginationRoot>
            </Flex>
          </>
        ) : (
          <Flex h={200} justify={'center'} align={'center'}>
            {teamLeaveRequestsIsFetching ? (
              <Spinner size={'lg'} />
            ) : (
              <Text fontWeight={'bold'}>
                검색 조건에 맞는 탈퇴 신청이 없습니다.
              </Text>
            )}
          </Flex>
        )}
      </Flex>
      <Flex direction={'column'} gap={6}>
        <Flex align={'center'} gap={2}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            보낸 스크림 요청
          </Text>
          <IoMdRefreshCircle
            size={30}
            cursor={'pointer'}
            onClick={() => {
              refetchSentScrimReqs()
            }}
          />
        </Flex>
        {sentScrimReqs ? (
          <>
            <SentScrimReqList scrimReqs={sentScrimReqs.data} />
            <Flex align={'center'} justify={'center'}>
              <PaginationRoot
                page={sentScrimReqsPage}
                pageSize={LIMIT_COUNT}
                count={sentScrimReqs.total_count}
                onPageChange={(e) => setSentScrimReqsPage(e.page)}
                variant={'subtle'}
              >
                <Flex align={'center'} gap={2}>
                  <PaginationPrevTrigger />
                  <PaginationItems />
                  <PaginationNextTrigger />
                </Flex>
              </PaginationRoot>
            </Flex>
          </>
        ) : (
          <Flex h={200} justify={'center'} align={'center'}>
            {isSentScrimReqsFetching ? (
              <Spinner size={'lg'} />
            ) : (
              <Text fontWeight={'bold'}>
                검색 조건에 맞는 스크림 요청이 없습니다.
              </Text>
            )}
          </Flex>
        )}
      </Flex>
      <Flex direction={'column'} gap={6}>
        <Flex align={'center'} gap={2}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            받은 스크림 요청
          </Text>
          <IoMdRefreshCircle
            size={30}
            cursor={'pointer'}
            onClick={() => {
              refetchReceivedScrimReq()
            }}
          />
        </Flex>
        {receivedScrimReqs ? (
          <>
            <ReceivedScrimReqList scrimReqs={receivedScrimReqs.data} />
            <Flex align={'center'} justify={'center'}>
              <PaginationRoot
                page={receivedScrimReqsPage}
                pageSize={LIMIT_COUNT}
                count={receivedScrimReqs.total_count}
                onPageChange={(e) => setReceivedScrimReqsPage(e.page)}
                variant={'subtle'}
              >
                <Flex align={'center'} gap={2}>
                  <PaginationPrevTrigger />
                  <PaginationItems />
                  <PaginationNextTrigger />
                </Flex>
              </PaginationRoot>
            </Flex>
          </>
        ) : (
          <Flex h={200} justify={'center'} align={'center'}>
            {isReceivedScrimReqsFetching ? (
              <Spinner size={'lg'} />
            ) : (
              <Text fontWeight={'bold'}>
                검색 조건에 맞는 스크림 요청이 없습니다.
              </Text>
            )}
          </Flex>
        )}
      </Flex>
      <Flex align={'center'} justify={'center'} py={20}>
        <ConfirmDialog
          buttonText={'팀 해체'}
          buttonStyle={{
            size: 'sm',
            fontWeight: 'bold',
            colorPalette: 'red',
            variant: 'ghost',
          }}
          title={'팀 해체'}
          description={
            '정말 팀을 해체하시겠습니까?\n현재 팀에 소속된 팀원이 있는 경우 팀을 해체할 수 없습니다.'
          }
          onConfirm={() => {
            deleteTeam(
              {
                id: team.id,
              },
              {
                onSuccess: () => {
                  toaster.create({
                    type: 'success',
                    title: '팀 해체 완료',
                  })
                  router.push(PagePaths.Teams)
                },
              },
            )
          }}
        />
      </Flex>
    </Flex>
  )
}

export default ModifyTeamForm
