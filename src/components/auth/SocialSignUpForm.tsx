import {
  Button,
  createListCollection,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { CSSProperties, useCallback, useEffect } from 'react'
import { decodeFromBase64 } from 'next/dist/build/webpack/loaders/utils'
import {
  CreateUserRequest,
  LoginRequest,
  useCreateUser,
  useLogin,
  UserGenderTypeArr,
} from '@/apis'
import { toaster } from '@/components/ui/toaster'
import { ErrorText } from '@/components'
import { ErrorMessage } from '@hookform/error-message'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { PagePaths, toUrl } from '@/constants'

const inputStyle = {
  paddingLeft: '2px',
  paddingBottom: '6px',
  paddingTop: '6px',
  border: 'none',
  borderBottom: '2px solid white',
  borderRadius: '0',
  outline: 'none',
  fontSize: '16px',
} as CSSProperties

const genders = createListCollection({
  items: UserGenderTypeArr,
})

const SocialSignUpForm = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateUserRequest>()

  const { mutate: createUser } = useCreateUser()
  const { mutate: login } = useLogin()

  useEffect(() => {
    if (router.query.base) {
      const base = decodeFromBase64(router.query.base as string) as LoginRequest
      setValue('email', base.email)
      setValue('social_id', base.social_id)
      setValue('login_type', base.login_type)
    }
  }, [router.query.base])
  return (
    <Flex
      as={'form'}
      w={400}
      direction={'column'}
      justify={'center'}
      align={'center'}
      p={6}
      borderRadius={10}
      gap={10}
      onSubmit={handleSubmit(
        useCallback((data) => {
          createUser(data, {
            onSuccess: () => {
              login(
                {
                  email: data.email,
                  social_id: data.social_id,
                  login_type: data.login_type,
                },
                {
                  onSuccess: () => {
                    router.push(toUrl(PagePaths.HOME))
                  },
                  onError: () => {
                    router.push(toUrl(PagePaths.SignIn)).then(() => {
                      toaster.create({
                        type: 'error',
                        title: '소셜 로그인 실패',
                        description:
                          '소셜 로그인 실패 로그인을 다시 시도해 주세요.',
                      })
                    })
                  },
                },
              )
            },
          })
        }, []),
      )}
    >
      <Text fontSize={'3xl'} fontWeight={'bold'}>
        소셜 회원가입
      </Text>
      <Flex w={'100%'} direction={'column'} gap={6}>
        <Flex direction={'column'} gap={2}>
          <Text fontWeight={'bold'}>닉네임</Text>
          <Input
            type={'text'}
            placeholder={'닉네임'}
            style={inputStyle}
            {...register('nickname', {
              required: '닉네임이 입력되지 않았습니다.',
              pattern: {
                value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
                message:
                  '닉네임은 형식이 올바르지 않습니다.(한글만 사용 가능).',
              },
            })}
          />
          <ErrorMessage
            name={'nickname'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Text fontWeight={'bold'}>생년월일</Text>
          <Input
            type={'date'}
            style={inputStyle}
            {...register('birth', {
              required: '생년월일이 입력되지 않았습니다.',
            })}
          />
          <ErrorMessage
            name={'birth'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Text fontWeight={'bold'}>성별</Text>
          <SelectRoot
            collection={genders}
            {...register('gender', { required: '성별이 선택되지 않았습니다.' })}
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
          <ErrorMessage
            name={'gender'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
      </Flex>
      <Flex w={'100%'} direction={'column'}>
        <Button fontWeight={'bold'} fontSize={20} type={'submit'}>
          회원가입
        </Button>
      </Flex>
    </Flex>
  )
}

export default SocialSignUpForm
