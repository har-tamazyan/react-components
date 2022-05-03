import React, { useState, useEffect } from 'react';
import { isEmpty, cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import toaster from 'src/web/ats/components/atoms/toaster';
import Input from 'src/web/ats/components/atoms/input';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import AddOptionIcon from 'src/web/ats/assets/icons/c-add-large-grey.svg';
import RemoveOptionIcon from 'src/web/ats/assets/icons/c-delete-large-grey_2.svg';
import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import DeleteIcon from 'src/web/ats/assets/icons/bin_dark.svg';
import CheckedOn from 'src/web/ats/assets/icons/checkmark_on.svg';
import CheckedOff from 'src/web/ats/assets/icons/checkmark_off.svg';
import VetoInfoIcon from 'src/web/ats/assets/icons/c-info-waterloo.svg';
import * as S from './styles';

export const QUESTION_TYPES_LIST_DATA = {
  MCSA: {
    type: 'MCSA',
    head: 'MCSA options with right answer(highlighted)',
    editHead: 'Enter the Answers & Select one or more right answer of multiple answer',
    name: 'Multiple Choice',
  },
  NUM: {
    type: 'NUM',
    head: 'Numeric value and acceptance criteria',
    editHead: 'Select acceptance criteria and enter numeric value',
    name: 'Numeric',
  },
};

const QUESTION_TYPES = Object.values(QUESTION_TYPES_LIST_DATA);

const NUMERIC_ACCEPTANCE_CRITERIA_OPTIONS = [
  {
    label: 'Equal to',
    value: 'eq',
  },
  {
    label: 'Greater than equal to',
    value: 'ge',
  },
  {
    label: 'Less than equal to',
    value: 'le',
  },
  {
    label: 'Greater than',
    value: 'gt',
  },
  {
    label: 'Less than',
    value: 'lt',
  },
  {
    label: 'Not equal to',
    value: 'ne',
  },
];

const emptyQuestion = {
  category: '',
  correct_answer_operand: null,
  correct_answer_operator: null,
  description: '',
  es_id: '',
  general: false,
  question_number: null,
  question_options: [{ option_id: 1, option: '', is_correct_option: false }],
  question_type: QUESTION_TYPES_LIST_DATA.MCSA.type,
  role: '',
  skill: '',
  sub_category: '',
  veto: false,
};

const QuestionnaireItem = ({
  question,
  questionIndex,
  saveEditedQuestion,
  deleteAddedQuestion,
  updateEditStatus,
}) => {
  const [currQuestionnaireItem, setCurrQuestionnaireItem] = useState({
    ...emptyQuestion,
    ...question,
    question_options: (!isEmpty(question.question_options)
      ? question.question_options : emptyQuestion.question_options),
  });
  const [isWriteMode, setIsWriteMode] = useState(false);
  const [vetoStatus, setVetoStatus] = useState(typeof question.veto === 'boolean' ? question.veto : emptyQuestion.veto);

  useEffect(() => {
    setCurrQuestionnaireItem({
      ...emptyQuestion,
      ...question,
      question_options: (!isEmpty(question.question_options)
        ? question.question_options : [...emptyQuestion.question_options]),
    });
  }, [question]);

  useEffect(() => {
    updateEditStatus(isWriteMode, questionIndex);
  }, [isWriteMode]);

  const changeQuestionType = (questionType) => {
    setCurrQuestionnaireItem({
      ...currQuestionnaireItem,
      question_type: questionType.type,
    });
  };

  useEffect(() => {
    if (!Object.keys(QUESTION_TYPES_LIST_DATA).includes(question.question_type)) {
      changeQuestionType(QUESTION_TYPES_LIST_DATA.MCSA);
      setIsWriteMode(true);
    }
  }, []);

  const updateQuestion = (key) => (event, selectedOption, indexInArray) => {
    if (key === 'mc_option') {
      const options = cloneDeep(currQuestionnaireItem.question_options);
      options[indexInArray] = {
        ...options[indexInArray],
        option: event.target.value,
      };
      setCurrQuestionnaireItem({
        ...currQuestionnaireItem,
        question_options: options,
        es_id: null,
      });
    }
    if (key === 'mc_is_correct_option') {
      const options = cloneDeep(currQuestionnaireItem.question_options);
      const newIsCorrectOptionValue = !options[indexInArray].is_correct_option;

      options[indexInArray] = {
        ...options[indexInArray],
        is_correct_option: newIsCorrectOptionValue,
      };

      setCurrQuestionnaireItem({
        ...currQuestionnaireItem,
        question_options: options,
        question_type: QUESTION_TYPES_LIST_DATA.MCSA.type,
        es_id: null,
      });
    }
    if (key === 'numeric_acceptance_criteria') {
      setCurrQuestionnaireItem({
        ...currQuestionnaireItem,
        correct_answer_operator: selectedOption.value,
        es_id: null,
      });
    }
    if (key === 'numeric_answer_value') {
      setCurrQuestionnaireItem({
        ...currQuestionnaireItem,
        // eslint-disable-next-line radix
        correct_answer_operand: parseFloat(event.target.value),
        es_id: null,
      });
    }
  };

  const changeMCOptions = (actionType, index) => {
    let options = cloneDeep(currQuestionnaireItem.question_options);
    if (actionType === 'remove') {
      options.splice(index, 1);
      for (let i = index; i < options.length; i += 1) {
        options[i] = {
          ...options[i],
          option_id: i + 1,
        };
      }
    } else if (actionType === 'add') {
      const newOptionObj = {
        option_id: options.length + 1,
        option: '',
        is_correct_option: false,
      };
      options = [...options, newOptionObj];
    }
    setCurrQuestionnaireItem({
      ...currQuestionnaireItem,
      question_options: options,
      es_id: null,
    });
  };

  const validityCheck = () => {
    if (currQuestionnaireItem.question_type === QUESTION_TYPES_LIST_DATA.MCSA.type) {
      const validityCheckObj = {
        atleastOneCorrectOptionCheck: false,
        optionValueCheck: true,
        noDuplicateOptionsCheck: true,
      };
      const optionValues = [];
      for (let i = 0; i < currQuestionnaireItem.question_options.length; i += 1) {
        const {
          is_correct_option: isCorrectOption,
          option,
        } = currQuestionnaireItem.question_options[i];

        if (isCorrectOption) {
          validityCheckObj.atleastOneCorrectOptionCheck = true;
        }

        if (!option) {
          validityCheckObj.optionValueCheck = false; break;
        }

        if (optionValues.includes(option)) {
          validityCheckObj.noDuplicateOptionsCheck = false; break;
        }
        optionValues.push(option);
      }


      if (!validityCheckObj.optionValueCheck) {
        toaster({
          msg: 'Invalid option value for this question',
          type: 'error',
        });
        return false;
      }
      if (!validityCheckObj.noDuplicateOptionsCheck) {
        toaster({
          msg: 'Option values cannot be same for this question',
          type: 'error',
        });
        return false;
      }
      if (!validityCheckObj.atleastOneCorrectOptionCheck) {
        toaster({
          msg: 'Please choose atleast one correct option for this question',
          type: 'error',
        });
        return false;
      }
    } else if (currQuestionnaireItem.question_type === QUESTION_TYPES_LIST_DATA.NUM.type) {
      if (!currQuestionnaireItem.correct_answer_operator) {
        toaster({
          msg: 'Please choose acceptance-criteria',
          type: 'error',
        });
        return false;
      }
      if (!currQuestionnaireItem.correct_answer_operand) {
        toaster({
          msg: 'Please enter a valid numeric value',
          type: 'error',
        });
        return false;
      }
    }

    return true;
  };

  const handleSaveQuestion = () => {
    if (!validityCheck()) return;
    saveEditedQuestion(
      {
        ...currQuestionnaireItem,
        veto: vetoStatus,
      }, questionIndex,
    );
    setIsWriteMode(false);
  };

  const renderOptions = () => {
    if (currQuestionnaireItem.question_type === QUESTION_TYPES_LIST_DATA.MCSA.type) {
      return <S.MCSAOptions isWriteMode={isWriteMode} >
        {currQuestionnaireItem.question_options.map((optionItem, index) => (
        <S.MCSAOptionItem key={optionItem.option_id}>
          <S.MCSAOptionChecked
            src={optionItem.is_correct_option ? CheckedOn : CheckedOff}
            isWriteMode={isWriteMode}
            onClick={() => (isWriteMode ? updateQuestion('mc_is_correct_option')(null, null, index) : null)}
            alt=''
          />
          <Input
            value={optionItem.option}
            onChange={(e) => updateQuestion('mc_option')(e, null, index)}
            readOnly={!isWriteMode}
          />
          {isWriteMode && <React.Fragment>
          {currQuestionnaireItem.question_options.length > 1 && <S.RemoveMCSAOption
           src={RemoveOptionIcon}
           onClick={() => changeMCOptions('remove', index)}
           />}
          {(index === currQuestionnaireItem.question_options.length - 1)
           && <S.AddMCSAOption
            src={AddOptionIcon}
            onClick={() => changeMCOptions('add')}
            />}
          </React.Fragment>}
        </S.MCSAOptionItem>
        ))}
      </S.MCSAOptions>;
    }

    if (currQuestionnaireItem.question_type === QUESTION_TYPES_LIST_DATA.NUM.type) {
      return <S.NumericOptions>
      <S.NumericAcceptanceCriteria>
        {isWriteMode
          ? <DropDown
          options={NUMERIC_ACCEPTANCE_CRITERIA_OPTIONS}
          placeholder={'Select acceptance criteria'}
          onOptionSelect={updateQuestion('numeric_acceptance_criteria')}
          selected={NUMERIC_ACCEPTANCE_CRITERIA_OPTIONS.find(
            (_) => _.value === currQuestionnaireItem.correct_answer_operator,
          )}
          isDisabled={!isWriteMode}
        />
          : <Input
        type={'text'}
        value={NUMERIC_ACCEPTANCE_CRITERIA_OPTIONS.find(
          (_) => _.value === currQuestionnaireItem.correct_answer_operator,
        )?.label || currQuestionnaireItem.correct_answer_operator || ''}
        readOnly={true}
        />}
      </S.NumericAcceptanceCriteria>
      <S.NumericAnswerInput>
        <Input
          type={'number'}
          placeholder={'Enter numeric value'}
          onChange={updateQuestion('numeric_answer_value')}
          value={currQuestionnaireItem.correct_answer_operand || ''}
          readOnly={!isWriteMode}
        />
      </S.NumericAnswerInput>
    </S.NumericOptions>;
    }

    return null;
  };

  const VetoChoice = () => <S.VetoChoiceContainer>
      <S.VetoCheckbox
       isWriteMode={isWriteMode}
       src={vetoStatus ? CheckedOn : CheckedOff}
       onClick={isWriteMode ? (() => setVetoStatus(!vetoStatus)) : null}
        />
      Veto question
      <Tooltip title="If the candidate's response doesn't match the acceptance criteria for even one of the veto questions, the candidate will be rejected" position='top' size='small'>
      <S.VetoInfo src={VetoInfoIcon} />
      </Tooltip>
    </S.VetoChoiceContainer>;

  return <S.QuestionWrapper key={currQuestionnaireItem.es_id || currQuestionnaireItem.id}>
    <S.QuestionAndItsTypes>
      <S.QuestionSubWrapper>
        <S.Question>{`${questionIndex + 1}. ${currQuestionnaireItem.description}`}</S.Question>
        <S.QuestionType>
          <S.QuestionTypeHead>{isWriteMode ? 'Select the answer type' : 'Answer type'}</S.QuestionTypeHead>
          <S.QuestionTypeItems>
            {QUESTION_TYPES.map((qItemType) => <S.QuestionTypeItem
                key={qItemType.type}
                isWriteMode={isWriteMode}
                isActive={currQuestionnaireItem.question_type === qItemType.type}
                onClick={() => (isWriteMode ? changeQuestionType(qItemType) : null)}
              >{qItemType.name}</S.QuestionTypeItem>)}
          </S.QuestionTypeItems>
        </S.QuestionType>
      </S.QuestionSubWrapper>
      {!isWriteMode && <S.EditQuestion onClick={() => setIsWriteMode(true)}>
        <img src={EditIcon} alt='' />
      </S.EditQuestion>}
      <S.RemoveQuestion onClick={() => deleteAddedQuestion(questionIndex)}>
        <img src={DeleteIcon} alt='' />
      </S.RemoveQuestion>
    </S.QuestionAndItsTypes>
    <S.OptionsWrapper>
      <S.OptionsHead isWriteMode={isWriteMode}>{isWriteMode
        ? QUESTION_TYPES_LIST_DATA[currQuestionnaireItem.question_type]?.editHead
        : QUESTION_TYPES_LIST_DATA[currQuestionnaireItem.question_type]?.head}</S.OptionsHead>
        {renderOptions()}
        <S.QuestionFooterContainer>
          {!(!isWriteMode && !vetoStatus) && <VetoChoice/>}
          {isWriteMode && <S.SaveQuestion onClick={handleSaveQuestion}>Save</S.SaveQuestion>}
        </S.QuestionFooterContainer>
    </S.OptionsWrapper>
  </S.QuestionWrapper>;
};

QuestionnaireItem.propTypes = {
  question: PropTypes.object,
  questionIndex: PropTypes.number,
  saveEditedQuestion: PropTypes.func,
  deleteAddedQuestion: PropTypes.func,
  updateEditStatus: PropTypes.func,
};

export default QuestionnaireItem;
