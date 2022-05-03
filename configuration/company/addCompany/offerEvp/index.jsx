import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router-dom';
import qs from 'qs';
import { connect } from 'react-redux';
import { protectedRoutes } from 'src/web/ats/routes';
import { InnerContainer } from 'src/web/ats/components/configuration/company/styles.js';
// import DropDown from 'src/web/ats/components/atoms/dropDown';
// import Input from 'src/web/ats/components/atoms/input';
import Checkmark from 'src/web/ats/assets/icons/check-mark.svg';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import DragIcon from 'src/web/ats/assets/icons/drag_icon.svg';
// import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
// import useCan from 'web/ats/components/common/can/useCan';
// import { JOBS_ASSIGNEE_WORKFLOW_EDIT } from 'web/ats/components/common/can/privileges';
import { companyActions } from 'src/web/ats/redux/modules/company/creator';
import companySelectors from 'web/ats/redux/modules/company/selector';
import * as S from './styles';

const emptyOfferEvpData = {
  allow_offer_generation: true,
  talent500_evp_page: true,
};

const OfferEvp = ({
  location,
  createCompany,
  createFileUpoad,
  ClientInfo,
  Organisation,
  filesData,
  fetchCompanyData,
  getClientPersonnel,
  companyDetails,
  updateCategory,
}) => {
  const history = useHistory();

  const [offerEvpData, setOfferEvpDataData] = useState({ ...emptyOfferEvpData });
  // const [stagesData, setStagesData] = useState(emptyOfferEvpData);
  // const canEditWorkflow =
  // useCan(JOBS_ASSIGNEE_WORKFLOW_EDIT, { isEditMode: isEditMode || false });
    const { mode, id } = qs.parse(location.search, { ignoreQueryPrefix: true });


  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      setOfferEvpDataData({
        allow_offer_generation: companyDetails?.allow_offer_generation,
        talent500_evp_page: companyDetails?.talent500_evp_page,
      });
    }
  }, [companyDetails]);

  useEffect(() => {
    if (fetchCompanyData?.id) {
      if (filesData.logo !== null
        || filesData.thumbnail !== null || filesData.documentObjects.length > 0) {
        const formData = new FormData();
        if (filesData.documentObjects.length > 0) filesData.documentObjects.map((item) => formData.append('agreement', item));
        if (filesData.logo !== null) formData.append('logo', filesData?.logo?.file);
        if (filesData.thumbnail !== null) formData.append('thumbnail', filesData.thumbnail?.file);
        createFileUpoad(fetchCompanyData?.id, formData);
        if (mode !== 'edit') history.push({ pathname: protectedRoutes.company('confirmation'), search: `?mode=${mode}&id=${fetchCompanyData?.id}` });
        return;
      }
      if (mode !== 'edit') history.push({ pathname: protectedRoutes.company('confirmation'), search: `?mode=${mode}&id=${fetchCompanyData?.id}` });
    }
  }, [fetchCompanyData]);

  const handleOnClick = (type, value) => {
    if (mode === 'view') return;
    if (type === 'allow_offer_generation') {
      const setData = { ...offerEvpData, allow_offer_generation: value };
      setOfferEvpDataData(setData);
    }
    if (type === 'talent500_evp_page') {
      const setData = { ...offerEvpData, talent500_evp_page: value };
      setOfferEvpDataData(setData);
    }
  };

  // const onDragEnd = () => {
  //   // If dropped outside the list
  // };

  // const renderStageMeta = (stage) => {
  //   if (stage.text_input_required) {
  //     return <Input
  //       //   onChange={updateWorkFlowValues(index, 'metadata')}
  //       //   placeholder={'Enter Mettl Assessment Id'}
  //       //   value={stage.metadata || ''}
  //       //   isDisabled={!canEditWorkflow}
  //       required
  //     />;
  //   }
  //   return <DropDown
  //     //   options={mapRoundIdToAssigneeOptions[stage.workflow_stage_master] || []}
  //     //   onOptionSelect={updateWorkFlowValues(
  //     //     index,
  //     //     stage.allow_multiple_assignees ? 'panel' : 'assignee',
  //     //   )}
  //     placeholder={'Select Approvers'}
  //     //   selected={
  //     //     stage?.assignee || !isEmpty(stage?.panel)
  //     //       ? (mapRoundIdToAssigneeOptions[stage.workflow_stage_master] || [])[
  //     //         stage.allow_multiple_assignees ? 'filter' : 'find'
  //     //       ]((__) => {
  //     //         if (stage.allow_multiple_assignees && stage.panel) {
  //     //           return stage.panel.includes(__.value);
  //     //         }
  //     //         if (Array.isArray(stage.assignee)) {
  //     //           return stage.assignee.includes(__.value);
  //     //         }
  //     //         return stage.assignee === __.value;
  //     //       })
  //     //       : ''
  //     //   }
  //     // isDisabled={!canEditWorkflow}
  //     // isMultiSelect={stage.allow_multiple_assignees}
  //     required={true}
  //   />;
  // };

  // const deleteWorkFlowStage = (stageIndex) => {
  //   let updatedWorkFlowStages = stagesData.offer_stages
  //     .filter((_stage, index) => index !== stageIndex);
  //   if (!isEditMode) {
  //     updatedWorkFlowStages = updatedWorkFlowStages
  //       .map((_stage, index) => ({ ..._stage, order: index + 1 }));
  //   }
  //   const setData = { ...stagesData, offer_stages: updatedWorkFlowStages };
  //   setStagesData(setData);
  // };

  // const renderStageDetails = (stage, index) => (
  //   <React.Fragment key={`stage-${index}`}>
  //     {!(isEditMode) ? <S.DragActionIcon src={DragIcon} alt='Drag Stage' /> : <div />}
  //     <DropDown
  //       // options={rounds}
  //       // onOptionSelect={updateWorkFlowValues(index, 'workflow_stage_master')}
  //       placeholder={'Offer Approval'}
  //       // selected={
  //       //   stage && stage.workflow_stage_master
  //       //     ? rounds
  //       //       .find((__) => __.value === stage.workflow_stage_master)
  //       //     : ''
  //       // }
  //       // isDisabled={(stage?.id && isStageFieldsNonEditable) || !canEditWorkflow}
  //       required={true}
  //     />
  //     {renderStageMeta(stage, index)}
  //     <S.DeleteIconContainer>
  //       <img
  //         src={DeleteIcon}
  //         alt='Delete Round Type'
  //         onClick={canEditWorkflow ? () => (stagesData.offer_stages.length > 1
  //           ? deleteWorkFlowStage(index) : {}) : () => { }}
  //       />
  //     </S.DeleteIconContainer>
  //   </React.Fragment>
  // );
  // const addWorkFlowStage = () => {
  //   const noOfWorkFlowStages = stagesData.offer_stages.length;
  //   const setData = {
  //     ...stagesData,
  //     offer_stages: [
  //       ...stagesData.offer_stages,
  //       {
  //         ...emptyOfferEvpData.offer_stages[0],
  //         order: stagesData.offer_stages[noOfWorkFlowStages - 1].order + 1,
  //       },
  //     ],
  //   };
  //   setStagesData(setData);
  // };

  const submitForm = (event) => {
    event.preventDefault();
    const companyData = {
      ...ClientInfo,
      ...Organisation,
      ...offerEvpData,
      ...getClientPersonnel,
    };
    if (mode === 'edit') {
      updateCategory(id, companyData);
    } else {
      createCompany(companyData);
    }
  };

  return (
          <S.MainContenct id='company-offerEvp-form' onSubmit={submitForm}>
            <InnerContainer>
              <S.OfferModuleMain>
                <S.OfferModuleTitle>Do you want to have offer module on Canvas?</S.OfferModuleTitle>
                <S.OfferModuleCheckItems>
                  <div>
                    <span onClick={() => handleOnClick('allow_offer_generation', true)}>
                      {offerEvpData.allow_offer_generation && <img src={Checkmark} alt='Yes' />}
                    </span>
                    Yes
                  </div>
                  <div>
                    <span onClick={() => handleOnClick('allow_offer_generation', false)}>
                      {!offerEvpData.allow_offer_generation && <img src={Checkmark} alt='No' />}
                    </span>
                    No
                  </div>
                </S.OfferModuleCheckItems>
                <S.Title>Our tech team will reach out
                  to you offline for offer module configuration</S.Title>
              </S.OfferModuleMain>
              <S.OfferModuleMain>
                <S.OfferModuleTitle>Do you want to have the
                  Company EVP Pages on Talent500?</S.OfferModuleTitle>
                <S.OfferModuleCheckItems>
                  <div>
                    <span onClick={() => handleOnClick('talent500_evp_page', true)}>
                      {offerEvpData.talent500_evp_page && <img src={Checkmark} alt='Yes' />}
                    </span>
                    Yes
                  </div>
                  <div>
                    <span onClick={() => handleOnClick('talent500_evp_page', false)}>
                      {!offerEvpData.talent500_evp_page && <img src={Checkmark} alt='No' />}
                    </span>
                    No
                  </div>
                </S.OfferModuleCheckItems>
                <S.Title>Our branding team will
                  reach out to you offline for company EVP page creation</S.Title>
              </S.OfferModuleMain>
            </InnerContainer>
            {/* <S.ContentFormMain>
              <S.AssessmentMainHeading>Offer Stages</S.AssessmentMainHeading>
              <S.ContentContainer>
                <S.AssessmentContainer>
                  <S.AssessmentMain>
                    <S.SelfAssessment>
                      <div>
                        <S.AssessmentHeading>Offer Negotiation</S.AssessmentHeading>
                      </div>
                    </S.SelfAssessment>
                    <S.AssessmentConnectingLines />
                  </S.AssessmentMain>
                  <S.AssessmentStageConnectingLines>
                    <div />
                  </S.AssessmentStageConnectingLines>
                </S.AssessmentContainer>
                <S.StageDetailsContainer>
                  <S.StageSectionTitle>Offer Approval Stages</S.StageSectionTitle>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided) => (
                        <div {...provided.droppableProps}
                          ref={provided.innerRef}>
                          {stagesData.offer_stages.map(
                            (stage, index) => (<Draggable key={index}
                              draggableId={`draggable-${index}`}
                              index={index}
                              isDragDisabled={Boolean(isEditMode)}
                            >
                              {// eslint-disable-next-line no-shadow
                                (provided) => (<S.StageDetailsGridWrapper
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {renderStageDetails(stage, index)}
                                </S.StageDetailsGridWrapper>
                                )}
                            </Draggable>),
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <S.AddNewStage
                    onClick={canEditWorkflow ? addWorkFlowStage : () => { }}
                  >
                    &#43; Add New Approval Stage
                  </S.AddNewStage>
                </S.StageDetailsContainer>
                <S.ReleaseOfferContainer>
                  <S.ReleaseOfferStageConnectingLines>
                    <div />
                  </S.ReleaseOfferStageConnectingLines>
                  <div>
                    <div>
                      <S.AssessmentHeading>Offer Approved</S.AssessmentHeading>
                    </div>
                    <div>
                      <S.AssessmentHeadingBox>Offer Rolled Out</S.AssessmentHeadingBox>
                    </div>
                    <div>
                      <S.AssessmentHeadingBox>Offer Accepted</S.AssessmentHeadingBox>
                    </div>
                    <div>
                      <S.AssessmentHeadingBox>Joined</S.AssessmentHeadingBox>
                    </div>
                  </div>
                </S.ReleaseOfferContainer>
              </S.ContentContainer>
            </S.ContentFormMain> */}
            {mode !== 'view' && <S.SubmitButtonContainer>
              <S.SubmitButton
                type='submit'
              >Confirm</S.SubmitButton>
            </S.SubmitButtonContainer>}
         </S.MainContenct>
  );
};

OfferEvp.propTypes = {
  isEditMode: PropTypes.bool,
  createCompany: PropTypes.func,
  createFileUpoad: PropTypes.func,
  ClientInfo: PropTypes.object,
  Organisation: PropTypes.object,
  filesData: PropTypes.object,
  fetchCompanyData: PropTypes.object,
  getClientPersonnel: PropTypes.object,
  companyDetails: PropTypes.object,
  updateCategory: PropTypes.func,
  location: PropTypes.object,
};

const mapDispatchToProps = {
  createCompany: companyActions.createCompany,
  createFileUpoad: companyActions.createFileUpoad,
  updateCategory: companyActions.updateCategory,
};

const mapStateToProps = ({ company }) => ({
  ClientInfo: companySelectors.getClientInfo({ company }),
  Organisation: companySelectors.getOrganisation({ company }),
  filesData: companySelectors.filesData({ company }),
  fetchCompanyData: companySelectors.fetchCompanyData({ company }),
  getClientPersonnel: companySelectors.getClientPersonnel({ company }),
  companyDetails: companySelectors.companyDetails({ company }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferEvp));
