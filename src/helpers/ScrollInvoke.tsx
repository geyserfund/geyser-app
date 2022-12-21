import React, { useEffect } from 'react';

interface ScrollInvokeProps {
  elementId: string;
  onScrollEnd: () => Promise<void>;
  isLoading?: React.MutableRefObject<boolean>;
}

let loading = false;

const ThresholdHeightBeforeScrollEnd = 300;

export const ScrollInvoke = ({
  elementId,
  onScrollEnd,
  isLoading,
}: ScrollInvokeProps) => {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  async function handleScroll(this: HTMLElement) {
    if ((isLoading && isLoading.current) || loading) {
      return;
    }

    loading = true;

    const isInView =
      this.scrollHeight - this.scrollTop - this.clientHeight <=
      ThresholdHeightBeforeScrollEnd;
    if (isInView) {
      await onScrollEnd();
    }

    loading = false;
  }

  return (
    <div id={`landing-page-contributions-list-refetch-${elementId}`}></div>
  );
};
