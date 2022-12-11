import React, { useEffect, useRef, useState } from 'react';
import { merge } from 'lodash';
import { Word } from '../../../@types/entities/Word';
import { useActiveLists } from '../../../context/ActiveLists';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { useOutsideCheck } from '../../../hooks/useOutsideCheck';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { useGetListsByUserIdQuery } from '../../../store/api/listApi';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';
import { useGetWordsByListIdQuery } from '../../../store/api/wordApi';
import { countPercentage } from '../../../utils/common/countPercentage';
import { Button } from '../../UI/Button/Button';
import { CircularProgress } from '../../UI/CircularProgress/CircularProgress';
import translations from '../Dashboard.i18n.json';
import common from '../../UI/Common.i18n.json';
import s from './DailyProgress.module.scss';

export function DashboardDailyProgress() {
  const { currentLists } = useActiveLists();
  const { data: user } = useGetCurrentUserQuery();
  const { data: userLists } = useGetListsByUserIdQuery(user?.id || 0);

  const [words, setWords] = useState<Word[] | []>([]);

  useEffect(() => {
    setWords(
      currentLists.map(arr => arr.words).reduce((a, b) => a.concat(b), [])
    );
  }, [currentLists]);

  const wordsAll = words?.length || 0;
  const wordsLearned = words?.filter((el: Word) => el.dateLearned).length || 0;

  const [isHintOpen, setIsHintOpen] = useState(false);
  const percentage = countPercentage(wordsLearned, wordsAll);

  const hintRef = useRef(null);
  const { t } = useLocalTranslation(merge(translations, common));

  useOutsideCheck(hintRef, () => {
    setIsHintOpen(false);
  });

  return (
    <CardLayout
      styles={{ width: '370px' }}
      title={t('yourProgress')}
      description={t('progressSubtitle')}
    >
      <div className={s.progress_container}>
        {currentLists.length !== 0 ? ( // eslint-disable-line no-nested-ternary
          <>
            <CircularProgress
              progressValue={percentage}
              circleStroke={10}
              width={190}
              height={190}
              bgColor="#353742"
              styles={{ marginTop: '60px' }}
            />
            <div className={s.progress_words}>
              {`${wordsLearned} ${t('outOf')} ${`${wordsAll || 0} ${t(
                `word${wordsAll !== 1 ? 's' : ''}`
              )}`}
            `}
            </div>
          </>
        ) : userLists?.length === 0 ? (
          <div className={s.progress_none}>
            <p>{t('progressHint')}</p>
          </div>
        ) : (
          <div className={s.progress_none}>
            <p>{t('dailySelect')}</p>
          </div>
        )}
        <Button
          type="small"
          styles={{ position: 'absolute', right: '20px', bottom: '15px' }}
          onClick={() => setIsHintOpen(true)}
        >
          <GlobalSvgSelector id="question" />
        </Button>
        <TransitionWrapper inState={isHintOpen}>
          <div className={s.progress_hint} ref={hintRef}>
            {t('noProgress')}
          </div>
        </TransitionWrapper>
      </div>
    </CardLayout>
  );
}
