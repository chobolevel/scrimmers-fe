import { Badge, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { Tooltip } from '@/components/ui/tooltip'
import { FaCircleQuestion } from 'react-icons/fa6'
import { ConfirmDialog, UserSummonerSearchDialog } from '@/components'
import {
  useDeleteUserSummoner,
  UserSummoner,
  UserSummonerRankTypeObj,
} from '@/apis'
import { toaster } from '@/components/ui/toaster'
import React from 'react'

interface MyProfileSummonerSectionProps {
  summoners: UserSummoner[]
}

const MyProfileSummonerSection = ({
  summoners,
}: MyProfileSummonerSectionProps) => {
  const { mutate: deleteUserSummoner } = useDeleteUserSummoner()
  return (
    <Flex direction={'column'} gap={4}>
      <Flex align={'center'} justify={'space-between'}>
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
        <UserSummonerSearchDialog />
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
                  position={'relative'}
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
                  <ConfirmDialog
                    buttonText={'연결 해제'}
                    buttonStyle={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      size: 'xs',
                      fontWeight: 'bold',
                      colorPalette: 'red',
                    }}
                    title={'소환사 연결 해체'}
                    description={'정말 소환사 연결을 해제하시겠습니까?'}
                    onConfirm={() => {
                      deleteUserSummoner(
                        {
                          id: summoner.id,
                        },
                        {
                          onSuccess: () => {
                            toaster.create({
                              type: 'success',
                              title: '소환사 연결 해제 완료',
                            })
                          },
                        },
                      )
                    }}
                  />
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

export default MyProfileSummonerSection
