import React from 'react';
import {
  accentColors,
  currentTheme,
  textColor,
  textSizes,
} from '../../../../constants/settings';
import { MultiSelector } from '../../../UI/MultiSelector/MultiSelector';
import { SettingsColorSelect } from '../../ColorSelect/ColorSelect';
import s from './Appearance.module.scss';

export default function AppearanceTab() {
  // TODO: User should be received from the context which will have a data about current user signed in
  // TODO: Add logic to all functions below
  const onThemeSelect = () => console.log();
  const onColorSelect = () => console.log();
  const onTextSizeSelect = () => console.log();
  const onTextColorSelect = () => console.log();

  return (
    <div className={s.appearance_container}>
      <div className={s.appearance_sections}>
        <div className={s.appearance_section}>
          <h3 className={s.appearance_title}>Current Theme</h3>
          <div className={s.appearance_content}>
            <MultiSelector
              options={currentTheme}
              defaultActive="dark"
              onClick={onThemeSelect}
            />
          </div>
        </div>
        <div className={s.appearance_section}>
          <h3 className={s.appearance_title}>Accent Color</h3>
          <div className={s.appearance_content}>
            <SettingsColorSelect
              defaultSelected={accentColors[0]}
              onClick={onColorSelect}
              colors={accentColors}
            />
          </div>
        </div>
        <div className={s.appearance_section}>
          <h3 className={s.appearance_title}>Text Size</h3>
          <div className={s.appearance_content}>
            <MultiSelector
              options={textSizes}
              defaultActive="medium"
              onClick={onTextSizeSelect}
            />
          </div>
        </div>
        <div className={s.appearance_section}>
          <h3 className={s.appearance_title}>Text Color</h3>
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
