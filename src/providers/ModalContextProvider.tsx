import React, { ReactNode, useMemo, useState } from 'react';
import { ModalContext, useModal } from '../context/ModalContext';
import { TransitionWrapper } from '../layouts/Transition/Transition';

type Props = {
  children: ReactNode;
};

export default function ModalProvider({ children }: Props) {
  const { currentModal: data } = useModal();

  const [currentModal, setCurrentModal] = useState<ReactNode | null>(data);

  const stateMemo = useMemo(
    () => ({ currentModal, setCurrentModal }),
    [currentModal]
  );

  return (
    <ModalContext.Provider value={stateMemo}>
      {/* <TransitionWrapper inState={!!currentModal}> */}
      {children}
      {/* </TransitionWrapper> */}
    </ModalContext.Provider>
  );
}
