import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import jobOverviewSelectors from 'src/web/ats/redux/modules/jobOverview/selector';
import TypeBasedQuestion from './typeBasedQuestion';
import ViewQuestions from './viewQuestions';
import SelectedQuestions from './selectedQuestions';
import { QUESTION_TYPE } from './utils';
import * as S from './styles';

const QuestionsListing = ({
  fetchScreeningQuestions,
  screeningQuestionsData,
  addQuestionsToQuestionnaire,
}) => {
  const {
    data: screeningQuestions,
    isLoading: isLoadingScreeningQuestions,
  } = screeningQuestionsData;

  const [questionCategory, setQuestionCategory] = useState({
    name: QUESTION_TYPE.allQuestions.name,
    type: QUESTION_TYPE.allQuestions.key,
  });
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);

  useEffect(fetchScreeningQuestions, []);

  const handleQuestionCategory = (name, type) => {
    setQuestionCategory({ name, type });
  };

  const selectQuestion = (id) => {
    setSelectedQuestionIds((prevId) => [...prevId, id]);
  };

  const deleteSelectedQuestionId = (id) => {
    const filterSelectedQuestionIds = selectedQuestionIds.filter((__) => __ !== id);
    setSelectedQuestionIds(filterSelectedQuestionIds);
  };

  return (
    <S.Container>
      <S.SubContainer>
          <TypeBasedQuestion
            screeningQuestions={screeningQuestions}
            isLoadingScreeningQuestions={isLoadingScreeningQuestions}
            handleQuestionCategory={handleQuestionCategory}
          />
          <S.ViewAndSelectedContainer>
            <ViewQuestions
              screeningQuestions={screeningQuestions}
              isLoadingScreeningQuestions={isLoadingScreeningQuestions}
              questionCategory={questionCategory}
              selectedQuestionIds={selectedQuestionIds}
              selectQuestion={selectQuestion}
            />
            <SelectedQuestions
              screeningQuestions={screeningQuestions}
              selectedQuestionIds={selectedQuestionIds}
              deleteSelectedQuestionId={deleteSelectedQuestionId}
              addQuestionsToQuestionnaire={addQuestionsToQuestionnaire}
            />
          </S.ViewAndSelectedContainer>
        </S.SubContainer>
    </S.Container>
  );
};

QuestionsListing.propTypes = {
  fetchScreeningQuestions: PropTypes.func,
  screeningQuestionsData: PropTypes.object,
  deepScreeningQuestions: PropTypes.array,
  addQuestionsToQuestionnaire: PropTypes.func,
  handleAddMoreQuestions: PropTypes.func,
  handleSubmitQuestionnaire: PropTypes.func,
  selectQuestion: PropTypes.func,
  deleteQuestion: PropTypes.func,
  screeningQuestions: PropTypes.array,
  selectedQuestionIds: PropTypes.array,
  newAddedQuestions: PropTypes.array,
  closeModal: PropTypes.func,
};

const mapStateToProps = ({ jobOverview }) => ({
  screeningQuestionsData: jobOverviewSelectors.getScreeningQuestionsData(({ jobOverview })),
});
const mapDispatchToProps = {
  fetchScreeningQuestions: jobOverviewActions.fetchScreeningQuestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsListing);
