import { Image, Text, VStack } from '@chakra-ui/react';

export const GrantsMaintenancePage = () => {
  return (
    <VStack
      display={'flex'}
      justifyItems={'center'}
      alignItems={'center'}
      paddingTop={'25%'}
      paddingRight={'5%'}
      paddingLeft={'5%'}
      paddingBottom={'5%'}
    >
      <Image
        src="https://storage.googleapis.com/geyser-maintenance-page/assets/maintenance-bot-icon.png"
        height="200"
        width="190"
      ></Image>
      <Text align={'center'}>Geyser Grants are getting an uplift.</Text>
      <Text align={'center'}>
        Please follow us on{' '}
        <a
          href="https://twitter.com/geyserfund"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>{' '}
        to be notified on when they are back online.
      </Text>
    </VStack>
  );
};
