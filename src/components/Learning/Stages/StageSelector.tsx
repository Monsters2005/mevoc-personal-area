import React from 'react';
import FirstStage from './FirstStage/FirstStage';
import FourthStage from './FourthStage/FourthStage';
import SecondStage from './SecondStage/SecondStage';
import ThirdStage from './ThirdStage/ThirdStage';
import { Stage } from './types';

export default function StageSelector({
  word,
  currentStage,
  onComplete,
}: Stage) {
  switch (currentStage.id) {
    case 1:
      return (
        <FirstStage
          word={word}
          currentStage={currentStage}
          onComplete={onComplete}
        />
      );
    case 2:
      return (
        <SecondStage
          word={word}
          currentStage={currentStage}
          onComplete={onComplete}
        />
      );
    case 3:
      return (
        <ThirdStage
          word={word}
          currentStage={currentStage}
          onComplete={onComplete}
        />
      );
    case 4:
      return (
        <FourthStage
          word={word}
          currentStage={currentStage}
          onComplete={onComplete}
        />
      );
    default:
      return null;
  }
}
