import { yupResolver } from '@hookform/resolvers/yup';
import moment, { lang } from 'moment';
import React, { useCallback, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SettignsProfileFormDto } from '../../../../@types/dto/settings/profileform.dto';
import { User } from '../../../../@types/entities/User';
import { countries } from '../../../../constants/countries';
import { languages } from '../../../../constants/languages';
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
// import { SettingsSvgSelector } from '../../SettingsSvgSelector';
import s from './InputGroup.module.scss';
import schema from './validation';

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
  const values = useForm<SettignsProfileFormDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: SettignsProfileFormDto) => {
    onSave(data);
    console.log('data', data);
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

  return (
    <FormProvider {...values}>
      <div className={s.inputgroup_container}>
        <form className={s.inputgroup_form} onSubmit={e => e.preventDefault()}>
          <div className={s.inputgroup_section}>
            <div className={s.inputgroup_doublerow}>
              <HookFormInput
                name="firstName"
                defaultValue={firstName}
                label="First Name"
                styles={{
                  ...inputSettings,
                  width: '300px',
                  textTransform: 'capitalize',
                }}
              />
              <HookFormInput
                name="lastName"
                defaultValue={lastName}
                label="Last Name"
                styles={{
                  ...inputSettings,
                  width: '300px',
                  textTransform: 'capitalize',
                }}
              />
            </div>
            <div className={s.inputgroup_doublerow}>
              <HookFormInput
                name="username"
                defaultValue={username}
                label="Username"
                styles={{ ...inputSettings, width: '300px' }}
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
                label="Email Adress"
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
                    Verify
                  </Button>
                )}
              </HookFormInput>
            </div>
            <div className={s.inputgroup_doublerow}>
              <HookFormInput
                name="phoneNumber"
                defaultValue={phoneNumber}
                label="Phone Number"
                styles={{ ...inputSettings, width: '300px' }}
              />
              <HookFormSelect
                options={countries}
                defaultSelected={countries[87]}
                label="Location"
                name="location"
                search
              />
            </div>
          </div>
          <div className={s.inputgroup_section}>
            <div className={s.inputgroup_doublerow}>
              <HookFormSelect
                options={languages}
                defaultSelected={
                  languages[
                    languages.indexOf(
                      languages.find(el => el.value === nativeLang)
                        || languages[0]
                    )
                  ]
                }
                label="Native Language"
                name="nativeLang"
              />
              <HookFormSelect
                options={languages}
                defaultSelected={
                  languages[
                    languages.indexOf(
                      languages.find(el => el.value === learningLang)
                        || languages[0]
                    )
                  ]
                }
                label="Learning Language"
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
            Cancel
          </Button>
          <Button
            styles={settingsActionBtn}
            onClick={values.handleSubmit(submitHandler)}
            type="primary"
          >
            Save
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
