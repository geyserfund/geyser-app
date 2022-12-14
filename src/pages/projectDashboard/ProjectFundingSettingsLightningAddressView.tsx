import { Container, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TextInputBox } from '../../components/ui/TextInputBox';

type Props = {
  lightningAddress: string;
};

// TODO: This view should eventually support updates.

export const ProjectFundingSettingsLightningAddressView = ({
  lightningAddress,
}: Props) => {
  return (
    <Container maxW="md">
      <VStack alignItems={'flex-start'} spacing={2.5}>
        <Text color="brand.neutral700">Where are all your funds going to?</Text>

        <VStack spacing={1} alignItems={'flex-start'} width={'full'}>
          <Text fontSize="10px" fontWeight={400}>
            Lightning Address
          </Text>

          <TextInputBox
            name="lightning-address"
            type={'email'}
            placeholder={'Lightning Address'}
            value={lightningAddress}
            isDisabled
            _disabled={{
              opacity: 1,
            }}
          />
        </VStack>

        <Text fontSize="10px" color="brand.neutral700" fontWeight={400}>
          If you want to change how you receive your funds reach out to
          hello@geyser.fund. We are not currently enabling editing of this
          information for security reasons.
        </Text>
      </VStack>
    </Container>
  );
};
