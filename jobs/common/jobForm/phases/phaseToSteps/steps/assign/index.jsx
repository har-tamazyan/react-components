/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { agenciesActions } from 'src/web/ats/redux/modules/agencies/creator';
import agenciesSelectors from 'src/web/ats/redux/modules/agencies/selector';
import { businessUnitLeaderActions } from 'src/web/ats/redux/modules/businessUnitLeader/creator';
import businessUnitLeaderSelectors from 'src/web/ats/redux/modules/businessUnitLeader/selector';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import API_END_POINTS from 'src/web/ats/config/integrations';
import { API_BASE_URL } from 'src/config/env';
import sessionSelectors from 'web/ats/redux/modules/session/selector';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import useCan from 'web/ats/components/common/can/useCan';
import { JOBS_ASSIGN_ROLES, SHOULD_DIRECTOR_PREFILLED } from 'web/ats/components/common/can/privileges';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import { getApiWithResponseObject, getAuthToken } from 'src/config/utils';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';
import { mapRolesToConstants, RESPONSE_CODES, CATEGORY_USERS } from 'src/config/definitions';
import SourcingManagement from 'src/web/ats/components/jobs/common/sourcingManagement';
import { LightText } from 'src/web/ats/components/common/styles';
import { InnerWrapper, InnerContainer } from '../styles';
import * as S from './styles';

const emptyAssigns = {
  director: null,
  senior_manager: null,
  recruiting_manager: null,
  hiring_manager: null,
  business_unit_leader: null,
  recruiter: [],
  talent_scout: [],
  sourcing_manager: [],
  coordinator: [],
  hr_operation_associate: [],
  agencies: [],
};

