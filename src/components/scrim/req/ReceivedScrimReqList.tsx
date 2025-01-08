import { Table } from '@chakra-ui/react'
import { ScrimReq } from '@/apis'
import { ReceivedScrimReqListItem } from '@/components'

interface ReceivedScrimReqListProps {
  scrimReqs: ScrimReq[]
}

const ReceivedScrimReqList = ({ scrimReqs }: ReceivedScrimReqListProps) => {
  return (
    <Table.ScrollArea borderWidth={'1px'}>
      <Table.Root>
        <Table.Header>
          <Table.Row bg={'bg.subtle'}>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              신청팀
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              상태
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              신청일
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              비고
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {scrimReqs.length > 0 ? (
            scrimReqs.map((scrimReq, idx) => {
              return <ReceivedScrimReqListItem key={idx} scrimReq={scrimReq} />
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} h={100} textAlign={'center'}>
                검색 조건에 맞는 스크림 요청이 없습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default ReceivedScrimReqList
