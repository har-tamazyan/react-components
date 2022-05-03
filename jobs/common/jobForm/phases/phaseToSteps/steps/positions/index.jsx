/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isNil, times } from 'lodash';
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import { useSelector, useDispatch } from 'react-redux';
import Input from 'src/web/ats/components/atoms/input';
import { CustomDateInput } from 'src/web/ats/components/common/dateInput';
import { STATUS } from 'src/constants/jobs';
import { LightText } from 'src/web/ats/components/common/styles';
import { mapRolesToConstants } from 'src/config/definitions';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import useFeature from 'src/web/ats/components/common/feature/useFeature';
import { FEATURE_KEY } from 'src/config/features';
// eslint-disable-next-line no-unused-vars
import { LAUNCH_JOB_PHASE } from 'src/web/ats/components/jobs/common/constants';
import { InnerWrapper, InnerContainer, WideInnerContainer } from '../styles';
import * as S from './styles';
import {
  MAXIMUM_NUMBER_OF_POSITIONS,
  POSITION_ID_KEY,
  OPEN_DATE_KEY,
  TARGET_DATE_DEFAULT_NUMBER_OF_DAYS,
  TARGET_OFFER_DATE_KEY, RECRUITER_KEY,
  CLOSED_POSITION_STATUSES,
} from './constants';

const emptyPositions = [];

const MINIMUM_NO_POSITIONS = 1;

