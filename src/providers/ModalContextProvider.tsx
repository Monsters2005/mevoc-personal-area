import React, { ReactNode, useMemo, useState } from 'react';
import { ModalContext, useModal } from '../context/ModalContext';

type Props = {
  children: ReactNode;
};

export default function ModalProvider({ children }: Props) {
  const {
    states: { ...state },
  } = useModal();

  const [states, setModalStates] = useState<Record<string, boolean>>({
    ...state,
  });

  const stateMemo = useMemo(() => ({ states, setModalStates }), [states]);

  return (
    <ModalContext.Provider value={stateMemo}>{children}</ModalContext.Provider>
  );
}
