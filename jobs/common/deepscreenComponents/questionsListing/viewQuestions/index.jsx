import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  flatMapDeep,
} from 'lodash';
import AddIcon from 'src/web/ats/assets/icons/add_icon_uni.svg';
import CheckmarkIcon from 'src/web/ats/assets/icons/checkmark_light.svg';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import * as S from './styles';
import { customGroupBy, QUESTION_TYPE } from '../utils';

const ViewQuestions = ({
  screeningQuestions,
  questionCategory,
  selectedQuestionIds,
  selectQuestion,
  isLoadingScreeningQuestions,
}) => {
  const [filteredQuestionsList, setFilteredQuestionsList] = useState([]);
  const { name, type } = questionCategory;

  const getIsSelected = (id) => selectedQuestionIds.find((__) => __ === id);

  useEffect(() => {
    if (type === QUESTION_TYPE.skills.type || type === QUESTION_TYPE.roles.type) {
      const tempQuestionsList = screeningQuestions.filter(
        (questionListItem) => questionListItem[type] === name,
      );
      setFilteredQuestionsList(tempQuestionsList);
    } else if (type === QUESTION_TYPE.allQuestions.key) {
      setFilteredQuestionsList(screeningQuestions);
    } else if (type === QUESTION_TYPE.general.key) {
      const filteredGeneralQuestions = screeningQuestions.filter((__) => __.general);
      setFilteredQuestionsList(filteredGeneralQuestions);
    } else {
      const questions = customGroupBy(screeningQuestions, QUESTION_TYPE[type].type);
      const sanitizeQuestions = flatMapDeep(questions);
      setFilteredQuestionsList(sanitizeQuestions);
    }
  }, [questionCategory, screeningQuestions]);

  return (
    !isLoadingScreeningQuestions ? (
      <S.Container>
        {filteredQuestionsList.length ? (
          filteredQuestionsList.map((qItem) => (
            <S.Question key={qItem.es_id}>
              <div>{qItem.description}</div>
              <S.ActionIconContainer
                isAdded={getIsSelected(qItem.es_id)}
                onClick={() => (getIsSelected(qItem.es_id) ? null : selectQuestion(qItem.es_id))}
              >
                <S.AddQuestionIcon
                  src={getIsSelected(qItem.es_id) ? CheckmarkIcon : AddIcon}
                  alt=''
                />
              </S.ActionIconContainer>
            </S.Question>
          ))
        ) : (
          <S.NoQuestionsAvailable>No questions available</S.NoQuestionsAvailable>
        )}
      </S.Container>
    ) : (
      <WaitingIndicator fitParent={true} msg={'Loading screening questions'} />
    )
  );
};

ViewQuestions.propTypes = {
  screeningQuestions: PropTypes.array,
  questionCategory: PropTypes.object,
  selectedQuestionIds: PropTypes.array,
  selectQuestion: PropTypes.func,
  isLoadingScreeningQuestions: PropTypes.bool,
};

export default ViewQuestions;
