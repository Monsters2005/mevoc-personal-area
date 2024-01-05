import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInDto } from '../../@types/dto/auth/signin.dto';
import { authApi } from '../api/authApi';
import { cleanLogin } from '../slices/loginSlice';
import { EventTypes, eventBus } from '../../packages/EventBus';
import { SUCCESS_LOGIN } from '../../constants/notificationMessages';
import { NotificationType } from '../../@types/entities/Notification';
import { CustomError } from '../../@types/entities/ErrorObject';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { Tokens } from '../../@types/dto/auth/tokens.dto';
import { Path } from '../../constants/routes';
import { LSKeys } from '../../constants/LSKeys';

export const loginHandler = createAsyncThunk(
  'auth/login',
  async (
    payload: {
      signin: SignInDto;
      t: (str: string) => string;
    },
    { dispatch }
  ) => {
    try {
      await dispatch(authApi.endpoints.signin.initiate(payload.signin))
        .unwrap()
        .then((result: unknown) => {
          const tokens = result as Tokens;
          window.localStorage.setItem('accessToken', tokens.accessToken);
          dispatch(cleanLogin());
        });
      eventBus.emit(EventTypes.notification, {
        message: SUCCESS_LOGIN,
        title: payload.t('success'),
        type: NotificationType.SUCCESS,
      });

      /* window.location.href = `/${Path.HOME}`; */
      localStorage.setItem(LSKeys.UI_LANGUAGE, 'English');
      eventBus.emit(EventTypes.setLang, 'English');
    } catch (e: unknown) {
      eventBus.emit(EventTypes.notification, {
        message: (e as CustomError).data.message,
        title: payload.t('error'),
        type: NotificationType.DANGER,
      });
    }
  }
);
