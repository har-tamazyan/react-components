import React, { useState } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import toaster from 'src/web/ats/components/atoms/toaster';
import DeleteIcon from 'src/web/ats/assets/icons/bin_dark.svg';
import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import SaveIcon from 'src/web/ats/assets/icons/checkmark_on.svg';
import CustomSkillDropdown from 'src/web/ats/components/common/customSkillDropdown';
import * as S from './styles';

export const DEBOUNCE_DELAY = 300;
export const MIN_CHAR_TO_TRIGGER_SKILL_SEARCH = 3;

const emptyQuestion = {
  category: '',
  correct_answer_operand: null,
  correct_answer_operator: null,
  description: '',
  es_id: '',
  general: false,
  question_number: null,
  question_options: [{ option_id: 1, option: '', is_correct_option: false }],
  question_type: '',
  role: '',
  skill: '',
  sub_category: '',
};

const Question = ({
  question,
  questionIndex,
  skillsList,
  getSkillsList,
  setSkillsList,
  saveEditedQuestion,
  deleteQuestion,
  handleAddNewQuestion,
  clearAddNewQuestionData,
}) => {
  const [currQuestionData, setCurrQuestionData] = useState({
    ...emptyQuestion,
    ...question,
  });
  const [isWriteMode, setIsWriteMode] = useState(!question);

  const updateQuestion = (key) => (event, selectedOption) => {
    if (key === 'desc') {
      setCurrQuestionData({
        ...currQuestionData,
        description: event.target.value,
        es_id: null,
      });
    } else if (key === 'skill') {
      setCurrQuestionData({
        ...currQuestionData,
        [key]: selectedOption[0] || '',
        es_id: null,
      });
    }
  };

  const debounceFunc = debounce((value, fieldType) => {
    if (fieldType === 'skill') {
      getSkillsList({ query: value, field: fieldType });
    }
  }, DEBOUNCE_DELAY);

  const fetchSkillsOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SKILL_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'skill');
    }
  };

  const handleSaveQuestion = () => {
    if (!currQuestionData.skill) {
      return toaster({
        msg: 'Please add a skill tag',
        type: 'error',
      });
    }
    setSkillsList({ data: [] });

    if (!question) {
      return handleAddNewQuestion(currQuestionData);
    }
    saveEditedQuestion(currQuestionData, questionIndex);
    return setIsWriteMode(false);
  };

  return <S.Container>
  <S.InnerContainer>
    {isWriteMode
      ? <React.Fragment>
        <S.QuestionContentAndActions>
         <S.QuestionContent>
          <S.QuestionHeading>Question</S.QuestionHeading>
          <S.QuestionDescriptionInput
            size={'small'}
            placeholder={'Add you question description here'}
            onChange={updateQuestion('desc')}
            value={currQuestionData.description}
            autoFocus={true}
            />
          </S.QuestionContent>
          <S.QuestionActions>
            <S.SaveQuestionAction onClick={handleSaveQuestion}>
                  <img src={SaveIcon} alt='' />
                </S.SaveQuestionAction>
              {(!question)
              && <S.RemoveQuestionAction
                onClick={() => clearAddNewQuestionData()}
              >
                <img src={DeleteIcon} alt='' />
              </S.RemoveQuestionAction>}
            </S.QuestionActions>
        </S.QuestionContentAndActions>
          <S.QuestionTagInput>
            <S.TagInputHeading>Tag</S.TagInputHeading>
            <CustomSkillDropdown
              placeholder={currQuestionData.skill ? '' : 'Enter skill tag'}
              options={!currQuestionData.skill || skillsList.includes(currQuestionData.skill)
                ? [...skillsList]
                : [...skillsList, currQuestionData.skill]}
              onOptionSelect={updateQuestion('skill')}
              selected={currQuestionData.skill ? [currQuestionData.skill] : []}
              onSearchInputChange={fetchSkillsOnKeyPress}
              isMultiSelect={false}
            />
          </S.QuestionTagInput>
        </React.Fragment>
      : <React.Fragment>
        <S.QuestionContentAndActions>
          <S.QuestionContent>
            <S.QuestionDescription>{question.description}</S.QuestionDescription>
          </S.QuestionContent>
          <S.QuestionActions>
          <S.EditQuestionAction onClick={() => setIsWriteMode(true)}>
              <img src={EditIcon} alt='' />
            </S.EditQuestionAction>
            <S.RemoveQuestionAction
              onClick={() => (
                question ? deleteQuestion(questionIndex) : clearAddNewQuestionData()
              )}
            >
              <img src={DeleteIcon} alt='' />
            </S.RemoveQuestionAction>
          </S.QuestionActions>
        </S.QuestionContentAndActions>
        <S.QuestionTags>
          {question.skill && <S.QuestionTagItem>{question.skill}</S.QuestionTagItem>}
          {question.role && <S.QuestionTagItem>{question.role}</S.QuestionTagItem>}
          {question.general && <S.QuestionTagItem>{question.general}</S.QuestionTagItem>}
        </S.QuestionTags>
    </React.Fragment>}
  </S.InnerContainer>
  </S.Container>;
};

Question.propTypes = {
  question: PropTypes.object,
  questionIndex: PropTypes.number,
  deleteQuestion: PropTypes.func,
  saveEditedQuestion: PropTypes.func,
  handleAddNewQuestion: PropTypes.func,
  clearAddNewQuestionData: PropTypes.func,
  skillsList: PropTypes.array,
  getSkillsList: PropTypes.func,
  setSkillsList: PropTypes.func,
};

export default Question;
