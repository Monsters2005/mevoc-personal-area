import React, { ReactNode } from 'react';
import s from './WordPacks.module.scss';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { WordPack } from '../WordPack/WordPack';
import { Pack } from '../../../@types/entities/WordPack';

type Props = {
  packs: Pack[];
};

export function DashboardWordPacks({ packs }: Props) {
  return (
    <CardLayout title="Word packs">
      <div className={s.wordpacks_container}>
        {packs.map(item => (
          <WordPack key={item.id} item={item} />
        ))}
      </div>
    </CardLayout>
  );
}
