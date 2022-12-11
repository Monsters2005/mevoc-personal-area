import React, { PropsWithChildren, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Loader } from '../../components/UI/Loader/Loader';
import { centeredLoader } from '../../shared/styles/loader-variations';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import { selectIsAuth } from '../../store/selectors/auth';

export function PrivateLayout({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  if (isLoading) return <Loader styles={centeredLoader} size={150} />;

  if (isError || !isAuth) {
    navigate('/signin');
    return null;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
