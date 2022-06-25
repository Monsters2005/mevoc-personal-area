import React, { CSSProperties } from 'react';
import { Button } from '../../UI/Button/Button';
import StagesProgress, {
  ProgressStage,
} from '../../UI/StagesProgress/StagesProgress';
import { LearningSvgSelector } from '../LearningSvgSelector';
import s from './LearningHeader.module.scss';

type Props = {
  onGoBack: () => void;
  onSkipStages: () => void;
  stages: ProgressStage[];
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
}: Props) {
  return (
    <div className={s.header_container}>
      <div className={s.header_part}>
        <Button styles={buttonStyles} type="secondary" onClick={onGoBack}>
          <LearningSvgSelector id="arrow-left" />
          Go back
        </Button>
      </div>
      <div className={s.header_part}>
        <StagesProgress stages={stages} />
      </div>
      <div className={s.header_part}>
        <Button styles={buttonStyles} type="secondary" onClick={onSkipStages}>
          Move To The Test
          <LearningSvgSelector id="arrow-right" />
        </Button>
      </div>
    </div>
  );
}
