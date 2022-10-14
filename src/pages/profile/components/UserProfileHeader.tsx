import React, { useMemo, ReactElement } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  ThemeComponentProps,
  ThemeTypings,
  WrapItem,
  Wrap,
} from '@chakra-ui/react';
import { ExternalAccount, User } from '../../../types/generated/graphql';
import { ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { getRandomOrb } from '../../../utils';
import { useAuthContext } from '../../../context';
import { colors, GeyserHomepageUrl } from '../../../constants';
import { BsTwitter, BsLightningChargeFill } from 'react-icons/bs';
import { FountainIcon } from '../../../components/icons';
import { createUseStyles } from 'react-jss';

type Props = {
  profileUser: User;
  // shouldShowCreateProjectButton: boolean;
  onProjectCreateSelected?: () => void;
};

export const UserProfilePageHeader = ({
  profileUser,
  onProjectCreateSelected,
}: // shouldShowCreateProjectButton,
Props) => {
  const { user: currentAppUser, loginOnOpen } = useAuthContext();

  const isUserViewingOwnProfile = currentAppUser.id === profileUser.id;
  const shouldShowCreateProjectButton = isUserViewingOwnProfile;
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

          {shouldShowSettingsButton ? (
            <IconButton
              size="sm"
              background={'none'}
              aria-label="connect"
              icon={<SettingsIcon fontSize="20px" />}
              border="1px solid lightgrey"
              onClick={loginOnOpen}
            />
          ) : null}
        </HStack>

        {shouldShowCreateProjectButton ? (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              borderRadius="4px"
              bgColor="brand.primary"
              _hover={{ bgColor: 'brand.normalLightGreen' }}
              _focus={{ bgColor: 'brand.normalLightGreen' }}
              _active={{ bgColor: 'brand.normalLightGreen' }}
            >
              Create
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onProjectCreateSelected}>Launch idea</MenuItem>
              <MenuItem color="brand.gray300" pointerEvents="none">
                Write post
              </MenuItem>
            </MenuList>
          </Menu>
        ) : null}
      </HStack>

      <Wrap width="100%">
        {profileUser.externalAccounts.map((account) => {
          if (account) {
            return (
              <WrapItem>
                <ExternalAccountItem key={account.id} account={account} />
              </WrapItem>
            );
          }
        })}
      </Wrap>
    </VStack>
  );
};

const useStyles = createUseStyles({
  linkContainer: {
    color: colors.textBlack,
  },
  linkButton: {
    textDecoration: 'none',
  },
});

const ExternalAccountItem = ({ account }: { account: ExternalAccount }) => {
  const { type, externalUsername } = account;
  const styles = useStyles();

  const linkDestination: string = useMemo(() => {
    switch (type) {
      case 'twitter':
        return `https://twitter.com/${externalUsername}`;
      case 'Fountain':
        return `https://www.fountain.fm/${account.externalUsername}`;
      case 'lnurl':
        return '';
      default:
        return `${GeyserHomepageUrl}`;
    }
  }, [type, externalUsername]);

  const isLinkExternal: boolean = useMemo(() => {
    switch (type) {
      case 'twitter':
        return true;
      case 'Fountain':
        return true;
      case 'lnurl':
        return false;
      default:
        return false;
    }
  }, [type]);

  const buttonIcon: ReactElement = useMemo(() => {
    switch (type) {
      case 'twitter':
        return <BsTwitter />;
      case 'Fountain':
        return <FountainIcon />;
      case 'lnurl':
        return <BsLightningChargeFill />;
      default:
        return <></>;
    }
  }, [type]);

  const buttonVariant: ThemeComponentProps['variant'] = useMemo(() => {
    switch (type) {
      case 'twitter':
        return 'solid';
      case 'Fountain':
        return 'ghost';
      case 'lnurl':
        return 'ghost';
      default:
        return 'ghost';
    }
  }, [type]);

  const buttonColorScheme: ThemeTypings['colorSchemes'] | '' = useMemo(() => {
    switch (type) {
      case 'twitter':
        return 'twitter';
      case 'Fountain':
        return '';
      case 'lnurl':
        return '';
      default:
        return '';
    }
  }, [type]);

  return isLinkExternal ? (
    <Link href={linkDestination} isExternal className={styles.linkContainer}>
      <Button
        leftIcon={buttonIcon}
        colorScheme={buttonColorScheme}
        variant={buttonVariant}
        className={styles.linkButton}
      >
        {account.externalUsername}
      </Button>
    </Link>
  ) : (
    <Link
      as={ReactRouterLink}
      to={linkDestination}
      className={styles.linkContainer}
    >
      <Button
        leftIcon={buttonIcon}
        colorScheme={buttonColorScheme}
        variant={buttonVariant}
        className={styles.linkButton}
      >
        {account.externalUsername}
      </Button>
    </Link>
  );
};
