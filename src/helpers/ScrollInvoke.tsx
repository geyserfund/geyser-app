import React, { useEffect } from 'react';
import { useListenerState } from '../hooks';

interface ScrollInvokeProps {
  elementId: string;
  onScrollEnd: () => Promise<void>;
  isLoading?: React.MutableRefObject<boolean>;
}

const ThresholdHeightBeforeScrollEnd = 300;

export const ScrollInvoke = ({
  elementId,
  onScrollEnd,
  isLoading,
}: ScrollInvokeProps) => {
  const [loading, setLoading] = useListenerState(false);
  const [prevValue, setPrevValue] = useListenerState(false);

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
    if ((isLoading && isLoading.current) || loading.current) {
      return;
    }

    setLoading(true);

    const isInView =
      this.scrollHeight - this.scrollTop - this.clientHeight <=
      ThresholdHeightBeforeScrollEnd;
    if (isInView && prevValue.current !== isInView) {
      await onScrollEnd();
    }

    setPrevValue(isInView);
    setLoading(false);
  }

  return (
    <div id={`landing-page-contributions-list-refetch-${elementId}`}></div>
  );
};
