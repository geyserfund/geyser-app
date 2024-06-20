import { VStack } from '@chakra-ui/react'
import { Fragment } from 'react'

import { CardLayout, CardLayoutProps } from '../../../../../../../../../components/layouts'
import { ProjectFundingGrantApplicantContributorsItem } from '../../../../../../../../../components/molecules/projectActivity/ProjectFundingGrantApplicantContributorsItem'
import { ID } from '../../../../../../../../../constants'
import { GrantApplicantContributor } from '../../../../../../../../../types'
import { useMobileMode } from '../../../../../../../../../utils'

interface ProjectGrantApplicantContributorsListProps extends CardLayoutProps {
  id?: string
  isBounded?: boolean
  grantApplicantContributors?: GrantApplicantContributor[]
}

export const ProjectGrantApplicantContributorsList = ({
  id = ID.project.activity.contributors,
  isBounded,
  grantApplicantContributors,
  ...props
}: ProjectGrantApplicantContributorsListProps) => {
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
                <ProjectFundingGrantApplicantContributorsItem w="100%" contributor={contributor} />
              </Fragment>
            )
          })}
      </VStack>
    </CardLayout>
  )
}
