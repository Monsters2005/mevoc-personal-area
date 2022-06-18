import React, { useRef, useState } from 'react';
import { useOutsideCheck } from '../../../hooks/useOutsideCheck';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { countPercentage } from '../../../utils/common/countPercentage';
import { pluralizeString } from '../../../utils/components/pluralizeString';
import { Button } from '../../UI/Button/Button';
import { CircularProgress } from '../../UI/CircularProgress/CircularProgress';
import s from './DailyProgress.module.scss';

type Props = {
  words: number;
  wordsLearned: number;
};

export function DashboardDailyProgress({ wordsLearned, words }: Props) {
  const [isHintOpen, setIsHintOpen] = useState(false);
  const percentage = countPercentage(wordsLearned, words);
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
        <CircularProgress
          progressValue={percentage}
          circleStroke={10}
          width={190}
          height={190}
          bgColor="#353742"
          styles={{ marginTop: '60px' }}
        />
        <div className={s.progress_words}>
          {`${wordsLearned} of ${pluralizeString(words)}`}
        </div>
        <Button type="small" onClick={() => setIsHintOpen(true)}>
          <GlobalSvgSelector id="question" />
        </Button>
        {
          // TODO: Add transition below (react-transition-group)
          isHintOpen && (
            <div className={s.progress_hint} ref={hintRef}>
              Here is your progress on the learned words from the currently
              active lists.
            </div>
          )
        }
      </div>
    </CardLayout>
  );
}
