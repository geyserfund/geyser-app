import {
  Avatar,
  Box,
  Divider,
  HStack,
  HTMLChakraProps,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { GiftIcon } from '../../../components/icons';
import { AnonymousAvatar, SatoshiAmount } from '../../../components/ui';
import { fonts } from '../../../constants/fonts';
import { IBadge } from '../../../interfaces';
import { Project } from '../../../types/generated/graphql';
import { Satoshis } from '../../../types/types';

type Props = HTMLChakraProps<'div'> & {
  project: Project;
  contributionAmount: Satoshis;
  referenceCode?: string;
  isFunderAnonymous?: boolean;
  funderEmail?: string;
  funderUsername?: string;
  funderAvatarURL?: string;
  rewardsEarned?: { [rewardID: string]: number };
  badgesEarned?: IBadge[];
};

const useStyles = createUseStyles({
  divider: {
    borderColor: 'white',
    mixBlendMode: 'screen',
  },
});

export const ContributionInfoBox = ({
  project,
  contributionAmount,
  referenceCode,
  isFunderAnonymous,
  funderEmail,
  funderUsername,
  funderAvatarURL,
  rewardsEarned = {},
  badgesEarned = [],
  ...rest
}: Props) => {
  const styles = useStyles();
  const rewardNameString: string = useMemo(() => {
    let nameString = '';

    project.rewards?.map((reward) => {
      const rewardCount = rewardsEarned[reward?.id];

      if (rewardCount) {
        if (nameString.length === 0) {
          nameString = `${reward?.name}(x${rewardCount})`;
        } else {
          nameString = `${nameString}, ${reward?.name}(x${rewardCount})`;
        }
      }
    });

    return nameString;
  }, [project.rewards, rewardsEarned]);

  const hasRewardsOrBadgesInfo =
    Boolean(rewardNameString) || badgesEarned.length > 0;

  return (
    <Box
      backgroundColor={'brand.primary100'}
      borderRadius="md"
      paddingX={4}
      paddingY={3}
      flexDirection="column"
      alignItems={'flex-start'}
      display={'flex'}
      width="full"
      {...rest}
    >
      <VStack spacing={2} alignItems="flex-start" width="full">
        <Text fontSize={'14px'} fontWeight={500}>
          {project.title}
        </Text>

        <SatoshiAmount
          fontSize="14px"
          shouldShowDollarConversion
          color="brand.neutral900"
          fontFamily={fonts.mono}
        >
          {contributionAmount}
        </SatoshiAmount>

        <Divider className={styles.divider} orientation="horizontal" />

        {hasRewardsOrBadgesInfo ? (
          <>
            <Divider className={styles.divider} orientation="horizontal" />

            {rewardNameString.length > 0 && (
              <HStack>
                <GiftIcon />
                <Text>{`Reward: ${rewardNameString}`}</Text>
              </HStack>
            )}

            {badgesEarned.map((badge, index) => {
              return (
                <HStack key={index}>
                  <Text>{badge.badge}</Text>
                  <Text>{badge.description}</Text>
                </HStack>
              );
            })}

            <Divider className={styles.divider} orientation="horizontal" />
          </>
        ) : null}

        <VStack
          spacing={2}
          width="full"
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          color="brand.neutral900"
          fontFamily={fonts.mono}
        >
          {funderEmail ? (
            <Text fontSize={'14px'}>{`Email: ${funderEmail}`}</Text>
          ) : null}

          <HStack
            spacing={2}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
          >
            {isFunderAnonymous ? (
              <>
                <AnonymousAvatar seed={0} imageSize={'20px'} />
                <Text>anonymous</Text>
              </>
            ) : (
              <>
                <Avatar width={'20px'} height={'20px'} src={funderAvatarURL} />
                <Text>{funderUsername}</Text>
              </>
            )}
          </HStack>
        </VStack>

        {referenceCode ? (
          <>
            <Divider className={styles.divider} orientation="horizontal" />

            <Stack direction="column" spacing="2">
              <Text textTransform={'uppercase'} color="brand.neutral600">
                Reference Code
              </Text>

              <Text>{referenceCode}</Text>
            </Stack>
          </>
        ) : null}
      </VStack>
    </Box>
  );
};
