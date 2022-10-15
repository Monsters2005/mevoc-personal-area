import React from 'react';
import './StepsProgress.module.scss';

export type Step = {
  index: number;
  value: string;
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
  item: { index, value },
  activeStep,
  setActiveStep,
  length,
}: StepProps) {
  return (
    <div
      role="presentation"
      onClick={() => setActiveStep(index)}
      className={`steps-item-round ${
        index > activeStep && 'steps-item-state-inactive'
      }
          ${index === activeStep && 'steps-item-state-active'}
          ${index < activeStep && 'steps-item-state-complete'}
      `}
    >
      <span>
        <b>{index}</b>
      </span>
      <p>{value}</p>
      {length !== index && (
        <div className="steps-line-container">
          <hr
            className={`steps-line-common ${
              index < activeStep
                ? 'steps-line-complete'
                : 'steps-line-inactive'
            }`}
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
    <div className="steps-container">
      {steps.map((item: Step) => (
        <div className="steps-item-container" key={item.index}>
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
