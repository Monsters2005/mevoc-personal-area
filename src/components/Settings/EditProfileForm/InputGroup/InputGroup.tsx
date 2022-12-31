import React, { useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { merge } from 'lodash';
import moment from 'moment';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { SettignsProfileFormDto } from '../../../../@types/dto/settings/profileform.dto';
import { User } from '../../../../@types/entities/User';
import { countries } from '../../../../constants/countries';
import { languages } from '../../../../constants/languages';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import {
  btnInputSettings,
  primarySmallLists,
  settingsActionBtn,
} from '../../../../shared/styles/button-variations';
import { inputSettings } from '../../../../shared/styles/input-variations';
import { HookFormDatePicker } from '../../../HookForm/HookFormDatePicker';
import HookFormInput from '../../../HookForm/HookFormInput';
import HookFormSelect from '../../../HookForm/HookFormSelect';
import { Button } from '../../../UI/Button/Button';
import { SettingsSvgSelector } from '../../SettingsSvgSelector';
import s from './InputGroup.module.scss';
import schema from './validation';
import settings from '../../../../pages/Settings/Settings.i18n.json';
import common from '../../../UI/Common.i18n.json';
import { dropdownStyles } from '../../../../shared/styles/dropdown-variations';

type Props = {
  user: User;
  onSave: SubmitHandler<SettignsProfileFormDto>;
  onVerifyEmail: (email: string) => void;
};

export function SettingsInputGroup({
  user: {
    username,
    firstName,
    lastName,
    dob,
    email,
    learningLang,
    nativeLang,
    phoneNumber,
    location,
    confirmed,
  },
  onVerifyEmail,
  onSave,
}: Props) {
  const { t } = useLocalTranslation(merge(settings, common));

  const values = useForm<SettignsProfileFormDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: SettignsProfileFormDto) => {
    onSave(data);
  };

  const revertValues = () => {
    values.reset({
      username,
      firstName,
      lastName,
      email,
      learningLang,
      nativeLang,
      phoneNumber,
      location,
    });
  };

  const isSmallScreen = useMediaQuery({ maxWidth: '1100px' });

  return (
    <FormProvider {...values}>
      <div className={s.inputgroup_container}>
        <form className={s.inputgroup_form} onSubmit={e => e.preventDefault()}>
          <div className={s.inputgroup_section}>
            <div className={s.inputgroup_doublerow}>
              <HookFormInput
                name="firstName"
                defaultValue={firstName}
                label={t('firstName')}
                styles={{
                  ...inputSettings,
                  width: isSmallScreen ? '100%' : '300px',
                  textTransform: 'capitalize',
                }}
              />
              <HookFormInput
                name="lastName"
                defaultValue={lastName}
                label={t('lastName')}
                styles={{
                  ...inputSettings,
                  width: isSmallScreen ? '100%' : '300px',
                  textTransform: 'capitalize',
                }}
              />
            </div>
            <div className={s.inputgroup_doublerow}>
              <HookFormInput
                name="username"
                defaultValue={username}
                label={t('username')}
                styles={{
                  ...inputSettings,
                  width: isSmallScreen ? '100%' : '300px',
                }}
              />
              <HookFormDatePicker
                label="Date Of Birth"
                defaultDate={moment(new Date())}
                name="dob"
              />
            </div>
          </div>
          <div className={s.inputgroup_section}>
            <div className={s.inputgroup_singlerow}>
              <HookFormInput
                name="email"
                defaultValue={email}
                label={t('emailAdress')}
                styles={{ ...inputSettings, width: '100%' }}
              >
                {confirmed ? (
                  <span className={s.inputgroup_addcontent}>
                    <SettingsSvgSelector id="confirm" />
                    <p>Email Verified</p>
                  </span>
                ) : (
                  <Button
                    styles={btnInputSettings}
                    type="primary"
                    onClick={() => onVerifyEmail(email)}
                  >
                    {t('verify')}
                  </Button>
                )}
              </HookFormInput>
            </div>
            <div className={s.inputgroup_doublerow}>
              <HookFormInput
                name="phoneNumber"
                defaultValue={phoneNumber}
                label={t('phoneNumber')}
                styles={{
                  ...inputSettings,
                  width: isSmallScreen ? '100%' : '300px',
                }}
              />
              <HookFormSelect
                options={countries}
                defaultSelected={countries[87]}
                label={t('location')}
                name="location"
                styles={{
                  ...dropdownStyles,
                  width: isSmallScreen ? '100%' : '300px',
                }}
                search
              />
            </div>
          </div>
          <div className={s.inputgroup_section}>
            <div className={s.inputgroup_doublerow}>
              <HookFormSelect
                options={languages}
                styles={{
                  ...dropdownStyles,
                  width: isSmallScreen ? '100%' : '300px',
                }}
                defaultSelected={
                  languages[
                    languages.indexOf(
                      languages.find(el => el.value === nativeLang)
                        || languages[0]
                    )
                  ]
                }
                label={t('nativeLang')}
                name="nativeLang"
              />
              <HookFormSelect
                options={languages}
                styles={{
                  ...dropdownStyles,
                  width: isSmallScreen ? '100%' : '300px',
                }}
                defaultSelected={
                  languages[
                    languages.indexOf(
                      languages.find(el => el.value === learningLang)
                        || languages[0]
                    )
                  ]
                }
                label={t('learningLang')}
                name="learningLang"
              />
            </div>
          </div>
        </form>

        <div className={s.inputgroup_buttons}>
          <Button
            styles={settingsActionBtn}
            onClick={revertValues}
            type="secondary"
          >
            {t('cancel')}
          </Button>
          <Button
            styles={settingsActionBtn}
            onClick={values.handleSubmit(submitHandler)}
            type="primary"
          >
            {t('save')}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
