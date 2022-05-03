import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const Stepper = ({
  onSelect,
  steps,
  activeStep,
  showNumber,
  stepWidth,
}) => {
  const lastIndexOfSteps = steps.length - 1;

  return (
    <S.StepperContainer>
      {steps.map((step, stepIndex) => (
        <React.Fragment key={stepIndex}>
          <S.StepperItem>
            <S.StepperItemOuter stepWidth={stepWidth} onClick={() => onSelect(stepIndex + 1)}>
              <S.StepperItemInner
                isStepperActive={activeStep === (stepIndex + 1)}
              >{showNumber && stepIndex + 1}</S.StepperItemInner>
            </S.StepperItemOuter>
            <S.StepperTitle
              isStepperTitleActive={activeStep === (stepIndex + 1)}
            >{step}</S.StepperTitle>
          </S.StepperItem>
          {lastIndexOfSteps === stepIndex ? '' : (
            <S.StepperItemOuter stepWidth={stepWidth} />
          )}
        </React.Fragment>
      ))}
    </S.StepperContainer>
  );
};

Stepper.defaultProps = {
  steps: ['1', '2', '3', '4'],
  showNumber: false,
  activeStep: 2,
  onSelect: (_step) => { },
};

Stepper.propTypes = {
  steps: PropTypes.array,
  showNumber: PropTypes.bool,
  activeStep: PropTypes.number,
  onSelect: PropTypes.func,
  stepWidth: PropTypes.string,
};

export default Stepper;
