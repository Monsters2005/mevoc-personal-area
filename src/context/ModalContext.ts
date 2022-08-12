import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

type ModalType = {
  states: Record<string, boolean>;
  setModalStates: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const defaultState: ModalType = {
  states: {
    addWord: false,
    editWord: false,
    addList: false,
    wordpackPreview: false,
  },
  setModalStates: () => null,
};

export const ModalContext = createContext(defaultState);

export const useModal = () => useContext(ModalContext);
