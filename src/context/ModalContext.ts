import React, { createContext, ReactNode, useContext } from 'react';

type ModalType = {
  currentModal: null | ReactNode;
  setCurrentModal: (item: ReactNode | null) => void;
};

const defaultState: ModalType = {
  currentModal: null,
  setCurrentModal: () => null,
};

export const ModalContext = createContext(defaultState);

export const useModal = () => useContext(ModalContext);
