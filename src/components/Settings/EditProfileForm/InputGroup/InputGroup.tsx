import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SettignsProfileFormDto } from '../../../../@types/dto/settings/profileform.dto';
import { User } from '../../../../@types/entities/User';
import { HookFormDatePicker } from '../../../HookForm/HookFormDatePicker';
import HookFormInput from '../../../HookForm/HookFormInput';
import { Button } from '../../../UI/Button/Button';
import { SettingsSvgSelector } from '../../SettingsSvgSelector';
import s from './InputGroup.module.scss';
import schema from './validation';

type Props = {
  user: User;
  onSave: SubmitHandler<SettignsProfileFormDto>;
  onVerifyEmail: (email: string) => void;
};

const inputStyles = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
  paddingLeft: '10px',
};

const verifyBtnStyles = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '20px',
  fontSize: '16px',
  padding: '5px 10px',
  marginRight: '20px',
};

export function SettingsInputGroup({
  user: {
    username,
    firstName,
    lastName,
    dob,
    emailAdress,
    langLearning,
    langNative,
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
    console.log(data);
    onSave(data);
  };

  return (
    <FormProvider {...values}>
      <form className={s.inputgroup_container}>
        <div className={s.inputgroup_section}>
          <div className={s.inputgroup_doublerow}>
            <HookFormInput
              name="firstName"
              defaultValue={firstName}
              label="First Name"
              styles={{ ...inputStyles, width: '300px' }}
            />
            <HookFormInput
              name="lastName"
              defaultValue={lastName}
              label="Last Name"
              styles={{ ...inputStyles, width: '300px' }}
            />
          </div>
          <div className={s.inputgroup_doublerow}>
            <HookFormInput
              name="username"
              defaultValue={username}
              label="Username"
              styles={{ ...inputStyles, width: '300px' }}
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
              defaultValue={emailAdress}
              label="Email Adress"
              styles={{ ...inputStyles, width: '100%' }}
            >
              {confirmed ? (
                <span className={s.inputgroup_addcontent}>
                  <SettingsSvgSelector id="confirm" />
                  <p>Email Verified</p>
                </span>
              ) : (
                <Button
                  styles={verifyBtnStyles}
                  type="primary"
                  onClick={() => onVerifyEmail(emailAdress)}
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
              styles={{ ...inputStyles, width: '300px' }}
            />
            <HookFormInput
              name="location"
              defaultValue={location}
              label="Location"
              styles={{ ...inputStyles, width: '300px' }}
            >
              <span className={s.inputgroup_addcontent}>
                <SettingsSvgSelector id="location" />
              </span>
            </HookFormInput>
          </div>
        </div>
        <div className={s.inputgroup_section}>
          <div className={s.inputgroup_doublerow} />
        </div>
        <button onClick={values.handleSubmit(submitHandler)}>sdfsdf</button>
      </form>
    </FormProvider>
  );
}
