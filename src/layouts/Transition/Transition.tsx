import React, { CSSProperties, ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';

export type StateParam = {
  opacity: number;
  zIndex?: number;
};

type State = Record<string, StateParam>;

type Props = {
  children: ReactNode;
  inState: boolean;
  duration?: number;
  styles?: CSSProperties;
  transitionStyles?: State;
};

const defaultTransitionStyles = {
  entering: { opacity: 1, zIndex: 100 },
  entered: { opacity: 1, zIndex: 100 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, zIndex: -1000 },
};

export function TransitionWrapper({
  children,
  inState,
  duration = 300,
  styles,
  transitionStyles = defaultTransitionStyles,
}: Props) {
  const defaultStyle = {
    transition: `all ${duration}ms ease-in-out `,
    opacity: 0,
    zIndex: -1,
  };

  const nodeRef = useRef(null);

  return (
    <Transition in={inState} timeout={duration} nodeRef={nodeRef}>
      {(state: keyof State) => (
        <div
          ref={nodeRef}
          style={{
            ...styles,
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}
