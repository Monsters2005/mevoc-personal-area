import React, { CSSProperties, ReactNode, useRef } from 'react';
import { Transition } from 'react-transition-group';

export type StateParam = {
  opacity: number;
  zIndex?: number;
  pointerEvents?: string;
};

type State = Record<string, StateParam>;

type Props = {
  children: ReactNode;
  inState: boolean;
  duration?: number;
  styles?: CSSProperties;
  transitionStyles?: State;
};

const defaultTransitionStyles: State = {
  entering: { opacity: 1, zIndex: 100 },
  entered: { opacity: 1, zIndex: 100 },
  exiting: { opacity: 0, zIndex: -1000, pointerEvents: 'none' as const },
  exited: { opacity: 0, zIndex: -1000, pointerEvents: 'none' as const },
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
    zIndex: -10,
  };

  const nodeRef = useRef(null);

  return (
    <Transition in={inState} timeout={duration} nodeRef={nodeRef}>
      {(state: keyof State) => (
        <div
          ref={nodeRef}
          style={
            {
              ...styles,
              ...defaultStyle,
              ...transitionStyles[state],
            } as CSSProperties
          }
        >
          {children}
        </div>
      )}
    </Transition>
  );
}
