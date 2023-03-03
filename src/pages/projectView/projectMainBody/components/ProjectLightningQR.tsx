import { Button, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'

import { BoltIcon, QrIcon } from '../../../../components/icons'
import { Project } from '../../../../types/generated/graphql'
import { ProjectFundingQRModal } from './ProjectFundingQRModal'

interface ILightningQR {
  project: Project
}

export const ProjectLightningQR = ({ project }: ILightningQR) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { name } = project

  const [copy, setCopy] = useState(false)

  const handleAddressCopy = () => {
    navigator.clipboard.writeText(`${name}@geyser.fund`)
    setCopy(true)
  }

  return (
    <>
      <Tooltip
        label={copy ? 'Copied!' : 'Copy Lightning Address'}
        placement="top"
        closeOnClick={false}
      >
        <Button
          size="sm"
          leftIcon={<BoltIcon scale={0.8} />}
          border="1px solid"
          borderColor="transparent"
          _hover={{ backgroundColor: 'none', borderColor: '#20ECC7' }}
          _active={{ backgroundColor: 'brand.primary' }}
          bg="none"
          fontWeight="medium"
          onClick={handleAddressCopy}
          color="#2F423E"
          id="lightning-address"
        >
          {name}@geyser.fund
        </Button>
      </Tooltip>

      <Tooltip label="View Project QR Code" placement="top">
        <IconButton
          size="sm"
          border="1px solid"
          borderColor="transparent"
          _hover={{ backgroundColor: 'none', borderColor: '#20ECC7' }}
          _active={{ backgroundColor: 'brand.primary' }}
          bg="none"
          icon={<QrIcon />}
          aria-label="qr"
          onClick={() => {
            setCopy(false)
            onOpen()
          }}
        />
      </Tooltip>

      <ProjectFundingQRModal
        isOpen={isOpen}
        onClose={onClose}
        setCopy={setCopy}
        name={project.name}
        projectId={project.id}
        title={project.title}
      />
    </>
  )
}
