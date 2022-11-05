import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarCard } from '../Card/Card';
import s from './Navigation.module.scss';
import { Page } from '../Sidebar/types';
import { getLocationName } from '../../../utils/components/getLocationName';

type Props = {
  pages: Page[];
};

export function SidebarNavigation({ pages }: Props) {
  const { pathname } = useLocation();

  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const locationName = getLocationName(pathname);
    setActive(locationName);
  }, [pathname]);

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
