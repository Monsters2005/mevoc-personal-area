import React, { ReactNode } from 'react';
import { Button } from '../../../UI/Button/Button';
import s from './SavableSection.module.scss';

type Props = {
  children: ReactNode;
  title: string;
  onSave: () => void;
};

export function SavableSection({ children, title, onSave }: Props) {
  return (
    <div className={s.section_container}>
      <h2 className={s.section_title}>{title}</h2>
      <div className={s.section_content}>{children}</div>
      <Button
        type="primary"
        onClick={onSave}
        styles={{
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '18px',
          padding: '7px 18px',
          width: 'fit-content',
        }}
      >
        Save
      </Button>
    </div>
  );
}
