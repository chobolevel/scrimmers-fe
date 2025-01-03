import {
  Button,
  createListCollection,
  Flex,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { FaUserAlt } from 'react-icons/fa'
import { ImageUploader } from '@/components'
import { toaster } from '@/components/ui/toaster'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import {
  useCreateUserImage,
  useDeleteUserImage,
  UserDetail,
  UserGenderType,
  UserGenderTypeArr,
  UserPositionType,
  UserPositionTypeArr,
  UserPositionTypeObj,
  useUpdateUser,
  useUpdateUserImage,
} from '@/apis'
import React, { useMemo, useRef, useState } from 'react'

const genders = createListCollection({
  items: UserGenderTypeArr,
})
const positions = createListCollection({
  items: UserPositionTypeArr,
})

interface MyProfileUserSectionProps {
  user: UserDetail
}

const MyProfileUserSection = ({ user }: MyProfileUserSectionProps) => {
  const profileImageRef = useRef<HTMLInputElement>(null)
  const [nickname, setNickname] = useState<string>(user.nickname)
  const [birth, setBirth] = useState<string>(user.birth)

  const { mutate: createUserImage } = useCreateUserImage()
  const { mutate: updateUserImage } = useUpdateUserImage()
  const { mutate: deleteUserImage } = useDeleteUserImage()
  const { mutate: updateUser } = useUpdateUser()

  const profileImage = useMemo(
    () => (user?.profile_image ? user.profile_image : null),
    [user],
  )
  return (
    <Flex direction={'column'} gap={4}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        회원 정보
      </Text>
      <Flex gap={10} align={'center'} direction={{ base: 'column', lg: 'row' }}>
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
  )
}

export default MyProfileUserSection
