import React from 'react';
import FirstStage from './FirstStage/FirstStage';
import FourthStage from './FourthStage/FourthStage';
import SecondStage from './SecondStage/SecondStage';
import ThirdStage from './ThirdStage/ThirdStage';
import { StageSelect } from './types';

export default function StageSelector({
  word,
  currentStage,
  onStageComplete,
  onTestComplete,
}: StageSelect) {
  switch (currentStage.id) {
    case 1:
      return (
        <FirstStage
          word={word}
          currentStage={currentStage}
          onComplete={onStageComplete}
        />
      );
    case 2:
      return (
        <SecondStage
          word={word}
          currentStage={currentStage}
          onComplete={onStageComplete}
        />
      );
    case 3:
      return (
        <ThirdStage
          word={word}
          currentStage={currentStage}
          onComplete={onStageComplete}
        />
      );
    case 4:
      return (
        <FourthStage
          word={word}
          currentStage={currentStage}
          onComplete={onTestComplete}
        />
      );

    default:
      return null;
  }
}
