import React, { CSSProperties, ReactNode } from 'react';
import s from './PageLayout.module.scss';

type Props = {
  title: string;
  children: ReactNode;
  styles?: CSSProperties;
};

export function PageLayout({ children, title, styles }: Props) {
  return (
    <div className={s.page_container} style={styles}>
      <h3 className={s.page_title}>{title}</h3>
      <div className={s.page_content}>{children}</div>
    </div>
  );
}
