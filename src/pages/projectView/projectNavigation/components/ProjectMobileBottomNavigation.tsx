import { Button, HStack, Slide, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BoltIcon } from '../../../../components/icons'
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
  const {
    mobileView,
    setMobileView,
    project,
    isProjectOwner,
    onCreatorModalOpen,
  } = useProjectContext()

  const className = useLayoutAnimation()

  const getTextColor = (value?: MobileViews) => {
    if (!value) return 'neutral.600'
    if (mobileView === value) {
      return 'primary.500'
    }

    return 'neutral.600'
  }

  if (!project) {
    return null
  }

  const handleMobileViewClick = (value: MobileViews) => {
    if (mobileView === value) {
      document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.scrollingElement?.scrollTo({ top: 0 })
      setMobileView(value)
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
          handleMobileViewClick(item.mobileView)
          if (item.pathName) {
            navigate(item.pathName)
          } else {
            navigate(getPath('project', project.name))
          }
        }

        if (item.name === 'Create') {
          return (
            <Button
              key={item.name}
              variant="primary"
              onClick={onCreatorModalOpen}
              _hover={{}}
              height="30px"
              width="50px"
            >
              <item.icon fontSize="16px" />
            </Button>
          )
        }

        return (
          <Button
            key={item.name}
            variant="ghost"
            onClick={handleClick}
            _hover={{}}
            color={getTextColor(item.mobileView)}
            padding="5px"
          >
            <item.icon {...item.iconProps} />
          </Button>
        )
      })}
      {!isProjectOwner && (
        <Button
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
