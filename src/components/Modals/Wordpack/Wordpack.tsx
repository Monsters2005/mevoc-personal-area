/* eslint-disable */
import classNames from 'classnames';
import React, { useState } from 'react';
import { merge } from 'lodash';
import { PackEnriched } from '../../../@types/entities/WordPack';
import { WordpackWordEnriched } from '../../../@types/entities/WordpackWord';
import ModalLayout from '../../../layouts/ModalLayout/ModalLayout';
import { checkIsInArrayById } from '../../../utils/common/checkIsInArray';
import { ModalWrapper } from '../Wrapper/ModalWrapper';
import s from './Wordpack.module.scss';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';
import { useCreateListMutation } from '../../../store/api/listApi';
import { AddListDto } from '../../../@types/dto/list/add.dto';
import { EventTypes, eventBus } from '../../../packages/EventBus';
import { NotificationType } from '../../../@types/entities/Notification';
import { CustomError } from '../../../@types/entities/ErrorObject';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import common from '../../UI/Common.i18n.json';
import notifTransl from '../../../pages/Notifications.i18n.json';
import lists from '../../../pages/ListManagement/Lists.i18n.json';

type Props = {
  wordpack: PackEnriched;
  onConfirm: () => void;
};

type WordProps = {
  item: WordpackWordEnriched;
  selected: boolean;
  onClick: (item: WordpackWordEnriched) => void;
};

function WordCard({ item, selected, onClick }: WordProps) {
  return (
    <button
      className={classNames(s.modal_item, {
        [s.modal_item_selected]: selected,
      })}
      onClick={() => onClick(item)}
    >
      <div className={s.modal_item_word}>
        <h3>{item.wordLearning}</h3>
        <p>{item.wordNative}</p>
      </div>
      <button
        className={classNames(s.modal_item_add, {
          [s.modal_item_added]: selected,
        })}
        onClick={() => onClick(item)}
      >
        <span />
      </button>
    </button>
  );
}

export function WordpackModal({ wordpack, onConfirm }: Props) {
  const [selectedItems, setSelected] = useState<WordpackWordEnriched[] | []>(
    []
  );
  const { t } = useLocalTranslation(merge(common, notifTransl, lists));

  const onWordAdd = (item: WordpackWordEnriched) => {
    const isSelected = checkIsInArrayById(item, selectedItems);
    if (isSelected) {
      setSelected(selected => selected.filter(el => el.id !== item.id));
    } else {
      setSelected(selected => [
        ...selected.filter(el => el.id !== item.id),
        item,
      ]);
    }
  };

  const { data: currentUser } = useGetCurrentUserQuery();
  const [createList] = useCreateListMutation();

  const handleList = async (data: AddListDto) => {
    try {
      await createList({
        name: data.listTitle,
        learningLang: 'en',
        userId: data.userId,
        words: data.words,
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

  const onSelectedAdd = () => {
    handleList({
      listTitle: wordpack.name,
      userId: currentUser?.id || 0,
      words: selectedItems,
    });
  };

  return (
    <ModalWrapper>
      <ModalLayout
        title={`Word Pack: ${wordpack.name}`}
        description="Add the whole word pack at once or individual words"
        onClick={selectedItems.length ? onSelectedAdd : onConfirm}
        btnText={
          selectedItems.length ? `confirm(${selectedItems.length})` : 'add all'
        }
      >
        <div className={s.modal_container}>
          <div className={s.modal_items}>
            {wordpack.words.map(item => (
              <WordCard
                key={item.id}
                item={item}
                onClick={(word: WordpackWordEnriched) => onWordAdd(word)}
                selected={checkIsInArrayById(item, selectedItems)}
              />
            ))}
          </div>
        </div>
      </ModalLayout>
    </ModalWrapper>
  );
}
