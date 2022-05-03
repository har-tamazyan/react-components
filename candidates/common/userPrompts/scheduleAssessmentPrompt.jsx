import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { debounce, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import { CustomDateInput } from 'src/web/ats/components/common/dateInput';
import DynamicInput from 'src/web/ats/components/common/dynamicInput';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from './styles';


export const DEBOUNCE_DELAY = 300;
export const MIN_CHAR_TO_TRIGGER_PLATFORM_SEARCH = 3;

const emptyAssessmentInfo = {
  due_date: null,
  platform: '',
};

const ScheduleAssessmentPrompt = ({
  type,
  title,
  note,
  comment,
  jobApplication,
  status,
  platformList,
  getPlatformList,
  setPlatformList,
  scheduleAssessment,
  cancelAssessment,
  secondaryAction,
}) => {
  const isPromptDisabled = type === 'cancel';

  const initialData = useMemo(() => {
    const scheduleData = (!isEmpty(jobApplication.schedules)
    && jobApplication.schedules.find(
      (_) => _.id === status.scheduleId,
    )) || {};
    return !isEmpty(scheduleData)
      ? {
        due_date: new Date(scheduleData.due_date),
        platform: scheduleData.platform,
      }
      : {};
  }, []);

  useEffect(() => () => setPlatformList([]), []);

  const [assessmentInfo, setAssessmentInfo] = useState({
    ...emptyAssessmentInfo,
    ...initialData,
  });

  const updateAssessmentData = (key) => (event, selectedOption) => {
    const dateInputTypeKeys = ['due_date'];
    const dynamicTextInputTypeKeys = ['platform'];
    let value;
    if (dateInputTypeKeys.includes(key)) {
      value = event;
    }
    if (dynamicTextInputTypeKeys.includes(key)) {
      value = selectedOption;
    }
    setAssessmentInfo({
      ...assessmentInfo,
      [key]: value,
    });
  };

  const debounceFunc = debounce((value) => {
    getPlatformList({ query: value, field: 'assessment_platform' });
  }, DEBOUNCE_DELAY);

  const fetchPlatformsOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_PLATFORM_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'cancel') {
      cancelAssessment({ jobApplicationId: jobApplication.id });
    } else {
      scheduleAssessment({
        type,
        jobApplicationId: jobApplication.id,
        workflow_status: status.id,
        ...assessmentInfo,
      });
    }
    secondaryAction();
  };

  return (
    <S.PromptContainer onSubmit={handleSubmit} type={`${type}_assessment`}>
      <div>
        <S.PromptTitle>{title}</S.PromptTitle>
        { !isEmpty(comment)
          ? <S.PromptComment type={`${type}_assessment`} >
            <span>{comment.label}:&nbsp;</span>
            {comment.value}
            </S.PromptComment>
          : null
          }
        <S.PromptNote type={`${type}_assessment`}>{note}</S.PromptNote>
      </div>
      <S.AssessmentScheduleContainer>
        <S.DatePickerContainer
          selected={assessmentInfo.due_date}
          disabled={isPromptDisabled}
          borderRadius={'8px'}
          >
          {isPromptDisabled && <S.DatePickerLabel>Date</S.DatePickerLabel>}
          <DatePicker
            placeholderText='Due Date'
            enableTabLoop={false}
            minDate={Date.now()}
            selected={assessmentInfo.due_date}
            onChange={updateAssessmentData('due_date')}
            customInput={<CustomDateInput />}
            dateFormat='dd/MM/yyyy'
            disabled={isPromptDisabled}
          />
        </S.DatePickerContainer>
        <S.DynamicInputWrapper disabled={isPromptDisabled}>
          <DynamicInput
              placeholder={assessmentInfo.platform ? '' : 'Assessment Platform'}
              options={!assessmentInfo.platform || platformList.includes(assessmentInfo.platform)
                ? [...platformList]
                : [...platformList, assessmentInfo.platform]}
              onOptionSelect={updateAssessmentData('platform')}
              selected={assessmentInfo.platform}
              onSearchInputChange={fetchPlatformsOnKeyPress}
              isMultiSelect={false}
              boxform={false}
              isSearchable={true}
              isDisabled={isPromptDisabled}
            />
        </S.DynamicInputWrapper>
      </S.AssessmentScheduleContainer>
      <S.PromptButtons>
        <S.PromptPrimaryButton type='submit'>Confirm</S.PromptPrimaryButton>
        <S.PromptSecondaryButton onClick={secondaryAction}>Go back</S.PromptSecondaryButton>
      </S.PromptButtons>
    </S.PromptContainer>
  );
};

ScheduleAssessmentPrompt.propTypes = {
  type: PropTypes.string,
  title: PropTypes.any,
  note: PropTypes.any,
  comment: PropTypes.object,
  jobApplication: PropTypes.object,
  jobApplicationHistory: PropTypes.array,
  status: PropTypes.object,
  platformList: PropTypes.array,
  getPlatformList: PropTypes.func,
  setPlatformList: PropTypes.func,
  scheduleAssessment: PropTypes.func,
  cancelAssessment: PropTypes.func,
  secondaryAction: PropTypes.func,
};

const mapStateToProps = ({ candidateOverview }) => ({
  jobApplicationHistory: candidateOverviewSelectors.getJobApplicationHistory({ candidateOverview }),
  jobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
  platformList: candidateOverviewSelectors.getAssessmentPlatformList({ candidateOverview }),
});

const mapDispatchToProps = {
  getPlatformList: candidateOverviewActions.getAssessmentPlatformList,
  setPlatformList: candidateOverviewActions.setAssessmentPlatformList,
  scheduleAssessment: candidateOverviewActions.scheduleAssessment,
  cancelAssessment: candidateOverviewActions.cancelAssessment,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleAssessmentPrompt);
