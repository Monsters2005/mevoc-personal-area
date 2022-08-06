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

  console.log('isError', isError);
  console.log('isAuth', isAuth);

  useEffect(() => {
    if (isError || !isAuth) {
      navigate('/signin');
    }
  }, []);

  if (isLoading) return null;

  return (
    <div>
      {isLoading ? <Loader styles={centeredLoader} size={150} /> : children}
    </div>
  );
}
