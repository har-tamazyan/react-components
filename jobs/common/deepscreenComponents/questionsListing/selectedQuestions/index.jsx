import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import Question from './questionTemplate';

import * as S from './styles';


const SelectedQuestions = ({
  addQuestionsToQuestionnaire,
  screeningQuestions,
  selectedQuestionIds,
  deleteSelectedQuestionId,
  skillsList,
  getSkillsList,
  setSkillsList,
}) => {
  const [
    selectedQuestionIdsInTotalQuestions, setSelectedQuestionIdsInTotalQuestions,
  ] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState([]);
  const [isAddQuestionStatus, setIsAddQuestionStatus] = useState(false);

  useEffect(() => {
    if (selectedQuestionIds.length > selectedQuestionIdsInTotalQuestions.length) {
      const newSelectedQuestion = screeningQuestions.find(
        (__) => __.es_id === selectedQuestionIds[selectedQuestionIds.length - 1],
      );
      setTotalQuestions([...totalQuestions, newSelectedQuestion]);
    }
    setSelectedQuestionIdsInTotalQuestions(selectedQuestionIds);
  }, [selectedQuestionIds]);

  const clearAddNewQuestionData = () => {
    setIsAddQuestionStatus(false);
  };

  const handleAddNewQuestions = () => {
    setIsAddQuestionStatus(true);
  };

  const deleteQuestion = (questionIndex) => {
    const totalQuestionsCopy = [...totalQuestions];
    deleteSelectedQuestionId(totalQuestionsCopy[questionIndex].es_id);
    totalQuestionsCopy.splice(questionIndex, 1);
    setTotalQuestions(totalQuestionsCopy);
  };

  const saveEditedQuestion = (newQuestionData, index) => {
    const totalQuestionsCopy = [...totalQuestions];
    if (totalQuestionsCopy[index].es_id) deleteSelectedQuestionId(totalQuestionsCopy[index].es_id);
    totalQuestionsCopy[index] = newQuestionData;
    setTotalQuestions(totalQuestionsCopy);
  };

  const handleAddNewQuestion = (questionData) => {
    setTotalQuestions([...totalQuestions, questionData]);
    clearAddNewQuestionData();
  };

  return (
    <S.Container>
      {(totalQuestions && totalQuestions.length) || isAddQuestionStatus ? (
        <React.Fragment>
          <S.Head>Selected Questions</S.Head>
          <S.List>
            {totalQuestions.map((qItem, index) => (
              <Question
              key={index}
              question={qItem}
              questionIndex={index}
              getSkillsList={getSkillsList}
              skillsList={skillsList}
              setSkillsList={setSkillsList}
              deleteQuestion={deleteQuestion}
              saveEditedQuestion={saveEditedQuestion}
             />
            ))}
            {isAddQuestionStatus
             && <Question
             getSkillsList={getSkillsList}
             skillsList={skillsList}
             setSkillsList={setSkillsList}
             handleAddNewQuestion={handleAddNewQuestion}
             clearAddNewQuestionData={clearAddNewQuestionData}
            />}
          </S.List>
        </React.Fragment>
      ) : (
        <S.NoQuestionsAdded>
          Add questions to list and<br />preview them here.
        </S.NoQuestionsAdded>
      )}
      <S.Actions>
       {!isAddQuestionStatus && <S.Secondary onClick={handleAddNewQuestions}>
            + Add New Question
       </S.Secondary>}
       <S.Primary
        onClick={() => (
          (totalQuestions && totalQuestions.length && !isAddQuestionStatus)
            ? addQuestionsToQuestionnaire(totalQuestions) : null)}
        disabled={!(totalQuestions && totalQuestions.length) || isAddQuestionStatus}
        >
            Finalize Questions ({totalQuestions.length})
       </S.Primary>
      </S.Actions>
    </S.Container>
  );
};

SelectedQuestions.propTypes = {
  selectedQuestionIds: PropTypes.array,
  screeningQuestions: PropTypes.array,
  deleteSelectedQuestionId: PropTypes.func,
  addQuestionsToQuestionnaire: PropTypes.func,
  skillsList: PropTypes.array,
  getSkillsList: PropTypes.func,
  setSkillsList: PropTypes.func,
};

const mapStateToProps = ({ session }) => ({
  skillsList: sessionSelectors.getJobSkillsList({ session }),
});
const mapDispatchToProps = {
  getSkillsList: sessionActions.getSkillsList,
  setSkillsList: sessionActions.setSkillsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedQuestions);
