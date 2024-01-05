import React, { ReactNode, useEffect } from 'react';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import { onColorSelect, onThemeSelect } from '../../utils/components/setTheme';
import { defaultColorValues } from '../../constants/kit/themes';

export default function PersonalizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: user } = useGetCurrentUserQuery();

  useEffect(() => {
    onThemeSelect(user?.theme || defaultColorValues.theme);
    onColorSelect(user?.accentColor || defaultColorValues.accentColor);
  }, [user?.theme, user?.accentColor]);

  return <div>{children}</div>;
}
