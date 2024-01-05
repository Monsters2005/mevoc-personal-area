/* eslint-disable */
import React, { useEffect } from 'react';
import {
  accentColors,
  currentTheme,
  textColor,
  textSizes,
} from '../../../../constants/settings';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { MultiSelector } from '../../../UI/MultiSelector/MultiSelector';
import s from './Appearance.module.scss';
import { SettingsColorSelect } from './ColorSelect/ColorSelect';
import settings from '../../../../pages/Settings/Settings.i18n.json';
import { hexToRgb } from '../../../../utils/lib/hexToRgb';
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from '../../../../store/api/userApi';

type Color = {
  label: string;
  value: string;
  key: number;
};

export default function AppearanceTab() {
  const root = document.documentElement.style;
  const { data: user } = useGetCurrentUserQuery();
  const [update] = useUpdateUserMutation();

  const onThemeSelect = (st: string) => {
    update({ theme: st, id: user?.id });
  };

  const onColorSelect = (color: Color) => {
    const rgb = hexToRgb(color.value);
    const numericValues = [rgb?.r, rgb?.g, rgb?.b].join(',');
    root.setProperty('--accent-color', numericValues);
  };
  const onTextSizeSelect = () => console.log();
  const onTextColorSelect = () => console.log();

  const { t } = useLocalTranslation(settings);

  return (
    <div className={s.appearance_container}>
      <div className={s.appearance_sections}>
        <div className={s.appearance_section}>
          <h3 className={s.appearance_title}>{t('currentTheme')}</h3>
          <div className={s.appearance_content}>
            <MultiSelector
              options={currentTheme}
              defaultActive="light"
              onClick={onThemeSelect}
            />
          </div>
        </div>
        <div className={s.appearance_section}>
          <h3 className={s.appearance_title}>{t('accentColor')}</h3>
          <div className={s.appearance_content}>
            <SettingsColorSelect
              defaultSelected={accentColors[0]}
              onClick={onColorSelect}
              colors={accentColors}
            />
          </div>
        </div>
        <div className={s.appearance_section}>
          <h3 className={s.appearance_title}>{t('textSize')}</h3>
          <div className={s.appearance_content}>
            <MultiSelector
              options={textSizes}
              defaultActive="medium"
              onClick={onTextSizeSelect}
            />
          </div>
        </div>
        <div className={s.appearance_section}>
          <h3 className={s.appearance_title}>{t('textColor')}</h3>
          <div className={s.appearance_content}>
            <MultiSelector
              options={textColor}
              defaultActive="normal"
              onClick={onTextColorSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
