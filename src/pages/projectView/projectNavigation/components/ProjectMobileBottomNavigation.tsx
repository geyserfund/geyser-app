import { Button, HStack, Slide, useDisclosure, VStack } from '@chakra-ui/react'
import { use } from 'i18next'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BoltIcon } from '../../../../components/icons'
import { Body2 } from '../../../../components/typography'
import { getPath } from '../../../../constants'
import { BottomNavContainerCommonStyles } from '../../../../constants/styles'
import { MobileViews, useProjectContext } from '../../../../context'
import { useLayoutAnimation, useScrollDirection } from '../../../../hooks'
import { isActive } from '../../../../utils'
import { navigationItems } from './BottomNavList'

export const ProjectMobileBottomNavigation = ({
  fixed,
}: {
  fixed?: boolean
}) => {
  const { mobileView } = useProjectContext()

  const { isScrollingUp } = useScrollDirection({
    initialValue: true,
    mobileView,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (!fixed) {
      if (isScrollingUp) {
        return onOpen()
      }

      onClose()
    }
  }, [isScrollingUp, mobileView, fixed, onOpen, onClose])

  if (fixed) {
    return (
      <Slide
        direction="bottom"
        in
        style={{
          zIndex: 10,
        }}
        transition={{
          exit: {
            duration: 0,
          },
          enter: {
            duration: 0,
          },
        }}
      >
        <ProjectNavUI />
      </Slide>
    )
  }

  return (
    <>
      {/* {<Box width="100%" height="60px"></Box>} */}
      <Slide
        direction="bottom"
        in={isOpen}
        style={{
          zIndex: 10,
        }}
      >
        <ProjectNavUI />
      </Slide>
    </>
  )
}

export const ProjectNavUI = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mobileView, setMobileView, project, isProjectOwner } =
    useProjectContext()

  const className = useLayoutAnimation()

  const getTextColor = (value: string) => {
    if (value === mobileView) {
      return 'neutral.1000'
    }

    return 'neutral.600'
  }

  if (!project) {
    return null
  }

  const handleMobileViewClick = (value: MobileViews) => {
    navigate(getPath('project', project.name))
    if (mobileView === value) {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setMobileView(value)
      document.scrollingElement?.scrollTo({ top: 0 })
    }
  }

  const isFundingDisabled = !isActive(project.status)
  const showGreyButton = isFundingDisabled

  return (
    <HStack
      className={className}
      position="relative"
      paddingX="20px"
      pt={2}
      {...BottomNavContainerCommonStyles}
      justifyContent="space-between"
    >
      {navigationItems.map((item, index) => {
        if (isProjectOwner && !item.isCreator) return null
        if (!isProjectOwner && !item.isContributor) return null

        const handleClick = () => {
          if (item.pathName) {
            navigate(item.pathName)
          } else if (item.mobileView) {
            handleMobileViewClick(item.mobileView)
          }
        }

        return (
          <Button
            key={item.name}
            variant="ghost"
            onClick={handleClick}
            color={getTextColor(MobileViews.description)}
            _hover={{}}
            padding="5px"
          >
            <VStack spacing="0px">
              <item.icon fontSize="30px" />
              <Body2 fontSize="10px" semiBold color="neutral.700">
                {t(item.name)}
              </Body2>
            </VStack>
          </Button>
        )
      })}
      {!isProjectOwner && (
        <Button
          size="sm"
          variant="primary"
          padding="5px"
          px="10px"
          isDisabled={showGreyButton}
          onClick={() => handleMobileViewClick(MobileViews.funding)}
          leftIcon={<BoltIcon />}
        >
          {t('Contribute')}
        </Button>
      )}
    </HStack>
  )
}
