import { Box, HTMLChakraProps, Text, VStack } from '@chakra-ui/react';

type Props = HTMLChakraProps<'div'> & {
  primaryText: string | React.ReactElement;
  secondaryText: string | React.ReactElement;
};

export const WalletConnectionOptionInfoBox = ({
  primaryText,
  secondaryText,
  children,
}: Props) => {
  return (
    <Box
      padding={'16px'}
      backgroundColor={'brand.neutral100'}
      display="flex"
      flexDirection={'column'}
      alignItems="flex-start"
      textColor={'brand.gray500'}
      fontSize={'10px'}
      borderRadius={'md'}
    >
      <VStack spacing={4} alignItems="flex-start">
        <Text fontWeight={'bold'}>{primaryText}</Text>
        <Text fontWeight={'normal'}>{secondaryText}</Text>

        {children}
      </VStack>
    </Box>
  );
};
