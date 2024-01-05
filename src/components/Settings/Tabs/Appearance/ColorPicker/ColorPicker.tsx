/* eslint-disable */
import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useIsMounted } from '../../../../../hooks/useDelay';
import { hexToRgb } from '../../../../../utils/lib/colorTransform';
import { SettingsSvgSelector } from '../../../SettingsSvgSelector';

import s from './ColorPicker.module.scss';

type Props = {
  color: string;
  setCustomSelected: (item: string, value: boolean) => void;
  isOpen: boolean;
};

export function SettingsColorPicker({
  color,
  setCustomSelected,
  isOpen,
}: Props) {
  const [customColor, setCustomColor] = useState(color);
  const rgbColor = hexToRgb(color);
  const isMounted = useIsMounted();

  function handleSaveCustom() {
    setCustomSelected(customColor, false);
  }

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (value.length > 7) {
      setCustomColor(color);
    } else if (value.length === 0) {
      setCustomColor('#ffffff');
    } else {
      setCustomColor(value);
    }
  }

  useEffect(() => {
    setCustomColor(color);
  }, [color]);

  return (
    <div
      className={classNames(
        s.colorpicker_select,
        !isMounted && 'remove-animation',
        isOpen ? s.colorpicker_select__open : s.colorpicker_select__closed
      )}
    >
      <HexColorPicker color={customColor} onChange={setCustomColor} />
      <div className={s.colorpicker_results}>
        <div className={s.colorpicker_hex}>
          <input
            value={customColor}
            // prefix={'#'}
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