const Positions = ({
  triggerState,
  gotoNextStep,
  jobForm,
  setJobForm,
  saveJobFormCallback,
  gotoStep,
  isEditMode,
}) => {
  const assignRecruiterFeature = useFeature(FEATURE_KEY.ASSIGN_RECRUITER_ON_POSITION);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const positions = (jobForm?.positions?.sanitized || jobForm?.positions || [])
    .map((item) => ({
      ...item,
      [OPEN_DATE_KEY]: isEditMode && !item[OPEN_DATE_KEY] ? null
        : new Date(item[OPEN_DATE_KEY] ?? null),
      [TARGET_OFFER_DATE_KEY]: isEditMode && !item[TARGET_OFFER_DATE_KEY]
        ? null
        : new Date(item[TARGET_OFFER_DATE_KEY] ?? null),
    }));
  useEffect(() => {
    dispatch(sessionActions.getRecruiterList());
  }, []);

  const recruitersList = useSelector(({ session }) => sessionSelectors
    .getJobRecruitersList({ session }));

  const userId = useSelector(({ session }) => sessionSelectors.getUserId({ session }));
  const isUserAdmin = useSelector(({ session }) => sessionSelectors.isUserAdmin({ session }));
  const { senior_manager, director, recruiting_manager } = jobForm;
  const isRecruiterUpdateAllowed = [senior_manager, director, recruiting_manager].includes(userId)
    || isUserAdmin;

  const recruitersListLabelValueMap = recruitersList.map((recruiter) => ({
    node: <div>{recruiter.name} <LightText>({recruiter.email})</LightText></div>,
    label: recruiter.role === mapRolesToConstants.VENDOR_RPO ? `(RPO) ${recruiter.name}
     (${recruiter.email})` : `${recruiter.name} (${recruiter.email})`,
    html: recruiter.role === mapRolesToConstants.VENDOR_RPO ? `<div
        style="${S.sectionWrapper}">
            <span>${recruiter.name}<br /> (${recruiter.email})</span>
            <span style="${S.roundLabelStyle}">RPO</span></div>`
      : `${recruiter.name}<br />(${recruiter.email})`,
    value: recruiter.id,
  }));


  const numberOfPositionsFromJobFrom = jobForm?.no_of_positions ?? positions.length;
  const [showError, setShowError] = useState(false);
  const [positionsData, setPositionData] = useState([...emptyPositions, ...positions]);
  const [
    stateNumberOfPositions,
    setStateNumberOfPositions,
  ] = useState(numberOfPositionsFromJobFrom || '');
  const [numberOfPositions, setNumberOfPositions] = useState(numberOfPositionsFromJobFrom || 0);

  const handleNumberOfPositionField = (event) => {
    if (/^\d+$/.test(event.target.value) && event.target.value <= MAXIMUM_NUMBER_OF_POSITIONS) {
      setStateNumberOfPositions(event.target.value);
    } else {
      setStateNumberOfPositions(0);
    }
  };

  const generateNumberOfPositions = (currentPositions) => {
    setNumberOfPositions(currentPositions);
    if (positionsData.length <= currentPositions) {
      const placeValues = times(currentPositions - positionsData.length, () => ({
        [POSITION_ID_KEY]: '',
        [OPEN_DATE_KEY]: Date.now(),
        [TARGET_OFFER_DATE_KEY]: addDays(Date.now(), TARGET_DATE_DEFAULT_NUMBER_OF_DAYS),
      }));
      setPositionData([...positionsData, ...placeValues]
        .map((item, index) => ({
          ...item,
          [POSITION_ID_KEY]: item[POSITION_ID_KEY] || `${jobForm.job_code}-${index + 1}`,
        })));
    } else {
      const currentPositionData = [...positionsData];
      setPositionData(
        currentPositionData
          .slice(0, currentPositions - positionsData.length)
          .map((item, index) => ({
            ...item,
            [POSITION_ID_KEY]: item[POSITION_ID_KEY] || `${jobForm.job_code}-${index + 1}`,
          })),
      );
    }
  };

  const handleConfirmPositions = (event) => {
    event.preventDefault();
    const currentPositions = parseInt(stateNumberOfPositions, 10);
    generateNumberOfPositions(currentPositions);
    setJobForm({
      no_of_positions: currentPositions,
    });
  };

  const handleUpdateAssignedRole = (index, key) => (_, selectedOption) => {
    setPositionData(positionsData.map((item, positionIndex) => {
      if (positionIndex !== index) return item;
      return ({
        ...item,
        [key]: selectedOption?.value,
      });
    }));
  };

  const validatePosition = (key, positionIds, value, index) => {
    if (key === POSITION_ID_KEY && !value) return 'Please enter valid Position ID';
    if (key === POSITION_ID_KEY && positionIds.includes(value) && positionIds.indexOf(value) !== index) return 'Position ID should be distinct';
    if (key === OPEN_DATE_KEY && !value && !isEditMode) return 'Position open date is required';
    if (key === TARGET_OFFER_DATE_KEY && !value && !isEditMode) return 'Target offer date is required';
    return null;
  };

  const validatePositionValues = () => {
    const positionIds = positionsData.map((item) => item?.position_id ?? '').filter((item) => item);
    const updatedPositionsData = positionsData.map((item, index) => ({
      ...item,
      error: Object.keys(item).reduce((accum, key) => ({
        ...accum,
        [key]: validatePosition(key, positionIds, item[key] ?? null, index),
      }), {}),
    }));
    setPositionData(updatedPositionsData);
    const errors = updatedPositionsData.map((item) => item.error ?? null)
      .filter((item) => item && (
        (item?.position_id ?? null)
        || (item?.offer_target_date ?? null)
        || (item?.position_open_date ?? null)));
    return (errors ?? []).length === 0
      && stateNumberOfPositions
      && ((!isEditMode && stateNumberOfPositions <= MAXIMUM_NUMBER_OF_POSITIONS)
        || isEditMode);
  };

  const handlePositionFormFieldUpdate = (keyIndex, key) => (data) => {
    const positionIds = positionsData.map((item) => item?.position_id ?? '').filter((item) => item);
    setPositionData(positionsData.map((item, index) => {
      if (index !== keyIndex) return item;
      const value = data?.target?.value ?? data ?? '';
      return ({
        ...item,
        error: {
          ...item.error,
          [key]: validatePosition(key, positionIds, value, index),
        },
        [key]: value,
      });
    }));
  };


  const submitForm = async (event, { goToNext, saveJobForm, gotoStepNo }) => {
    if (event) event.preventDefault();
    const currentPositions = parseInt(stateNumberOfPositions, 10);
    const formPayload = {
      ...jobForm,
      no_of_positions: currentPositions,
      positions: {
        ...(jobForm?.positions ?? {}),
        sanitized: positionsData.map((item) => ({
          ...(item?.id ? { id: item.id } : {}),
          ...(item?.[POSITION_ID_KEY] ? { [POSITION_ID_KEY]: item[POSITION_ID_KEY] } : {}),
          ...(assignRecruiterFeature ? { [POSITION_ID_KEY]: item[POSITION_ID_KEY] ?? '' } : {}),
          [RECRUITER_KEY]: item[RECRUITER_KEY] ?? null,
          [OPEN_DATE_KEY]: format((item[OPEN_DATE_KEY] ?? Date.now()), 'yyyy-MM-dd'),
          [TARGET_OFFER_DATE_KEY]: format((item[TARGET_OFFER_DATE_KEY] ?? Date.now()), 'yyyy-MM-dd'),
          status: item.status,
        })),
      },
    };
    await setJobForm(formPayload);
    if (saveJobForm) saveJobFormCallback();
    if (goToNext) gotoNextStep();
    if (gotoStepNo) gotoStep(gotoStepNo);
  };

  useEffect(() => {
    const noOfPositions = jobForm?.no_of_positions ?? null;
    const isEmptyPositions = (jobForm.positions?.sanitized || jobForm.positions || []).length === 0;
    if (noOfPositions && isEmptyPositions) {
      setTimeout(() => generateNumberOfPositions(jobForm?.no_of_positions));
    }
  }, []);

  useEffect(() => {
    const {
      validate,
      setFormOnRedux,
      saveFormOnBackend,
      goToNextStep,
      gotoStepNo,
    } = triggerState;

    let permissionToSubmit = !validate;
    setShowError(false);
    if (validate) {
      permissionToSubmit = formRef.current.reportValidity() && validatePositionValues();
      if (!permissionToSubmit) return setShowError(true);
    }

    if (setFormOnRedux && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, gotoStepNo });
    }
    if (saveFormOnBackend && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, saveJobForm: true, gotoStepNo });
    }
    return undefined;
  }, [triggerState]);

  const ContainerWrapper = assignRecruiterFeature ? WideInnerContainer : InnerContainer;
  const isPositionClosed = (status) => CLOSED_POSITION_STATUSES.includes(status);

  return (
    <InnerWrapper>
      <ContainerWrapper ref={formRef} onSubmit={submitForm} id='job-assign-form'>
        <S.InputFieldContainer>
          <Input
            isDisabled={isEditMode || jobForm.status === STATUS.OPEN}
            label='No. of Position(s)'
            type='number'
            isAutoFocus={!stateNumberOfPositions}
            onChange={handleNumberOfPositionField}
            capitalizeLabel={false}
            min={MINIMUM_NO_POSITIONS.toString()}
            error={showError
              && (
                (
                  (!isEditMode && stateNumberOfPositions > MAXIMUM_NUMBER_OF_POSITIONS)
                  || isEditMode
                )
                || !stateNumberOfPositions)}
            errorLabel={!stateNumberOfPositions ? 'Number of Positions is required'
              : `Number of positions should not exceed ${MAXIMUM_NUMBER_OF_POSITIONS}`}
            value={stateNumberOfPositions}
            required
          />
          <S.ConfirmButton
            isEditMode={isEditMode || jobForm.status === STATUS.OPEN}
            disabled={(showError
              && (stateNumberOfPositions > MAXIMUM_NUMBER_OF_POSITIONS
                || !stateNumberOfPositions))
              || (isEditMode || jobForm.status === STATUS.OPEN)
            }
            onClick={handleConfirmPositions}
          >Confirm</S.ConfirmButton>
        </S.InputFieldContainer>
        <S.InputGroupWrapper>
          {!numberOfPositions ? <S.NoPositionTitle>No positions added</S.NoPositionTitle> : (
            <>
              {positionsData?.length ? (
                <S.PositionLabelContainer>
                  <S.PositionLabel pType='input'>Position ID</S.PositionLabel>
                  <S.PositionLabel pType='date'>Position Open Date</S.PositionLabel>
                  <S.PositionLabel pType='date'>Target Offer Date</S.PositionLabel>
                  <S.PositionLabel pType='dropdown'>Assigned Recruiter</S.PositionLabel>
                </S.PositionLabelContainer>
              ) : null}

              {positionsData.map((item, index) => (
                <S.PositionRowFormGroup key={index}>
                  <Input
                    inputContainerStyles={S.PositionInputStyle}
                    errorLabel={item?.error?.position_id ?? ''}
                    error={!isNil(item?.error?.position_id)}
                    onChange={handlePositionFormFieldUpdate(index, POSITION_ID_KEY)}
                    capitalizeLabel={false}
                    value={item[POSITION_ID_KEY]}
                    isDisabled={isEditMode || jobForm.status === STATUS.OPEN
                      || isPositionClosed(item?.status)}
                  />
                  <S.DatePickerContainer disabled={isEditMode || jobForm.status === STATUS.OPEN}>
                    <DatePicker
                      disabled={isEditMode || jobForm.status === STATUS.OPEN
                        || isPositionClosed(item?.status)}
                      placeholderText={'Select Date'}
                      enableTabLoop={false}
                      selected={item[OPEN_DATE_KEY]}
                      maxDate={Date.now()}
                      onChange={handlePositionFormFieldUpdate(index, OPEN_DATE_KEY)}
                      customInput={<CustomDateInput />}
                      dateFormat='dd/MM/yyyy'
                    />
                    {!isNil(item?.error?.open_date) ? (<S.ErrorText>{item?.error?.open_date}</S.ErrorText>) : ''}
                  </S.DatePickerContainer>
                  <S.DatePickerContainer disabled={isEditMode && isPositionClosed(item?.status)}>
                    <DatePicker
                      disabled={isEditMode && isPositionClosed(item?.status)}
                      placeholderText={'Select Date'}
                      enableTabLoop={false}
                      selected={item[TARGET_OFFER_DATE_KEY]}
                      minDate={Date.now()}
                      onChange={handlePositionFormFieldUpdate(index, TARGET_OFFER_DATE_KEY)}
                      customInput={<CustomDateInput />}
                      dateFormat='dd/MM/yyyy'
                      required={(isEditMode && !isPositionClosed(item?.status)) || !isEditMode}
                    />
                    {!isNil(item?.error?.offer_target_date) ? (<S.ErrorText>{item?.error?.offer_target_date}</S.ErrorText>) : ''}
                  </S.DatePickerContainer>
                  {assignRecruiterFeature ? (
                    <S.DropdownContainer>
                      <DropDown
                        isDisabled={isEditMode && (isPositionClosed(item?.status)
                          || !isRecruiterUpdateAllowed)}
                        htmlLabel
                        options={recruitersListLabelValueMap}
                        placeholder={'Select the Recruiter'}
                        onOptionSelect={handleUpdateAssignedRole(index, RECRUITER_KEY)}
                        selected={
                          item[RECRUITER_KEY]
                            ? recruitersListLabelValueMap
                              .find((__) => __.value === item[RECRUITER_KEY])
                            : ''
                        }
                        isSearchable
                        required= {(isEditMode && jobForm.status === STATUS.OPEN
                          && !isPositionClosed(item?.status) && isRecruiterUpdateAllowed)
                          || (jobForm.status === STATUS.READY_TO_LAUNCH
                            && !isPositionClosed(item?.status))}
                      />
                    </S.DropdownContainer>
                  ) : null}
                </S.PositionRowFormGroup>
              ))}
            </>
          )}
        </S.InputGroupWrapper>
      </ContainerWrapper>
    </InnerWrapper>
  );
};

Positions.propTypes = {
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  patchDataCallback: PropTypes.func,
  saveJobFormCallback: PropTypes.func,
  gotoStep: PropTypes.func,
  isEditMode: PropTypes.bool,
  activePhase: PropTypes.number,
};

export default Positions;
