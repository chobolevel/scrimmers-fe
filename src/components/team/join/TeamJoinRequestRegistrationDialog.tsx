import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { Team } from '@/apis'
import { useForm } from 'react-hook-form'
import {
  CreateTeamJoinRequest,
  useCreateTeamJoinRequest,
} from '@/apis/team/join'
import { useCallback } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { ErrorText } from '@/components'
import { toaster } from '@/components/ui/toaster'

interface TeamJoinRequestRegistrationDialogProps {
  team: Team
}

const TeamJoinRequestRegistrationDialog = ({
  team,
}: TeamJoinRequestRegistrationDialogProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateTeamJoinRequest>({
    defaultValues: {
      team_id: team.id,
    },
  })

  const { mutate: createTeamJoinRequest } = useCreateTeamJoinRequest()
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button size={'sm'} fontWeight={'bold'} colorPalette={'blue'}>
          가입 신청
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Flex
          direction={'column'}
          as={'form'}
          onSubmit={handleSubmit(
            useCallback((data) => {
              createTeamJoinRequest(data, {
                onSuccess: () => {
                  toaster.create({
                    type: 'success',
                    title: `${team.name} 가입 신청 완료`,
                  })
                },
              })
            }, []),
          )}
        >
          <DialogHeader>
            <DialogTitle>{team.name} 가입 신청</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex direction={'column'} gap={2}>
              <Text fontWeight={'bold'}>소개글</Text>
              <Textarea
                placeholder={'본인을 자유롭게 표현해보세요!'}
                minH={140}
                {...register('comment', {
                  required: '소개글이 입력되지 않았습니다.',
                  minLength: {
                    value: 10,
                    message: '소개글은 최소 10자 이상 작성해야합니다.',
                  },
                })}
              />
              <ErrorMessage
                name={'comment'}
                errors={errors}
                render={({ message }) => <ErrorText message={message} />}
              />
            </Flex>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant={'surface'} type={'submit'}>
                신청
              </Button>
            </DialogActionTrigger>
            <DialogActionTrigger asChild>
              <Button fontWeight={'bold'}>취소</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </Flex>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default TeamJoinRequestRegistrationDialog
