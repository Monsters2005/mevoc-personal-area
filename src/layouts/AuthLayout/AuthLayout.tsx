import React, { PropsWithChildren, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Loader } from '../../components/UI/Loader/Loader';
import { centeredLoader } from '../../shared/styles/loader-variations';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import { selectIsAuth } from '../../store/selectors/auth';
import s from './AuthLayout.module.scss';

export function AuthLayout({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  const { isLoading, isError } = useGetCurrentUserQuery();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth, isError]);

  return (
    <div className={s.authlayout_container}>
      {isLoading ? <Loader styles={centeredLoader} size={150} /> : children}
    </div>
  );
}
