import React from 'react';
import { Word } from '../../../@types/entities/Word';
import { ListsManagementSvgSelector } from '../ListsManagementSvgSelector';
import { DashboardWordCard } from '../WordCard/WordCard';
import s from './WordList.module.scss';

type Props = {
  words: Word[];
};

export function DashboardWordList({ words }: Props) {
  return (
    <div className={s.wordlist_container}>
      <button className={s.wordlist_addword}>
        <ListsManagementSvgSelector id="plus" />
      </button>
      {words.map(({ wordNative, wordLearning, id }: Word) => (
        <DashboardWordCard
          key={id}
          wordLearning={wordLearning}
          wordNative={wordNative}
          onEdit={() => '...'} // TODO: Make a function for editing word data
        />
      ))}
    </div>
  );
}
