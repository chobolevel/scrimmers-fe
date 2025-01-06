import { useCallback, useState } from 'react'
import { PagePaths, toUrl } from '@/constants'
import { toaster } from '@/components/ui/toaster'
import { Button, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { ErrorMessage } from '@hookform/error-message'
import { ErrorText } from '@/components'
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input'
import { useRouter } from 'next/router'
import { CreateTeamRequest, useCreateTeam } from '@/apis'
import { useForm } from 'react-hook-form'

const TeamRegistrationForm = () => {
  const router = useRouter()
  const [maxHeadCount, setMaxHeadCount] = useState<number>(5)

  const { mutate: createTeam } = useCreateTeam()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateTeamRequest>({
    defaultValues: {
      max_head_count: 5,
    },
  })
  return (
    <Flex
      direction={'column'}
      gap={6}
      as={'form'}
      onSubmit={handleSubmit(
        useCallback(
          (data) => {
            createTeam(
              {
                ...data,
                max_head_count: maxHeadCount,
              },
              {
                onSuccess: (res) => {
                  router
                    .push(toUrl(PagePaths.TeamDetail, { id: res.data }))
                    .then(() => {
                      toaster.create({
                        type: 'success',
                        title: '팀 등록 완료',
                      })
                    })
                },
              },
            )
          },
          [maxHeadCount],
        ),
      )}
    >
      <Text fontSize={'lg'} fontWeight={'bold'}>
        팀 등록
      </Text>
      <Flex direction={'column'} gap={6}>
        <Flex direction={'column'} gap={2}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            팀 이름
          </Text>
          <Input
            type={'text'}
            placeholder={'팀 이름'}
            w={300}
            {...register('name', {
              required: '팀 이름이 입력되지 않았습니다.',
            })}
          />
          <ErrorMessage
            name={'name'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            팀 총원
          </Text>
          <NumberInputRoot
            maxW={100}
            step={1}
            min={5}
            max={100}
            value={maxHeadCount.toString()}
            onValueChange={(e) => {
              setMaxHeadCount(Number(e.value))
            }}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Flex>
        <Flex direction={'column'} gap={2}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            팀 소개
          </Text>
          <Textarea
            placeholder={'팀 소개글'}
            minH={200}
            {...register('description', {
              required: '팀 소개글이 작성되지 않았습니다.',
              minLength: {
                value: 10,
                message: '최소 10글자 이상 작성해야합니다.',
              },
            })}
          />
          <ErrorMessage
            name={'description'}
            errors={errors}
            render={({ message }) => <ErrorText message={message} />}
          />
        </Flex>
      </Flex>
      <Flex align={'center'} justify={'end'} gap={2}>
        <Button
          size={'sm'}
          variant={'surface'}
          fontWeight={'bold'}
          type={'submit'}
        >
          등록
        </Button>
        <Button
          size={'sm'}
          fontWeight={'bold'}
          onClick={() => {
            router.push(PagePaths.Teams)
          }}
        >
          취소
        </Button>
      </Flex>
    </Flex>
  )
}

export default TeamRegistrationForm
