import React, { useEffect } from 'react';

interface ScrollInvokeProps {
  onScrollEnd: () => void;
  isLoading?: boolean;
}

export const ScrollInvoke = ({ onScrollEnd, isLoading }: ScrollInvokeProps) => {
  useEffect(() => {
    const element = document.getElementById('app-route-content-root');
    if (element) {
      element.addEventListener('scroll', () => {
        const isInView = isInViewport(
          'landing-page-contributions-list-refetch-dummy',
        );
        if (isInView && !isLoading) {
          onScrollEnd();
        }
      });

      return () => {
        element.removeEventListener('scroll', () => {
          const isInView = isInViewport(
            'landing-page-contributions-list-refetch-dummy',
          );
          if (isInView && !isLoading) {
            onScrollEnd();
          }
        });
      };
    }
  }, []);

  const isInViewport = (id: string) => {
    const el = document.getElementById(id);

    if (!el) {
      return false;
    }

    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  return <div id="landing-page-contributions-list-refetch-dummy" />;
};
