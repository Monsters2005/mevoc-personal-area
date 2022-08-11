import React, { PropsWithChildren, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Loader } from '../../components/UI/Loader/Loader';
import { centeredLoader } from '../../shared/styles/loader-variations';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import { RootState } from '../../store/rootReducer';
import { selectIsAuth } from '../../store/selectors/auth';

export function PrivateLayout({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const isAuth = useSelector(selectIsAuth);
  const state = useSelector((u: RootState) => u.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError || !isAuth) {
      navigate('/signin');
    }
  }, [isAuth, isError]);

  return (
    <div>
      {isLoading ? <Loader styles={centeredLoader} size={150} /> : children}
    </div>
  );
}
