import { useBreakpointValue } from '@chakra-ui/react'
import { useMemo } from 'react'
import Select, { components, Props, StylesConfig } from 'react-select'

import { useCustomTheme } from '@/utils/index.ts'

export interface CustomSelectProps<Option, IsMulti extends boolean = false>
  extends Omit<Props<Option, IsMulti>, 'chakraStyles'> {
  customChakraStyles?: StylesConfig<Option, IsMulti>
  dropdownIndicator?: React.ReactNode
  menuMinWidth?: number | string
  width?: string | number | null
  responsiveWidth?: (string | null)[] | Partial<Record<string, string>>
  fontSize?: string
  dropdownIndicatorPosition?: 'left' | 'right'
  isInvalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function CustomSelect<Option, IsMulti extends boolean = false>({
  customChakraStyles,
  dropdownIndicator,
  width,
  responsiveWidth,
  dropdownIndicatorPosition = 'right',
  menuMinWidth,
  isInvalid,
  size = 'md',
  ...props
}: CustomSelectProps<Option, IsMulti>) {
  const { colors } = useCustomTheme()

  const propWidth = useBreakpointValue(responsiveWidth || { base: '100%', lg: '200px' })

  const { control, ...restStyles } = customChakraStyles || {}

  const chakraStyles: StylesConfig<Option, IsMulti> = {
    container: (base) => ({
      ...base,
      width: width || propWidth,
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: colors.panel.solid,
      padding: '8px',
      minWidth: menuMinWidth,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 99999 }),

    option: (_, state) => ({
      background: colors.panel.solid,
      color: colors.utils.text,
      borderRadius: '8px',
      minHeight: '32px',
      fontSize: props.fontSize || '16px',
      fontWeight: '400',
      padding: '8px 12px',
      display: 'flex',
      alignItems: 'center',
      marginY: '4px',
      cursor: 'pointer',
      ...(state.isSelected && {
        background: colors.neutral1[3],
        color: colors.utils.text,
      }),
      ...(state.isFocused &&
        !state.isSelected && {
          background: colors.primary1[9],
          color: colors.utils.blackContrast,
        }),
      '&:hover': {
        background: colors.primary1[9],
        color: colors.utils.blackContrast,
      },
      '&:active': {
        bg: colors.primary1[10],
        color: colors.utils.blackContrast,
      },
      '&:disabled': {
        background: colors.panel.solid,
        color: colors.neutral1[8],
        cursor: 'not-allowed',
      },
    }),

    singleValue(base) {
      return {
        ...base,
        color: colors.utils.text,
      }
    },
    multiValue(base, props) {
      return {
        ...base,
        backgroundColor: colors.neutral1[6],
        borderRadius: '4px',
        marginRight: '4px',
      }
    },
    multiValueLabel(base, props) {
      return {
        ...base,
        color: colors.utils.text,
      }
    },

    control: (provided, props) => ({
      ...provided,
      borderRadius: '8px',
      backgroundColor: `${colors.panel.solid} !important`,
      borderColor: props.isFocused ? colors.primary1[11] : isInvalid ? colors.error[9] : colors.neutral1[6],
      flexDirection: dropdownIndicatorPosition === 'left' ? 'row-reverse' : 'row',
      boxShadow: 'none !important',
      '&:hover': {
        borderColor: props.isFocused ? colors.primary1[11] : colors.neutral1[7],
        cursor: 'pointer',
        boxShadow: 'none',
      },
      '&:focus': {
        borderColor: colors.primary1[11],
        outline: 'none',
        boxShadow: 'none',
      },
      '&:active': {
        borderColor: colors.primary1[11],
        outline: 'none',
        boxShadow: 'none',
      },
      '&:selected': {
        borderColor: colors.primary1[11],
        outline: 'none',
        boxShadow: 'none',
      },
      '&:disabled': {
        borderColor: colors.neutral1[8],
        outline: 'none',
        boxShadow: 'none',
      },
      ...(control && {
        ...control(provided, props),
      }),
    }),
    input: (provided) => ({
      ...provided,
      color: colors.utils.text,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    ...restStyles,
  }

  const customComponents = useMemo(
    () => ({
      DropdownIndicator: (props: any) => (
        <components.DropdownIndicator {...props}>{dropdownIndicator}</components.DropdownIndicator>
      ),
    }),
    [dropdownIndicator],
  )

  return (
    <Select<Option, IsMulti>
      styles={chakraStyles}
      {...props}
      components={{ ...customComponents, ...props.components }}
      menuPortalTarget={document.body}
      menuPlacement="auto"
    />
  )
}
