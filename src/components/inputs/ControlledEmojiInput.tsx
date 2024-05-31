import { Box, Image } from '@chakra-ui/react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

import { AddEmojiIcon } from '../icons/svg/AddEmojiIcon'

type Props = UseControllerProps<FieldValues> & {
  onOpenEmojiPicker: () => void
}

export function ControlledEmojiInput({ control, name, onOpenEmojiPicker }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="neutral.200"
          borderRadius="8px"
          p={2}
          width="40px"
          height="40px"
          onClick={() => {
            onOpenEmojiPicker()
          }}
        >
          {field.value ? <Image src={field.value} /> : <AddEmojiIcon fill="neutral.700" />}
        </Box>
      )}
    />
  )
}
