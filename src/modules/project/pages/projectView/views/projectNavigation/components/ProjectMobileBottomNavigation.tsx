import { Button, HStack, Slide, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BoltIcon } from '../../../../../../../components/icons'
import { getPath } from '../../../../../../../constants'
import { BottomNavContainerCommonStyles } from '../../../../../../../constants/styles'
import { useLayoutAnimation, useScrollDirection } from '../../../../../../../hooks'
import { useIsProjectPage } from '../../../../../../../navigation/topNavBar/topNavBarAtom'
import { useEntryAtom } from '../../../../../../../pages/entry/entryAtom'
import { isActive } from '../../../../../../../utils'
import { MobileViews, useProjectContext } from '../../../../../context'
import { useProjectGoals } from '../../../hooks/useProjectGoals'
import { navigationItems } from './BottomNavList'

export const ProjectMobileBottomNavigation = ({ fixed }: { fixed?: boolean }) => {
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
          zIndex: 30,
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
      <Slide
        direction="bottom"
        in={isOpen}
        style={{
          zIndex: 30,
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

  const { mobileView, setMobileView, project, isProjectOwner, onCreatorModalOpen } = useProjectContext()
  const { hasGoals } = useProjectGoals()
  const [entry] = useEntryAtom()

  const className = useLayoutAnimation()

  const isProjectPage = useIsProjectPage()

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

        if (item.name === 'Rewards' && (!project.rewards || project.rewards.length === 0)) return null
        if (item.name === 'Goals' && !hasGoals) return null

        const handleClick = () => {
          handleMobileViewClick(item.mobileView)
          if (item.pathName) {
            navigate(item.pathName)
          } else if (isProjectPage) {
            navigate(getPath('project', project.name))
          } else {
            navigate(getPath('entry', entry.id))
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
