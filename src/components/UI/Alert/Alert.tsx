import React, { ReactNode } from 'react';
import s from './Alert.module.scss';

type Props = {
  icon: ReactNode;
  title: string;
  text: string;
};

export default function Alert({ icon, title, text }: Props) {
  return (
    <div className={s.alert_container}>
      <span className={s.alert_icon}>{icon}</span>
      <h2 className={s.alert_title}>{title}</h2>
      <p className={s.alert_text}>{text}</p>
    </div>
  );
}
