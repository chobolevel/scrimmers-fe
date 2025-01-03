import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { Team } from '@/apis'
import React, { useMemo, useRef } from 'react'
import { RiTeamFill } from 'react-icons/ri'
import { ImageUploader } from '@/components'

interface ModifyTeamFormProps {
  team: Team
}

const ModifyTeamForm = ({ team }: ModifyTeamFormProps) => {
  const logoImageUploaderRef = useRef<HTMLInputElement>(null)

  const logo = useMemo(() => team?.logo, [team])
  return (
    <Flex direction={'column'} gap={6}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        팀 정보
      </Text>
      <Flex align={'center'} gap={10}>
        <Flex w={150} h={150} direction={'column'} align={'center'} gap={4}>
          {logo ? (
            <Image
              src={logo.url}
              alt={`${team.name} 로고 이미지`}
              objectFit={'contain'}
            />
          ) : (
            <RiTeamFill size={150} />
          )}
          <ImageUploader
            inputRef={logoImageUploaderRef}
            onUpload={(url, filename) => {
              console.log(url, filename)
            }}
          />
          {logo && (
            <Button size={'xs'} fontWeight={'bold'}>
              기본 로고
            </Button>
          )}
          <Button size={'xs'} fontWeight={'bold'}>
            {logo ? '팀 로고 수정' : '팀 로고 등록'}
          </Button>
        </Flex>
        <Flex></Flex>
      </Flex>
    </Flex>
  )
}

export default ModifyTeamForm
