import classNames from 'classnames';
import React, { useState } from 'react';
import { Pack, PackEnriched } from '../../../@types/entities/WordPack';
import FallbackImgSelector from '../../../assets/FallbackImgSelector';
import { primaryMiddle } from '../../../shared/styles/button-variations';
import { Button } from '../../UI/Button/Button';
import s from './WordPack.module.scss';
import common from '../../UI/Common.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { WordpackModal } from '../../Modals/Wordpack/Wordpack';
import { useModal } from '../../../context/ModalContext';
import { AddListDto } from '../../../@types/dto/list/add.dto';
import { useCreateListMutation } from '../../../store/api/listApi';
import { EventTypes, eventBus } from '../../../packages/EventBus';
import { NotificationType } from '../../../@types/entities/Notification';
import { CustomError } from '../../../@types/entities/ErrorObject';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';
import WordpackImgSelector from '../../../assets/WordpackImgSelector';
import useWordpack from '../../../hooks/useWordpacks';

type Props = {
  item: PackEnriched;
};

export function WordPack({ item }: Props) {
  const [added, setAdded] = useState(false);
  const { t } = useLocalTranslation(common);
  const { setCurrentModal } = useModal();
  const { data: currentUser } = useGetCurrentUserQuery();
  const [createList] = useCreateListMutation();

  const handleList = async (data: AddListDto) => {
    try {
      await createList({
        name: data.listTitle,
        learningLang: 'en',
        userId: data.userId,
        words: data.words,
      }).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: t('listAdd'),
        title: t('success'),
        type: NotificationType.SUCCESS,
      });
    } catch (e) {
      eventBus.emit(EventTypes.notification, {
        message: (e as CustomError).data.message,
        title: t('listAddFail'),
        type: NotificationType.DANGER,
      });
    }
  };

  function addHandler() {
    setAdded(!added);
    handleList({
      listTitle: item.name,
      userId: currentUser?.id || 0,
      words: item.words,
    });
  }

  return (
    <div className={s.wordpack_container}>
      <div className={s.wordpack_info}>
        <span className={s.wordpack_icon}>
          {item.icon ? (
            <WordpackImgSelector id={item.icon} />
          ) : (
            <FallbackImgSelector id="wordpack-cover" />
          )}
        </span>
        <h4 className={s.wordpack_title}>{item.name}</h4>
        <p>
          {`${item.words?.length} ${t(
            `word${item.words?.length !== 1 ? 's' : ''}`
          )}`}
        </p>
      </div>
      <div className={s.wordpack_buttons}>
        <Button
          type="primary"
          styles={primaryMiddle}
          onClick={() => setCurrentModal(
            <WordpackModal onConfirm={() => addHandler()} wordpack={item} />
          )}
        >
          {t('viewMore')}
        </Button>

        <button
          className={classNames(s.wordpack_add, {
            [s.wordpack_added]: added,
          })}
          onClick={addHandler}
        >
          <span />
        </button>
      </div>
    </div>
  );
}
