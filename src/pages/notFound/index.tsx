import { Link, Text, VStack } from '@chakra-ui/react'
import { BiErrorAlt } from 'react-icons/bi'

import { Head } from '../../config/Head'
import { GeyserFeedbackFromUrl } from '../../constants'

export const NotFoundPage = () => (
  <>
    <Head title="Not Found" />
    <VStack
      width="100%"
      height="100%"
      backgroundColor="neutral.100"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      spacing="10px"
    >
      <BiErrorAlt fontSize="80px" />
      <Text fontSize="20px">Oops!</Text>
      <Text fontSize="20px">This page was not found, please try again.</Text>
      <Text fontSize="20px">
        If the problem persists let us know via.{' '}
        <Link href="https://t.me/+EZ5otIPhVcxhMmFk" target="_blank">
          telegram
        </Link>{' '}
        or this{' '}
        <Link href={GeyserFeedbackFromUrl} isExternal>
          feedback form.
        </Link>
      </Text>
    </VStack>
  </>
)

export default NotFoundPage
