import React, { ReactNode } from 'react';
import s from './CardLayout.module.scss';

type Props = {
  children: ReactNode;
  title: string;
  description?: string;
};

export function CardLayout({ children, title, description }: Props) {
  return (
    <div className={s.card_container}>
      <h4 className={s.card_title}>{title}</h4>
      {description && <p className={s.card_descirpiton}>{description}</p>}

      <div className={s.card_content}>{children}</div>
    </div>
  );
}
