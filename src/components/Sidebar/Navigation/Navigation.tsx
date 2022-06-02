import React, { useState } from 'react';
import { SidebarCard } from '../Card/Card';
import s from './Navigation.module.scss';
import { Page } from '../Sidebar/types';

type Props = {
  pages: Page[];
  defaultActive: string | number | symbol;
};

export function SidebarNavigation({ pages, defaultActive }: Props) {
  const [active, setActive] = useState(defaultActive);

  function pageHandler(page: Page) {
    return () => setActive(page.key);
  }

  return (
    <div className={s.navigation_container}>
      <div className={s.navigation_content}>
        {pages.map(page => (
          <SidebarCard
            key={page.key}
            page={page}
            onClick={pageHandler(page)}
            active={active}
          />
        ))}
      </div>
    </div>
  );
}
