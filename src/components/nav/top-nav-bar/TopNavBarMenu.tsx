import React, { useContext } from 'react';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Avatar, HStack, MenuDivider } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import {
  AboutUsUrl,
  colors,
  FAQUrl,
  FeedbackUrl,
  styles,
} from '../../../constants';
import { MenuItemLink } from './MenuItemLink';
import { NavBarUserProfileMenuItem } from './NavBarUserProfileMenuItem';
import { AuthContext } from '../../../context';
import { getPath } from '../../../constants/router-paths';
import { NavBarUserProjectMenuItem } from './NavBarUserProjectMenuItem';
import { IUserProfile } from '../../../interfaces';

type Props = {
  userProfile: IUserProfile;
  isUserAProjectCreator: boolean;
  shouldShowDashboardMenuItem: boolean;
  shouldShowSignInMenuItem: boolean;
  onDashboardSelected: () => void;
  onSignInSelected: () => void;
  onSignOutSelected: () => void;
};

export const TopNavBarMenu = ({
  userProfile,
  shouldShowSignInMenuItem,
  shouldShowDashboardMenuItem,
  onSignInSelected,
  onDashboardSelected,
  onSignOutSelected,
  isUserAProjectCreator,
}: Props) => {
  const textColor = useColorModeValue(colors.textBlack, colors.textWhite);

  const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <Menu placement="bottom-end">
      <MenuButton
        px={2.5}
        py={2.5}
        aria-label="options"
        transition="all 0.2s"
        borderRadius="md"
        _hover={{ bg: 'gray.400' }}
        _expanded={{ bg: 'brand.primary400' }}
        _focus={{ boxShadow: 'outline' }}
        color={textColor}
        backgroundColor={useColorModeValue(
          'brand.neutral200',
          'brand.neutral800',
        )}
        variant="solid"
        sx={styles.buttonCommon}
      >
        <HStack color={useColorModeValue('brand.gray500', 'brand.gray200')}>
          <HamburgerIcon />

          {isLoggedIn ? (
            <Avatar height="22px" width="22px" src={user.imageUrl} />
          ) : null}
        </HStack>
      </MenuButton>

      <MenuList width="150px">
        {shouldShowSignInMenuItem ? (
          <>
            <MenuItem
              onClick={onSignInSelected}
              color="brand.primary700"
              px={4}
              py={2}
            >
              Connect
            </MenuItem>

            <MenuDivider />
          </>
        ) : null}

        {shouldShowDashboardMenuItem ? (
          <>
            <MenuItem
              onClick={onDashboardSelected}
              color="brand.primary700"
              px={4}
              py={2}
            >
              Dashboard
            </MenuItem>

            <MenuDivider />
          </>
        ) : null}

        {isLoggedIn ? (
          <>
            <NavBarUserProfileMenuItem />

            {isUserAProjectCreator ? (
              <NavBarUserProjectMenuItem
                project={userProfile.ownerOf[0].project}
              />
            ) : null}

            <MenuDivider />
          </>
        ) : null}

        <MenuItem fontWeight={'bold'}>
          <MenuItemLink destinationPath={getPath('index')}>
            Recent Activity
          </MenuItemLink>
        </MenuItem>

        <MenuItem fontWeight={'bold'}>
          <MenuItemLink destinationPath={getPath('projectDiscovery')}>
            Discover Projects
          </MenuItemLink>
        </MenuItem>

        <MenuItem fontWeight={'bold'}>
          <MenuItemLink destinationPath={getPath('grants')}>
            Grants
          </MenuItemLink>
        </MenuItem>

        <MenuDivider />

        <MenuItem color={'brand.gray500'}>
          <MenuItemLink destinationPath={AboutUsUrl} isExternal>
            About
          </MenuItemLink>
        </MenuItem>

        <MenuItem color={'brand.gray500'}>
          <MenuItemLink destinationPath={FAQUrl} isExternal>
            FAQ
          </MenuItemLink>
        </MenuItem>

        <MenuItem color={'brand.gray500'}>
          <MenuItemLink destinationPath={FeedbackUrl} isExternal>
            Feedback
          </MenuItemLink>
        </MenuItem>

        {isLoggedIn ? (
          <>
            <MenuDivider />

            <MenuItem onClick={onSignOutSelected} color={'brand.gray500'}>
              Sign Out
            </MenuItem>
          </>
        ) : null}
      </MenuList>
    </Menu>
  );
};
