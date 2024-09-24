import { Box, HStack, HTMLChakraProps, VStack } from '@chakra-ui/react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import { LinkableAvatar } from '@/components/ui'
import { CardLayout, CardLayoutProps, Modal } from '@/shared/components/layouts'
import { Body } from '@/shared/components/typography'
import { getPath, ID } from '@/shared/constants'
import { useModal } from '@/shared/hooks'
import { GrantApplicantContributor } from '@/types'
import { useMobileMode } from '@/utils'

export const useContributorsModal = () => {
  return useModal()
}

type Props = ReturnType<typeof useContributorsModal> & {
  grantApplicantContributors?: GrantApplicantContributor[]
}

type Rules = string

type Styles = {
  isMobile?: boolean
  inView: boolean
  fadeStarted?: boolean
}

export const useContributorsStyles = createUseStyles<Rules, Styles>({
  detailsContainer: {
    height: '80vh',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    overflowX: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const ContributorsModal = ({ grantApplicantContributors, ...props }: Props) => {
  const classes = useContributorsStyles()
  const { t } = useTranslation()

  if (!grantApplicantContributors) {
    return null
  }

  return (
    <Modal title={t('Signed in contributors')} size={'sm'} {...props}>
      <Box className={classes.detailsContainer}>
        <ContributorsList grantApplicantContributors={grantApplicantContributors} />
      </Box>
    </Modal>
  )
}

interface ContributorsListProps extends CardLayoutProps {
  id?: string
  isBounded?: boolean
  grantApplicantContributors?: GrantApplicantContributor[]
}

export const ContributorsList = ({
  id = ID.project.activity.contributors,
  isBounded,
  grantApplicantContributors,
  ...props
}: ContributorsListProps) => {
  const isMobile = useMobileMode()

  return (
    <CardLayout
      id={id}
      noborder
      width="100%"
      overflow="auto"
      height={isMobile ? 'calc(100% - 44px)' : '100%'}
      py="0px"
      px={5}
      {...props}
    >
      <VStack spacing={'15px'} width="100%" alignItems="start" paddingBottom={'20px'} gap={2}>
        {grantApplicantContributors &&
          grantApplicantContributors.map((contributor) => {
            return (
              <Fragment key={contributor?.user?.id}>
                <ContributorsItem w="100%" contributor={contributor} />
              </Fragment>
            )
          })}
      </VStack>
    </CardLayout>
  )
}

type ContributorsItemProps = HTMLChakraProps<'div'> & {
  contributor: GrantApplicantContributor
}

export const ContributorsItem = ({ contributor, ...rest }: ContributorsItemProps) => {
  return (
    <Box
      as={Link}
      to={contributor?.user?.id ? getPath('userProfile', contributor.user.id) : '/'}
      style={{ textDecoration: 'none', width: '100%' }}
      px={1}
      py={3}
      width="100%"
      borderRadius="12px"
      _hover={{
        bg: 'neutral.200',
      }}
      {...rest}
    >
      <Box width="100%" display="flex" justifyContent="space-between">
        <HStack width="100%">
          <LinkableAvatar
            imageSrc={contributor.user?.imageUrl || ''}
            avatarUsername={contributor.user?.username || ''}
            userProfileID={contributor.user?.id}
            underlineUsername={false}
          />
          <Body>{contributor.user?.username}</Body>
        </HStack>
      </Box>
    </Box>
  )
}
