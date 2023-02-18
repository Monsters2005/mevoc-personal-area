import React from 'react';
import {
  WordpackWord,
  WordpackWordEnriched,
} from '../@types/entities/WordpackWord';
import { useGetCurrentUserQuery } from '../store/api/userApi';
import { wordpacks } from '../constants/kit/wordpacks';
import { Pack, PackEnriched } from '../@types/entities/WordPack';
import { LanguageLocale } from '../constants/locale';
import { useGetListsByUserIdQuery } from '../store/api/listApi';

// TODO: remove any add pack
export default function useWordpacks(): any[] {
  const { data: user } = useGetCurrentUserQuery();
  const { data: lists = [] } = useGetListsByUserIdQuery(user?.id || 0, {
    skip: !user?.id,
  });
  const relevantWordpacks = wordpacks.filter(w => lists?.map(l => l.name).some(l => l.toLowerCase() !== w.name.toLowerCase()));
  const native = LanguageLocale[user?.nativeLang as keyof typeof LanguageLocale];
  const learning = LanguageLocale[user?.learningLang as keyof typeof LanguageLocale];

  console.log(relevantWordpacks);

  const modifiedWithDate = relevantWordpacks.map(item => ({
    ...item,
    words: item.words.map(w => ({ ...w, dateLearned: null })),
  }));

  // return modifiedWithDate.map(item => ({
  //   wordLearning: '',
  //   wordNative: '',
  //   id: item.id,
  //   dateLearned: null,
  // }));

  return modifiedWithDate;
}
