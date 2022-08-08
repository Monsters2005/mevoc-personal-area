import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { EditWordDto } from '../../../@types/dto/word/edit.dto';
import ModalLayout from '../../../layouts/ModalLayout/ModalLayout';
import {
  inputForm,
  inputModal,
} from '../../../shared/styles/input-variations';
import HookFormInput from '../../HookForm/HookFormInput';
import schema from './editValidation';
import s from './WordManagement.module.scss';

type Props = {
  onEditWord: SubmitHandler<EditWordDto>;
  wordNative: string;
  wordLearning: string;
};

export default function EditWordModal({
  onEditWord,
  wordNative,
  wordLearning,
}: Props) {
  const values = useForm<EditWordDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: EditWordDto) => {
    onEditWord(data);
  };

  return (
    <FormProvider {...values}>
      <ModalLayout
        title="Edit a word"
        btnText="Edit"
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
              defaultValue={wordNative}
            />
            <HookFormInput
              name="wordNative"
              placeholder="Your word"
              styles={inputModal}
              type="wordNative"
              label="Learning language"
              defaultValue={wordLearning}
            />
          </form>
        </div>
      </ModalLayout>
    </FormProvider>
  );
}
