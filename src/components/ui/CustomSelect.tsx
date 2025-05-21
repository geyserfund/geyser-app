import { ResponsiveValue } from '@chakra-ui/react'
import { chakraComponents, ChakraStylesConfig, Props, Select } from 'chakra-react-select'
import { useMemo } from 'react'

export interface CustomSelectProps<Option, IsMulti extends boolean = false>
  extends Omit<Props<Option, IsMulti>, 'chakraStyles'> {
  customChakraStyles?: ChakraStylesConfig<Option, IsMulti>
  dropdownIndicator?: React.ReactNode
  width?: ResponsiveValue<number | string>
  fontSize?: string
  dropdownIndicatorPosition?: 'left' | 'right'
}

export function CustomSelect<Option, IsMulti extends boolean = false>({
  customChakraStyles,
  dropdownIndicator,
  width,
  dropdownIndicatorPosition = 'right',
  ...props
}: CustomSelectProps<Option, IsMulti>) {
  const chakraStyles: ChakraStylesConfig<Option, IsMulti> = {
    container: (provided) => ({
      ...provided,
      width: width || { base: '100%', lg: '200px' },
    }),

    menu: (provided) => ({
      ...provided,
    }),

    option: (_, state) => ({
      bg: 'panel.solid',
      color: 'utils.text',
      borderRadius: '8px',
      minHeight: '32px',
      fontSize: props.fontSize || '16px',
      fontWeight: '400',
      paddingX: '12px',
      display: 'flex',
      alignItems: 'center',
      marginY: '4px',
      cursor: 'pointer',
      ...(state.isSelected && {
        bg: 'neutral1.3',
        color: 'utils.text',
      }),
      ...(state.isFocused &&
        !state.isSelected && {
          bg: 'primary1.9',
          color: 'utils.blackContrast',
        }),
      _hover: {
        bg: 'primary1.9',
        color: 'utils.blackContrast',
      },
      _active: {
        bg: 'primary1.10',
        color: 'utils.blackContrast',
      },
      _disabled: {
        bg: 'panel.solid',
        color: 'neutral1.8',
        cursor: 'not-allowed',
      },
    }),
    control: (provided) => ({
      ...provided,
      borderColor: 'neutral1.6',
      flexDirection: dropdownIndicatorPosition === 'left' ? 'row-reverse' : 'row',
      _hover: {
        borderColor: 'neutral1.7',
      },
    }),
    ...customChakraStyles,
  }

  const components = useMemo(
    () => ({
      DropdownIndicator: (props: any) => (
        <chakraComponents.DropdownIndicator {...props}>{dropdownIndicator}</chakraComponents.DropdownIndicator>
      ),
    }),
    [dropdownIndicator],
  )

  return (
    <Select
      chakraStyles={chakraStyles}
      useBasicStyles
      {...props}
      components={{ ...components, ...props.components }}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 99999 }),
      }}
    />
  )
}
