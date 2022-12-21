import React, { useRef, useState } from 'react';

export const useListenerState = <Type,>(
  initialValue: Type,
): [React.MutableRefObject<Type>, (value: Type) => void] => {
  const [_state, _setState] = useState(initialValue);
  const state = useRef(_state);
  const setState = (value: Type) => {
    state.current = value;
    _setState(value);
  };

  return [state, setState];
};
