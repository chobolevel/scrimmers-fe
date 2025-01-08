import { Badge, Flex, Table } from '@chakra-ui/react'
import { ConfirmDialog, RejectScrimReqDialog } from '@/components'
import {
  ScrimReq,
  ScrimReqStatusObj,
  useApproveScrimReq,
  useInvalidate,
} from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'
import { useMemo } from 'react'
import moment from 'moment/moment'
import { toaster } from '@/components/ui/toaster'

interface ReceivedScrimReqListItemProps {
  scrimReq: ScrimReq
}

const ReceivedScrimReqListItem = ({
  scrimReq,
}: ReceivedScrimReqListItemProps) => {
  const invalidate = useInvalidate(toUrl(ApiV1Paths.SCRIM_REQUESTS))

  const { mutate: approveScrimReq } = useApproveScrimReq()

  const fromTeam = useMemo(() => scrimReq.from_team, [scrimReq])
  const status = useMemo(() => ScrimReqStatusObj[scrimReq.status], [scrimReq])
  const isProcessed = useMemo(() => scrimReq.status === 'REQUESTED', [scrimReq])
  const createdAt = useMemo(
    () => moment(scrimReq.created_at).format('YYYY-MM-DD'),
    [scrimReq],
  )
  return (
    <Table.Row>
      <Table.Cell textAlign={'center'} fontWeight={'bold'}>
        {fromTeam.name}
      </Table.Cell>
      <Table.Cell textAlign={'center'}>
        <Badge size={'lg'} colorPalette={status.color}>
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell textAlign={'center'}>{createdAt}</Table.Cell>
      <Table.Cell>
        {isProcessed && (
          <Flex align={'center'} justify={'center'} gap={2}>
            <ConfirmDialog
              buttonText={'승인'}
              buttonStyle={{
                size: 'xs',
                fontWeight: 'bold',
                colorPalette: 'green',
              }}
              title={'스크림 요청 승인'}
              description={'스크림 요청을 승인하시겠습니까?'}
              onConfirm={() => {
                approveScrimReq(
                  {
                    id: scrimReq.id,
                  },
                  {
                    onSuccess: () => {
                      invalidate()
                      toaster.create({
                        type: 'success',
                        title: '스크림 요청 승인 완료',
                      })
                    },
                  },
                )
              }}
            />
            <RejectScrimReqDialog scrimReq={scrimReq} />
          </Flex>
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default ReceivedScrimReqListItem
