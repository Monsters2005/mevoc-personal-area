import React, { ReactNode } from 'react';
import s from './WordPacks.module.scss';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { WordPack } from '../WordPack/WordPack';
import { Pack, PackEnriched } from '../../../@types/entities/WordPack';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from '../Dashboard.i18n.json';
import '../../../styles/lib/wordpack-swiper.scss';

type Props = {
  packs: PackEnriched[];
};

export function DashboardWordPacks({ packs }: Props) {
  const { t } = useLocalTranslation(translations);

  return (
    <CardLayout title={t('wordPacks')}>
      <div className={s.wordpacks_container}>
        {packs.map(item => (
          <WordPack key={item.id} item={item} />
        ))}
      </div>
    </CardLayout>
  );
}
