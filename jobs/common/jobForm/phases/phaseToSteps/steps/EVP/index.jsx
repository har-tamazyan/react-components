import React, { useState, useEffect, useRef } from 'react';
import { isEmpty, isEqual, cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import RichTextEditor from 'src/web/ats/components/atoms/richTextEditor';
import * as S from './styles';

const emptyEVPQuestionnaire = [
  {
    question: 'What project will I work on?',
    answer: '',
  },
  {
    question: 'Why should this role be interesting to me?',
    answer: '',
  },
  {
    question: 'What is my career growth path?',
    answer: '',
  },
];

const EVP = ({
  triggerState,
  gotoNextStep,
  jobForm,
  saveJobFormCallback,
  setJobForm,
  gotoStep,
  setCurrentStepFormRef,
}) => {
  const initialEVPQuestionnaireData = cloneDeep(
    !isEmpty(jobForm.evp_questionnaire) ? jobForm.evp_questionnaire : emptyEVPQuestionnaire,
  );
  const [evpQuestionnaire, setEVPQuestionnaire] = useState(initialEVPQuestionnaireData);
  const formRef = useRef(null);

  useEffect(() => {
    setCurrentStepFormRef(formRef);
  }, [formRef]);

  const updateEVPValues = (index) => (value) => {
    const updatedEVPQuestionnaire = [...evpQuestionnaire];
    updatedEVPQuestionnaire[index].answer = value;
    setEVPQuestionnaire(updatedEVPQuestionnaire);
  };

  const submitForm = async (event, { goToNext, saveJobForm, gotoStepNo }) => {
    if (event) event.preventDefault();
    const formPayload = {
      evp_questionnaire: !isEqual(evpQuestionnaire, emptyEVPQuestionnaire) ? evpQuestionnaire : [],
    };

    await setJobForm(formPayload);
    if (saveJobForm) saveJobFormCallback();
    if (goToNext) gotoNextStep();
    if (gotoStepNo) gotoStep(gotoStepNo);
  };

  useEffect(() => {
    const {
      validate,
      setFormOnRedux,
      saveFormOnBackend,
      goToNextStep,
      gotoStepNo,
    } = triggerState;

    let permissionToSubmit = !validate;
    if (validate) {
      permissionToSubmit = formRef.current.reportValidity();
    }

    if (setFormOnRedux && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, gotoStepNo });
    }
    if (saveFormOnBackend && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, saveJobForm: true, gotoStepNo });
    }
  }, [triggerState]);

  return (
    <S.InnerWrapper>
      <S.InnerContainer ref={formRef} onSubmit={submitForm} id='job-stages-form'>
        {!isEmpty(evpQuestionnaire)
          ? evpQuestionnaire.map((questionnaireItemData, index) => (
            <S.QuestionnaireItemContainer key={`question-${index}`}>
              <S.Question>{questionnaireItemData.question}</S.Question>
              <RichTextEditor
                updateValue={updateEVPValues(index)}
                htmlContentString={questionnaireItemData.answer || ''}
                placeholder={'Enter your answer'}
                minChar={50}
              />
         </S.QuestionnaireItemContainer>
          ))
          : null}
      </S.InnerContainer>
    </S.InnerWrapper>
  );
};

EVP.propTypes = {
  triggerState: PropTypes.object,
  gotoNextStep: PropTypes.func,
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  saveJobFormCallback: PropTypes.func,
  gotoStep: PropTypes.func,
  setCurrentStepFormRef: PropTypes.func,
};

export default EVP;
