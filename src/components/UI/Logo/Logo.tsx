import React from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import s from './Logo.module.scss';

export function Logo() {
  return (
    <div className={s.logo_container}>
      <GlobalSvgSelector id="logo" />
      <span className={s.logo_text}>
        me
        <b>voc</b>
      </span>
    </div>
  );
}
