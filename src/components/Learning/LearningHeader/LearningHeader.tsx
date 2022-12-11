import React from 'react';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { learningBtn } from '../../../shared/styles/button-variations';
import { Button } from '../../UI/Button/Button';
import StagesProgress, {
  ProgressStage,
} from '../../UI/StagesProgress/StagesProgress';
import { LearningSvgSelector } from '../LearningSvgSelector';
import s from './LearningHeader.module.scss';
import learning from '../Learning.i18n.json';

type Props = {
  onGoBack: () => void;
  onSkipStages: () => void;
  stages: ProgressStage[];
  activeStage: ProgressStage;
  setCurrentStage: (item: ProgressStage | null) => void;
};

export function LearningHeader({
  onGoBack,
  onSkipStages,
  stages,
  setCurrentStage,
  activeStage,
}: Props) {
  const { t } = useLocalTranslation(learning);

  return (
    <div className={s.header_container}>
      <div className={s.header_part}>
        <Button styles={learningBtn} type="secondary" onClick={onGoBack}>
          <LearningSvgSelector id="arrow-left" />
          {t('goBack')}
        </Button>
      </div>
      <div className={s.header_part}>
        <StagesProgress
          stages={stages}
          currentStage={activeStage}
          setCurrentStage={setCurrentStage}
        />
      </div>
      <div className={s.header_part}>
        <Button styles={learningBtn} type="secondary" onClick={onSkipStages}>
          {t('moveTo')}
          <LearningSvgSelector id="arrow-right" />
        </Button>
      </div>
    </div>
  );
}
