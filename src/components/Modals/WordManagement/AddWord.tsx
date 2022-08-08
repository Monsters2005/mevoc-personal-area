import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AddWordDto } from '../../../@types/dto/word/add.dto';
import ModalLayout from '../../../layouts/ModalLayout/ModalLayout';
import { inputModal } from '../../../shared/styles/input-variations';
import HookFormInput from '../../HookForm/HookFormInput';
import schema from './addValidation';
import s from './WordManagement.module.scss';

type Props = {
  onAddWord: SubmitHandler<AddWordDto>;
};

export default function AddWordModal({ onAddWord }: Props) {
  const values = useForm<AddWordDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: AddWordDto) => {
    onAddWord(data);
  };

  return (
    <FormProvider {...values}>
      <ModalLayout
        title="Add a new word"
        btnText="Add"
        onClick={() => console.log()}
      >
        <div className={s.wordmanage_container}>
          <form
            className={s.wordmanage_form}
            onSubmit={values.handleSubmit(submitHandler)}
          >
            <HookFormInput
              name="wordNative"
              placeholder="Your word"
              styles={inputModal}
              type="wordNative"
              label="Native language"
            />
            <HookFormInput
              name="wordNative"
              placeholder="Your word"
              styles={inputModal}
              type="wordNative"
              label="Learning language"
            />
          </form>
        </div>
      </ModalLayout>
    </FormProvider>
  );
}
