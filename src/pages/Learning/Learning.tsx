/* eslint-disable */
import React, { useState } from 'react';
import s from './Learning.module.scss';
import LearningHeader from '../../components/Learning/LearningHeader/LearningHeader';
import { stages } from '../../constants/stages';
import ThirdStage from '../../components/Learning/Stages/ThirdStage/ThirdStage';
import { LearningMain } from '../../components/Learning/Main/LearningMain';
import { ProgressStage } from '../../components/UI/StagesProgress/StagesProgress';
import { lists } from '../../mocks/lists';
import { mergeArrays } from '../../utils/common/mergeArrays';
import { compareArrOrder } from '../../utils/common/compareArrOrder';

export function LearningPage() {
  const [activeStage, setActiveStage] = useState<ProgressStage>(stages[0]);

  const handleStageChange = (item: ProgressStage) => {
    setActiveStage(item);
    const updStages = stages.map(el => {
      if (el.id === activeStage.id) el.progress = activeStage.progress;
      return el;
    });
  };
  //? has to update stages array as well as current stage, so have to pass all that setting
  //? shit to header and directly to stages progress ui component
  //? from there it shoud return active stage (check github with methods which i deleted)
  const words = mergeArrays(lists.map(el => el.words));

  return (
    <div className={s.learning_container}>
      <LearningHeader
        onGoBack={() => console.log('')}
        onSkipStages={() => console.log('')}
        stages={stages}
      />
      <LearningMain
        setActiveStage={handleStageChange}
        stage={activeStage}
        words={words}
      />
    </div>
  );
}