const Assign = ({
  saveJobFormCallback,
  recruitersList,
  recruitmentManagers,
  hiringManagersList,
  directorsList,
  srManagersList,
  coordinatorsList,
  hrOperationAssociatesList,
  triggerState,
  setJobForm,
  gotoNextStep,
  jobForm,
  agencies,
  isEditMode,
  businessUnitLeader,
  getRecruiterList,
  getOtherList,
  getAgencies,
  getHiringManagerList,
  getBusinessUnitLeaders,
  mandatoryFields,
  setCurrentStepFormRef,
  gotoStep,
  isUserAdmin,
}) => {
  const isDirectorManuallyUpdated = useRef(false);
  const [assignJobsData, setAssignJobsData] = useState({ ...emptyAssigns, ...jobForm });
  const canEditAssignee = useCan(JOBS_ASSIGN_ROLES, { isEditMode });
  const shouldPrefillDirector = useCan(SHOULD_DIRECTOR_PREFILLED, { isEditMode });
  const userId = useSelector(({ session }) => sessionSelectors.getUserId({ session }));
  useEffect(() => {
    if (jobForm.company) getBusinessUnitLeaders(jobForm.company);
    getRecruiterList();
    getOtherList();
    getAgencies();
    getHiringManagerList();
  }, []);
  const formRef = useRef(null);

  useEffect(() => {
    setCurrentStepFormRef(formRef);
  }, [formRef]);

  const [sourcerOptionsData, setSourcerOptionsData] = useState([]);

  const fetchTalentSourcersData = async () => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      `${API_BASE_URL()}${API_END_POINTS.getUsersList}?role=${CATEGORY_USERS.join(',')}&limit=1000`,
      headers,
    );
    if (response && response.status === RESPONSE_CODES.OK) {
      setSourcerOptionsData(response?.data.data ?? []);
    }
  };

  useEffect(() => {
    fetchTalentSourcersData();
  }, []);

  const recruitersListLabelValueMap = recruitersList.map((recruiter) => ({
    node: <div>{recruiter.name} <LightText>({recruiter.email})</LightText></div>,
    label: recruiter.role === mapRolesToConstants.VENDOR_RPO ? `(RPO) ${recruiter.name} (${recruiter.email})` : `${recruiter.name} (${recruiter.email})`,
    html: recruiter.role === mapRolesToConstants.VENDOR_RPO ? `<div 
        style="${S.sectionWrapper}">
            <span>${recruiter.name}<br /> (${recruiter.email})</span>
            <span style="${S.roundLabelStyle}">RPO</span></div>`
      : `${recruiter.name}<br />(${recruiter.email})`,
    value: recruiter.id,
  }));

  const hiringManagersListLabelValueMap = hiringManagersList.map((hiringManager) => ({
    node: <div>{hiringManager.name} <LightText>({hiringManager.email})</LightText></div>,
    label: `${hiringManager.name} (${hiringManager.email})`,
    value: hiringManager.id,
  }));

  const recruitingManagersListLabelValueMap = recruitmentManagers.map((recruitingManager) => ({
    node: <div>{recruitingManager.name} <LightText>({recruitingManager.email})</LightText></div>,
    label: `${recruitingManager.name} (${recruitingManager.email})`,
    value: recruitingManager.id,
  }));
  const businessUnitLeaderListLabelValueMap = businessUnitLeader.map((bsu) => ({
    node: <div>{bsu.name}</div>,
    label: `${bsu.name}`,
    value: bsu.id,
  }));

  const directorsListLabelValueMap = directorsList.map((director) => ({
    node: <div>{director.name} <LightText>({director.email})</LightText></div>,
    label: `${director.name} (${director.email})`,
    value: director.id,
  }));

  const srManagersListLabelValueMap = srManagersList.map((srManager) => ({
    node: <div>{srManager.name} <LightText>({srManager.email})</LightText></div>,
    label: `${srManager.name} (${srManager.email})`,
    value: srManager.id,
  }));

  const coordinatorsListLabelValueMap = coordinatorsList.map((coordinator) => ({
    node: <div>{coordinator.name} <LightText>({coordinator.email})</LightText></div>,
    label: `${coordinator.name} (${coordinator.email})`,
    value: coordinator.id,
  }));
  const sourcingManagersListLabelValueMap = sourcerOptionsData.map((sourcingManager) => ({
    node: <div>{sourcingManager.name} <LightText>({sourcingManager.email})</LightText></div>,
    label: `${sourcingManager.name} (${sourcingManager.email})`,
    value: sourcingManager.id,
  }));
  const hrOperationAssociatesListLabelValueMap = hrOperationAssociatesList.map((hrOpAssociate) => ({
    node: <div>{hrOpAssociate.name} <LightText>({hrOpAssociate.email})</LightText></div>,
    label: `${hrOpAssociate.name} (${hrOpAssociate.email})`,
    value: hrOpAssociate.id,
  }));

  const agenciesListLabelValueMap = agencies.map((agency) => ({
    node: <div>{agency.name} <LightText>({agency.name})</LightText></div>,
    label: `${agency.name}`,
    value: agency.id,
  }));

  const getEngagementArr = (agencyId) => agencies.find((__) => __.id === agencyId)?.engagement_type;

  const engagementTypeListLabelValueMap = (agencyId) => {
    const engagementArr = getEngagementArr(agencyId) || [];
    return engagementArr.map((engagement) => ({
      node: <div>{engagement.name} <LightText>({engagement.name})</LightText></div>,
      label: `${engagement.name}`,
      value: engagement.id,
    }));
  };

  agencies.map((agency) => ({
    node: <div>{agency.name} <LightText>({agency.name})</LightText></div>,
    label: `${agency.name}`,
    value: agency.id,
  }));

  const updateAssignJobsData = (jobsData) => {
    const setData = { ...assignJobsData, ...jobsData };
    setAssignJobsData(setData);
    // (setData);
  };

  const updateDirectorValue = () => (_event, selectedOption) => {
    isDirectorManuallyUpdated.current = true;
    updateAssignJobsData({ director: selectedOption.value });
  };

  const updateSrManagerValue = () => (_event, selectedOption) => {
    updateAssignJobsData({ senior_manager: selectedOption.value });
  };

  const updateRecruitmentManagerValue = () => (_event, selectedOption) => {
    updateAssignJobsData({ recruiting_manager: selectedOption.value });
  };
  const updatebusinessUnitLeaderValue = () => (_event, selectedOption) => {
    updateAssignJobsData({ business_unit_leader: selectedOption.value });
  };

  const updateHiringManagerValue = () => (_event, selectedOption) => {
    updateAssignJobsData({ hiring_manager: selectedOption.value });
  };

  const updateRecruiterValues = (index) => (_event, selectedOption) => {
    const updatedRecruiters = Object.assign(
      [],
      assignJobsData.recruiter,
      { [index]: selectedOption.value },
    );
    updateAssignJobsData({ recruiter: updatedRecruiters });
  };

  const updateSourcersValues = (updatedSourcers) => {
    updateAssignJobsData({ talent_scout: updatedSourcers });
  };

  const updateCoordinatorsValues = (index) => (_event, selectedOption) => {
    const updatedCoordinators = Object.assign(
      [],
      assignJobsData.coordinator,
      { [index]: selectedOption.value },
    );
    updateAssignJobsData({ coordinator: updatedCoordinators });
  };

  const updateSourcingManagersValues = (index) => (_event, selectedOption) => {
    const updatedSourcingManagers = Object.assign(
      [],
      assignJobsData.sourcing_manager,
      { [index]: selectedOption.value },
    );
    updateAssignJobsData({ sourcing_manager: updatedSourcingManagers });
  };

  const updateHROperationAssociatesValues = (index) => (_event, selectedOption) => {
    const updatedHrOperationAssociates = Object.assign(
      [],
      assignJobsData.hr_operation_associate,
      { [index]: selectedOption.value },
    );
    updateAssignJobsData({ hr_operation_associate: updatedHrOperationAssociates });
  };

  const updateAgenciesValues = (index) => (_event, selectedOption) => {
    const updatedAgencies = Object.assign(
      [],
      assignJobsData.agencies,
      { [index]: { ...assignJobsData.agencies[index], id: selectedOption.value } },
    );
    updateAssignJobsData({ agencies: updatedAgencies });
  };

  const updateAgencyEngagement = (index) => (_event, selectedOption) => {
    const updatedAgencies = Object.assign(
      [],
      assignJobsData.agencies,
      { [index]: { ...assignJobsData.agencies[index], engagement_type: selectedOption.value } },
    );
    updateAssignJobsData({ agencies: updatedAgencies });
  };

  const addRecruiter = () => {
    updateAssignJobsData({ recruiter: [...assignJobsData.recruiter, ''] });
  };
  const addSourcingManager = () => {
    updateAssignJobsData({ sourcing_manager: [...assignJobsData.sourcing_manager, ''] });
  };

  const addCoordinator = () => {
    updateAssignJobsData({ coordinator: [...assignJobsData.coordinator, ''] });
  };

  const addHROperationAssociate = () => {
    updateAssignJobsData({ hr_operation_associate: [...assignJobsData.hr_operation_associate, ''] });
  };

  const addAgencies = () => {
    updateAssignJobsData({ agencies: [...assignJobsData.agencies, ''] });
  };

  const deleteRecruiter = (recruiterIndex) => () => {
    const updatedRecruiters = assignJobsData.recruiter
      .filter((_recruiter, index) => index !== recruiterIndex);
    updateAssignJobsData({ recruiter: updatedRecruiters });
  };


  const deleteSourcingManager = (sourcingManagerIndex) => () => {
    const updatedSourcingManagers = assignJobsData.sourcing_manager
      .filter((_, index) => index !== sourcingManagerIndex);
    updateAssignJobsData({ sourcing_manager: updatedSourcingManagers });
  };

  const deleteCoordinator = (coordinatorIndex) => () => {
    const updatedCoordinators = assignJobsData.coordinator
      .filter((_, index) => index !== coordinatorIndex);
    updateAssignJobsData({ coordinator: updatedCoordinators });
  };

  const deleteHROperationAssociate = (hrOperationAssociateIndex) => () => {
    const updatedHROA = assignJobsData.hr_operation_associate
      .filter((_, index) => index !== hrOperationAssociateIndex);
    updateAssignJobsData({ hr_operation_associate: updatedHROA });
  };

  const deleteAgencies = (agencyIndex) => () => {
    const updatedAgencies = assignJobsData.agencies
      .filter((_agency, index) => index !== agencyIndex);
    updateAssignJobsData({ agencies: updatedAgencies });
  };
  const deleteDirector = () => () => updateAssignJobsData({ director: null });
  const deleteSeniorManager = () => () => updateAssignJobsData({ senior_manager: null });
  const deleteRecruitmentManager = () => () => updateAssignJobsData({ recruiting_manager: null });

  const submitForm = async (event, { goToNext, saveJobForm, gotoStepNo }) => {
    if (event) event.preventDefault();

    const formPayload = {};
    const recruitersData = [];
    const agencyData = [];
    const coordinatorData = [];
    const hrOperationAssociatesData = [];

    // Directors
    formPayload.director = assignJobsData?.director;
    // Sr. Managers
    formPayload.senior_manager = assignJobsData?.senior_manager;
    // Business Unit Leader
    if (assignJobsData.business_unit_leader) {
      formPayload.business_unit_leader = assignJobsData?.business_unit_leader;
    }
    // recruiting_manager
    if (assignJobsData.recruiting_manager) {
      formPayload.recruiting_manager = assignJobsData.recruiting_manager;
    }
    // hiring_manager
    if (assignJobsData.hiring_manager) formPayload.hiring_manager = assignJobsData.hiring_manager;
    // recruiters
    assignJobsData.recruiter.forEach((recruiter) => {
      if (recruiter && !recruitersData.includes(recruiter)) recruitersData.push(recruiter);
    });
    if (recruitersData.length) formPayload.recruiter = [...new Set(recruitersData)];

    formPayload.sourcing_manager = assignJobsData.sourcing_manager;
    formPayload.talent_scout = assignJobsData.talent_scout;

    // Coordinator
    assignJobsData.coordinator.forEach((coordinator) => {
      if (coordinator && !coordinatorData.includes(coordinator)) coordinatorData.push(coordinator);
    });
    formPayload.coordinator = [...new Set(coordinatorData)];
    // HR Operation Assiciates
    assignJobsData.hr_operation_associate.forEach((hrOperationAssociate) => {
      if (hrOperationAssociate && !hrOperationAssociatesData.includes(hrOperationAssociate)) {
        hrOperationAssociatesData.push(hrOperationAssociate);
      }
    });
    formPayload.hr_operation_associate = [...new Set(hrOperationAssociatesData)];
    // agencies
    assignJobsData.agencies.forEach((agency) => {
      const isAlreadyAdded = agencyData.find((__) => __.id === agency?.id);
      if (agency?.id && agency?.engagement_type && !isAlreadyAdded) agencyData.push(agency);
    });
    formPayload.agencies = [...new Set(agencyData)];
    await setJobForm(formPayload);
    if (saveJobForm) saveJobFormCallback();
    if (goToNext) gotoNextStep();
    if (gotoStepNo) gotoStep(gotoStepNo);
  };

  useEffect(() => {
    const {
      validate,
      setFormOnRedux,
      saveFormOnBackend,
      goToNextStep,
      gotoStepNo,
    } = triggerState;

    let permissionToSubmit = !validate;
    if (validate) {
      permissionToSubmit = formRef.current.reportValidity();
    }

    if (setFormOnRedux && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, gotoStepNo });
    }
    if (saveFormOnBackend && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, saveJobForm: true, gotoStepNo });
    }
  }, [triggerState]);

  useEffect(() => {
    updateAssignJobsData({ recruiting_manager: jobForm.recruiting_manager });
  }, [jobForm.recruiting_manager]);

  useEffect(() => {
    if (shouldPrefillDirector && !isDirectorManuallyUpdated?.current) {
      updateAssignJobsData({ director: userId });
    }
  }, [shouldPrefillDirector, userId]);
  return (
    <InnerWrapper>
      <InnerContainer ref={formRef} onSubmit={submitForm} id='job-assign-form'>
        <S.CustomDropdown withThreeColumn>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Director</S.DropdownTitle>
              <DropDown
                options={directorsListLabelValueMap}
                onOptionSelect={updateDirectorValue()}
                placeholder={'Select Director'}
                selected={
                  assignJobsData.director
                    ? directorsListLabelValueMap
                      .find((__) => __.value === assignJobsData.director)
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
                required={mandatoryFields.includes('director')}
              />
            </div>
            <S.DeleteIconContainer>
              <img
                src={DeleteIcon}
                alt='Delete Director'
                onClick={canEditAssignee ? deleteDirector() : () => { }}
              />
            </S.DeleteIconContainer>
          </S.AssignContainer>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Sr. Manager</S.DropdownTitle>
              <DropDown
                options={srManagersListLabelValueMap}
                onOptionSelect={updateSrManagerValue()}
                placeholder={'Select Sr. Manager'}
                selected={
                  assignJobsData.senior_manager
                    ? srManagersListLabelValueMap
                      .find((__) => __.value === assignJobsData.senior_manager)
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
                required={mandatoryFields.includes('senior_manager')}
              />
            </div>
            <S.DeleteIconContainer>
              <img
                src={DeleteIcon}
                alt='Delete Senior Manager'
                onClick={canEditAssignee ? deleteSeniorManager() : () => { }}
              />
            </S.DeleteIconContainer>
          </S.AssignContainer>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Manager</S.DropdownTitle>
              <DropDown
                options={recruitingManagersListLabelValueMap}
                onOptionSelect={updateRecruitmentManagerValue()}
                placeholder={'Select Manager'}
                selected={
                  assignJobsData.recruiting_manager
                    ? recruitingManagersListLabelValueMap
                      .find((__) => __.value === assignJobsData.recruiting_manager)
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
                required={mandatoryFields.includes('manager')}
              />
            </div>
            <S.DeleteIconContainer>
              <img
                src={DeleteIcon}
                alt='Delete Manager'
                onClick={canEditAssignee ? deleteRecruitmentManager() : () => { }}
              />
            </S.DeleteIconContainer>
          </S.AssignContainer>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Business Unit Leader</S.DropdownTitle>
              <DropDown
                options={businessUnitLeaderListLabelValueMap}
                onOptionSelect={updatebusinessUnitLeaderValue()}
                placeholder={'Select Business Unit Leader'}
                required={mandatoryFields.includes('business_unit_leader')}
                selected={
                  assignJobsData.business_unit_leader
                    ? businessUnitLeaderListLabelValueMap
                      .find((__) => __.value === assignJobsData.business_unit_leader)
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
              />
            </div>
          </S.AssignContainer>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Hiring Manager</S.DropdownTitle>
              <DropDown
                options={hiringManagersListLabelValueMap}
                onOptionSelect={updateHiringManagerValue()}
                placeholder={'Select Hiring Manager'}
                required={mandatoryFields.includes('hiring_manager')}
                selected={
                  assignJobsData.hiring_manager
                    ? hiringManagersListLabelValueMap
                      .find((__) => __.value === assignJobsData.hiring_manager)
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
              />
            </div>
          </S.AssignContainer>
        </S.CustomDropdown>
        <S.CustomDropdown>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Recruiter</S.DropdownTitle>
              <DropDown
                htmlLabel
                options={recruitersListLabelValueMap}
                placeholder={'Select the Recruiter'}
                onOptionSelect={updateRecruiterValues(0)}
                required={mandatoryFields.includes('recruiter')}
                selected={
                  assignJobsData.recruiter[0]
                    ? recruitersListLabelValueMap
                      .find((__) => __.value === assignJobsData.recruiter[0])
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
              />
            </div>
            <S.AddIconContainer>
              <img
                src={AddIcon}
                alt='Add Recruiter'
                onClick={canEditAssignee ? addRecruiter : () => { }}
              />
            </S.AddIconContainer>
          </S.AssignContainer>

          {assignJobsData.recruiter.length > 1 ? (
            assignJobsData.recruiter
              .filter((_recruiter, index) => index !== 0)
              .map((recruiter, index) => (
                <S.AssignContainer key={index}>
                  <div>
                    <DropDown
                      options={recruitersListLabelValueMap}
                      onOptionSelect={updateRecruiterValues(index + 1)}
                      placeholder={'Select the Recruiter'}
                      selected={
                        recruiter
                          ? recruitersListLabelValueMap
                            .find((__) => __.value === recruiter)
                          : ''
                      }
                      isSearchable
                      isDisabled={!canEditAssignee}
                      required={mandatoryFields.includes('recruiter')}
                    />
                  </div>
                  <S.DeleteIconContainer>
                    <img
                      src={DeleteIcon}
                      alt='Delete Recruiter'
                      onClick={canEditAssignee ? deleteRecruiter(index + 1) : () => { }}
                    />
                  </S.DeleteIconContainer>
                </S.AssignContainer>
              ))
          ) : null}
        </S.CustomDropdown>
        <S.CustomDropdown>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Sourcing Manager</S.DropdownTitle>
              <DropDown
                options={sourcingManagersListLabelValueMap}
                placeholder={'Select Sourcing Manager'}
                onOptionSelect={updateSourcingManagersValues(0)}
                selected={
                  sourcingManagersListLabelValueMap
                    .find((__) => __.value === assignJobsData?.sourcing_manager[0])
                }
                isSearchable
                isDisabled={!canEditAssignee || !isUserAdmin}
                required={mandatoryFields.includes('sourcing_manager')}
              />
            </div>
            {isUserAdmin ? <><S.AddIconContainer>
              <img
                src={AddIcon}
                alt='Add Sourcing Manager'
                onClick={canEditAssignee ? addSourcingManager : () => { }}
              />
            </S.AddIconContainer>
              <S.DeleteIconContainer>
                <img
                  src={DeleteIcon}
                  alt='Delete Sourcing Manager'
                  onClick={canEditAssignee ? deleteSourcingManager(0) : () => { }}
                />
              </S.DeleteIconContainer> </> : null}
          </S.AssignContainer>

          {assignJobsData.sourcing_manager.length > 1 ? (
            assignJobsData.sourcing_manager
              .filter((_, index) => index !== 0)
              .map((sourcingManager, index) => (

                <S.AssignContainer key={index}>
                  <div>
                    <DropDown
                      options={
                        sourcingManagersListLabelValueMap.filter(
                          (_) => !assignJobsData.sourcing_manager.includes(_.value),
                        )}
                      onOptionSelect={updateSourcingManagersValues(index + 1)}
                      placeholder={'Select Sourcing Manager'}
                      selected={
                        sourcingManagersListLabelValueMap
                          .find((__) => __.value === sourcingManager)
                      }
                      isSearchable
                      isDisabled={!canEditAssignee || !isUserAdmin}
                      required={mandatoryFields.includes('sourcing_manager')}

                    />
                  </div>
                  {isUserAdmin ? <S.DeleteIconContainer>
                    <img
                      src={DeleteIcon}
                      alt='Delete Sourcing Manager'
                      onClick={canEditAssignee ? deleteSourcingManager(index + 1) : () => { }}
                    />
                  </S.DeleteIconContainer> : null}
                </S.AssignContainer>
              ))
          ) : null}
        </S.CustomDropdown>
        <SourcingManagement
          initialSourcersData={assignJobsData.talent_scout}
          updateSourcersValues={updateSourcersValues}
        />
        <S.CustomDropdown>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Coordinator</S.DropdownTitle>
              <DropDown
                options={coordinatorsListLabelValueMap}
                placeholder={'Select Coordinator'}
                onOptionSelect={updateCoordinatorsValues(0)}
                selected={
                  assignJobsData.coordinator[0]
                    ? coordinatorsListLabelValueMap
                      .find((__) => __.value === assignJobsData.coordinator[0])
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
                required={mandatoryFields.includes('coordinator')}
              />
            </div>
            <S.AddIconContainer>
              <img
                src={AddIcon}
                alt='Add Coordinator'
                onClick={canEditAssignee ? addCoordinator : () => { }}
              />
            </S.AddIconContainer>
            <S.DeleteIconContainer>
              <img
                src={DeleteIcon}
                alt='Delete Coordinator'
                onClick={canEditAssignee ? deleteCoordinator(0) : () => { }}
              />
            </S.DeleteIconContainer>
          </S.AssignContainer>

          {assignJobsData.coordinator.length > 1 ? (
            assignJobsData.coordinator
              .filter((_coordinator, index) => index !== 0)
              .map((coordinator, index) => (
                <S.AssignContainer key={index}>
                  <div>
                    <DropDown
                      options={coordinatorsListLabelValueMap}
                      onOptionSelect={updateCoordinatorsValues(index + 1)}
                      placeholder={'Select Coordinator'}
                      selected={
                        coordinator
                          ? coordinatorsListLabelValueMap
                            .find((__) => __.value === coordinator)
                          : ''
                      }
                      isSearchable
                      isDisabled={!canEditAssignee}
                      required={mandatoryFields.includes('coordinator')}
                    />
                  </div>
                  <S.DeleteIconContainer>
                    <img
                      src={DeleteIcon}
                      alt='Delete Coordinator'
                      onClick={canEditAssignee ? deleteCoordinator(index + 1) : () => { }}
                    />
                  </S.DeleteIconContainer>
                </S.AssignContainer>
              ))
          ) : null}
        </S.CustomDropdown>

        <S.CustomDropdown>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>HR Operation Associate</S.DropdownTitle>
              <DropDown
                options={hrOperationAssociatesListLabelValueMap}
                placeholder={'Select the HR Operation Associate'}
                onOptionSelect={updateHROperationAssociatesValues(0)}
                selected={
                  assignJobsData.hr_operation_associate[0]
                    ? hrOperationAssociatesListLabelValueMap
                      .find((__) => __.value === assignJobsData.hr_operation_associate[0])
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
                required={mandatoryFields.includes('hr_operations_associate')}
              />
            </div>
            <S.AddIconContainer>
              <img
                src={AddIcon}
                alt='Add HR Operation Associate'
                onClick={canEditAssignee ? addHROperationAssociate : () => { }}
              />
            </S.AddIconContainer>
            <S.DeleteIconContainer>
              <img
                src={DeleteIcon}
                alt='Delete HR Operation Associate'
                onClick={canEditAssignee ? deleteHROperationAssociate(0) : () => { }}
              />
            </S.DeleteIconContainer>
          </S.AssignContainer>
          {assignJobsData.hr_operation_associate.length > 1 ? (
            assignJobsData.hr_operation_associate
              .filter((_, index) => index !== 0)
              .map((hrOperationAssociate, index) => (
                <S.AssignContainer key={index}>
                  <div>
                    <DropDown
                      options={hrOperationAssociatesListLabelValueMap}
                      onOptionSelect={updateHROperationAssociatesValues(index + 1)}
                      placeholder={'Select the HR Operation Associate'}
                      selected={
                        hrOperationAssociate
                          ? hrOperationAssociatesListLabelValueMap
                            .find((__) => __.value === hrOperationAssociate)
                          : ''
                      }
                      isSearchable
                      isDisabled={!canEditAssignee}
                      required={mandatoryFields.includes('hr_operations_associate')}
                    />
                  </div>
                  <S.DeleteIconContainer>
                    <img
                      src={DeleteIcon}
                      alt='Delete Talent Scout'
                      onClick={canEditAssignee ? deleteHROperationAssociate(index + 1) : () => { }}
                    />
                  </S.DeleteIconContainer>
                </S.AssignContainer>
              ))
          ) : null}
        </S.CustomDropdown>
        {/* HR Operation Associate End */}

        {/* agencies Start */}
        <S.CustomDropdown>
          <S.AssignContainer>
            <div>
              <S.DropdownTitle>Vendor Agency</S.DropdownTitle>
              <DropDown
                options={agenciesListLabelValueMap}
                placeholder={'Select the Vendor Agency'}
                onOptionSelect={updateAgenciesValues(0)}
                selected={
                  assignJobsData.agencies[0]?.id
                    ? agenciesListLabelValueMap
                      .find((__) => __.value === assignJobsData.agencies[0]?.id)
                    : ''
                }
                isSearchable
                isDisabled={!canEditAssignee}
                required={mandatoryFields.includes('vendor_agency')}
              />
            </div>
            <S.DeleteIconContainer>
              <img
                src={DeleteIcon}
                alt='Delete Vendor Agency'
                onClick={canEditAssignee ? deleteAgencies(0) : () => { }}
              />
            </S.DeleteIconContainer>
          </S.AssignContainer>
          {assignJobsData.agencies[0]?.id
            && <S.AssignContainer>
              <div>
                <DropDown
                  options={engagementTypeListLabelValueMap(assignJobsData.agencies[0]?.id)}
                  placeholder={'Select Engagement Type'}
                  onOptionSelect={updateAgencyEngagement(0)}
                  selected={
                    assignJobsData.agencies[0]?.id
                      ? engagementTypeListLabelValueMap(assignJobsData.agencies[0]?.id)
                        .find((__) => __.value === assignJobsData.agencies[0]?.engagement_type)
                      : ''
                  }
                  isSearchable
                  required={mandatoryFields.includes('vendor_agency_engagement')}
                  isDisabled={!canEditAssignee}
                />
              </div>
              <S.AddIconContainer>
                <img
                  src={AddIcon}
                  alt='Add Vendor Agencies'
                  onClick={canEditAssignee ? addAgencies : () => { }}
                />
              </S.AddIconContainer>
              {assignJobsData.agencies.length > 1
                && <S.DeleteIconContainer>
                  <img
                    src={DeleteIcon}
                    alt='Delete Vendor Agency'
                    onClick={canEditAssignee ? deleteAgencies(0) : () => { }}
                  />
                </S.DeleteIconContainer>}
            </S.AssignContainer>
          }
          {assignJobsData.agencies.length > 1 ? (
            assignJobsData.agencies
              .filter((_agency, index) => index !== 0)
              .map((agency, index) => (
                <>
                  <S.AssignContainer key={index}>
                    <div>
                      <DropDown
                        options={agenciesListLabelValueMap}
                        onOptionSelect={updateAgenciesValues(index + 1)}
                        placeholder={'Select the Vendor Agency'}
                        selected={
                          agency?.id
                            ? agenciesListLabelValueMap
                              .find((__) => __.value === agency?.id)
                            : ''
                        }
                        isSearchable
                        isDisabled={!canEditAssignee}
                        required={mandatoryFields.includes('vendor_agency')}
                      />
                    </div>
                    <S.DeleteIconContainer>
                      <img
                        src={DeleteIcon}
                        alt='Delete Vendor Agency'
                        onClick={canEditAssignee ? deleteAgencies(index + 1) : () => { }}
                      />
                    </S.DeleteIconContainer>
                  </S.AssignContainer>
                  {agency?.id ? <S.AssignContainer>
                    <div>
                      <DropDown
                        options={engagementTypeListLabelValueMap(agency?.id)}
                        placeholder={'Select Engagement Type'}
                        onOptionSelect={updateAgencyEngagement(index + 1)}
                        selected={
                          agency?.id
                            ? engagementTypeListLabelValueMap(agency?.id)
                              .find((__) => __.value === agency?.engagement_type)
                            : ''
                        }
                        isSearchable
                        required={mandatoryFields.includes('vendor_agency_engagement')}
                        isDisabled={!canEditAssignee}
                      />
                    </div>
                    <S.DeleteIconContainer>
                      <img
                        src={DeleteIcon}
                        alt='Delete Vendor Agency'
                        onClick={canEditAssignee ? deleteAgencies(index + 1) : () => { }}
                      />
                    </S.DeleteIconContainer>
                  </S.AssignContainer> : <div />}
                </>
              ))
          ) : null}
        </S.CustomDropdown>
      </InnerContainer>
    </InnerWrapper>
  );
};

Assign.propTypes = {
  saveJobFormCallback: PropTypes.func,
  setJobForm: PropTypes.func,
  recruitersList: PropTypes.array,
  agencies: PropTypes.array,
  hiringManagersList: PropTypes.array,
  recruitmentManagers: PropTypes.array,
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  gotoStep: PropTypes.func,
  jobForm: PropTypes.object,
  patchDataCallback: PropTypes.func,
  directorsList: PropTypes.array,
  isUserAdmin: PropTypes.bool,
  srManagersList: PropTypes.array,
  coordinatorsList: PropTypes.array,
  hrOperationAssociatesList: PropTypes.array,
  isEditMode: PropTypes.bool,
  businessUnitLeader: PropTypes.array,
  getBusinessUnitLeaders: PropTypes.func,
  getRecruiterList: PropTypes.func,
  getOtherList: PropTypes.func,
  getAgencies: PropTypes.func,
  getHiringManagerList: PropTypes.func,
  currentPhase: PropTypes.string,
  mandatoryFields: PropTypes.array,
  setCurrentStepFormRef: PropTypes.func,
};


const mapStateToProps = ({ session, agencies, businessUnitLeader }) => ({
  recruitersList: sessionSelectors.getJobRecruitersList({ session }),
  agencies: agenciesSelectors.getAgencies({ agencies }),
  recruitmentManagers: sessionSelectors.getJobRecruitmentManagers({ session }),
  hiringManagersList: sessionSelectors.getJobHiringManagersList({ session }),
  directorsList: sessionSelectors.getDirectorsList({ session }),
  isUserAdmin: sessionSelectors.isUserAdmin({ session }),
  srManagersList: sessionSelectors.getSrManagersList({ session }),
  coordinatorsList: sessionSelectors.getCoordinatorsList({ session }),
  hrOperationAssociatesList: sessionSelectors.getHROperationAssociatesList({ session }),
  businessUnitLeader: businessUnitLeaderSelectors.getBusinessUnitLeader({ businessUnitLeader }),
});

const mapDispatchToProps = {
  getRecruiterList: sessionActions.getRecruiterList,
  getOtherList: sessionActions.getOtherList,
  getAgencies: agenciesActions.fetchAgencies,
  getHiringManagerList: sessionActions.getHiringManagerList,
  getBusinessUnitLeaders: businessUnitLeaderActions.fetchBusinessUnitLeader,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Assign));
