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
import { useCallback } from 'react'
import { toaster } from '@/components/ui/toaster'
import { ErrorMessage } from '@hookform/error-message'
import { ErrorText } from '@/components'
import { Team } from '@/apis'
import { useForm } from 'react-hook-form'
import {
  CreateTeamLeaveRequest,
  useCreateTeamLeaveRequest,
} from '@/apis/team/leave'

interface TeamLeaveRequestRegistrationDialogProps {
  team: Team
}

const TeamLeaveRequestRegistrationDialog = ({
  team,
}: TeamLeaveRequestRegistrationDialogProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateTeamLeaveRequest>()

  const { mutate: createTeamLeaveRequest } = useCreateTeamLeaveRequest()
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          size={'xs'}
          fontWeight={'bold'}
          colorPalette={'red'}
          variant={'ghost'}
        >
          탈퇴 신청
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Flex
          direction={'column'}
          as={'form'}
          onSubmit={handleSubmit(
            useCallback((data) => {
              createTeamLeaveRequest(data, {
                onSuccess: () => {
                  toaster.create({
                    type: 'success',
                    title: `${team.name} 탈퇴 신청 완료`,
                  })
                },
              })
            }, []),
          )}
        >
          <DialogHeader>
            <DialogTitle>{team.name} 탈퇴 신청</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex direction={'column'} gap={2}>
              <Text fontWeight={'bold'}>탈퇴 사유</Text>
              <Textarea
                placeholder={'탈퇴 사유를 작성해주세요.'}
                minH={140}
                {...register('comment', {
                  required: '탈퇴 사유가 입력되지 않았습니다.',
                  minLength: {
                    value: 10,
                    message: '탈퇴 사유는 최소 10자 이상 작성해야합니다.',
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

export default TeamLeaveRequestRegistrationDialog
