import React, { ReactNode, useState } from 'react';
import { Button } from '../../components/UI/Button/Button';
import { Checkbox } from '../../components/UI/Checkbox/Checkbox';
import { UISvgSelector } from '../../components/UI/UISvgSelector';
import s from './ConfirmationAlert.module.scss';

type Props = {
  title: string;
  text: string;
  icon: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  onDontShow: () => void;
};

export default function ConfirmationAlert({
  title,
  text,
  icon,
  onClose,
  onConfirm,
  onDontShow,
}: Props) {
  const [dontShow, setDontShow] = useState(false);

  return (
    <div className={s.confirmation_container}>
      <Button
        type="small"
        onClick={() => onClose()}
        styles={{
          right: '15px',
          top: '15px',
          position: 'absolute',
        }}
      >
        <UISvgSelector id="close-circle" />
      </Button>
      <div className={s.confirmation_content}>
        <span className={s.confirmation_icon}>{icon}</span>
        <div className={s.confirmation_info}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      <div className={s.confirmation_footer}>
        <span>
          <Checkbox onChange={setDontShow} defaultChecked={dontShow} />
          Don’t show again
        </span>
        <Button
          type="primary"
          onClick={() => {
            if (dontShow) onDontShow();
            onConfirm();
          }}
          styles={{
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '1px',
            padding: '8px 9px',
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
