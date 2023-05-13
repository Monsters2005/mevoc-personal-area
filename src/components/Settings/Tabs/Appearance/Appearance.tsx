import React from 'react';
import classNames from 'classnames';
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
import { useIsMounted } from '../../../../hooks/useDelay';
import { hexToRgb } from '../../../../utils/lib/hexToRgb';
import { darkTheme, lightTheme } from '../../../../constants/kit/themes';

type Color = {
  label: string;
  value: string;
  key: number;
};

export default function AppearanceTab() {
  const root = document.documentElement.style;

  const onThemeSelect = (st: string) => {
    if (st === 'light') {
      Object.entries(lightTheme)
        .map(([key, value]) => [key, value])
        .forEach(([key, value]) => root.setProperty(key, value));
    }
    if (st === 'dark') {
      Object.entries(darkTheme)
        .map(([key, value]) => [key, value])
        .forEach(([key, value]) => root.setProperty(key, value));
    }
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
              defaultActive="dark"
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
