/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'src/web/ats/components/atoms/input';
import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import { CustomDateInput } from 'src/web/ats/components/common/dateInput';
import DatePicker from 'react-datepicker';
import { isNil, times } from 'lodash';
import {
  POSITION_ID_KEY,
  TARGET_OFFER_DATE_KEY,
  MAXIMUM_NUMBER_OF_POSITIONS,
  OPEN_DATE_KEY,
  TARGET_DATE_DEFAULT_NUMBER_OF_DAYS, RECRUITER_KEY,
} from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/positions/constants';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { LightText } from 'src/web/ats/components/common/styles';
import { mapRolesToConstants } from 'src/config/definitions';
import { FEATURE_KEY } from 'src/config/features';
import useFeature from 'src/web/ats/components/common/feature/useFeature';
import * as S from './styles';

const emptyPositions = [];

const AddPositions = ({ positions, jobDetails, onClose }) => {
  const dispatch = useDispatch();
  const [openDate, setOpenDate] = useState(Date.now());
  const { id: jobId, created_at: createdAt } = jobDetails;

  const [existingPositionId, setExistingPositionId] = useState([]);
  const [showError, setShowError] = useState(false);
  const [positionsData, setPositionData] = useState(emptyPositions);
  const [stateNumberOfPositions, setStateNumberOfPositions] = useState(undefined);
  const [numberOfPositions, setNumberOfPositions] = useState('');

  const assignRecruiterFeature = useFeature(FEATURE_KEY.ASSIGN_RECRUITER_ON_POSITION);

  useEffect(() => {
    dispatch(sessionActions.getRecruiterList());
  }, []);

  const recruitersList = useSelector(({ session }) => sessionSelectors
    .getJobRecruitersList({ session }));

  const recruitersListLabelValueMap = recruitersList.map((recruiter) => ({
    node: <div>{recruiter.name} <LightText>({recruiter.email})</LightText></div>,
    label: recruiter.role === mapRolesToConstants.VENDOR_RPO
      ? `(RPO) ${recruiter.name} (${recruiter.email})` : `${recruiter.name} (${recruiter.email})`,
    html: recruiter.role === mapRolesToConstants.VENDOR_RPO ? `<div
        style="${S.sectionWrapper}">
            <span>${recruiter.name}<br /> (${recruiter.email})</span>
            <span style="${S.roundLabelStyle}">RPO</span></div>`
      : `${recruiter.name}<br />(${recruiter.email})`,
    value: recruiter.id,
  }));

  const validatePosition = (key, positionIds, value, index) => {
    if (key === POSITION_ID_KEY && !value) return 'Please enter valid Position ID';
    if (key === POSITION_ID_KEY && positionIds.includes(value) && positionIds.indexOf(value) !== index) return 'Position ID should be distinct';
    if (key === OPEN_DATE_KEY && !value) return 'Position open date is required';
    if (key === TARGET_OFFER_DATE_KEY && !value) return 'Target offer date is required';
    if (key === RECRUITER_KEY && !value) return 'Please select Recruiter';
    return null;
  };

  const handleUpdateAssignedRole = (index, key) => (_, selectedOption) => {
    setPositionData(positionsData.map((item, positionIndex) => {
      if (positionIndex !== index) return item;
      return ({
        ...item,
        error: {
          ...item.error,
          [key]: validatePosition(key, positionIndex, selectedOption?.value, index),
        },
        [key]: selectedOption?.value,
      });
    }));
  };

  useEffect(() => {
    const open = (positions?.open ?? []).map((item) => item.position_id);
    const closed = (positions?.closed ?? []).map((item) => item.position_id);
    const cancelled = (positions?.cancelled ?? []).map((item) => item.position_id);
    const onHold = (positions?.on_hold ?? []).map((item) => item.position_id);
    setExistingPositionId([...open, ...closed, ...cancelled, ...onHold]);
  }, [positions]);

  const handleNumberOfPositionField = (event) => {
    if (/^\d+$/.test(event.target.value) && event.target.value <= MAXIMUM_NUMBER_OF_POSITIONS) {
      setStateNumberOfPositions(event.target.value);
    } else {
      setStateNumberOfPositions('');
    }
  };

  const generatePositionId = (index, code, list) => {
    if (list.includes(`${code}-${index}`)) return generatePositionId(index + 1, code, list);
    return `${code}-${index}`;
  };

  const handleOpenDateChange = (date) => {
    setOpenDate(date);
  };

  const handleConfirmPositions = (event) => {
    event.preventDefault();
    const numberOfOpenPositions = (jobDetails?.open_positions ?? []).length;
    const currentPositions = parseInt(stateNumberOfPositions, 10);
    setNumberOfPositions(currentPositions);
    if (positionsData.length <= currentPositions) {
      const placeValues = times(currentPositions - positionsData.length, () => ({
        [POSITION_ID_KEY]: '',
        [OPEN_DATE_KEY]: Date.now(),
        [TARGET_OFFER_DATE_KEY]: addDays(Date.now(), TARGET_DATE_DEFAULT_NUMBER_OF_DAYS),
        [RECRUITER_KEY]: '',
      }));
      setPositionData(
        [...positionsData, ...placeValues]
          .reduce((accum, item, index) => [
            ...accum,
            {
              ...item,
              [POSITION_ID_KEY]: item[POSITION_ID_KEY]
                  || generatePositionId(numberOfOpenPositions + (index + 1), jobDetails.job_code,
                    [...existingPositionId, ...accum.map((_) => _.position_id)]),
            },
          ], []),
      );
    } else {
      const currentPositionData = [...positionsData];
      setPositionData(
        currentPositionData
          .slice(0, currentPositions - positionsData.length)
          .reduce((accum, item, index) => [
            ...accum,
            {
              ...item,
              [POSITION_ID_KEY]: item[POSITION_ID_KEY]
                  || generatePositionId(numberOfOpenPositions + (index + 1), jobDetails.job_code,
                    [...existingPositionId, ...accum.map((_) => _.position_id)]),
            },
          ], []),
      );
    }
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
        || (item?.position_open_date ?? null)
        || (item?.recruiter ?? null)
      ));
    return (errors ?? []).length === 0
      && stateNumberOfPositions
      && stateNumberOfPositions <= MAXIMUM_NUMBER_OF_POSITIONS;
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

  const handleCreateJobPositions = useCallback((event) => {
    setShowError(false);
    if (!validatePositionValues()) {
      event.preventDefault();
      setShowError(true);
      return;
    }
    const data = {
      num_of_positions: Number.parseInt(numberOfPositions, 10),
      positions: positionsData.map((item) => ({
        ...item,
        [TARGET_OFFER_DATE_KEY]: (item[TARGET_OFFER_DATE_KEY] ?? null) ? format(item[TARGET_OFFER_DATE_KEY], 'yyyy-MM-dd') : Date.now(),
      })),
      open_date: format(openDate, 'yyyy-MM-dd'),
    };

    dispatch(jobOverviewActions.createJobPositions({ id: jobId, data }));
  }, [positionsData, dispatch, openDate, numberOfPositions]);


  return (
    <S.Container>
      <S.Title>Open New Position(s)</S.Title>
      <S.FieldContainer>
        <S.FormFieldWrapper>
          <S.FieldDataContainer>
            <S.DatePickerLabel>Start Date</S.DatePickerLabel>
            <DatePicker
              placeholderText={'DD/MM/YY'}
              enableTabLoop={false}
              minDate={new Date(createdAt)}
              maxDate={Date.now()}
              selected={openDate}
              onChange={handleOpenDateChange}
              customInput={<CustomDateInput />}
              dateFormat='dd/MM/yyyy'
            />
          </S.FieldDataContainer>
        </S.FormFieldWrapper>
        <S.InputFieldContainer>
          <Input
            inputContainerStyles={S.InputContainerStyles}
            label='No. of Position(s)'
            type='number'
            onChange={handleNumberOfPositionField}
            capitalizeLabel={false}
            error={showError
            && (stateNumberOfPositions > MAXIMUM_NUMBER_OF_POSITIONS || !stateNumberOfPositions)}
            errorLabel={!stateNumberOfPositions ? 'Number of positions is required'
              : `Number of positions should not exceed ${MAXIMUM_NUMBER_OF_POSITIONS}`}
            required
            value={stateNumberOfPositions}/>
          <S.ConfirmButton
            disabled={showError
            && (stateNumberOfPositions > MAXIMUM_NUMBER_OF_POSITIONS || !stateNumberOfPositions)}
             onClick={handleConfirmPositions}>Confirm
          </S.ConfirmButton>
        </S.InputFieldContainer>
        <S.InputGroupWrapper empty={!numberOfPositions}>
          {!numberOfPositions ? <S.NoPositionTitle>No positions added</S.NoPositionTitle> : (
            <>
              {positionsData.map((item, index) => (
                <S.PositionRowFormGroup key={index}>
                  <Input
                    inputContainerStyles={ { minWidth: '200px' } }
                    label='Position ID'
                    onChange={handlePositionFormFieldUpdate(index, POSITION_ID_KEY)}
                    errorLabel={item?.error?.position_id ?? ''}
                    error={!isNil(item?.error?.position_id)}
                    capitalizeLabel={false}
                    value={item[POSITION_ID_KEY]}
                  />
                  <S.FieldDataContainer width="180px" withMargin>
                    <S.DatePickerLabel>Position Open Date</S.DatePickerLabel>
                    <DatePicker
                      placeholderText={'Select Date'}
                      enableTabLoop={false}
                      selected={item[OPEN_DATE_KEY]}
                      maxDate={Date.now()}
                      onChange={handlePositionFormFieldUpdate(index, OPEN_DATE_KEY)}
                      customInput={<CustomDateInput />}
                      dateFormat='dd/MM/yyyy'
                    />
                    {!isNil(item?.error?.open_date) ? (<S.ErrorText>{item?.error?.open_date}</S.ErrorText>) : ''}
                  </S.FieldDataContainer>
                  <S.FieldDataContainer width="180px" withMargin>
                    <S.DatePickerLabel>Target Offer Date</S.DatePickerLabel>
                    <DatePicker
                      placeholderText={'Select Date'}
                      enableTabLoop={false}
                      selected={item[TARGET_OFFER_DATE_KEY]}
                      minDate={Date.now()}
                      onChange={handlePositionFormFieldUpdate(index, TARGET_OFFER_DATE_KEY)}
                      customInput={<CustomDateInput />}
                      dateFormat='dd/MM/yyyy'
                      required
                    />
                    {!isNil(item?.error?.offer_target_date) ? (<S.ErrorText>{item?.error?.offer_target_date}</S.ErrorText>) : ''}
                  </S.FieldDataContainer>
                  {assignRecruiterFeature ? (<S.FieldDataContainer width="250px"
                   minWidth="250px" withMargin>
                    <div>
                      <S.DropdownTitle>Assigned Recruiter</S.DropdownTitle>
                      <DropDown
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
                        required={true}
                      />
                    </div>
                    {!isNil(item?.error?.recruiter) ? (<S.ErrorText>{item?.error?.recruiter}</S.ErrorText>) : ''}
                  </S.FieldDataContainer>) : null}
                </S.PositionRowFormGroup>
              ))}
            </>
          ) }
        </S.InputGroupWrapper>
        <S.PromptButtons>
          <S.PromptPrimaryButton onClick={handleCreateJobPositions}>Confirm</S.PromptPrimaryButton>
          <S.PromptSecondaryButton onClick={onClose}>Go back</S.PromptSecondaryButton>
        </S.PromptButtons>
      </S.FieldContainer>
    </S.Container>
  );
};

AddPositions.propTypes = {
  positions: PropTypes.object,
  onClose: PropTypes.func,
  jobDetails: PropTypes.object,
};

export default AddPositions;
