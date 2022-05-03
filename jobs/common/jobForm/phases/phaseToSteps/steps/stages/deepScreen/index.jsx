import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isNil } from 'lodash';
import PropTypes from 'prop-types';
import ViewIcon from 'src/web/ats/assets/icons/visibility_on_port_gore.svg';
import AddIcon from 'src/web/ats/assets/icons/add_icon_uni_white.svg';

import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import jobOverviewSelectors from 'src/web/ats/redux/modules/jobOverview/selector';
import Modal from 'src/web/ats/components/atoms/modal';
import QuestionsListing from 'src/web/ats/components/jobs/common/deepscreenComponents/questionsListing';
import Questionnaire from 'src/web/ats/components/jobs/common/deepscreenComponents/questionnaire';
import * as S from './styles';

const ADD_QUESTIONS = 'add_questions';
const QUESTIONNAIRE = 'questionnaire';
const SUCCESS_MESSAGE = 'updateSuccess';

const Components = {
  [ADD_QUESTIONS]: QuestionsListing,
  [QUESTIONNAIRE]: Questionnaire,
  [SUCCESS_MESSAGE]: Questionnaire,
};

const DeepScreenAssessmentConfig = ({
  deepScreeningQuestions = [],
  updateSelfAssessmentConfigData,
  deepScreenUpdateSuccessStatus,
  setUpdateDeepScreenQuestionnaireSuccessStatus,
  setScreeningQuestions,
}) => {
  const [activeComponentType, setActiveComponentType] = useState(null);
  const [currQuestionnaireList, setCurrQuestionnaireList] = useState(
    [...deepScreeningQuestions],
  );
  const [newAddedQuestions, setNewAddedQuestions] = useState([]);

  useEffect(() => () => setScreeningQuestions({ data: [], total: 0 }), []);

  useEffect(() => {
    if (activeComponentType === QUESTIONNAIRE) {
      setActiveComponentType(SUCCESS_MESSAGE);
      setNewAddedQuestions([]);
      setCurrQuestionnaireList([...deepScreeningQuestions]);
    }
  }, [deepScreeningQuestions]);

  useEffect(() => {
    if (isNil(activeComponentType)) {
      setNewAddedQuestions([]);
      setCurrQuestionnaireList([...deepScreeningQuestions]);
    }
  }, [activeComponentType]);

  const handleAddQuestions = () => {
    setActiveComponentType(ADD_QUESTIONS);
  };

  const handleAddMoreQuestions = (questionnaireData) => {
    setCurrQuestionnaireList([...questionnaireData]);
    setActiveComponentType(ADD_QUESTIONS);
  };

  const addQuestionsToQuestionnaire = (newQuestions) => {
    setNewAddedQuestions([...newQuestions]);
    setActiveComponentType(QUESTIONNAIRE);
  };

  const handleViewAddedQuestions = () => {
    setActiveComponentType(QUESTIONNAIRE);
  };

  const ActiveComponent = Components[activeComponentType];

  const updateDeepScreenQuestionnaire = (updatedQuestionnaireList) => {
    updateSelfAssessmentConfigData('screening_questions')(updatedQuestionnaireList);
    setActiveComponentType(null);
  };

  return (
    <S.InnerWrapper>
      <S.InnerContainer>
        <S.ActionButtons>
          <S.AddQuestionButton
           onClick={handleAddQuestions}
           >
            <img src={AddIcon} alt='' />
            <S.AddQuestionText>Add your questions</S.AddQuestionText>
          </S.AddQuestionButton>
          {deepScreeningQuestions.length || newAddedQuestions.length ? (
            <S.ViewAllQuestionButton onClick={handleViewAddedQuestions}>
              <img src={ViewIcon} alt='' />
              <S.ViewAllQuestionText>
                View Added Questions ({
                deepScreeningQuestions.length + newAddedQuestions.length
                })
              </S.ViewAllQuestionText>
            </S.ViewAllQuestionButton>
          ) : null}
        </S.ActionButtons>
        {activeComponentType
         && <Modal
            showModal={Boolean(activeComponentType)}
            toggleModal={() => setActiveComponentType(null)}
            backgroundBlur={false}
            darkBackground={true}
            isBodyScroll={!deepScreenUpdateSuccessStatus}
          >
            <ActiveComponent
                  currQuestionnaireList={currQuestionnaireList}
                  addQuestionsToQuestionnaire={addQuestionsToQuestionnaire}
                  handleAddMoreQuestions={handleAddMoreQuestions}
                  newAddedQuestions={newAddedQuestions}
                  updateDeepScreenQuestionnaire={updateDeepScreenQuestionnaire}
                  deepScreenUpdateSuccessStatus={deepScreenUpdateSuccessStatus}
                  setActiveComponentType={setActiveComponentType}
                  setUpdateDeepScreenQuestionnaireSuccessStatus={
                    setUpdateDeepScreenQuestionnaireSuccessStatus
                  }
                  updateSelfAssessmentConfigData={updateSelfAssessmentConfigData}
                />
          </Modal>}
      </S.InnerContainer>
    </S.InnerWrapper>
  );
};

DeepScreenAssessmentConfig.propTypes = {
  fetchScreeningQuestions: PropTypes.func,
  setScreeningQuestions: PropTypes.func,
  updateDeepScreenQuestionnaire: PropTypes.func,
  updateSelfAssessmentConfigData: PropTypes.func,
  deepScreenUpdateSuccessStatus: PropTypes.bool,
  setUpdateDeepScreenQuestionnaireSuccessStatus: PropTypes.func,
  deepScreeningQuestions: PropTypes.array,
};

const mapStateToProps = ({ jobOverview }) => ({
  screeningQuestionsData: jobOverviewSelectors.getScreeningQuestionsData(({ jobOverview })),
  deepScreenUpdateSuccessStatus: jobOverviewSelectors.deepScreenUpdateSuccessStatus(
    ({ jobOverview }),
  ),
});

const mapDispatchToProps = {
  setScreeningQuestions: jobOverviewActions.setScreeningQuestions,
  setUpdateDeepScreenQuestionnaireSuccessStatus:
    jobOverviewActions.setUpdateDeepScreenQuestionnaireSuccessStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeepScreenAssessmentConfig);
