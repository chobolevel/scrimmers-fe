import React, { useMemo, useRef, useState } from 'react'
import {
  useCreateUserImage,
  useDeleteUserImage,
  UserDetail,
  UserGenderType,
  UserGenderTypeArr,
  UserPositionType,
  UserPositionTypeArr,
  UserPositionTypeObj,
  UserSummonerRankTypeObj,
  useUpdateUser,
  useUpdateUserImage,
} from '@/apis'
import {
  Badge,
  Button,
  createListCollection,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Separator,
  Text,
} from '@chakra-ui/react'
import { FaUserAlt } from 'react-icons/fa'
import { Tooltip } from '@/components/ui/tooltip'
import { FaCircleQuestion, FaCrown } from 'react-icons/fa6'
import { ImageUploader, UserSummonerSearchDialog } from '@/components'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { RiTeamFill } from 'react-icons/ri'
import { MdSupervisorAccount } from 'react-icons/md'
import { useRouter } from 'next/router'
import { PagePaths, toUrl } from '@/constants'
import { toaster } from '@/components/ui/toaster'
import { DialogRoot, DialogTrigger } from '@/components/ui/dialog'

interface MyProfileProps {
  user: UserDetail
}

const genders = createListCollection({
  items: UserGenderTypeArr,
})
const positions = createListCollection({
  items: UserPositionTypeArr,
})

