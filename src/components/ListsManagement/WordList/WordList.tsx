import React, { useEffect, useState } from 'react';
import { CreateWordDto } from '../../../@types/dto/word/create.dto';
import { EditWordDto } from '../../../@types/dto/word/edit.dto';
import { CustomError } from '../../../@types/entities/ErrorObject';
import { NotificationType } from '../../../@types/entities/Notification';
import { Word } from '../../../@types/entities/Word';
import { useModal } from '../../../context/ModalContext';
import { eventBus, EventTypes } from '../../../packages/EventBus';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';
import {
  useCreateWordMutation,
  useGetWordsByListIdQuery,
  useUpdateWordMutation,
} from '../../../store/api/wordApi';
import AddWordModal from '../../Modals/WordManagement/AddWord';
import { ListsManagementSvgSelector } from '../ListsManagementSvgSelector';
import { DashboardWordCard } from '../WordCard/WordCard';
import s from './WordList.module.scss';
import translations from '../../../pages/Notifications.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';

type Props = {
  selectedList: number;
};

export function DashboardWordList({ selectedList }: Props) {
  const { data: currentUser } = useGetCurrentUserQuery();
  const { setCurrentModal } = useModal();
  const { data: wordsData = [] } = useGetWordsByListIdQuery(selectedList, {
    skip: !currentUser?.id,
  });
  const [createWord] = useCreateWordMutation();
  const [updateWord] = useUpdateWordMutation();
  const [words, setWords] = useState<Word[] | []>([]);
  const { t } = useLocalTranslation(translations);

  const handleWord = async (data: CreateWordDto) => {
    if (selectedList !== 0) {
      try {
        await createWord({
          wordNative: data.wordNative,
          wordLearning: data.wordLearning,
          dateLearned: null,
          listId: selectedList,
        });
        eventBus.emit(EventTypes.notification, {
          message: t('wordAdd'),
          title: t('success'),
          type: NotificationType.SUCCESS,
        });
      } catch (e) {
        eventBus.emit(EventTypes.notification, {
          message: (e as CustomError).data.message,
          title: t('wordAddFail'),
          type: NotificationType.DANGER,
        });
      }
    } else {
      eventBus.emit(EventTypes.notification, {
        message: t('wordAddListFail'),
        title: t('wordAddFail'),
        type: NotificationType.DANGER,
      });
    }
  };

  const handleEdit = (data: EditWordDto, word: Word) => {
    const newWord = { ...data, id: word.id, dateLearned: word.dateLearned };
    if (JSON.stringify(newWord) !== JSON.stringify(word)) {
      try {
        updateWord(newWord);
        eventBus.emit(EventTypes.notification, {
          message: t('wordUpdate'),
          title: t('success'),
          type: NotificationType.SUCCESS,
        });
      } catch (e) {
        eventBus.emit(EventTypes.notification, {
          message: (e as CustomError).data.message,
          title: t('wordUpdateFail'),
          type: NotificationType.DANGER,
        });
      }
    }
  };

  useEffect(() => {
    if (wordsData) setWords(wordsData);
  }, [wordsData]);

  return (
    <div className={s.wordlist_container}>
      <button
        className={s.wordlist_addword}
        onClick={() => setCurrentModal(
          <AddWordModal
            onAddWord={(data: CreateWordDto) => handleWord(data)}
          />
        )}
      >
        <ListsManagementSvgSelector id="plus" />
      </button>
      {words.map((word: Word) => (
        <DashboardWordCard key={word.id} word={word} onEditWord={handleEdit} />
      ))}
    </div>
  );
}
