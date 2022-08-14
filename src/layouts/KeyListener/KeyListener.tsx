import React, {
  createRef, KeyboardEvent, ReactNode, useEffect,
} from 'react';
import s from './KeyListener.module.scss';

type Listener = {
  key: string;
  function: () => void;
};

type Props = {
  children: ReactNode;
  listeners: Listener[];
  state?: boolean;
};

export default function KeyListener({
  listeners,
  children,
  state = true,
}: Props) {
  const areaRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (state) areaRef?.current?.focus();
  }, [state]);

  function handleKeyPick(item: KeyboardEvent<HTMLDivElement>) {
    listeners.map(el => {
      if (item.key === el.key) el.function();
      return el;
    });
  }

  return (
    <div
      className={s.keylistener_container}
      onKeyDown={e => handleKeyPick(e)}
      tabIndex={0}
      role="button"
      ref={areaRef}
    >
      {children}
    </div>
  );
}
