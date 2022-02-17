import React, { ReactNode } from 'react';
import s from './PageLayout.module.scss';

type Props = {
  title: string;
  children: ReactNode;
};

export function PageLayout({ children, title }: Props) {
  return (
    <div className={s.page_container}>
      <h3 className={s.page_title}>{title}</h3>
      <div className={s.page_content}>{children}</div>
    </div>
  );
}
