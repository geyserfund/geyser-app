import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { HiOutlineTag } from 'react-icons/hi'

import { CardLayout, CardLayoutProps } from '../../../../components/layouts'
import { Body1 } from '../../../../components/typography'
import { ButtonComponent } from '../../../../components/ui'
import { useFilterContext } from '../../../../context'
import { TagsGetResult } from '../../../../types'
import { RenderTags } from '../components'
import { TagsFilterBody } from './TagsFilterBody'

const MAX_TAG_INDEX_DEFAULT_VIEW = 5

interface DesktopTagsFilterProps extends CardLayoutProps {
  allTags: TagsGetResult[]
  handleTagsClick: (tag: TagsGetResult) => void
}

export const DesktopTagsFilter = ({
  allTags,
  handleTagsClick,
  ...rest
}: DesktopTagsFilterProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { filters } = useFilterContext()

  const { tagIds = [] } = filters

  return (
    <>
      <CardLayout
        width="100%"
        direction="column"
        padding="10px"
        spacing="10px"
        {...rest}
      >
        <ProjectTagsHeader />
        <VStack width="100%" alignItems="start" spacing="5px">
          <RenderTags
            {...{
              max: MAX_TAG_INDEX_DEFAULT_VIEW,
              allTags,
              tagIds,
              handleClick: handleTagsClick,
            }}
          />
        </VStack>
        <ButtonComponent size="sm" onClick={onOpen}>
          {t('View more tags')}
        </ButtonComponent>
      </CardLayout>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent maxHeight="700px" overflow="hidden" borderRadius="8px">
          <ModalHeader>
            <ProjectTagsHeader />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            as={VStack}
            overflow="hidden"
            paddingX="0px"
            spacing="10px"
          >
            <TagsFilterBody {...{ allTags, handleTagsClick }} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export const ProjectTagsHeader = () => {
  const { t } = useTranslation()
  return (
    <HStack width="100%" position="relative">
      <HiOutlineTag color={'neutral.600'} />
      <Body1 color={'neutral.600'}>{t('Filter by project tags')}</Body1>
    </HStack>
  )
}

export const DesktopFilterLayoutSkeleton = () => {
  return (
    <CardLayout width="100%" direction="column" padding="10px" spacing="15px">
      <ProjectTagsHeader />
      <VStack width="100%" alignItems="start" spacing="10px">
        {[1, 2, 3, 4, 5].map((val) => {
          return (
            <Skeleton key={val} height="25px" borderRadius="8px" width="60%" />
          )
        })}
      </VStack>
      <Skeleton height="25px" borderRadius="8px" width="100%" />
    </CardLayout>
  )
}
