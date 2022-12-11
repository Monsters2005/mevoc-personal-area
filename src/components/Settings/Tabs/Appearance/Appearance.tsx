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

export default function AppearanceTab() {
  // TODO: User should be received from the context which will have a data about
  // TODO: current user signed in
  // TODO: Add logic to all functions below
  const onThemeSelect = () => console.log();
  const onColorSelect = () => console.log();
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
