import {
  UserDetail,
  UserGenderTypeObj,
  UserPositionTypeObj,
  UserSummonerRankTypeObj,
} from '@/apis'
import {
  Badge,
  Flex,
  Grid,
  GridItem,
  Image,
  Separator,
  Text,
} from '@chakra-ui/react'
import { FaUserAlt } from 'react-icons/fa'
import { useMemo } from 'react'
import { Tooltip } from '@/components/ui/tooltip'
import { FaCircleQuestion } from 'react-icons/fa6'

interface UserProfileProps {
  user: UserDetail
}

const UserProfile = ({ user }: UserProfileProps) => {
  const team = useMemo(() => user.team, [user])
  const profileImage = useMemo(
    () => (user?.profile_image ? user.profile_image : null),
    [user],
  )
  const gender = useMemo(() => UserGenderTypeObj[user.gender], [user])
  const summoners = useMemo(() => user.summoners, [user])
  return (
    <Flex w={'100%'} direction={'column'} gap={10}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        회원정보
      </Text>
      <Flex gap={10} align={'center'}>
        <Flex direction={'column'} align={'center'} gap={4}>
          {profileImage ? (
            <Image
              w={150}
              h={150}
              src={profileImage.url}
              alt={`${user.nickname}님의 프로필 이미지`}
            />
          ) : (
            <FaUserAlt size={150} />
          )}
        </Flex>
        <Flex direction={'column'} gap={4}>
          <Flex align={'center'} gap={2}>
            <Text
              fontSize={'lg'}
              fontWeight={'bold'}
            >{`${user.nickname}님의 프로필`}</Text>
            <Badge size={'lg'} colorPalette={gender.color} fontWeight={'bold'}>
              {`${user.age_range}대 ${gender.label}`}
            </Badge>
          </Flex>
          <Flex gap={2} align={'center'}>
            <Text fontWeight={'bold'}>소속팀</Text>
            {team ? (
              <Flex align={'center'} gap={1}>
                {team.logo ? (
                  <Image
                    w={'40px'}
                    h={'40px'}
                    src={team.logo.url}
                    alt={`${team.name} 로고 이미지`}
                    objectFit={'contain'}
                  />
                ) : (
                  <Text fontWeight={'bold'}>{team.name}</Text>
                )}
              </Flex>
            ) : (
              <Text>미소속</Text>
            )}
          </Flex>
          <Flex align={'center'} gap={4}>
            <Flex gap={2} align={'center'}>
              <Text fontWeight={'bold'}>주포지션</Text>
              <Image
                w={30}
                h={30}
                src={UserPositionTypeObj[user.main_position].icon}
                alt={UserPositionTypeObj[user.main_position].label}
              />
            </Flex>
            <Flex gap={2} align={'center'}>
              <Text fontWeight={'bold'}>부포지션</Text>
              <Image
                w={30}
                h={30}
                src={UserPositionTypeObj[user.sub_position].icon}
                alt={UserPositionTypeObj[user.sub_position].label}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Separator />
      <Flex align={'center'} gap={2}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          연결된 소환사 정보
        </Text>
        <Tooltip
          content={
            '연결된 소환사 정보가 본인 정보가 아닌 경우 예고 없이 연결이 해제될 수 있으며 팀 합류 과정에서 차질이 발생할 수 있습니다.'
          }
        >
          <FaCircleQuestion size={20} />
        </Tooltip>
      </Flex>
      {summoners.length > 0 ? (
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
          gap={10}
        >
          {summoners.map((summoner, idx) => {
            return (
              <GridItem key={idx}>
                <Flex
                  gap={6}
                  p={4}
                  border={'2px solid'}
                  borderRadius={10}
                  align={'center'}
                >
                  <Flex
                    w={100}
                    h={100}
                    overflow={'hidden'}
                    position={'relative'}
                  >
                    <Image
                      w={'100%'}
                      h={'100%'}
                      src={`${process.env.NEXT_PUBLIC_RIOT_PROFILE_ICON_URL}/${summoner.summoner_icon_id}.png`}
                      alt={`${summoner.summoner_full_name}님의 소환사 아이콘`}
                      borderRadius={10}
                    />
                    <Badge position={'absolute'} bottom={0} right={0}>
                      {summoner.summoner_level}
                    </Badge>
                  </Flex>
                  <Flex direction={'column'} gap={1}>
                    <Text fontSize={'lg'} fontWeight={'bold'}>
                      {summoner.summoner_full_name}
                    </Text>
                    <Flex align={'center'}>
                      <Text fontWeight={'bold'}>솔로랭크</Text>
                      <Image
                        w={'40px'}
                        h={'40px'}
                        src={
                          UserSummonerRankTypeObj[summoner.summoner_solo_rank]
                            .icon
                        }
                        alt={
                          UserSummonerRankTypeObj[summoner.summoner_solo_rank]
                            .label
                        }
                      />
                    </Flex>
                    <Flex align={'center'}>
                      <Text fontWeight={'bold'}>자유랭크</Text>
                      <Image
                        w={'40px'}
                        h={'40px'}
                        src={
                          UserSummonerRankTypeObj[summoner.summoner_flex_rank]
                            .icon
                        }
                        alt={
                          UserSummonerRankTypeObj[summoner.summoner_flex_rank]
                            .label
                        }
                      />
                    </Flex>
                  </Flex>
                </Flex>
              </GridItem>
            )
          })}
        </Grid>
      ) : (
        <Text textAlign={'center'} py={50} fontWeight={'bold'}>
          연결된 소환사 정보가 없습니다.
        </Text>
      )}
    </Flex>
  )
}

export default UserProfile
