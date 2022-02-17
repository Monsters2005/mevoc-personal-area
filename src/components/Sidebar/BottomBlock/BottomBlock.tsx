import React from 'react';
import { SidebarSvgSelector } from '../SidebarSvgSelector';
import s from './BottomBlock.module.scss';

export function SidebarBottomBlock() {
  return (
    <div className={s.bottomblock_container}>
      <button className={s.bottomblock_button}>
        <span className={s.bottomblock_icon}>
          <SidebarSvgSelector id="question" />
        </span>
        <p className={s.bottomblock_name}>Help</p>
      </button>
      <button className={s.bottomblock_button}>
        <span className={s.bottomblock_icon}>
          <SidebarSvgSelector id="signout" />
        </span>
        <p className={s.bottomblock_name}>Log Out</p>
      </button>
    </div>
  );
}
