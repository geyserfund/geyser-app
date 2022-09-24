import { useToast, UseToastOptions } from '@chakra-ui/react';
// "subtle" | "solid" | "left-accent" | "top-accent"

export const useNotification = (options?: UseToastOptions | undefined) => {
  const toast = useToast({
    duration: 3000,
    isClosable: true,
    position: 'top-right',
    variant: 'left-accent',
    containerStyle: {
      marginTop: 65,
    },
    ...options,
  });
  return { toast };
};
