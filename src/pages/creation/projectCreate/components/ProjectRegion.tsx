import { useQuery } from '@apollo/client'
import { CloseIcon } from '@chakra-ui/icons'
import { HStack, StackProps, useDisclosure, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { MultiValue } from 'react-select'

import { Body1, Body2, Caption } from '../../../../components/typography'
import { IconButtonComponent, SelectComponent } from '../../../../components/ui'
import { QUERY_TAGS } from '../../../../graphql/queries/tags'
import { colors } from '../../../../styles'

const useStyles = createUseStyles({
  container: {
    width: '100%',
    alignItems: 'flex-start',
    spacing: '5px',
  },

  tagContainer: {
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: colors.neutral400,
    borderRadius: '8px',
    padding: '12px',
  },

  select: {
    width: '100%',
    borderRadius: '8px',
  },

  menuGroup: {
    backgroundColor: 'red',
  },
})

type ProjectRegionProps = StackProps

export const ProjectRegion = ({ ...rest }: ProjectRegionProps) => {
  const classes = useStyles()

  const [inputValue, setInputValue] = useState('')

  //   const handleChange = (value: MultiValue<RegionsGetResult>) => {
  //     const newRegion: Region = { id: value[0].id, label: value[0].label }
  //     if (!tags.some((tag) => tag.id === newRegion.id)) {
  //       updateRegions([...tags, newRegion])
  //     } else {
  //       updateRegions(tags.filter((tag) => tag.id !== newRegion.id))
  //     }
  //   }

  //   const handleInputChange = (newValue: string) => {
  //     setInputValue(newValue)
  //     if (newValue?.length >= 2) {
  //       onOpen()
  //     } else {
  //       onClose()
  //     }
  //   }

  //   const removeRegion = (id: number) => {
  //     updateRegions(tags.filter((tag) => tag.id !== id))
  //   }

  //   const isDisabled = tags.length >= 3

  return (
    <VStack className={classes.container} {...rest}>
      <Body2>Region</Body2>
      <Caption>
        Get found more easily by putting your project on the map. Select a
        country or region
      </Caption>
      <VStack className={classes.tagContainer} spacing="10px">
        <SelectComponent<RegionsGetResult, true>
          isMulti
          isDisabled={isDisabled}
          menuIsOpen={isOpen}
          className={classes.select}
          onChange={handleChange}
          isLoading={loading}
          name="tags"
          placeholder="Select region"
          value={[]}
          options={tagOptions}
          getOptionLabel={(option: RegionsGetResult) => option.label}
          getOptionValue={(option: RegionsGetResult) => option.label}
          onInputChange={handleInputChange}
          inputValue={inputValue}
        />
        <HStack width="100%" spacing="10px">
          {tags.map((tag) => {
            return (
              <HStack
                key={tag.id}
                borderRadius="4px"
                paddingLeft="8px"
                backgroundColor="brand.neutral100"
              >
                <Body1 semiBold>{tag.label}</Body1>
                <IconButtonComponent
                  noBorder
                  size="xs"
                  borderRadius="8px"
                  aria-label="remove-tag-close-icon"
                  onClick={() => removeRegion(tag.id)}
                  icon={<CloseIcon />}
                />
              </HStack>
            )
          })}
        </HStack>
      </VStack>
    </VStack>
  )
}
