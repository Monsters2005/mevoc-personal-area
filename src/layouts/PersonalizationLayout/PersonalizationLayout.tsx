import React, { ReactNode, useEffect } from 'react';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import { onThemeSelect } from '../../utils/components/setTheme';

export default function PersonalizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: user } = useGetCurrentUserQuery();

  useEffect(() => {
    onThemeSelect(user?.theme || 'dark');
  }, [user?.theme]);

  console.log(user);

  return <div>{children}</div>;
}
