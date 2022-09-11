import React, { ReactNode, useMemo, useState } from 'react';
import { ModalContext, useModal } from '../context/ModalContext';

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
    <ModalContext.Provider value={stateMemo}>{children}</ModalContext.Provider>
  );
}