const MyProfile = ({ user }: MyProfileProps) => {
  const router = useRouter()
  const profileImageRef = useRef<HTMLInputElement>(null)
  const [nickname, setNickname] = useState<string>(user.nickname)
  const [birth, setBirth] = useState<string>(user.birth)

  const { mutate: createUserImage } = useCreateUserImage()
  const { mutate: updateUserImage } = useUpdateUserImage()
  const { mutate: deleteUserImage } = useDeleteUserImage()
  const { mutate: updateUser } = useUpdateUser()

  const team = useMemo(() => user?.team ?? null, [user])
  const profileImage = useMemo(
    () => (user?.profile_image ? user.profile_image : null),
    [user],
  )
  const summoners = useMemo(() => user.summoners, [user])

  return (
    <Flex w={'100%'} direction={'column'} gap={10}>
      <Flex direction={'column'} gap={4}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          회원 정보
        </Text>
        <Flex
          gap={10}
          align={'center'}
          direction={{ base: 'column', lg: 'row' }}
        >
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
            <ImageUploader
              inputRef={profileImageRef}
              onUpload={(url, filename) => {
                if (profileImage) {
                  updateUserImage({
                    id: profileImage.id,
                    url,
                    name: filename,
                    update_mask: ['URL', 'NAME'],
                  })
                } else {
                  createUserImage({
                    type: 'PROFILE',
                    url,
                    name: filename,
                  })
                }
              }}
            />
            {profileImage && (
              <Button
                size={'xs'}
                fontWeight={'bold'}
                onClick={() => {
                  deleteUserImage({ id: profileImage.id })
                }}
              >
                기본 프로필
              </Button>
            )}
            <Button
              size={'xs'}
              fontWeight={'bold'}
              onClick={() => {
                profileImageRef.current?.click()
              }}
            >
              {profileImage ? '프로필 이미지 수정' : '프로필 이미지 등록'}
            </Button>
          </Flex>
          <Flex
            w={'100%'}
            direction={{ base: 'column', lg: 'row' }}
            align={{ base: 'none', lg: 'center' }}
            gap={20}
          >
            <Flex direction={'column'} gap={4} flex={1}>
              <Flex direction={'column'} gap={2}>
                <Text fontWeight={'bold'} fontSize={'sm'}>
                  닉네임
                </Text>
                <Flex align={'center'} gap={2}>
                  <Input
                    type={'text'}
                    placeholder={'닉네임'}
                    required
                    value={nickname}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val) {
                        setNickname(val)
                      } else {
                        setNickname(user.nickname)
                      }
                    }}
                  />
                  <Button
                    colorPalette={'green'}
                    size={'sm'}
                    fontWeight={'bold'}
                    onClick={() => {
                      updateUser(
                        {
                          id: user.id,
                          nickname,
                          update_mask: ['NICKNAME'],
                        },
                        {
                          onSuccess: () => {
                            toaster.create({
                              type: 'success',
                              title: '닉네임이 수정되었습니다.',
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
                <Text fontWeight={'bold'} fontSize={'sm'}>
                  생년월일
                </Text>
                <Flex align={'center'} gap={2}>
                  <Input
                    type={'date'}
                    value={birth}
                    onChange={(e) => {
                      const val = e.target.value
                      if (val) {
                        setBirth(val)
                      } else {
                        setBirth(user.birth)
                      }
                    }}
                  />
                  <Button
                    colorPalette={'green'}
                    size={'sm'}
                    fontWeight={'bold'}
                    onClick={() => {
                      updateUser(
                        {
                          id: user.id,
                          birth,
                          update_mask: ['BIRTH'],
                        },
                        {
                          onSuccess: () => {
                            toaster.create({
                              type: 'success',
                              title: '생년월일이 수정되었습니다.',
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
                <Text fontWeight={'bold'} fontSize={'sm'}>
                  성별
                </Text>
                <SelectRoot
                  collection={genders}
                  defaultValue={[user.gender]}
                  onValueChange={(e) => {
                    if (!e.value[0]) return
                    updateUser(
                      {
                        id: user.id,
                        gender: e.value[0] as UserGenderType,
                        update_mask: ['GENDER'],
                      },
                      {
                        onSuccess: () => {
                          toaster.create({
                            type: 'success',
                            title: '성별이 수정되었습니다.',
                          })
                        },
                      },
                    )
                  }}
                >
                  <SelectLabel />
                  <SelectTrigger>
                    <SelectValueText placeholder={'성별'} />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.items.map((gender, idx) => {
                      return (
                        <SelectItem item={gender} key={idx}>
                          {gender.label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </SelectRoot>
              </Flex>
            </Flex>
            <Flex direction={'column'} gap={4} flex={1}>
              <Flex direction={'column'} gap={2}>
                <Text fontWeight={'bold'} fontSize={'sm'}>
                  주포지션
                </Text>
                <SelectRoot
                  collection={positions}
                  defaultValue={[user.main_position]}
                  onValueChange={(e) => {
                    if (!e.value[0]) return
                    updateUser(
                      {
                        id: user.id,
                        main_position: e.value[0] as UserPositionType,
                        update_mask: ['MAIN_POSITION'],
                      },
                      {
                        onSuccess: () => {
                          toaster.create({
                            type: 'success',
                            title: '주포지션이 수정되었습니다.',
                          })
                        },
                      },
                    )
                  }}
                >
                  <SelectLabel />
                  <SelectTrigger>
                    <SelectValueText placeholder={'주포지션'} />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.items.map((position, idx) => {
                      return (
                        <SelectItem item={position} key={idx}>
                          <Flex align={'center'} gap={2}>
                            <Image
                              w={'20px'}
                              h={'20px'}
                              src={
                                UserPositionTypeObj[
                                  position.value as UserPositionType
                                ].icon
                              }
                              alt={position.label}
                            />
                            <Text>{position.label}</Text>
                          </Flex>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </SelectRoot>
              </Flex>
              <Flex direction={'column'} gap={2}>
                <Text fontWeight={'bold'} fontSize={'sm'}>
                  부포지션
                </Text>
                <SelectRoot
                  collection={positions}
                  defaultValue={[user.sub_position]}
                  onValueChange={(e) => {
                    if (!e.value[0]) return
                    updateUser(
                      {
                        id: user.id,
                        sub_position: e.value[0] as UserPositionType,
                        update_mask: ['SUB_POSITION'],
                      },
                      {
                        onSuccess: () => {
                          toaster.create({
                            type: 'success',
                            title: '부포지션이 수정되었습니다.',
                          })
                        },
                      },
                    )
                  }}
                >
                  <SelectLabel />
                  <SelectTrigger>
                    <SelectValueText placeholder={'부포지션'} />
                  </SelectTrigger>
                  <SelectContent>
                    {positions.items.map((position, idx) => {
                      return (
                        <SelectItem item={position} key={idx}>
                          <Flex align={'center'} gap={2}>
                            <Image
                              w={'20px'}
                              h={'20px'}
                              src={
                                UserPositionTypeObj[
                                  position.value as UserPositionType
                                ].icon
                              }
                              alt={position.label}
                            />
                            <Text>{position.label}</Text>
                          </Flex>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </SelectRoot>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Separator />
      <Flex direction={'column'} gap={4}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          팀 정보
        </Text>
        {team ? (
          <Flex align={'center'} gap={10}>
            <Flex direction={'column'} gap={2} align={'center'}>
              {team?.logo ? (
                <Image
                  w={100}
                  h={100}
                  src={team.logo.url}
                  alt={`${team.name} 로고 이미지`}
                  objectFit={'contain'}
                />
              ) : (
                <RiTeamFill size={100} />
              )}
              <Flex>
                <Badge size={'lg'} fontWeight={'bold'}>
                  {team.name}
                </Badge>
              </Flex>
            </Flex>
            <Flex direction={'column'} gap={2}>
              <Flex align={'center'} gap={2}>
                <FaCrown size={20} />
                <Text
                  cursor={'pointer'}
                  _hover={{
                    textDecoration: 'underline',
                  }}
                  onClick={() => {
                    router.push(
                      toUrl(PagePaths.UserProfile, { id: team.owner_id }),
                    )
                  }}
                >
                  {team.owner_nickname}
                </Text>
              </Flex>
              <Flex align={'center'} gap={2}>
                <MdSupervisorAccount size={20} />
                <Text>{`${team.head_count}/${team.max_head_count}`}</Text>
              </Flex>
              <Text>{team.description}</Text>
            </Flex>
          </Flex>
        ) : (
          <Flex h={100} align={'center'} justify={'center'}>
            <Text>현재 소속팀이 없습니다. 새로운 소속팀을 찾아보세요!</Text>
          </Flex>
        )}
      </Flex>
      <Separator />
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
          <DialogRoot>
            <DialogTrigger asChild>
              <Button colorPalette={'blue'} fontWeight={'bold'}>
                신규 소환사 연결
              </Button>
            </DialogTrigger>
            <UserSummonerSearchDialog />
          </DialogRoot>
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
    </Flex>
  )
}

export default MyProfile
