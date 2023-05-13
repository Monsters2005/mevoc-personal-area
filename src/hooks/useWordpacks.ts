import React from 'react';
import { get, merge } from 'lodash';
import { useGetCurrentUserQuery } from '../store/api/userApi';
import { wordpacks } from '../constants/kit/wordpacks';
import { PackEnriched } from '../@types/entities/WordPack';
import { LanguageLocale } from '../constants/locale';
import { useGetListsByUserIdQuery } from '../store/api/listApi';
import nature from '../shared/json/NatureWordpack.json';
import food from '../shared/json/FoodWordpack.json';
import sports from '../shared/json/SportsWordpack.json';
import cosmos from '../shared/json/CosmosWordpack.json';
import transportation from '../shared/json/TransportationWordpack.json';
import technology from '../shared/json/TechnologyWordpack.json';
import seasons from '../shared/json/SeasonsWordpack.json';
import animals from '../shared/json/AnimalsWordpack.json';

const CONFIG = merge(
  nature,
  food,
  sports,
  cosmos,
  transportation,
  technology,
  seasons,
  animals
);

export default function useWordpacks(): PackEnriched[] {
  const { data: user } = useGetCurrentUserQuery();
  const { data: lists = [] } = useGetListsByUserIdQuery(user?.id || 0, {
    skip: !user?.id,
  });
  const relevantWordpacks = wordpacks.filter(
    w => !lists?.map(l => l.name.toLowerCase()).includes(w.name.toLowerCase())
  );
  const native = LanguageLocale[user?.nativeLang as keyof typeof LanguageLocale];
  const learning = LanguageLocale[user?.learningLang as keyof typeof LanguageLocale];

  const enrichedWordpacks = relevantWordpacks.map(item => ({
    ...item,
    words: item.words.map(w => ({
      ...w,
      wordLearning: get(CONFIG[learning], w.word) as string,
      wordNative: get(CONFIG[native], w.word) as string,
      dateLearned: null,
    })),
  }));

  return enrichedWordpacks;
}
