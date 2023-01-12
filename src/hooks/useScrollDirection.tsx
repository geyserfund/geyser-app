import { useEffect, useState } from 'react';
import { useListenerState } from './useListenerState';

interface UseScrollDirectionProps {
  elementId: string;
  loading?: boolean;
  initialValue?: boolean;
  mobileView?: string;
}

export const useScrollDirection = ({
  elementId,
  loading,
  initialValue,
  mobileView,
}: UseScrollDirectionProps) => {
  const [prevValue, setPrevValue] = useListenerState(0);
  const [value, setValue] = useListenerState(0);

  const [isScrollingUp, setIsScrollingUp] = useState(initialValue || false);

  useEffect(() => {
    if (loading) {
      return;
    }

    const element = document.getElementById(elementId);
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading, mobileView]);

  async function handleScroll(this: HTMLElement) {
    if (value.current !== 0) {
      if (prevValue.current > value.current && value.current > this.scrollTop) {
        setIsScrollingUp(true);
      } else {
        setIsScrollingUp(false);
      }
    }

    setPrevValue(value.current);
    setValue(this.scrollTop);
  }

  return isScrollingUp;
};
