import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { LinearProgress } from '../LinearProgress/LinearProgress';
import s from './StagesProgress.module.scss';

export type ProgressStage = {
  id: number;
  name: string;
  progress: number;
};

type Props = {
  stages: ProgressStage[];
};

export default function StagesProgress({ stages }: Props) {
  const [activeState, setActiveState] = useState<ProgressStage | null>(
    stages[0]
  );
  const allCompleted = stages.filter(item => item.progress !== 100).length === 0;

  useEffect(() => {
    function checkActiveStage() {
      const estimateActive = stages.find(
        item => item.progress > 0 && item.progress < 100
      );
      if (!estimateActive) {
        setActiveState(null);
      } else {
        setActiveState(estimateActive);
      }
    }
    checkActiveStage();
  }, [stages]);

  return (
    <div
      className={classNames(s.stages_container, {
        [s.stages_container_completion]: allCompleted,
      })}
    >
      {stages.map(item => (
        <div
          key={item.id}
          className={classNames(s.stages_stage, {
            [s.stages_stage_active]: item.id === activeState?.id,
          })}
        >
          <div className={s.stages_stage_line}>
            <LinearProgress progressValue={item.progress} lineStroke={8} />
          </div>
          <p
            className={classNames(s.stages_stage_title, {
              [s.stages_stage_title_completion]: item.id === activeState?.id,
            })}
          >
            {item.name}
          </p>
        </div>
      ))}
      <div
        className={classNames(s.stages_finish, {
          [s.stages_finish_completion]: allCompleted,
        })}
      >
        <GlobalSvgSelector id="checkmark-circle" />
      </div>
    </div>
  );
}
