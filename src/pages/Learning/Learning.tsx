/* eslint-disable */
import React, { useState } from 'react';
import s from './Learning.module.scss';
import LearningHeader from '../../components/Learning/LearningHeader/LearningHeader';
import { stages } from '../../constants/stages';
import { createQueue } from '../../utils/queue/createQueue';
import ThirdStage from '../../components/Learning/Stages/ThirdStage/ThirdStage';

export function LearningPage() {
  const [activeStage, setActiveStage] = useState(1);
  const stageQueue = createQueue();

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
    </div>
  );
}
