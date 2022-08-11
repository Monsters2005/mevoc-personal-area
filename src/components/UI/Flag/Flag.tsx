import React, { ReactNode } from 'react';
import s from './Flag.module.scss';

export function Flag({ name }: { name: string }) {
  return (
    <div className={s.flag_container}>
      <img
        src={`/images/flags/${name.toLowerCase()}.png`}
        alt={`${name} flag`}
      />
    </div>
  );
}
