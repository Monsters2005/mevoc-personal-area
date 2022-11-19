import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { merge } from 'lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { List } from '../../../../@types/entities/List';
import ModalLayout from '../../../../layouts/ModalLayout/ModalLayout';
import HookFormInput from '../../../HookForm/HookFormInput';
import { ModalWrapper } from '../../Wrapper/ModalWrapper';
import schema from './validation';
import s from './RenameList.module.scss';
import { inputModal } from '../../../../shared/styles/input-variations';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import lists from '../../../../pages/ListManagement/Lists.i18n.json';
import common from '../../../UI/Common.i18n.json';

type Props = {
  onRenameList: (data: Partial<List>) => void;
};

export default function RenameListModal({ onRenameList }: Props) {
  const { t } = useLocalTranslation(merge(lists, common));

  const values = useForm<Partial<List>>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: Partial<List>) => {
    onRenameList(data);
  };

  return (
    <ModalWrapper>
      <FormProvider {...values}>
        <ModalLayout
          title={t('modalRenameListTitle')}
          description={t('modalRenameListDescr')}
          btnText={t('save')}
          onClick={values.handleSubmit(submitHandler)}
        >
          <div className={s.list_container}>
            <form
              className={s.list_form}
              onSubmit={values.handleSubmit(submitHandler)}
            >
              <HookFormInput
                name="name"
                placeholder={t('modalRenameListInputTitle')}
                styles={inputModal}
                type="listTitle"
              />
            </form>
          </div>
        </ModalLayout>
      </FormProvider>
    </ModalWrapper>
  );
}
