import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import React, { useState } from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'
import axios from 'axios'
import {
  RiotAccountResponse,
  RiotSummonerRankResponse,
  RiotSummonerResponse,
  UserSummonerRanKType,
} from '@/apis'

export interface Summoner {
  summoner_id: string
  summoner_name: string
  summoner_tag: string
  summoner_level: number
  summoner_icon_id: number
  summoner_solo_rank: UserSummonerRanKType
  summoner_flex_rank: UserSummonerRanKType
}

const UserSummonerSearchDialog = () => {
  const [summonerName, setSummonerName] = useState<string>('')
  const [summonerTag, setSummonerTag] = useState<string>('')
  const [summoner, setSummoner] = useState<Summoner>()

  const handleSearch = () => {
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
              })
              .catch(() => {
                console.log('summoner rank search fail')
              })
          })
          .catch(() => {
            console.log('summoner search fail')
          })
      })
      .catch(() => {
        console.log('account search fail')
      })
  }
  return (
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
        </Flex>
      </DialogBody>
      <DialogFooter />
    </DialogContent>
  )
}

export default UserSummonerSearchDialog
