/* eslint-disable */
import React, { useState } from 'react';
import s from './Learning.module.scss';
import LearningHeader from '../../components/Learning/LearningHeader/LearningHeader';
import { stages } from '../../constants/stages';
import FirstStage from '../../components/Learning/Stages/FirstStage/FirstStage';

export function LearningPage() {
  const [activeStage, setActiveStage] = useState(1);

  const getCurrentStage = (id: number) => {
    switch (id) {
      case 1:
        return (
          <FirstStage
            wordLearning="oka"
            wordNative="хорошо"
            onComplete={() => console.log('')}
          />
        );

      default:
        return null;
    }
  };

  const handleStageChange = () => {};

  return (
    <div className={s.learning_container}>
      <LearningHeader
        onGoBack={() => console.log('')}
        onSkipStages={() => console.log('')}
        stages={stages}
        currentStage={{
          id: 0,
          name: '',
          progress: 0,
        }}
        setStage={item => console.log(item)}
      />
      {getCurrentStage(activeStage)}
    </div>
  );
}
