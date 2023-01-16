import { Box, BoxProps } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useListenerState } from '../../hooks';

interface StickToTopProps extends BoxProps {
  id: string;
  scrollContainerId?: string;
  offset?: string;
  disable?: boolean;
  _onStick?: BoxProps;
}

export const StickToTop = ({
  id,
  scrollContainerId,
  offset,
  disable,
  children,
  _onStick,
  ...rest
}: StickToTopProps) => {
  const [stick, setStick] = useListenerState(false);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (disable) {
      return;
    }

    if (scrollContainerId) {
      const element = document.getElementById(scrollContainerId);
      if (element) {
        element.addEventListener('scroll', handleScroll);
      }

      return () => {
        if (element) {
          element.removeEventListener('scroll', handleScroll);
        }
      };
    }

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrollContainerId, disable]);

  async function handleScroll(this: HTMLElement) {
    let scrollTop = 0;

    if (scrollContainerId) {
      scrollTop = this.scrollTop;
    } else {
      scrollTop = document.scrollingElement?.scrollTop || 0;
    }

    let currentElement;

    if (stick.current) {
      currentElement = document.getElementById(palceholderId);
    } else {
      currentElement = document.getElementById(id);
    }

    if (currentElement) {
      if (
        currentElement.offsetTop -
          currentElement.scrollTop +
          currentElement.clientTop -
          scrollTop <=
        0
      ) {
        setStick(true);
      } else {
        setStick(false);
      }
    }
  }

  const onStick = stick.current ? _onStick : {};

  const palceholderId = `${id}-placeholder`;

  return (
    <>
      <Box
        id={id}
        ref={containerRef}
        backgroundColor="brand.bgWhite"
        position={stick.current ? 'fixed' : 'static'}
        top="65px"
        zIndex={10}
        {...rest}
        {...onStick}
      >
        {children}
      </Box>
      {stick.current && (
        <Box id={palceholderId} height={containerRef.current?.offsetHeight} />
      )}
    </>
  );
};
