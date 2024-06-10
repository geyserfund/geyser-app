import { Box, HStack, Tag } from '@chakra-ui/react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'

import { CardLayout } from '../../../../components/layouts'
import { Body1, Caption, H2, H3 } from '../../../../components/typography'
import { ImageWithReload } from '../../../../components/ui'
import { getPath } from '../../../../constants'
import { neutralColorsLight } from '../../../../styles'
import { GrantApplicant } from '../../../../types'
import { useMobileMode } from '../../../../utils'

interface Props {
  applicants: Array<GrantApplicant>
}

const useStyles = createUseStyles({
  desktopImage: {
    width: '144px',
  },
  mobileImage: {
    width: '90px',
  },
  image: {
    display: 'block',
    height: '101px',
  },
})

export const PendingApplications = ({ applicants }: Props) => {
  const { t } = useTranslation()
  const isMobile = useMobileMode()
  const classes = useStyles()

  if (!applicants) {
    return null
  }

  return (
    <CardLayout noMobileBorder p={{ base: '10px', lg: '20px' }} spacing={{ base: '10px', lg: '20px' }} w="full">
      <H3 fontSize="18px">{t('Pending Applications')}</H3>
      {applicants.map(({ project }) => {
        const projectLink = getPath('project', project.name)

        return (
          <Link key={project.id} to={projectLink}>
            <CardLayout
              p={2}
              transition="transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
              _hover={{
                transform: 'scale(1.01)',
                borderColor: 'primary.400',
              }}
            >
              <Box display="flex">
                <Box mr={3} height={{ base: '90px', lg: '144px' }}>
                  <Link
                    to={projectLink}
                    className={classNames(classes.image, isMobile ? classes.mobileImage : classes.desktopImage)}
                  >
                    <ImageWithReload
                      objectFit="cover"
                      borderRadius="7px"
                      width={isMobile ? '90px' : '144px'}
                      height={isMobile ? '90px' : '144px'}
                      src={project.thumbnailImage || ''}
                      alt="project thumbnail"
                    />
                  </Link>
                </Box>

                <Box display="flex" flexDirection="column" pt={1} flexGrow={1} gap={5}>
                  <HStack gap={2}>
                    <H2 fontSize="24px">{project.title}</H2>
                    <Tag bg="secondary.yellow">
                      <Caption color={neutralColorsLight[900]}>{t('APPLICATION PENDING')}</Caption>
                    </Tag>
                  </HStack>
                  <HStack display="flex" justifyContent="flex-start" alignItems="flex-start" height="100%">
                    <Body1 fontSize="16px" color="neutral.800" noOfLines={4} wordBreak="break-word" semiBold>
                      {project.shortDescription}
                    </Body1>
                  </HStack>
                </Box>
              </Box>
            </CardLayout>
          </Link>
        )
      })}
    </CardLayout>
  )
}
