import { Button, StackProps, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ProjectNavIcon, RewardGiftIcon } from '../../../../components/icons';
import { Body1 } from '../../../../components/typography';
import { useFilterContext } from '../../../../context';
import { ProjectStatus, ProjectType } from '../../../../types';
import { getStatusTypeButtonContent, StatusTypeButton } from '.';

interface StatusFilterBodyProps extends StackProps {
  onClose: () => void;
  button: StatusTypeButton;
}

export type StatusAndType = {
  status?: ProjectStatus;
  type?: ProjectType;
};

export const StatusFilterBody = ({
  onClose,
  button,
  ...rest
}: StatusFilterBodyProps) => {
  const { t } = useTranslation();
  const { filters, updateFilter } = useFilterContext();

  const handleClick = ({ status, type }: StatusAndType) => {
    if (type) {
      updateFilter({ status: undefined, type });
    } else {
      updateFilter({ status, type: undefined });
    }

    onClose();
  };

  const options = [
    { type: ProjectType.Reward },
    { status: ProjectStatus.Active },
    { status: ProjectStatus.Inactive },
    {
      linkTo: '/latestprojects',
      text: 'Latest Projects',
      icon: ProjectNavIcon, // Using ProjectNavIcon as the icon component
      color: 'primary.500',
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
            <Link key={index} to={option.linkTo}>
              <Button
                background="neutral.0"
                color="neutral.800"
                w="100%"
                display="flex"
                justifyContent="start"
              >
                {option.icon && <option.icon color={option.color} />} {/* Render the icon */}
                <Body1 ml="10px" color={'neutral.700'}>
                  {t(option.text)}
                </Body1>
              </Button>
            </Link>
          );
        }
        const isActive =
          filters.type === option.type && filters.status === option.status;

        const { icon: Icon, text, color } = getStatusTypeButtonContent(option);
        return (
          <Button
            key={index}
            background={isActive ? 'neutral.100' : 'neutral.0'}
            color="neutral.800"
            onClick={() => handleClick(option)}
            w="100%"
            display="flex"
            justifyContent="start"
          >
            <Icon color={color} />
            <Body1 ml="10px" color={'neutral.900'}>
              {t(text)}
            </Body1>
          </Button>
        );
      })}
    </VStack>
  );
};
