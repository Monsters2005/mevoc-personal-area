import React, { CSSProperties, ReactNode } from 'react';
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
  entering: { opacity: 1, zIndex: 1 },
  entered: { opacity: 1, zIndex: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, zIndex: -100 },
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

  return (
    <Transition in={!inState} timeout={duration}>
      {(state: keyof State) => (
        <div
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
