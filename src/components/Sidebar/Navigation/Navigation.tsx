import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to={page.path} key={page.key}>
            <SidebarCard
              page={page}
              onClick={pageHandler(page)}
              active={active}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
