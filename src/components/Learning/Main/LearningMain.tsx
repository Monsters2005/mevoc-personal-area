import React, { useEffect, useMemo, useState } from 'react';
import { Word } from '../../../@types/entities/Word';
import { cloneObj } from '../../../utils/common/cloneObj';
import { countPercentage } from '../../../utils/common/countPercentage';
import { Queue } from '../../../utils/queue/createQueue';
import { ProgressStage } from '../../UI/StagesProgress/StagesProgress';
import CompletionMessage from '../CompletionMessage/CompletionMessage';
import StageSelector from '../Stages/StageSelector';
import { MAX_MISTAKES_VALUE } from './Core';
import s from './LearningMain.module.scss';

type Props = {
  stage: ProgressStage;
  updateStages: (item: ProgressStage | null) => void;
  words: Word[];
};

export function LearningMain({ words, stage, updateStages }: Props) {
  const stageQueue = useMemo(() => new Queue(cloneObj(words) as Word[]), []);
  const results = [
    {
      name: 'for the test',
      words: 10,
      wordsLearned: 6,
      id: 1,
    },
    {
      name: 'whatever',
      words: 16,
      wordsLearned: 6,
      id: 2,
    },
  ];
  const [currentWord, setCurrentWord] = useState(stageQueue.getItem());

  useEffect(() => {
    stageQueue.enqueueAll(cloneObj(words));
    setCurrentWord(stageQueue.getItem());
  }, [stage]);

  function updateProgressStage() {
    stage.progress = Math.round(
      countPercentage(words.length - stageQueue.size(), words.length)
    );
    updateStages(stage);
  }

  function completeWordHandler(mistakes: number) {
    if (mistakes > MAX_MISTAKES_VALUE) {
      stageQueue.dequeue();
      if (currentWord) stageQueue.enqueue(currentWord);
      setCurrentWord(stageQueue.getItem());
    } else {
      stageQueue.dequeue();
      setCurrentWord(stageQueue.getItem());
      updateProgressStage();
    }
  }

  return (
    <div className={s.learning_container}>
      {/* <StageSelector
        word={currentWord}
        currentStage={stage}
        onStageComplete={m => completeWordHandler(m)}
        onTestComplete={() => console.log()} // onComplete={m => completeWordHandler(m)}
      /> */}
      <CompletionMessage progresses={results} />
    </div>
  );
}
