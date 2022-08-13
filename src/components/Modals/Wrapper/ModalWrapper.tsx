import React, { ReactNode } from 'react';
import s from './ModalWrapper.module.scss';

type Props = {
  children: ReactNode;
};

export function ModalWrapper({ children }: Props) {
  return <div className={s.wrapper_container}>{children}</div>;
}
