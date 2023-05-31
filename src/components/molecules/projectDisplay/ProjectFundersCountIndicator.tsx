import { HStack, Text } from '@chakra-ui/react'
import { BsHeartFill } from 'react-icons/bs'

type Props = {
  count: number
}

export const ProjectFundersCountIndicator = ({ count }: Props) => (
  <HStack
    background="neutral.0"
    borderRadius="35px"
    padding="5px 10px"
    boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
  >
    <Text color="primary.400" fontWeight={'bold'}>
      {count || 0}
    </Text>
    <BsHeartFill color={'neutral.500'} />
  </HStack>
)
