import React from 'react';
import { workerData } from 'worker_threads';
import { list } from '../../../mocks/list';
import { ListsManagementSvgSelector } from '../ListsManagementSvgSelector';
import { DashboardWordCard } from '../WordCard/WordCard';
import s from './WordList.module.scss';

export function DashboardWordList() {
  return (
    <div className={s.wordlist_container}>
      <button className={s.wordlist_addword}>
        <ListsManagementSvgSelector id="plus" />
      </button>
      {list.words.map(item => (
        <DashboardWordCard
          wordLearning={item.learningLang}
          wordNative={item.nativeLang}
          onEdit={() => 'editing.. at least trying'}
        />
      ))}
    </div>
  );
}
