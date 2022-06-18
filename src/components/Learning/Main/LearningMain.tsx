import React from 'react';
import { LearningCore } from './Core';
import s from './LearningMain.module.scss';

type Props = {
  setActiveStage: () => void;
};

export function LearningMain({ setActiveStage }: Props) {
  // const [gameState, setGameState] = useState({} as GameEvent);
  // const changeGameState = (e: LearningEvent) => setGameState(e);

  // const learning = new LearningCore();

  return <div className={s.learning_container} />;
}
