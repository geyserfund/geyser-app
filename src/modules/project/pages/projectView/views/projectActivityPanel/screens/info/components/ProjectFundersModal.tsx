import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { createUseStyles } from 'react-jss'

import { Modal } from '../../../../../../../../../components/layouts'
import { useModal } from '../../../../../../../../../hooks/useModal'
import { InfoScreenFeed } from '../views/InfoScreenFeed'

export const useProjectFundersModal = () => {
  return useModal<{}>()
}

type Props = ReturnType<typeof useProjectFundersModal>

type Rules = string

type Styles = {
  isMobile?: boolean
  inView: boolean
  fadeStarted?: boolean
}

export const useProjectLayoutStyles = createUseStyles<Rules, Styles>({
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

export const ProjectFundersModal = ({ ...props }: Props) => {
  const { t } = useTranslation()
  const classes = useProjectLayoutStyles()

  if (!props.isOpen) {
    return null
  }

  return (
    <Modal title={t(' ')} size={'lg'} {...props}>
      <Box className={classes.detailsContainer}>
        <InfoScreenFeed id={'modal'} isBounded />
      </Box>
    </Modal>
  )
}
