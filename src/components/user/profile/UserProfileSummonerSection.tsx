import { Badge, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { Tooltip } from '@/components/ui/tooltip'
import { FaCircleQuestion } from 'react-icons/fa6'
import { UserSummoner, UserSummonerRankTypeObj } from '@/apis'

interface UserProfileSummonerSectionProps {
  summoners: UserSummoner[]
}

const UserProfileSummonerSection = ({
  summoners,
}: UserProfileSummonerSectionProps) => {
  return (
    <Flex direction={'column'} gap={4}>
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

export default UserProfileSummonerSection
