import { Button, StackProps, VStack, Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AiOutlineFieldTime } from 'react-icons/ai'

import { Body1 } from '../../../../components/typography'
import { useFilterContext } from '../../../../context'
import { ProjectStatus, ProjectType } from '../../../../types'
import { getStatusTypeButtonContent, StatusTypeButton } from '.'

interface StatusFilterBodyProps extends StackProps {
  onClose: () => void
  button: StatusTypeButton
}

export type StatusAndType = {
  status?: ProjectStatus
  type?: ProjectType
}

export const StatusFilterBody = ({
  onClose,
  button,
  ...rest
}: StatusFilterBodyProps) => {
  const { t } = useTranslation()
  const { filters, updateFilter } = useFilterContext()

  const handleClick = ({ status, type }: StatusAndType) => {
    if (type) {
      updateFilter({ status: undefined, type })
    } else {
      updateFilter({ status, type: undefined })
    }

    onClose()
  }

  const options = [
    { type: ProjectType.Reward },
    { status: ProjectStatus.Active },
    { status: ProjectStatus.Inactive },
    {
      linkTo: '/latest',
      text: 'Latest Projects',
      icon: AiOutlineFieldTime,
      size: '1.5em',
    },
  ];

  return (
    <VStack
      width="100%"
      alignItems="start"
      spacing="20px"
      paddingX="30px"
      {...rest}
    >
      {options.map((option, index) => {
        if (option.linkTo) {
          return (
            <Box>
            <Link key={index} to={option.linkTo}>
              <Button
                background={
                  filters.type === option.type && filters.status === option.status
                    ? 'transparent'
                    : 'neutral.100'
                }
                color="neutral.800"
                onClick={() => handleClick(option)}
                w="100%"
                display="flex"
                justifyContent="start"
                _hover={{
                  background:
                    filters.type !== option.type || filters.status !== option.status
                      ? 'neutral.100'
                      : 'neutral.100',
                }}
              >
                {option.icon && (
                  <option.icon size={option.size} />
                )}
                <Body1 ml="10px" mr="94px" color={filters.type === option.type && filters.status === option.status ? 'neutral.900' : 'neutral.700'}>
                  {t(option.text)}
                </Body1>
              </Button>
            </Link>
            </Box>
          );
        }
        const isActive =
          filters.type === option.type && filters.status === option.status;

        const { icon: Icon, text } = getStatusTypeButtonContent(option);
        return (
          <Button
            key={index}
            background={isActive ? 'neutral.100' : 'transparent'}
            color="neutral.800"
            onClick={() => handleClick(option)}
            w="100%"
            display="flex"
            justifyContent="start"
          >
            <Icon />
            <Body1 ml="10px" color={isActive ? 'neutral.900' : 'neutral.700'}>
              {t(text)}
            </Body1>
          </Button>
        );
      })}
    </VStack>
  );
};
