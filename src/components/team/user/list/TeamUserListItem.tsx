import { Badge, Flex, Image, Text } from '@chakra-ui/react'
import {
  Team,
  useBanishTeamUsers,
  useGetMe,
  useInvalidate,
  User,
  UserGenderTypeObj,
  UserPositionTypeObj,
} from '@/apis'
import { useMemo } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { router } from 'next/client'
import { ApiV1Paths, PagePaths, toUrl } from '@/constants'
import { FaCrown } from 'react-icons/fa6'
import { ConfirmDialog } from '@/components'
import { toaster } from '@/components/ui/toaster'

interface UserListItemProps {
  team: Team
  user: User
}

const TeamUserListItem = ({ team, user }: UserListItemProps) => {
  const teamUsersInvalidate = useInvalidate(toUrl(ApiV1Paths.USERS))

  const { data: me } = useGetMe()
  const { mutate: banishTeamUser } = useBanishTeamUsers()

  const profileImage = useMemo(() => user?.profile_image, [user])
  const gender = useMemo(() => UserGenderTypeObj[user.gender], [user])
  const mainPosition = useMemo(
    () => UserPositionTypeObj[user.main_position],
    [user],
  )
  const subPosition = useMemo(
    () => UserPositionTypeObj[user.sub_position],
    [user],
  )
  const isMeOwner = useMemo(() => team.owner_id === me?.id, [me])
  const isOwner = useMemo(() => team.owner_id === user.id, [user])
  return (
    <Flex align={'center'} gap={{ base: 6, lg: 10 }} p={4}>
      <Flex w={50} h={50} position={'relative'}>
        {isOwner && (
          <Flex
            w={'100%'}
            position={'absolute'}
            top={'-20px'}
            justify={'center'}
          >
            <FaCrown size={20} color={'yellow'} />
          </Flex>
        )}
        {profileImage ? (
          <Image
            src={profileImage.url}
            alt={`${user.nickname}님의 프로필 이미지`}
          />
        ) : (
          <FaUserAlt size={50} />
        )}
      </Flex>
      <Flex direction={'column'} gap={2}>
        <Flex align={'center'} gap={2}>
          <Text
            fontWeight={'bold'}
            cursor={'pointer'}
            _hover={{ textDecoration: 'underline' }}
            onClick={() => {
              router.push(toUrl(PagePaths.UserProfile, { id: user.id }))
            }}
          >{`${user.nickname}님`}</Text>
          <Badge size={'lg'} colorPalette={gender.color} fontWeight={'bold'}>
            {`${user.age_range}대 ${gender.label}`}
          </Badge>
        </Flex>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align={{ base: 'start', lg: 'center' }}
          gap={4}
        >
          <Flex align={'center'} gap={2}>
            <Text fontSize={'sm'} fontWeight={'bold'}>
              주포지션
            </Text>
            <Image
              w={30}
              h={30}
              src={mainPosition.icon}
              alt={mainPosition.label}
            />
          </Flex>
          <Flex align={'center'} gap={2}>
            <Text fontSize={'sm'} fontWeight={'bold'}>
              부포지션
            </Text>
            <Image
              w={30}
              h={30}
              src={subPosition.icon}
              alt={subPosition.label}
            />
          </Flex>
          {isMeOwner && !isOwner && (
            <ConfirmDialog
              buttonText={'추방'}
              buttonStyle={{
                size: 'xs',
                fontWeight: 'bold',
                colorPalette: 'red',
              }}
              title={'팀원 추방'}
              description={`정말 ${user.nickname}님을 추방하시겠습니까?`}
              onConfirm={() => {
                banishTeamUser(
                  {
                    team_id: team.id,
                    user_ids: [user.id],
                  },
                  {
                    onSuccess: () => {
                      teamUsersInvalidate()
                      toaster.create({
                        type: 'success',
                        title: '팀원 추방 완료',
                      })
                    },
                  },
                )
              }}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TeamUserListItem
