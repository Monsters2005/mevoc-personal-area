import classNames from 'classnames';
import React from 'react';
import s from './StepsProgress.module.scss';

export type Step = {
  index: number;
};

type StepsProps = {
  steps: Step[];
  activeStep: number;
  setActiveStep: (item: number) => void;
};

type StepProps = {
  item: Step;
  activeStep: number;
  setActiveStep: (item: number) => void;
  length: number;
};

function StepItem({
  item: { index },
  activeStep,
  setActiveStep,
  length,
}: StepProps) {
  return (
    <div
      role="presentation"
      onClick={() => setActiveStep(index)}
      className={classNames(s.steps_item_round, {
        [s.steps_item_state_inactive]: index > activeStep,
        [s.steps_item_state_active]: index === activeStep,
        [s.steps_item_state_complete]: index < activeStep,
      })}
    >
      <span>
        <b>{index}</b>
      </span>
      {length !== index && (
        <div className={s.steps_line_container}>
          <hr
            className={classNames(s.steps_line_common, {
              [s.steps_line_complete]: index < activeStep,
              [s.steps_line_inactive]: index >= activeStep,
            })}
          />
        </div>
      )}
    </div>
  );
}

export default function StepsProgress({
  steps,
  activeStep,
  setActiveStep,
}: StepsProps) {
  return (
    <div className={s.steps_container}>
      {steps.map((item: Step) => (
        <div className={s.steps_item_container} key={item.index}>
          <StepItem
            length={steps.length}
            item={item}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        </div>
      ))}
    </div>
  );
}
