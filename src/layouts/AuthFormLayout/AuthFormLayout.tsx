import React, { ReactNode } from 'react';
import { Button } from '../../components/UI/Button/Button';
import s from './AuthFormLayout.module.scss';

type Props = {
  children: ReactNode;
  title: string;
  onSubmit: () => void;
  btnText: string;
  bottomText?: string;
  onBottomText?: () => void;
};

export function AuthFormLayout({
  children,
  title,
  onSubmit,
  btnText,
  bottomText,
  onBottomText,
}: Props) {
  return (
    <div className={s.formlayout}>
      <h2 className={s.formlayout_title}>{title}</h2>
      <div className={s.formlayout_content}>{children}</div>
      <div className={s.formlayout_bottom}>
        <Button
          type="primary"
          onClick={onSubmit}
          styles={{
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '13px',
            lineHeight: '8px',
            padding: '17px 26px',
            borderRadius: '4px',
          }}
        >
          {btnText}
        </Button>

        {bottomText && (
          <p
            role="presentation"
            className={s.formlayout_bottomtext}
            onClick={onBottomText}
          >
            {bottomText}
          </p>
        )}
      </div>
    </div>
  );
}
