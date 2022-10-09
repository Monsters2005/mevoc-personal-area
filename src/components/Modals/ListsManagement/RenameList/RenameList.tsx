import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { List } from '../../../../@types/entities/List';
import ModalLayout from '../../../../layouts/ModalLayout/ModalLayout';
import HookFormInput from '../../../HookForm/HookFormInput';
import { ModalWrapper } from '../../Wrapper/ModalWrapper';
import schema from './validation';
import s from './RenameList.module.scss';
import { inputModal } from '../../../../shared/styles/input-variations';

type Props = {
  onRenameList: (data: Partial<List>) => void;
};

export default function RenameListModal({ onRenameList }: Props) {
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
                name="name"
                placeholder="New name"
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
