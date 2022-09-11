import React, { ReactNode } from 'react';
import { useModal } from '../../context/ModalContext';
import { ModalWrapper } from './Wrapper/ModalWrapper';

export default function Modals() {
  const { currentModal } = useModal();

  return currentModal ? <ModalWrapper>{currentModal}</ModalWrapper> : <div />;
}
