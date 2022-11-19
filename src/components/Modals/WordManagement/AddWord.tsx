import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { merge } from 'lodash';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CreateWordDto } from '../../../@types/dto/word/create.dto';
import ModalLayout from '../../../layouts/ModalLayout/ModalLayout';
import { inputModal } from '../../../shared/styles/input-variations';
import HookFormInput from '../../HookForm/HookFormInput';
import { ModalWrapper } from '../Wrapper/ModalWrapper';
import schema from './addValidation';
import s from './WordManagement.module.scss';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import lists from '../../../pages/ListManagement/Lists.i18n.json';
import common from '../../UI/Common.i18n.json';

type Props = {
  onAddWord: SubmitHandler<CreateWordDto>;
};

export default function AddWordModal({ onAddWord }: Props) {
  const { t } = useLocalTranslation(merge(lists, common));

  const values = useForm<CreateWordDto>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: CreateWordDto) => {
    onAddWord(data);
  };

  return (
    <ModalWrapper>
      <FormProvider {...values}>
        <ModalLayout
          title={t('modalAddWordTitle')}
          btnText={t('add')}
          onClick={values.handleSubmit(submitHandler)}
        >
          <div className={s.wordmanage_container}>
            <form
              className={s.wordmanage_form}
              onSubmit={values.handleSubmit(submitHandler)}
            >
              <HookFormInput
                name="wordNative"
                placeholder={t('modalAddWordInputTitle')}
                styles={inputModal}
                type="wordNative"
                label={t('nativeLang')}
              />
              <HookFormInput
                name="wordLearning"
                placeholder={t('modalAddWordInputTitle')}
                styles={inputModal}
                type="wordLearning"
                label={t('learningLang')}
              />
            </form>
          </div>
        </ModalLayout>
      </FormProvider>
    </ModalWrapper>
  );
}
