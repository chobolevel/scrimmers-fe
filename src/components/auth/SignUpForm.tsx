import {
  Button,
  createListCollection,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { CSSProperties, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ApiErrorResponse, CreateUserRequest, useCreateUser } from '@/apis'
import { ErrorMessage } from '@hookform/error-message'
import { ErrorText, SocialLoginButtons } from '@/components'
import { AxiosError } from 'axios'
import { toaster } from '@/components/ui/toaster'
import { useRouter } from 'next/router'
import { PagePaths } from '@/constants'

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
  items: [
    { label: '남성', value: 'MALE' },
    { label: '여성', value: 'FEMALE' },
  ],
})

const SignUpForm = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<CreateUserRequest>()

  const { mutate: createUser } = useCreateUser()
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
          createUser(
            {
              ...data,
              login_type: 'GENERAL',
            },
            {
              onSuccess: () => {
                router.push(PagePaths.HOME).then(() => {
                  toaster.create({
                    type: 'success',
                    title: '회원가입 성공',
                    description: '새로운 계정으로 로그인해주세요.',
                  })
                })
              },
              onError: (error) => {
                const err = error as AxiosError
                const errorResponse = err.response?.data as ApiErrorResponse
                toaster.create({
                  type: 'error',
                  title: '회원가입 실패',
                  description: errorResponse.error_message,
                })
              },
            },
          )
        }, []),
      )}
    >
      <Text fontSize={'3xl'} fontWeight={'bold'}>
        회원가입
      </Text>
      <SocialLoginButtons />
      <Flex w={'100%'} direction={'column'} gap={6}>
        <Flex direction={'column'} gap={2}>
          <Text>아이디(이메일)</Text>
          <Input
            type={'text'}
            placeholder={'아이디(이메일)'}
            style={inputStyle}
            {...register('email', {
              required: '아이디(이메일)이 입력되지 않았습니다.',
              pattern: {
                value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
          />
          <ErrorMessage
            name={'email'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Text>비밀번호</Text>
          <Input
            type={'password'}
            placeholder={'비밀번호'}
            style={inputStyle}
            {...register('password', {
              required: '비밀번호가 입력되지 않았습니다.',
              pattern: {
                value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
                message:
                  '비밀번호 형식이 올바르지 않습니다.(특수 문자 포함 8자 이상)',
              },
            })}
          />
          <ErrorMessage
            name={'password'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Text fontWeight={'bold'}>비밀번호 확인</Text>
          <Input
            type={'password'}
            placeholder={'비밀번호 확인'}
            style={inputStyle}
            {...register('check_password', {
              required: '확인용 비밀번호가 입력되지 않았습니다.',
              pattern: {
                value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
                message:
                  '비밀번호 형식이 올바르지 않습니다.(특수 문자 포함 8자 이상)',
              },
              validate: (val?: string) => {
                if (watch('password') != val) {
                  return '비밀번호가 일치하지 않습니다.'
                }
              },
            })}
          />
          <ErrorMessage
            name={'check_password'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
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

export default SignUpForm
