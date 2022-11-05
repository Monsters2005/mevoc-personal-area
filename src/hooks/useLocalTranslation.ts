import { useInRouterContext } from 'react-router';
import { get } from 'lodash';
import { LanguageLocale } from '../constants/locale';
import { useGetCurrentUserQuery } from '../store/api/userApi';

type Locale = Record<string, string | object>;
type LocalConfig = Record<string, Locale>;

export const useLocalTranslation = (config: LocalConfig) => {
  const { data: user } = useGetCurrentUserQuery();
  const lang = user?.nativeLang || 'English';

  const locale: keyof LocalConfig = LanguageLocale[lang as keyof typeof LanguageLocale];
  console.log(lang, config[locale]);
  return {
    t: (str: string) => get(config[locale], str) as string,
  };
};
