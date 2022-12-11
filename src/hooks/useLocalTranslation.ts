import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { LanguageLocale } from '../constants/locale';
import { LSKeys } from '../constants/LSKeys';
import { eventBus, EventTypes } from '../packages/EventBus';
import { useLocalStorage } from './useLocalStorage';

type Locale = Record<string, string | object>;
type LocalConfig = Record<string, Locale>;

export const useLocalTranslation = (config: LocalConfig) => {
  const [currentLang, setCurrentLang] = useLocalStorage(
    LSKeys.UI_LANGUAGE,
    'English'
  );

  useEffect(() => {
    const setlangCb = (lang: string) => setCurrentLang(() => lang);
    eventBus.on(EventTypes.setLang, setlangCb);
    return () => eventBus.off(EventTypes.setLang, setlangCb);
  }, []);

  const locale: keyof LocalConfig = LanguageLocale[currentLang as keyof typeof LanguageLocale];
  return {
    t: (str: string) => get(config[locale], str) as string,
    lang: currentLang,
  };
};
