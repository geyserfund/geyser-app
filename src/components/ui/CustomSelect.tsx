import { chakraComponents, ChakraStylesConfig, Props, Select } from 'chakra-react-select'

export interface CustomSelectProps<Option, IsMulti extends boolean = false>
  extends Omit<Props<Option, IsMulti>, 'chakraStyles'> {
  customChakraStyles?: ChakraStylesConfig<Option, IsMulti>
  dropdownIndicator?: React.ReactNode
}

export function CustomSelect<Option, IsMulti extends boolean = false>({
  customChakraStyles,
  dropdownIndicator,
  ...props
}: CustomSelectProps<Option, IsMulti>) {
  const chakraStyles: ChakraStylesConfig<Option, IsMulti> = {
    container: (provided) => ({
      ...provided,
      width: { base: '100%', lg: '200px' },
    }),

    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),

    option: (_, state) => ({
      bg: 'panel.solid',
      color: 'utils.text',
      borderRadius: '8px',
      height: '32px',
      fontSize: '16px',
      fontWeight: '400',
      paddingX: '12px',
      display: 'flex',
      alignItems: 'center',
      marginY: '4px',
      cursor: 'pointer',
      ...(state.isSelected && {
        bg: 'neutral1.3',
        color: 'utils.blackContrast',
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
      _hover: {
        borderColor: 'neutral1.7',
      },
    }),
    ...customChakraStyles,
  }

  const components = {
    DropdownIndicator: (props: any) => (
      <chakraComponents.DropdownIndicator {...props}>{dropdownIndicator}</chakraComponents.DropdownIndicator>
    ),
  }

  return <Select chakraStyles={chakraStyles} useBasicStyles {...props} components={components} />
}
