import React, { useEffect, useMemo, useState } from 'react';
import { Word } from '../../../@types/entities/Word';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';
import { cloneObj } from '../../../utils/common/cloneObj';
import { countPercentage } from '../../../utils/common/countPercentage';
import { Queue } from '../../../utils/queue/createQueue';
import { ModalWrapper } from '../../Modals/Wrapper/ModalWrapper';
import { ProgressStage } from '../../UI/StagesProgress/StagesProgress';
import CompletionMessage from '../CompletionMessage/CompletionMessage';
import StageSelector from '../Stages/StageSelector';
import {
  MAX_MISTAKES_VALUE,
  MAX_MISTAKES_VALUE_TEST,
  MAX_STAGES,
} from './Core';
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
      wordsLearned: 0,
      id: 1,
    },
    {
      name: 'whatever',
      words: 16,
      wordsLearned: 0,
      id: 2,
    },
  ];
  const [currentWord, setCurrentWord] = useState(stageQueue.getItem());
  const [passed, setPassed] = useState<Word[] | []>([]);
  const [isCompleted, setIsCompleted] = useState(false);

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
    if (currentWord) {
      if (mistakes > MAX_MISTAKES_VALUE) {
        stageQueue.dequeue();
        stageQueue.enqueue(currentWord);
        setCurrentWord(stageQueue.getItem());
      } else {
        stageQueue.dequeue();
        setCurrentWord(stageQueue.getItem());
        updateProgressStage();
      }
    }
  }

  function completeTestWordHandler(mistakes: number) {
    if (currentWord) {
      if (mistakes < MAX_MISTAKES_VALUE_TEST) {
        setPassed(items => [...items, currentWord]);
      }
      stageQueue.dequeue();
      setCurrentWord(stageQueue.getItem());
      updateProgressStage();
    }

    if (stage.id === MAX_STAGES && stageQueue.size() === 0) {
      setIsCompleted(true);
    }

    // TODO: Call a mutation in the end which would pass the list with passed
    // words and remove them from the list
  }

  return (
    <div className={s.learning_container}>
      <StageSelector
        word={currentWord}
        currentStage={stage}
        onStageComplete={m => completeWordHandler(m)}
        onTestComplete={m => completeTestWordHandler(m)}
      />
      <TransitionWrapper inState={isCompleted}>
        <ModalWrapper>
          <CompletionMessage progresses={results} />
        </ModalWrapper>
      </TransitionWrapper>
    </div>
  );
}
