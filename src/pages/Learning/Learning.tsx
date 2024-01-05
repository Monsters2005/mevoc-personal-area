import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import s from './Learning.module.scss';
import { LearningHeader } from '../../components/Learning/LearningHeader/LearningHeader';
import { LearningMain } from '../../components/Learning/Main/LearningMain';
import { ProgressStage } from '../../components/UI/StagesProgress/StagesProgress';

import { stages } from '../../constants/stages';
import { lists } from '../../mocks/lists';

import { mergeArrays } from '../../utils/common/mergeArrays';
import { cloneObj } from '../../utils/common/cloneObj';
import { useActiveLists } from '../../context/ActiveLists';
import { Path } from '../../constants/routes';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import learningTr from '../../components/Learning/Learning.i18n.json';

export function LearningPage() {
  const navigate = useNavigate();
  const { t } = useLocalTranslation(learningTr);
  const [tempStages, setTempStages] = useState(
    cloneObj(stages).map(
      (item: { id: number; progress: number; name?: string }) => ({
        ...item,
        name: item.name ? t(item.name) : `${t('stage')} ${item.id}`,
      })
    )
  );
  const [activeStage, setActiveStage] = useState<ProgressStage | null>(
    tempStages[0]
  );
  const { currentLists } = useActiveLists();

  useEffect(() => {
    if (currentLists.length === 0) navigate(`/${Path.HOME}`);
  }, [currentLists]);

  const handleUpdateStages = (item: ProgressStage | null) => {
    const updStages = [...tempStages];
    const id = tempStages.indexOf(activeStage);
    updStages[id] = item;
    setTempStages(updStages);
  };

  const handleSkipStages = () => {
    const updStages = tempStages.map((el: ProgressStage) => {
      if (el.id < 4) el.progress = 100;
      return el;
    });
    setTempStages(updStages);
  };

  const handleComplete = () => {
    const updStages = tempStages.map((el: ProgressStage) => {
      if (el.id === 4) el.progress = 100;
      return el;
    });
    setTempStages(updStages);
  };

  return (
    <div className={s.learning_container}>
      {currentLists.length > 0 && (
        <>
          <LearningHeader
            // TODO: add handler for the function below which will be showing popup and asking if
            // TODO: user wants to end current learning process
            onGoBack={() => navigate('/dashboard')}
            onComplete={handleComplete}
            onSkipStages={handleSkipStages}
            activeStage={activeStage || tempStages[3]}
            stages={tempStages}
            setCurrentStage={item => setActiveStage(item)}
          />
          <LearningMain
            updateStages={handleUpdateStages}
            stage={activeStage || tempStages[3]}
          />
        </>
      )}
    </div>
  );
}
