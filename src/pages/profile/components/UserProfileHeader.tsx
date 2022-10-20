import React from 'react';
import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  WrapItem,
  Wrap,
} from '@chakra-ui/react';
import { User } from '../../../types/generated/graphql';
import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { getRandomOrb } from '../../../utils';
import { useAuthContext } from '../../../context';
import { ExternalAccountLinkItem } from '.';
import { BsLightningChargeFill } from 'react-icons/bs';

type Props = {
  profileUser: User;
  onProjectCreateSelected?: () => void;
};

export const UserProfilePageHeader = ({
  profileUser,
  onProjectCreateSelected,
}: Props) => {
  const { user: currentAppUser, loginOnOpen } = useAuthContext();

  const isUserViewingOwnProfile = currentAppUser.id === profileUser.id;
  const shouldShowCreationButton = isUserViewingOwnProfile;
  const shouldShowSettingsButton = isUserViewingOwnProfile;

  return (
    <VStack width="100%" spacing={4}>
      <HStack width="100%" justifyContent="space-between" alignItems={'center'}>
        <HStack
          flex={1}
          spacing={4}
          justifyContent="space-between"
          alignItems={'center'}
        >
          <HStack spacing={2} justifyContent="flex-start" alignItems={'center'}>
            <Avatar
              height="50px"
              width="50px"
              name={profileUser.username}
              src={
                profileUser.imageUrl
                  ? profileUser.imageUrl
                  : getRandomOrb(profileUser.id)
              }
            />

            <Text fontWeight={600} fontSize="lg" as={'h2'}>
              {profileUser.username}
            </Text>
          </HStack>
        </HStack>

        {shouldShowCreationButton ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon fontSize={'1.5em'} />}
              borderRadius="4px"
              bgColor="brand.primary"
              _hover={{ bgColor: 'brand.normalLightGreen' }}
              _focus={{ bgColor: 'brand.normalLightGreen' }}
              _active={{ bgColor: 'brand.normalLightGreen' }}
            >
              Create
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onProjectCreateSelected}>
                Create A Project
              </MenuItem>
              <MenuItem color="brand.gray300" pointerEvents="none">
                Create a Project Entry
              </MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </HStack>

      <Wrap width="100%" alignItems={'center'} spacing={1.5}>
        {profileUser.externalAccounts.map((account) => {
          if (account) {
            return (
              <WrapItem alignSelf={'center'}>
                {account.type === 'lnurl' ? (
                  <HStack spacing={1.5}>
                    <BsLightningChargeFill />
                    <Text>{account.externalUsername}</Text>
                  </HStack>
                ) : (
                  <ExternalAccountLinkItem key={account.id} account={account} />
                )}
              </WrapItem>
            );
          }
        })}

        {shouldShowSettingsButton ? (
          <IconButton
            size="sm"
            background={'none'}
            aria-label="connect"
            icon={<SettingsIcon fontSize="20px" />}
            border="1px solid lightgrey"
            onClick={loginOnOpen}
            alignSelf={'center'}
          />
        ) : null}
      </Wrap>
    </VStack>
  );
};
