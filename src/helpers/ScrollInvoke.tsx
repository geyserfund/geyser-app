import React, { useEffect } from 'react';

interface ScrollInvokeProps {
  elementId: string;
  onScrollEnd: () => void;
  isLoading?: boolean;
}

export const ScrollInvoke = ({
  elementId,
  onScrollEnd,
  isLoading,
}: ScrollInvokeProps) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('scroll', () => {
        if (isLoading) {
          return;
        }

        const isInView =
          element.scrollHeight - element.scrollTop - element.clientHeight <= 40;
        if (isInView) {
          onScrollEnd();
        }
      });

      return () => {
        element.removeEventListener('scroll', () => {
          if (isLoading) {
            return;
          }

          const isInView =
            element.scrollHeight - element.scrollTop - element.clientHeight <=
            40;
          if (isInView) {
            onScrollEnd();
          }
        });
      };
    }
  }, []);

  return <div id={`landing-page-contributions-list-refetch-${elementId}`} />;
};
