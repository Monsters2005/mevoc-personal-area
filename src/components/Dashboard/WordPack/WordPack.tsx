import classNames from 'classnames';
import React, { useState } from 'react';
import { Pack } from '../../../@types/entities/WordPack';
import FallbackImgSelector from '../../../assets/FallbackImgSelector';
import { primaryMiddle } from '../../../shared/styles/button-variations';
import { Button } from '../../UI/Button/Button';
import s from './WordPack.module.scss';
import common from '../../UI/Common.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';

type Props = {
  item: Pack;
};

export function WordPack({ item }: Props) {
  const [added, setAdded] = useState(false);
  const { t } = useLocalTranslation(common);

  function addWordPack() {
    setAdded(!added);
    // TODO: pass the funciton here which actully adds a specific list
  }

  return (
    <div className={s.wordpack_container}>
      <div className={s.wordpack_info}>
        <span className={s.wordpack_icon}>
          {item.icon ? (
            <img src={item.icon} alt={item.name} />
          ) : (
            <FallbackImgSelector id="wordpack-cover" />
          )}
        </span>
        <h4 className={s.wordpack_title}>{item.name}</h4>
        <p>
          {`${item.words.length} ${t(
            `word${item.words.length !== 1 ? 's' : ''}`
          )}`}
        </p>
      </div>
      <div className={s.wordpack_buttons}>
        <Button
          type="primary"
          styles={primaryMiddle}
          onClick={() => console.log('view more')}
        >
          {t('viewMore')}
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
