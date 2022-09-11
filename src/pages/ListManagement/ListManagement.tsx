/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { AddListDto } from '../../@types/dto/list/add.dto';
import { CreateWordDto } from '../../@types/dto/word/create.dto';
import { CustomError } from '../../@types/entities/ErrorObject';
import { List } from '../../@types/entities/List';
import { NotificationType } from '../../@types/entities/Notification';
import { User } from '../../@types/entities/User';
import { DashboardWordList } from '../../components/ListsManagement/WordList/WordList';
import AddListModal from '../../components/Modals/ListsManagement/AddList';
import AddWordModal from '../../components/Modals/WordManagement/AddWord';
import EditWordModal from '../../components/Modals/WordManagement/EditWord';
import { Button } from '../../components/UI/Button/Button';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { Option } from '../../components/UI/DropDown/types';
import { Input } from '../../components/UI/Input/Input';
import { useModal } from '../../context/ModalContext';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { list } from '../../mocks/list';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { GlobalSvgSelector } from '../../shared/GlobalSvgSelector';
import {
  useCreateListMutation,
  useGetListsByUserIdQuery,
} from '../../store/api/listApi';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import {
  useCreateWordMutation,
  useGetWordsByListIdQuery,
} from '../../store/api/wordApi';
import { pluralizeString } from '../../utils/components/pluralizeString';
import s from './ListManagement.module.scss';

export default function ListManagementPage() {
  const [options, setOptions] = useState<Option[] | []>([]);
  const [selectedList, setSelectedList] = useState<List | null>(null);

  const { setCurrentModal } = useModal();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: userLists = [], refetch: refetchUserLists } =
    useGetListsByUserIdQuery(currentUser?.id || 0, {
      skip: !currentUser?.id,
    });

  const [createList] = useCreateListMutation();

  useEffect(() => {
    const listOptions = userLists.map(
      (el: List): Option => ({
        value: el.name,
        id: el.id,
        details: pluralizeString(el.words?.length),
        addition: (
          <Button
            type="small"
            onClick={() => console.log('list')}
            styles={{ height: '20px', padding: '5px' }}
          >
            <GlobalSvgSelector id="expand" />
          </Button>
        ),
      })
    );
    setOptions(listOptions);
  }, [userLists]);

  const handleList = async (data: AddListDto) => {
    try {
      const newList = await createList({
        name: data.listTitle,
        learningLang: 'en',
        userId: data.userId,
      }).unwrap();
      setSelectedList(userLists[newList.id]);
      refetchUserLists();
      eventBus.emit(EventTypes.notification, {
        message: 'Added a new list',
        title: 'Success',
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: (e as CustomError).data.message,
        title: 'Failed to create a new list',
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <PageLayout title="Lists management">
      <div className={s.listmanagement_container}>
        <div className={s.listmanagement_header}>
          <div className={s.listmanagement_lists}>
            <Dropdown
              listTitle="Your lists"
              options={options}
              selectedItem={
                options &&
                options[selectedList ? userLists.indexOf(selectedList) : 0]
              }
              setSelectedItem={(item: Option | undefined) => {
                const newList = userLists.find(el => el?.id === item?.id);
                if (newList) setSelectedList(newList);
              }}
              allowNoneSelected
              styles={{ width: '250px', marginBottom: '8px' }}
              listStyles={{ width: '350px' }}
            />
            <Button
              type="small"
              onClick={() =>
                setCurrentModal(
                  <AddListModal
                    onAddList={(data: AddListDto) => handleList(data)}
                  />
                )
              }
            >
              <GlobalSvgSelector id="plus-circle" />
            </Button>
          </div>
          <div className={s.listmanagement_control}>
            <Input
              name="search"
              placeholder="Search the word.."
              styles={{ padding: '14px 10px 13px 15px', width: '300px' }}
            >
              <GlobalSvgSelector id="search" />
            </Input>
            <Button type="small" onClick={() => console.log('remove word')}>
              <GlobalSvgSelector id="delete" />
            </Button>
          </div>
        </div>
        <div className={s.listmanagement_content}>
          <DashboardWordList selectedList={selectedList?.id || 0} />
        </div>
      </div>
    </PageLayout>
  );
}
