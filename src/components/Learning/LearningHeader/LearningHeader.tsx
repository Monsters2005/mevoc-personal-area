import React from 'react';
import { Button } from '../../UI/Button/Button';
import StagesProgress, { Stage } from '../../UI/StagesProgress/StagesProgress';
import { LearningSvgSelector } from '../LearningSvgSelector';
import s from './LearningHeader.module.scss';

type Props = {
  onGoBack: () => void;
  onSkipStages: () => void;
  stages: Stage[];
  currentStage: Stage;
  setStage: (item: Stage) => void;
};

export default function LearningHeader({
  onGoBack,
  onSkipStages,
  stages,
  currentStage,
  setStage,
}: Props) {
  return (
    <div className={s.header_container}>
      <Button type="secondary" onClick={onGoBack}>
        <LearningSvgSelector id="arrow-left" />
        Go back
      </Button>
      <StagesProgress stages={stages} />
      <Button type="secondary" onClick={onSkipStages}>
        Move To The Test
        <LearningSvgSelector id="arrow-right" />
      </Button>
    </div>
  );
}
