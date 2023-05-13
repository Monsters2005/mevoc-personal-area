import classNames from 'classnames';
import React, { useState } from 'react';
import { SettingsSvgSelector } from '../../../SettingsSvgSelector';
import { SettingsColorPicker } from '../ColorPicker/ColorPicker';

import s from './ColorSelect.module.scss';
import '../../../../../styles/lib/react-colorful.scss';

type Color = {
  label: string;
  value: string;
  key: number;
};

type Props = {
  defaultSelected: Color;
  onClick: (color: Color) => void;
  colors: Color[];
};

export function SettingsColorSelect({
  defaultSelected,
  onClick,
  colors,
}: Props) {
  const [customIsOpened, setCustomIsOpened] = useState(false);
  const [color, setColor] = useState(defaultSelected.value);

  function handleSelect(item: Color) {
    setColor(item.value);
    onClick(item);
  }

  function handleCustomSelect(item: string, value: boolean) {
    setColor(item);
    setCustomIsOpened(value);
    onClick({ value: item, key: 0, label: '' });
  }

  return (
    <div className={s.colorpicker_container}>
      <div className={s.colorpicker_pallete}>
        {colors.map(item => (
          <button
            key={item.key}
            className={classNames(s.colorpicker_color, {
              [s.colorpicker_coloractive]: color === item.value,
            })}
            onClick={() => handleSelect(item)}
          >
            <p style={{ backgroundColor: item.value }} />
          </button>
        ))}
      </div>
      <button className={s.colorpicker_result}>
        <SettingsSvgSelector id="pallete" />
        <p>{color}</p>
      </button>

      <button
        className={classNames(s.colorpicker_custom_button, {
          [s.colorpicker_custom_button_opened]: customIsOpened,
        })}
        onClick={() => setCustomIsOpened(!customIsOpened)}
      >
        <SettingsSvgSelector id="color-picker" />
      </button>

      <SettingsColorPicker
        color={color}
        setCustomSelected={(item, value) => handleCustomSelect(item, value)}
        isOpen={customIsOpened}
      />
    </div>
  );
}
