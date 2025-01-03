import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useState } from 'react'
import {
  Badge,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import {
  RiotAccountResponse,
  RiotSummonerRankResponse,
  RiotSummonerResponse,
  useCreateUserSummoner,
  UserSummonerRanKType,
  UserSummonerRankTypeObj,
} from '@/apis'
import { toaster } from '@/components/ui/toaster'

interface Summoner {
  summoner_id: string
  summoner_name: string
  summoner_tag: string
  summoner_level: number
  summoner_icon_id: number
  summoner_solo_rank: UserSummonerRanKType
  summoner_flex_rank: UserSummonerRanKType
}

const UserSummonerSearchDialog = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [summonerName, setSummonerName] = useState<string>('')
  const [summonerTag, setSummonerTag] = useState<string>('')
  const [summoner, setSummoner] = useState<Summoner>()

  const { mutate: createUserSummoner } = useCreateUserSummoner()

  const handleSearch = () => {
    setLoading(true)
    axios
      .get<RiotAccountResponse>(
        `/riot-account/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
      )
      .then((res) => {
        const puuid = res.data.puuid
        axios
          .get<RiotSummonerResponse>(
            `/riot-kr/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
          )
          .then((res) => {
            const id = res.data.id
            const profileIconId = res.data.profileIconId
            const summonerLevel = res.data.summonerLevel
            axios
              .get<RiotSummonerRankResponse[]>(
                `/riot-kr/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
              )
              .then((res) => {
                const soloRank = res.data.find(
                  (rank) => rank.queueType === 'RANKED_SOLO_5x5',
                )
                const flexRank = res.data.find(
                  (rank) => rank.queueType === 'RANKED_FLEX_SR',
                )
                setSummoner({
                  summoner_id: id,
                  summoner_name: summonerName,
                  summoner_tag: summonerTag,
                  summoner_level: summonerLevel,
                  summoner_icon_id: profileIconId,
                  summoner_solo_rank:
                    (soloRank?.tier as UserSummonerRanKType) ?? 'NONE',
                  summoner_flex_rank:
                    (flexRank?.tier as UserSummonerRanKType) ?? 'NONE',
                })
                setLoading(false)
              })
              .catch(() => {
                setLoading(false)
                toaster.create({
                  type: 'error',
                  title: '소환사 정보 조회 실패',
                  description:
                    '라이엇 서버로부터 정보를 받아올 수 없습니다. 나중에 다시 시도해 주세요.',
                })
              })
          })
          .catch(() => {
            setLoading(false)
            toaster.create({
              type: 'error',
              title: '소환사 정보 조회 실패',
              description:
                '라이엇 서버로부터 정보를 받아올 수 없습니다. 나중에 다시 시도해 주세요.',
            })
          })
      })
      .catch(() => {
        setLoading(false)
        toaster.create({
          type: 'error',
          title: '소환사 정보 조회 실패',
          description:
            '라이엇 서버로부터 정보를 받아올 수 없습니다. 나중에 다시 시도해 주세요.',
        })
      })
  }
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button colorPalette={'blue'} fontWeight={'bold'}>
          신규 소환사 연결
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>소환사 검색</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Flex direction={'column'} gap={6}>
            <Flex align={'center'} gap={2}>
              <Input
                w={'70%'}
                type={'text'}
                placeholder={'소환사명'}
                value={summonerName}
                onChange={(e) => {
                  const val = e.target.value
                  if (val) {
                    setSummonerName(val)
                  } else {
                    setSummonerName('')
                  }
                }}
              />
              <Input
                w={'20%'}
                type={'text'}
                placeholder={'태그'}
                value={summonerTag}
                onChange={(e) => {
                  const val = e.target.value
                  if (val) {
                    setSummonerTag(val)
                  } else {
                    setSummonerTag('')
                  }
                }}
              />
              <Button
                w={'10%'}
                fontWeight={'bold'}
                onClick={() => {
                  handleSearch()
                }}
              >
                검색
              </Button>
            </Flex>
            {summoner ? (
              <Flex
                gap={6}
                p={4}
                border={'2px solid'}
                borderRadius={10}
                align={'center'}
                position={'relative'}
              >
                <Flex w={100} h={100} overflow={'hidden'} position={'relative'}>
                  <Image
                    w={'100%'}
                    h={'100%'}
                    src={`${process.env.NEXT_PUBLIC_RIOT_PROFILE_ICON_URL}/${summoner.summoner_icon_id}.png`}
                    alt={`${summoner.summoner_name}#${summoner.summoner_tag}님의 소환사 아이콘`}
                    borderRadius={10}
                  />
                  <Badge position={'absolute'} bottom={0} right={0}>
                    {summoner.summoner_level}
                  </Badge>
                </Flex>
                <Flex direction={'column'} gap={1}>
                  <Text fontSize={'lg'} fontWeight={'bold'}>
                    {`${summoner.summoner_name}#${summoner.summoner_tag}`}
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
                <Button
                  position={'absolute'}
                  bottom={2}
                  right={2}
                  size={'sm'}
                  fontWeight={'bold'}
                  colorPalette={'green'}
                  onClick={() => {
                    if (!summoner) return
                    createUserSummoner(
                      {
                        summoner_id: summoner.summoner_id,
                        summoner_name: summoner.summoner_name,
                        summoner_tag: summoner.summoner_tag,
                        summoner_level: summoner.summoner_level,
                        summoner_icon_id: summoner.summoner_icon_id,
                        summoner_solo_rank: summoner.summoner_solo_rank,
                        summoner_flex_rank: summoner.summoner_flex_rank,
                      },
                      {
                        onSuccess: () => {
                          toaster.create({
                            type: 'success',
                            title: '소환사 정보 연결 완료',
                          })
                        },
                      },
                    )
                  }}
                >
                  연결
                </Button>
              </Flex>
            ) : (
              <Flex h={100} justify={'center'} align={'center'}>
                {loading ? (
                  <Spinner size={'lg'} />
                ) : (
                  <Text>소환사 정보를 연결해보세요!</Text>
                )}
              </Flex>
            )}
          </Flex>
        </DialogBody>
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  )
}

export default UserSummonerSearchDialog
