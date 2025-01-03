import React, { useCallback } from 'react'
import { Button, Flex, Input, Text } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { ErrorText } from '@/components'
import { useForm } from 'react-hook-form'
import { ChangePasswordRequest } from '@/apis'
import { useRouter } from 'next/router'
import { PagePaths } from '@/constants'

const ChangePasswordForm = () => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordRequest>()
  return (
    <Flex
      direction={'column'}
      gap={4}
      as={'form'}
      onSubmit={handleSubmit(
        useCallback((data) => {
          console.log(data)
        }, []),
      )}
    >
      <Text fontSize={'lg'} fontWeight={'bold'}>
        비밀번호 변경
      </Text>
      <Flex direction={'column'} gap={4} px={2} maxW={400}>
        <Flex direction={'column'} gap={2}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            현재 비밀번호
          </Text>
          <Input
            type={'password'}
            placeholder={'현재 비밀번호'}
            {...register('current_password', {
              required: '현재 비밀번호가 입력되지 않았습니다.',
            })}
          />
          <ErrorMessage
            name={'current_password'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            변경할 비밀번호
          </Text>
          <Input
            type={'password'}
            placeholder={'변경할 비밀번호'}
            {...register('new_password', {
              required: '변경할 비밀번호가 입력되지 않았습니다.',
              pattern: {
                value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
                message:
                  '비밀번호 형식이 올바르지 않습니다.(특수 문자 포함 8자 이상)',
              },
            })}
          />
          <ErrorMessage
            name={'new_password'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            변경할 비밀번호 확인
          </Text>
          <Input
            type={'password'}
            placeholder={'변경할 비밀번호 확인'}
            {...register('new_password_check', {
              required: '재확인 비밀번호가 입력되지 않았습니다.',
              validate: (val?: string) => {
                if (watch('new_password') != val) {
                  return '비밀번호가 일치하지 않습니다.'
                }
              },
            })}
          />
          <ErrorMessage
            name={'new_password_check'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
      </Flex>
      <Flex align={'center'} justify={'end'} gap={2}>
        <Button
          size={'sm'}
          fontWeight={'bold'}
          variant={'surface'}
          type={'submit'}
        >
          변경
        </Button>
        <Button
          size={'sm'}
          fontWeight={'bold'}
          onClick={() => {
            router.push(PagePaths.MyProfile)
          }}
        >
          취소
        </Button>
      </Flex>
    </Flex>
  )
}

export default ChangePasswordForm
