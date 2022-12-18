import { Divider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Loader from '../components/ui/Loader';

interface ScrollInvokeProps {
  elementId: string;
  onScrollEnd: () => Promise<void>;
  isLoading?: boolean;
}

let loading = false;

export const ScrollInvoke = ({
  elementId,
  onScrollEnd,
  isLoading,
}: ScrollInvokeProps) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('scroll', async () => {
        if (isLoading || loading) {
          return;
        }

        loading = true;

        const isInView =
          element.scrollHeight - element.scrollTop - element.clientHeight <= 40;
        if (isInView) {
          await onScrollEnd();
        }

        loading = false;
      });

      return () => {
        element.removeEventListener('scroll', async () => {
          if (isLoading || loading) {
            return;
          }

          loading = true;

          const isInView =
            element.scrollHeight - element.scrollTop - element.clientHeight <=
            40;
          if (isInView) {
            await onScrollEnd();
          }

          loading = false;
        });
      };
    }
  }, []);

  return (
    <div id={`landing-page-contributions-list-refetch-${elementId}`}>
      <Divider />
      {isLoading && <Loader />}
    </div>
  );
};
