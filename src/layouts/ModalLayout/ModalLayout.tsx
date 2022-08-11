import React, { CSSProperties, ReactNode } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { UISvgSelector } from '../../components/UI/UISvgSelector';
import {
  primaryModal,
  smallModal,
} from '../../shared/styles/button-variations';
import s from './ModalLayout.module.scss';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
  btnText: string;
  style?: CSSProperties;
  onClick: () => void;
};

export default function ModalLayout({
  children,
  title,
  description,
  btnText,
  onClick,
  style,
}: Props) {
  const handleCloseModal = () => null;

  return (
    <div className={s.modal_container} style={style}>
      <div className={s.modal_header}>
        <div className={s.modal_content}>
          <h2 className={s.modal_title}>{title}</h2>
          <p className={s.modal_description}>{description}</p>
        </div>
        <Button type="small" styles={smallModal} onClick={handleCloseModal}>
          <UISvgSelector id="close-circle" />
        </Button>
      </div>
      <div className={s.modal_children}>{children}</div>

      <Button styles={primaryModal} onClick={onClick} type="primary">
        {btnText}
      </Button>
    </div>
  );
}
