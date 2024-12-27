import { Button, Flex, Input, Link, Text } from '@chakra-ui/react'
import { ErrorText, SocialLoginButtons } from '@/components'
import { useForm } from 'react-hook-form'
import { ApiErrorResponse, LoginRequest, useLogin } from '@/apis'
import { CSSProperties, useCallback } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { useRouter } from 'next/router'
import { AxiosError } from 'axios'
import { toaster } from '@/components/ui/toaster'
import { PagePaths } from '@/constants'

const inputStyle = {
  paddingLeft: '2px',
  paddingBottom: '6px',
  paddingTop: '6px',
  color: 'white',
  border: 'none',
  borderBottom: '2px solid white',
  borderRadius: '0',
  outline: 'none',
  fontSize: '16px',
} as CSSProperties

const SignInForm = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginRequest>()

  const { mutate: login } = useLogin()
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
          login(
            {
              email: data.email,
              password: data.password,
              login_type: 'GENERAL',
            },
            {
              onSuccess: () => {
                router.push(PagePaths.HOME)
              },
              onError: (error) => {
                const err = error as AxiosError
                const errorResponse = err.response?.data as ApiErrorResponse
                toaster.create({
                  type: 'error',
                  title: '로그인 실패',
                  description: errorResponse.error_message,
                })
              },
            },
          )
        }, []),
      )}
    >
      <Text fontSize={'3xl'} fontWeight={'bold'}>
        로그인
      </Text>
      <SocialLoginButtons />
      <Flex direction={'column'} gap={6} w={'100%'}>
        <Flex direction={'column'} gap={2}>
          <Input
            type={'text'}
            placeholder={'아이디(이메일)'}
            style={inputStyle}
            {...register('email', {
              required: '아이디가 입력되지 않았습니다.',
            })}
          />
          <ErrorMessage
            name={'email'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Input
            type={'password'}
            placeholder={'비밀번호'}
            style={inputStyle}
            {...register('password', {
              required: '비밀번호가 입력되지 않았습니다.',
            })}
          />
          <ErrorMessage
            name={'password'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
      </Flex>
      <Flex w={'100%'} direction={'column'}>
        <Button fontWeight={'bold'} fontSize={20} type={'submit'}>
          로그인
        </Button>
      </Flex>
      <Flex w={'100%'} align={'center'} justify={'space-between'}>
        <Link color={'white'}>비밀번호 찾기</Link>
        <Link color={'white'} href={PagePaths.SignUp}>
          회원가입
        </Link>
      </Flex>
    </Flex>
  )
}

export default SignInForm
