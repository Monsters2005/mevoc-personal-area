import React, { CSSProperties } from 'react';
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

const buttonStyles = {
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  color: 'rgba(196, 195, 202, 0.7)',
  textTransform: 'capitalize' as const,
  padding: '2px 10px',
  height: '42px',
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
      <Button styles={buttonStyles} type="secondary" onClick={onGoBack}>
        <LearningSvgSelector id="arrow-left" />
        Go back
      </Button>
      <StagesProgress stages={stages} />
      <Button styles={buttonStyles} type="secondary" onClick={onSkipStages}>
        Move To The Test
        <LearningSvgSelector id="arrow-right" />
      </Button>
    </div>
  );
}
