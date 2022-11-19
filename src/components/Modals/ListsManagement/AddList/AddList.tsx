import React from 'react';
import { merge } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { AddListDto } from '../../../../@types/dto/list/add.dto';
import ModalLayout from '../../../../layouts/ModalLayout/ModalLayout';
import { inputModal } from '../../../../shared/styles/input-variations';
import HookFormInput from '../../../HookForm/HookFormInput';
import schema from './validation';
import s from './AddList.module.scss';
import { ModalWrapper } from '../../Wrapper/ModalWrapper';
import { useGetCurrentUserQuery } from '../../../../store/api/userApi';
import { useModal } from '../../../../context/ModalContext';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import lists from '../../../../pages/ListManagement/Lists.i18n.json';
import common from '../../../UI/Common.i18n.json';

type Props = {
  onAddList: SubmitHandler<AddListDto>;
};

export default function AddListModal({ onAddList }: Props) {
  const { t } = useLocalTranslation(merge(lists, common));
  const values = useForm<AddListDto>({
    resolver: yupResolver(schema),
  });
  const { data: currentUser } = useGetCurrentUserQuery();
  const { setCurrentModal } = useModal();

  const submitHandler = (data: AddListDto) => {
    onAddList({ ...data, userId: currentUser?.id || 0 });
    setCurrentModal(null);
  };

  return (
    <ModalWrapper>
      <FormProvider {...values}>
        <ModalLayout
          title={t('modalAddListTitle')}
          description={t('modalAddListDescr')}
          btnText={t('save')}
          onClick={values.handleSubmit(submitHandler)}
        >
          <div className={s.list_container}>
            <form
              className={s.list_form}
              onSubmit={values.handleSubmit(submitHandler)}
            >
              <HookFormInput
                name="listTitle"
                placeholder={t('modalAddListInputTitle')}
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
