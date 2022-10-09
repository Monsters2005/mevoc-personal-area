import classNames from 'classnames';
import React, { useState } from 'react';
import { EditWordDto } from '../../../@types/dto/word/edit.dto';
import { CustomError } from '../../../@types/entities/ErrorObject';
import { NotificationType } from '../../../@types/entities/Notification';
import { Word } from '../../../@types/entities/Word';
import { useModal } from '../../../context/ModalContext';
import { eventBus, EventTypes } from '../../../packages/EventBus';
import { useUpdateWordMutation } from '../../../store/api/wordApi';
import { makeSuspensionString } from '../../../utils/common/makeSuspensionString';
import EditWordModal from '../../Modals/WordManagement/EditWord';
import { Button } from '../../UI/Button/Button';
import { ListsManagementSvgSelector } from '../ListsManagementSvgSelector';
import s from './WordCard.module.scss';

type Props = {
  word: Word;
};

export function DashboardWordCard({ word }: Props) {
  const [selected, setSelected] = useState(false);
  const { setCurrentModal } = useModal();
  const [updateWord] = useUpdateWordMutation();

  console.log('word', word.wordLearning);

  const handleEdit = (data: EditWordDto) => {
    const newWord = { ...data, id: word.id, dateLearned: word.dateLearned };
    if (JSON.stringify(newWord) !== JSON.stringify(word)) {
      try {
        updateWord(newWord);
        eventBus.emit(EventTypes.notification, {
          message: 'The word was updated.',
          title: 'Success',
          type: NotificationType.SUCCESS,
        });
      } catch (e) {
        eventBus.emit(EventTypes.notification, {
          message: (e as CustomError).data.message,
          title: 'Failed to update the word',
          type: NotificationType.DANGER,
        });
      }
    }
  };

  return (
    <div
      onClick={() => setSelected(!selected)}
      onKeyPress={() => setSelected(!selected)}
      role="presentation"
      className={classNames(s.wordcard_container, {
        [s.wordcard_active]: selected,
      })}
    >
      <div className={s.wordcard_content}>
        <h3>{makeSuspensionString(word.wordLearning, 20)}</h3>
        <p>{makeSuspensionString(word.wordNative, 20)}</p>
      </div>
      <Button
        type="small"
        onClick={() => setCurrentModal(
          <EditWordModal
            onEditWord={(data: EditWordDto) => handleEdit(data)}
            wordNative={word.wordNative}
            wordLearning={word.wordLearning}
          />
        )}
      >
        <ListsManagementSvgSelector id="edit" />
      </Button>
    </div>
  );
}
