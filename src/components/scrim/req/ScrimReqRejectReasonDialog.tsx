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
import { Button, Flex, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { ScrimReq } from '@/apis'

interface ScrimReqRejectReasonDialogProps {
  scrimReq: ScrimReq
}

const ScrimReqRejectReasonDialog = ({
  scrimReq,
}: ScrimReqRejectReasonDialogProps) => {
  const toTeam = useMemo(() => scrimReq.to_team, [scrimReq])
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button size={'xs'} fontWeight={'bold'} colorPalette={'red'}>
          거절 사유
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Flex direction={'column'}>
          <DialogHeader>
            <DialogTitle>{`${toTeam.name}팀의 스크림 요청 거절 사유`}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex direction={'column'} gap={2}>
              <Text fontWeight={'bold'}>거절 사유</Text>
              <Text whiteSpace={'break-spaces'}>{scrimReq.reject_reason}</Text>
            </Flex>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button fontWeight={'bold'}>닫기</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </Flex>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default ScrimReqRejectReasonDialog
