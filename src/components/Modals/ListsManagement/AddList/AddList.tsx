import React from 'react';
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

type Props = {
  onAddList: SubmitHandler<AddListDto>;
};

export default function AddListModal({ onAddList }: Props) {
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
          title="Add a new list"
          description="To add a new list just type a title below"
          btnText="confirm"
          onClick={values.handleSubmit(submitHandler)}
        >
          <div className={s.list_container}>
            <form
              className={s.list_form}
              onSubmit={values.handleSubmit(submitHandler)}
            >
              <HookFormInput
                name="listTitle"
                placeholder="Your title"
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
