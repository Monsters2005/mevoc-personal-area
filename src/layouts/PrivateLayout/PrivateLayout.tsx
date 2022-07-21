import React, { PropsWithChildren, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import { selectIsAuth } from '../../store/selectors/auth';

export function PrivateLayout({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError || !isAuth) {
      navigate('/signin');
    }
  }, []);

  if (isLoading) return null;

  return <div>{children}</div>;
}
