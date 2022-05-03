import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import CloseIcon from 'src/web/ats/assets/icons/cross_icon.svg';
import UpdateQuestionnaireSuccessIcon from 'src/web/ats/assets/images/add_job.svg';
import QuestionnaireItem, { QUESTION_TYPES_LIST_DATA } from './questionnaireItemTemplate';
import * as S from './styles';

const Questionnaire = ({
  currQuestionnaireList,
  newAddedQuestions,
  handleAddMoreQuestions,
  updateDeepScreenQuestionnaire,
  deepScreenUpdateSuccessStatus,
  setUpdateDeepScreenQuestionnaireSuccessStatus,
  setActiveComponentType,
}) => {
  const [questionnaireListData, setQuestionnaireListData] = useState(
    [...currQuestionnaireList, ...newAddedQuestions],
  );

  const [questionsEditStatusArray, setQuestionsEditStatusArray] = useState([]);

  useEffect(() => () => setUpdateDeepScreenQuestionnaireSuccessStatus(false), []);

  const updateEditStatus = (status, index) => {
    const questionsEditStatusArrayCopy = [...questionsEditStatusArray];
    questionsEditStatusArrayCopy[index] = status;
    setQuestionsEditStatusArray(questionsEditStatusArrayCopy);
  };

  const deleteAddedQuestion = (index) => {
    const questionnaireListCopy = [...questionnaireListData];
    questionnaireListCopy.splice(index, 1);
    setQuestionnaireListData(questionnaireListCopy);
  };

  const saveEditedQuestion = (updatedQuestion, index) => {
    const questionnaireListCopy = [...questionnaireListData];
    questionnaireListCopy[index] = updatedQuestion;
    setQuestionnaireListData(questionnaireListCopy);
  };

  const handleSubmitQuestionnaire = async () => {
    const updatedQuestionnaireList = questionnaireListData.map((questionData, index) => ({
      ...questionData,
      question_options: questionData.question_type === QUESTION_TYPES_LIST_DATA.NUM.type
        ? [] : questionData.question_options,
      question_number: index + 1,
    }));

    await updateDeepScreenQuestionnaire(updatedQuestionnaireList);
  };

  if (deepScreenUpdateSuccessStatus) {
    return <S.QuestionnaireUpdateSuccessContainer>
    <img src={CloseIcon} alt='' onClick={() => setActiveComponentType(null)} />
    <div>
     <S.QuestionnaireUpdateSuccessImage>
        <img src={UpdateQuestionnaireSuccessIcon} alt='' />
      </S.QuestionnaireUpdateSuccessImage>
      <S.QuestionnaireUpdateSuccessMessage>
      DeepScreen questionnaire has been updated successfully
      </S.QuestionnaireUpdateSuccessMessage>
    </div>
  </S.QuestionnaireUpdateSuccessContainer>;
  }

  const isReadyToSaveQuestionnaire = !questionsEditStatusArray.includes(true);

  return (
    <S.Container>
      <S.SubContainer>
        <React.Fragment>
          {!isEmpty(questionnaireListData)
            ? questionnaireListData.map((qItem, index) => <QuestionnaireItem
                key={index}
                question={qItem}
                questionIndex={index}
                saveEditedQuestion={saveEditedQuestion}
                deleteAddedQuestion={deleteAddedQuestion}
                updateEditStatus={updateEditStatus}
                 />)
            : <S.NoQuestionsInQuestionnaire>
              No questions in questionnaire
              </S.NoQuestionsInQuestionnaire>
          }
          <S.Actions>
            <S.SecondaryActionButton onClick={() => handleAddMoreQuestions(questionnaireListData)}>
                + Add More Questions
            </S.SecondaryActionButton>
            <S.PrimaryActionButton
             onClick={handleSubmitQuestionnaire}
             disabled={!isReadyToSaveQuestionnaire}
             >
              Save Questionnaire
            </S.PrimaryActionButton>
          </S.Actions>
        </React.Fragment>
        </S.SubContainer>
    </S.Container>
  );
};

Questionnaire.propTypes = {
  currQuestionnaireList: PropTypes.array,
  newAddedQuestions: PropTypes.array,
  handleAddMoreQuestions: PropTypes.func,
  deleteAllQuestionsFromQuestionaire: PropTypes.func,
  updateDeepScreenQuestionnaire: PropTypes.func,
  deepScreenUpdateSuccessStatus: PropTypes.bool,
  setUpdateDeepScreenQuestionnaireSuccessStatus: PropTypes.func,
  setActiveComponentType: PropTypes.func,
};

export default Questionnaire;
