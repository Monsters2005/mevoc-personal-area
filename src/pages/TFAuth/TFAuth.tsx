import React, {
  ErrorInfo,
  FormEvent,
  KeyboardEvent,
  Ref,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { useSigninMutation } from '../../store/api/authApi';
import s from './TFAuth.module.scss';
import notifTransl from '../Notifications.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import Cookies from '../../components/Auth/Cookies/Cookies';
import { Logo } from '../../components/UI/Logo/Logo';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { languages } from '../../constants/kit/languages';
import { Option } from '../../components/UI/DropDown/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LSKeys } from '../../constants/LSKeys';
import { Button } from '../../components/UI/Button/Button';
import { RootState } from '../../store/store';
import { LoginState } from '../../store/slices/loginSlice';
import { loginHandler } from '../../store/thunks/auth';
import { useDispatch } from '../../store/assets/hooks';
import { AuthState } from '../../store/slices/authSlice';
import { Path } from '../../constants/routes';

export function TFAuthPage() {
  const loginState = useSelector<RootState, LoginState>(state => state.login);
  const auth = useSelector<RootState, AuthState>(state => state.auth);
  const navigate = useNavigate();
  const [signIn] = useSigninMutation();
  const langOption = languages[0];
  const [lang, setLang] = useState<Option | undefined>(langOption);
  const { t } = useLocalTranslation(notifTransl);
  const [_, setLangDef] = useLocalStorage<string>(
    LSKeys.UI_LANGUAGE,
    'English'
  );
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const inputRefs = Array.from({ length: 6 }, () => {
    return useRef<HTMLInputElement>(null);
  });

  const getCurrentCode = () =>
    // eslint-disable-next-line
    inputRefs
      .map(input => input.current?.value)
      .reduce((acc, cur) => `${acc}${cur}`, '');

  const onSubmit = () => {
    dispatch(
      loginHandler({
        signin: {
          email: loginState.username || '',
          password: loginState.password || '',
          token: getCurrentCode(),
        },
        t,
      })
    ).then(() => {
      window.history.replaceState({}, document.title);
      navigate(`/${Path.HOME}`, { replace: true });
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // eslint-disable-next-line
    // @ts-ignore
    if (e.key === 'Backspace' && e.target.value === '') {
      if (index > 0) {
        if (inputRefs[index - 1].current) {
          inputRefs[index - 1].current?.focus();
        }
      }
    }
  };

  const handleInput = (e: FormEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;

    if (/^\d{6}$/.test(inputValue)) {
      for (let i = 0; i < inputRefs.length; i++) {
        if (inputRefs[i]?.current) {
          // eslint-disable-next-line
          // @ts-ignore
          inputRefs[i].current.value = inputValue[i];
        }
      }
    }

    const lastInputBox = index === inputRefs.length - 1;
    if (!lastInputBox) {
      if (inputRefs[index + 1]?.current) {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  return (
    <div className={s.signin_container}>
      <span className="logo">
        <Logo />
      </span>
      <span className="language-select">
        <Dropdown
          listTitle="Languages"
          options={languages}
          selectedItem={lang}
          setSelectedItem={(item: Option | undefined) => {
            setLang(item);
            setLangDef(item?.value);
            eventBus.emit(EventTypes.setLang, item?.value || 'English');
          }}
          allowNoneSelected={false}
          styles={{ width: '200px' }}
          listStyles={{ width: '300px', left: '-6.2rem' }}
        />
      </span>
      <div className={s.formlayout}>
        <h2 className={s.formlayout_title}>Two-factor Authentication</h2>
        <div className={s.formlayout_content}>
          Put the code from the authentication app that you are using.
        </div>

        <fieldset className={s.formlayout_number}>
          {inputRefs.map((ref, i) => {
            const key = `code-input-${i}`;
            return (
              <input
                key={key}
                ref={ref}
                name="code"
                className={s.formlayout_number_item}
                required
                onKeyDown={e => handleKeyDown(e, i)}
                onInput={e => handleInput(e, i)}
              />
            );
          })}
        </fieldset>

        <div className={s.formlayout_bottom}>
          <Button
            type="primary"
            onClick={onSubmit}
            styles={{
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '13px',
              lineHeight: '8px',
              padding: '17px 26px',
              borderRadius: '4px',
            }}
          >
            submit
          </Button>
        </div>
      </div>
      <Cookies />
    </div>
  );
}
