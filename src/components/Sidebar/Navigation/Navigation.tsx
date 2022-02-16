import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarCard } from '../Card/Card';
import s from './Navigation.module.scss';

type Props = {
  pages: {
    icon: string;
    name: string;
    path: string;
    id: number;
  }[];
};

export function SidebarNavigation({ pages }: Props) {
  const [active, setActive] = useState(pages[0].path);

  return (
    <div className={s.navigation_container}>
      <div className={s.navigation_content}>
        {pages.map(item => (
          <SidebarCard
            key={item.id}
            item={item}
            onClick={() => setActive(item.path)}
            active={active}
          />
        ))}
      </div>
    </div>
  );
}
