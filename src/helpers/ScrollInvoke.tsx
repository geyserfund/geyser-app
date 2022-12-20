import React, { useEffect } from 'react';

interface ScrollInvokeProps {
  elementId: string;
  onScrollEnd: () => Promise<void>;
  isLoading?: boolean;
}

let loading = false;

const ThresholdHeightBeforeScrollEnd = 80;

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
          element.scrollHeight - element.scrollTop - element.clientHeight <=
          ThresholdHeightBeforeScrollEnd;
        if (isInView) {
          await onScrollEnd();
        }

        loading = false;
      });
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', async () => {
          if (isLoading || loading) {
            return;
          }

          loading = true;

          const isInView =
            element.scrollHeight - element.scrollTop - element.clientHeight <=
            ThresholdHeightBeforeScrollEnd;
          if (isInView) {
            await onScrollEnd();
          }

          loading = false;
        });
      }
    };
  }, []);

  return (
    <div id={`landing-page-contributions-list-refetch-${elementId}`}>
      {/* <Divider /> */}
      {/* {isLoading && <Loader />} */}
    </div>
  );
};
