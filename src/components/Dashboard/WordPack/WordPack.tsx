import classNames from 'classnames';
import React, { useState } from 'react';
import { Pack } from '../../../@types/entities/WordPack';
import { pluralizeString } from '../../../utils/components/pluralizeString';
import { Button } from '../../UI/Button/Button';
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
          <img src={item.icon} alt={item.name} />
        </span>
        <h4 className={s.wordpack_title}>{item.name}</h4>
        <p>{pluralizeString(item.words.length)}</p>
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
          // TODO: pass the funciton here which actully shows info bout pack
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
