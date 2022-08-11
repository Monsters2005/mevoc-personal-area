import React from 'react';
import { Word } from '../../../@types/entities/Word';
import { ListsManagementSvgSelector } from '../ListsManagementSvgSelector';
import { DashboardWordCard } from '../WordCard/WordCard';
import s from './WordList.module.scss';

type Props = {
  words: Word[];
  onAddWord: () => void;
  onEditWord: () => void;
};

export function DashboardWordList({ words, onEditWord, onAddWord }: Props) {
  return (
    <div className={s.wordlist_container}>
      <button className={s.wordlist_addword} onClick={onAddWord}>
        <ListsManagementSvgSelector id="plus" />
      </button>
      {words.map(({ wordNative, wordLearning, id }: Word) => (
        <DashboardWordCard
          key={id}
          wordLearning={wordLearning}
          wordNative={wordNative}
          onEdit={onEditWord}
        />
      ))}
    </div>
  );
}
