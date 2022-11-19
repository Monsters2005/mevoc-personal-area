import React from 'react';
import { Flag } from '../../UI/Flag/Flag';
import s from './LanguageField.module.scss';

type Props = {
  label: string;
  language: string;
  value: string;
};

export function LanguageField({ label, language, value }: Props) {
  return (
    <div className={s.language_container}>
      <h5>{label}</h5>
      <div className={s.language_content}>
        <div className={s.language_flag}>
          <Flag name={language} />
        </div>
        <span>{value}</span>
      </div>
    </div>
  );
}
