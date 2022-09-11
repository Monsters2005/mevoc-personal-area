import React, { useRef, useState } from 'react';
import { Word } from '../../../@types/entities/Word';
import { useActiveLists } from '../../../context/ActiveLists';
import { useOutsideCheck } from '../../../hooks/useOutsideCheck';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { useGetListsByUserIdQuery } from '../../../store/api/listApi';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';
import { useGetWordsByListIdQuery } from '../../../store/api/wordApi';
import { countPercentage } from '../../../utils/common/countPercentage';
import { pluralizeString } from '../../../utils/components/pluralizeString';
import { Button } from '../../UI/Button/Button';
import { CircularProgress } from '../../UI/CircularProgress/CircularProgress';
import s from './DailyProgress.module.scss';

export function DashboardDailyProgress() {
  const { currentLists } = useActiveLists();
  const { data: user } = useGetCurrentUserQuery();
  const { data: userLists } = useGetListsByUserIdQuery(user?.id || 0);

  const words = currentLists
    .map(arr => arr.words)
    .reduce((a, b) => a.concat(b), []);
  const wordsAll = words.length;
  const wordsLearned = words.filter(el => el.dateLearned).length;

  const [isHintOpen, setIsHintOpen] = useState(false);
  const percentage = countPercentage(wordsLearned, wordsAll);

  const hintRef = useRef(null);

  useOutsideCheck(hintRef, () => {
    setIsHintOpen(false);
  });

  return (
    <CardLayout
      title="Your Progress"
      description="Current progress on selected lists"
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
              {`${wordsLearned} of ${pluralizeString(wordsAll)}`}
            </div>
          </>
        ) : userLists?.length === 0 ? (
          <div className={s.progress_none}>
            <p>
              Here your progress from the selected lists will be displayed.
            </p>
          </div>
        ) : (
          <div className={s.progress_none}>
            <p>Please select lists to see the progress.</p>
          </div>
        )}
        <Button type="small" onClick={() => setIsHintOpen(true)}>
          <GlobalSvgSelector id="question" />
        </Button>
        <TransitionWrapper inState={isHintOpen}>
          <div className={s.progress_hint} ref={hintRef}>
            Your progress on the learned words from the currently active lists.
          </div>
        </TransitionWrapper>
      </div>
    </CardLayout>
  );
}
