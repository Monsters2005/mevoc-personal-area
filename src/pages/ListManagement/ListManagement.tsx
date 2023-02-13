/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import { AddListDto } from '../../@types/dto/list/add.dto';
import { CreateWordDto } from '../../@types/dto/word/create.dto';
import { CustomError } from '../../@types/entities/ErrorObject';
import { List } from '../../@types/entities/List';
import { NotificationType } from '../../@types/entities/Notification';
import { User } from '../../@types/entities/User';
import { Word } from '../../@types/entities/Word';
import { DashboardWordList } from '../../components/ListsManagement/WordList/WordList';
import AddListModal from '../../components/Modals/ListsManagement/AddList/AddList';
import RenameListModal from '../../components/Modals/ListsManagement/RenameList/RenameList';
import AddWordModal from '../../components/Modals/WordManagement/AddWord';
import EditWordModal from '../../components/Modals/WordManagement/EditWord';
import ActionsDropdown, {
  DropdownItem,
} from '../../components/UI/ActionsDropdown/ActionsDropdown';
import { Button } from '../../components/UI/Button/Button';
import { Dropdown } from '../../components/UI/DropDown/Dropdown';
import { Option } from '../../components/UI/DropDown/types';
import { Input } from '../../components/UI/Input/Input';
import { useModal } from '../../context/ModalContext';
import { useSelectedWords } from '../../context/SelectedWords';
import { useOutsideCheck } from '../../hooks/useOutsideCheck';
import { PageLayout } from '../../layouts/PageLayout/PageLayout';
import { list } from '../../mocks/list';
import { eventBus, EventTypes } from '../../packages/EventBus';
import { GlobalSvgSelector } from '../../shared/GlobalSvgSelector';
import {
  useCreateListMutation,
  useDeleteListMutation,
  useGetListsByUserIdQuery,
  useUpdateListMutation,
} from '../../store/api/listApi';
import { useGetCurrentUserQuery } from '../../store/api/userApi';
import s from './ListManagement.module.scss';
import common from '../../components/UI/Common.i18n.json';
import notifTransl from '../Notifications.i18n.json';
import sidebar from '../../components/Sidebar/Sidebar/Sidebar.i18n.json';
import lists from './Lists.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { merge } from 'lodash';
import Alert from '../../components/UI/Alert/Alert';
import { UISvgSelector } from '../../components/UI/UISvgSelector';
import { notLists } from '../../constants/alerts';

export default function ListManagementPage() {
  const { selectedWords } = useSelectedWords();

  const [options, setOptions] = useState<Option[] | []>([]);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [expandOpen, setExpandOpen] = useState<Number | null>(null);

  const { setCurrentModal } = useModal();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: userLists = [] } = useGetListsByUserIdQuery(
    currentUser?.id || 0,
    {
      skip: !currentUser?.id,
    }
  );

  const [createList] = useCreateListMutation();
  const [updateList] = useUpdateListMutation();
  const [deleteList] = useDeleteListMutation();

  const menuRef = useRef(null);

  useOutsideCheck(menuRef, () => {
    setExpandOpen(null);
  });
  const { t } = useLocalTranslation(
    merge(common, notifTransl, sidebar, lists)
  );

  const listActionItems = [
    {
      value: 'rename',
      func: () => {
        setCurrentModal(
          <RenameListModal
            onRenameList={(data: Partial<List>) => handleRename(data)}
          />
        );
      },
      key: 'rename',
      path: null,
    },
    {
      value: 'delete',
      func: () => handleDelete,
      key: 'delete',
      path: null,
    },
  ];

  useEffect(() => {
    const listOptions = userLists.map(
      (el: List): Option => ({
        value: el.name,
        id: el.id,
        details: `${el.words?.length} ${t(
          `word${el.words?.length !== 1 ? 's' : ''}`
        )}`,
        addition: (
          <div className={s.listmanagement_list_addition}>
            <Button
              type="small"
              onClick={() => setExpandOpen(el.id)}
              styles={{ height: '20px', padding: '5px', zIndex: 0 }}
            >
              <GlobalSvgSelector id="expand" />
            </Button>
            <div
              className={s.listmanagement_list_actions}
              style={expandOpen ? { zIndex: 100 } : { zIndex: -100 }}
              ref={menuRef}
            >
              <ActionsDropdown
                isOpen={expandOpen === el.id}
                items={listActionItems}
              />
            </div>
          </div>
        ),
      })
    );
    setOptions(listOptions);
  }, [userLists, expandOpen]);

  useEffect(() => {
    setSelectedList(userLists[userLists.length - 1]);
  }, [userLists]);

  const handleList = async (data: AddListDto) => {
    try {
      await createList({
        name: data.listTitle,
        learningLang: 'en',
        userId: data.userId,
      }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: t('listAdd'),
        title: t('success'),
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: (e as CustomError).data.message,
        title: t('listAddFail'),
        type: NotificationType.DANGER,
      });
    }
  };

  const handleRename = async (data: Partial<List>) => {
    try {
      await updateList({ id: data.id || 0, name: data.name });
      eventBus.emit(EventTypes.notification, {
        message: `${t('listRename')} "${data.name}"`,
        title: t('success'),
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: t('listRenameFail'),
        title: t('error'),
        type: NotificationType.DANGER,
      });
    }
  };

  const handleDelete = async (data: Partial<List>) => {
    try {
      await deleteList(data.id || 0);
      eventBus.emit(EventTypes.notification, {
        message: t('listDelete'),
        title: t('success'),
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: t('listDeleteFail'),
        title: t('error'),
        type: NotificationType.DANGER,
      });
    }
  };

  const handleDeleteWords = async () => {
    try {
      await updateList({
        ...selectedList,
        id: selectedList?.id || 0,
        words: selectedList?.words.filter(
          (o1: Word) => !selectedWords.some(o2 => o1.id === o2.id)
        ),
      });
      eventBus.emit(EventTypes.notification, {
        message: t('wordsDelete'),
        title: t('success'),
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: t('wordsDeleteFail'),
        title: t('error'),
        type: NotificationType.DANGER,
      });
    }
  };

  return (
    <PageLayout title={t('listsManagement')}>
      <div className={s.listmanagement_container}>
        <div className={s.listmanagement_header}>
          <div className={s.listmanagement_lists}>
            <Dropdown
              listTitle={t('yourLists')}
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
              placeholder={t('search')}
              styles={{ padding: '14px 10px 13px 15px', width: '300px' }}
            >
              <GlobalSvgSelector id="search" />
            </Input>
            <Button type="small" onClick={handleDeleteWords}>
              <GlobalSvgSelector id="delete" />
            </Button>
          </div>
        </div>
        <div className={s.listmanagement_content}>
          {selectedList ? (
            <DashboardWordList selectedList={selectedList?.id || 0} />
          ) : (
            <div className={s.listmanagement_nolists}>
              <Alert
                icon={<UISvgSelector id={notLists.icon} />}
                title={t(notLists.title)}
                text={t(notLists.text)}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
