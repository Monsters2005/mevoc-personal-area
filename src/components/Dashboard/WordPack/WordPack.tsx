import classNames from 'classnames';
import React, { useState } from 'react';
import { getWordsCount } from '../../../utils/getWordsCount';
import { Button } from '../../UI/Button/Button';
import { Pack } from '../WordPacks/types';
import s from './WordPack.module.scss';

type Props = {
  item: Pack;
};

export function WordPack({ item }: Props) {
  const [added, setAdded] = useState(false);

  function addWordPack() {
    setAdded(!added);
    // TODO: pass the funciton here which actully adds a specific list
  }

  return (
    <div className={s.wordpack_container}>
      <div className={s.wordpack_info}>
        <span className={s.wordpack_icon}>
          <img src={item.icon} alt={item.key} />
        </span>
        <h4 className={s.wordpack_title}>{item.name}</h4>
        <p>{getWordsCount(item.words.length)}</p>
      </div>
      <div className={s.wordpack_buttons}>
        <Button
          type="primary"
          styles={{
            padding: '6px 14px',
            fontSize: '13px',
            lineHeight: '19px',
            fontWeight: '600',
          }}
          onClick={() => console.log('view more')}
        >
          VIEW MORE
        </Button>

        <button
          className={classNames(s.wordpack_add, {
            [s.wordpack_added]: added,
          })}
          onClick={addWordPack}
        >
          <span />
        </button>
      </div>
    </div>
  );
}
