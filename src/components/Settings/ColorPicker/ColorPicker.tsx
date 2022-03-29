import classNames from 'classnames';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { hexToRgb } from '../../../utils/hexToRgb';

import { SettingsSvgSelector } from '../SettingsSvgSelector';

import s from './ColorPicker.module.scss';

type Props = {
  color: string;
  setCustomSelected: (item: string, value: boolean) => void;
  isOpen: boolean;
};

export function ColorPicker({ color, setCustomSelected, isOpen }: Props) {
  const [customColor, setCustomColor] = useState(color);
  const rgbColor = hexToRgb(color);

  function handleSaveCustom() {
    setCustomSelected(customColor, false);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 7) {
      setCustomColor(color);
    } else if (e.target.value.length === 0) {
      setCustomColor('#ffffff');
    } else {
      setCustomColor(e.target.value);
    }
  }

  return (
    <div
      className={classNames(
        s.colorpicker_select,
        isOpen ? s.colorpicker_select__open : s.colorpicker_select__closed
      )}
    >
      <HexColorPicker color={customColor} onChange={setCustomColor} />
      <div className={s.colorpicker_results}>
        <div className={s.colorpicker_hex}>
          <input
            value={customColor}
            prefix="#"
            onChange={e => handleInput(e)}
          />
        </div>

        <div className={s.colorpicker_rgb}>
          <span>{rgbColor?.r}</span>
          <span>{rgbColor?.g}</span>
          <span>{rgbColor?.b}</span>
        </div>
      </div>
      <div className={s.colorpicker_bottom}>
        <div className={s.colorpicker_preview}>
          <p style={{ backgroundColor: customColor }} />
        </div>

        <button className={s.colorpicker_button} onClick={handleSaveCustom}>
          <SettingsSvgSelector id="confirm" />
        </button>
      </div>
    </div>
  );
}
