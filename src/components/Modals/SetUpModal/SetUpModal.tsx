import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import schema from './validation';
import { User } from '../../../@types/entities/User';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';
import s from './SetUpModal.module.scss';
import { ModalWrapper } from '../Wrapper/ModalWrapper';
import StepsProgress from '../../UI/StepsProgress/StepsProgress';
import HookFormInput from '../../HookForm/HookFormInput';
import HookFormSelect from '../../HookForm/HookFormSelect';
import { languages } from '../../../constants/languages';
import { countries } from '../../../constants/countries';

type Props = {
  onFillData: SubmitHandler<Partial<User>>;
};

function SetUpContent({ index }: { index: number }) {
  const { data: currentUser } = useGetCurrentUserQuery();
  switch (index) {
    case 1:
      return (
        <div className={s.setup_content_container}>
          <HookFormInput
            name="firstName"
            label="What is your name?"
            placeholder="First Name"
            defaultValue={currentUser?.firstName || ''}
            styles={{ width: '340px', fontSize: '16px' }}
          />
          <HookFormInput
            name="lastName"
            label="And surname?"
            placeholder="Last Name"
            styles={{
              width: '340px',
              fontSize: '16px',
            }}
          />
        </div>
      );
    case 2:
      return (
        <div className={s.setup_content_container}>
          <HookFormSelect
            name="nativeLang"
            label="Choose your native language:"
            options={languages}
            styles={{
              width: '340px',
              height: '50px',
              fontSize: '16px',
              background: '#1f2029',
            }}
            defaultSelected={languages[0]}
            listStyles={{ boxShadow: '0px 0px 8px rgba(25, 14, 55, 0.25)' }}
          />
          <HookFormSelect
            name="learningLang"
            label="Choose the language you want to learn:"
            options={languages}
            defaultSelected={languages[0]}
            listStyles={{ boxShadow: '0px 0px 8px rgba(25, 14, 55, 0.25)' }}
            styles={{
              width: '340px',
              height: '50px',
              fontSize: '16px',
              background: '#1f2029',
            }}
          />
        </div>
      );
    case 3:
      return (
        <div className={s.setup_content_container}>
          <HookFormSelect
            name="location"
            label="Where are you from?"
            options={countries}
            styles={{
              width: '340px',
              height: '50px',
              fontSize: '16px',
              background: '#1f2029',
            }}
            defaultSelected={countries[0]}
            listStyles={{ boxShadow: '0px 0px 8px rgba(25, 14, 55, 0.25)' }}
          />
          <HookFormInput
            name="phoneNumber"
            label="Phone number (optional)"
            placeholder="+ (---) --- -- ---"
            styles={{
              width: '340px',
              fontSize: '16px',
            }}
          />
        </div>
      );
    default:
      return null;
  }
}

export default function SetUpModal({ onFillData }: Props) {
  const values = useForm<Partial<User>>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: Partial<User>) => {
    onFillData({ ...data });
  };
  const setupSteps = [1, 2, 3].map(e => ({ index: e }));
  const [activeStep, setActiveStep] = useState(1);

  return (
    <ModalWrapper>
      <div className={s.setup_container}>
        <h2 className={s.setup_title}>Let’s set up your profile</h2>
        <p className={s.setup_subtitle}>
          To start using the application, please finish setting up your
          profile.
        </p>

        <div className={s.setup_progress}>
          <StepsProgress
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={setupSteps}
          />
        </div>

        <FormProvider {...values}>
          <div className={s.setup_content}>
            <SetUpContent index={activeStep} />
          </div>
        </FormProvider>
      </div>
    </ModalWrapper>
  );
}
