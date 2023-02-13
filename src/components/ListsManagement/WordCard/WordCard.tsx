import classNames from 'classnames';
import React, { useState } from 'react';
import { EditWordDto } from '../../../@types/dto/word/edit.dto';
import { Word } from '../../../@types/entities/Word';
import { useModal } from '../../../context/ModalContext';
import { useSelectedWords } from '../../../context/SelectedWords';
import { makeSuspensionString } from '../../../utils/common/makeSuspensionString';
import EditWordModal from '../../Modals/WordManagement/EditWord';
import { Button } from '../../UI/Button/Button';
import { ListsManagementSvgSelector } from '../ListsManagementSvgSelector';
import s from './WordCard.module.scss';

type Props = {
  word: Word;
  onEditWord: (data: EditWordDto, word: Word) => void;
};

export function DashboardWordCard({ word, onEditWord }: Props) {
  const { selectedWords, setSelectedWords } = useSelectedWords();
  const [selected, setSelected] = useState(false);
  const { setCurrentModal } = useModal();

  const handleEdit = (data: EditWordDto) => {
    onEditWord(data, word);
  };

  return (
    <div
      onClick={e => {
        if (e.currentTarget !== e.target) return;
        if (selected) {
          setSelectedWords(selectedWords.filter(el => el.id !== word.id));
        } else {
          setSelectedWords([...selectedWords, word]);
        }
        setSelected(prev => !prev);
      }}
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
