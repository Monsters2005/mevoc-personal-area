import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { List } from '../../../@types/entities/List';
import { Word } from '../../../@types/entities/Word';
import { Path } from '../../../constants/routes';
import { useActiveLists } from '../../../context/ActiveLists';
import { TransitionWrapper } from '../../../layouts/Transition/Transition';
import {
  useGetWordsByListIdQuery,
  useUpdateWordMutation,
} from '../../../store/api/wordApi';
import { cloneObj } from '../../../utils/common/cloneObj';
import { countPercentage } from '../../../utils/common/countPercentage';
import { mergeArrays } from '../../../utils/common/mergeArrays';
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
};

export function LearningMain({ stage, updateStages }: Props) {
  const { currentLists } = useActiveLists();

  const [updateWord] = useUpdateWordMutation();

  const words = mergeArrays(currentLists.map(el => el.words));
  const stageQueue = useMemo(() => new Queue(cloneObj(words) as Word[]), []);
  const [currentWord, setCurrentWord] = useState(stageQueue.getItem());
  const [passed, setPassed] = useState<Word[] | []>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    stageQueue.enqueueAll(cloneObj(words));
    setCurrentWord(stageQueue.getItem());
  }, [stage]);

  useEffect(() => {
    if (isCompleted && passed.length !== 0) {
      passed.forEach((item: { id: number }) => {
        updateWord({
          id: item.id,
          dateLearned: moment(new Date()).format('YYYY-MM-DD').toString(),
        });
      });
    }
  }, [isCompleted]);

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
        setPassed((items: any) => [...items, currentWord]);
      }
      stageQueue.dequeue();
      setCurrentWord(stageQueue.getItem());
      updateProgressStage();
    }

    if (stage.id === MAX_STAGES && stageQueue.size() === 0) {
      setIsCompleted(true);
    }
  }

  function getResults(items: Word[]) {
    const results = currentLists.map((item, i) => {
      const learned = item.words.filter(el => items.find(word => word.id === el.id));

      return {
        name: item.name,
        id: i,
        words: item.words.length,
        wordsLearned: learned.length,
      };
    });

    return results;
  }

  const summary = passed ? getResults(passed) : [];

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
          <CompletionMessage progresses={summary} />
        </ModalWrapper>
      </TransitionWrapper>
    </div>
  );
}
