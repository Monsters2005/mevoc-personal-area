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
import { pluralizeString } from '../../utils/components/pluralizeString';
import s from './ListManagement.module.scss';

export default function ListManagementPage() {
  const { selectedWords } = useSelectedWords();

  const [options, setOptions] = useState<Option[] | []>([]);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [expandOpen, setExpandOpen] = useState<Number | null>(null);

  const { setCurrentModal } = useModal();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: userLists = [], refetch: refetchUserLists } =
    useGetListsByUserIdQuery(currentUser?.id || 0, {
      skip: !currentUser?.id,
    });

  const [createList] = useCreateListMutation();
  const [updateList] = useUpdateListMutation();
  const [deleteList] = useDeleteListMutation();

  const menuRef = useRef(null);

  useOutsideCheck(menuRef, () => {
    setExpandOpen(null);
  });

  const listActionItems = [
    {
      value: 'Rename',
      func: () => {
        setCurrentModal(
          <RenameListModal
            onRenameList={(data: Partial<List>) => handleRename(data)}
          />
        );
      },
      key: 'rename',
    },
    {
      value: 'Delete',
      func: () => handleDelete,
      key: 'delete',
    },
  ];

  useEffect(() => {
    const listOptions = userLists.map(
      (el: List): Option => ({
        value: el.name,
        id: el.id,
        details: pluralizeString(el.words?.length),
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
                items={listActionItems as DropdownItem[]}
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

  const handleRename = async (data: Partial<List>) => {
    try {
      await updateList({ id: data.id || 0, name: data.name });
      refetchUserLists();
      eventBus.emit(EventTypes.notification, {
        message: `Renamed a list to "${data.name}"`,
        title: 'Success',
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: 'Failed to rename a list',
        title: 'Error occured',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleDelete = async (data: Partial<List>) => {
    try {
      await deleteList(data.id || 0);
      refetchUserLists();
      eventBus.emit(EventTypes.notification, {
        message: `List "${data.name}" was deleted`,
        title: 'Success',
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: 'Failed to delete a list',
        title: 'Error occured',
        type: NotificationType.DANGER,
      });
    }
  };

  const handleDeleteWords = async () => {
    console.log('obj', {
      ...selectedList,
      id: selectedList?.id || 0,
      words: selectedList?.words.filter(
        (o1: Word) => !selectedWords.some(o2 => o1.id === o2.id)
      ),
    });

    try {
      await updateList({
        ...selectedList,
        id: selectedList?.id || 0,
        words: selectedList?.words.filter(
          (o1: Word) => !selectedWords.some(o2 => o1.id === o2.id)
        ),
      });
      refetchUserLists();
      eventBus.emit(EventTypes.notification, {
        message: 'Selected words were deleted',
        title: 'Success',
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: 'Failed to delete selected words',
        title: 'Error occured',
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
            <Button type="small" onClick={handleDeleteWords}>
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
