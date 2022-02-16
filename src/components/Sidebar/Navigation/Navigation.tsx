import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarCard } from '../Card/Card';
import s from './Navigation.module.scss';

export function SidebarNavigation() {
  const [active, setActive] = useState('dashboard');

  const pages = [
    {
      icon: 'house',
      name: 'Dashboard',
      path: 'dashboard',
      id: 1,
    },
    {
      icon: 'list',
      name: 'Lists Management',
      path: 'lists-management',
      id: 2,
    },
    {
      icon: 'user',
      name: 'User Profile',
      path: 'user-profile',
      id: 3,
    },
    {
      icon: 'settings',
      name: 'Settings',
      path: 'settings',
      id: 4,
    },
  ];

  return (
    <div className={s.navigation_container}>
      <div className={s.navigation_content}>
        {pages.map(item => (
          // <Link to={item.path}>
          <SidebarCard
            key={item.id}
            item={item}
            onClick={() => setActive(item.path)}
            active={active}
          />
          // </Link>
        ))}
      </div>
    </div>
  );
}
