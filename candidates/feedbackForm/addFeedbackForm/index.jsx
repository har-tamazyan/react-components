/* eslint-disable react/display-name */
import React, { createRef, useState, useEffect } from 'react';
import { isEmpty, debounce, isNil } from 'lodash';
import flattenDeep from 'lodash/flattenDeep';
import * as PropTypes from 'prop-types';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import RemoveDocumentIcon from 'src/web/ats/assets/icons/c-delete-large-grey.svg';
import DeleteIcon from 'src/web/ats/assets/icons/c-delete.svg';
import CrossIcon from 'src/web/ats/assets/icons/cross_icon.svg';
import UploadIcon from 'src/web/ats/assets/icons/data_upload.svg';
import fileIcon from 'src/web/ats/assets/icons/file_icon.svg';
import EmptyStar from 'src/web/ats/assets/icons/star_empty.svg';
import FilledStar from 'src/web/ats/assets/icons/star_full.svg';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import JobApplicationSummary from 'src/web/ats/components/candidates/common/jobApplicationSummary';
import Input from 'src/web/ats/components/atoms/input';
import toaster from 'src/web/ats/components/atoms/toaster';
import { feedbackFormActions } from 'src/web/ats/redux/modules/feedbackForm/creator';
import feedbackFormSelectors from 'src/web/ats/redux/modules/feedbackForm/selector';
import CustomSkillDropdown from 'src/web/ats/components/common/customSkillDropdown';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import Modal from 'src/web/ats/components/atoms/modal';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import { CustomDateInput } from '../../../common/dateInput';
import AddParameterModal from '../addParameterModal';
import * as S from './styles';
import {
  CloseButton,
  Container,
  FeedbackActions,
  FeedBackForm,
  FormTitle,
  NoContent,
} from './styles';

const SUPPORTED_DOCUMENT_EXTENSIONS = '.doc,.docx,.pdf,.eml,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
const MAXIMUM_DOCUMENTS_LIMIT = 20;
const MAX_DOCUMENT_SIZE = 26214400;
const MIN_CHAR_TO_TRIGGER_SEARCH = 3;
const DEBOUNCE_DELAY = 300;
const DOCUMENT_TYPES = [
  {
    label: 'Feedback Form',
    value: 'feedback_form',
  },
  {
    label: 'BGV-Related Document',
    value: 'bgv',
  },
  {
    label: 'Offer-Related Document',
    value: 'offer',
  },
  {
    label: 'Assessment Report',
    value: 'assessment_report',
  },
  {
    label: 'Email Trail',
    value: 'email_trail',
  },
  {
    label: 'Case Study',
    value: 'case_study',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

const mapStatusCodeToDisplayMessage = {
  404: 'No Data Available',
  401: 'For the stage that this candidate is in right now, you cannot view/take action on them',
  default: 'Error while fetching data, consult Tech team for help.',
};


const Close = ({ onClick }) => (
  <CloseButton onClick={onClick}>
    <img src={CrossIcon} alt="cross-icon"/>
  </CloseButton>
);

Close.propTypes = {
  onClick: PropTypes.func,
};

const emptyParameterType = {
  type: null,
  name: '',
};

const AddFeedbackForm = ({
  triggerSource,
  fetchFeedbackFormData,
  feedbackFormData,
  closeModal,
  clearFeedbackFormData,
  closeFormAndRedirectToCO,
  submitForm,
  fetchedJobApplication,
  jobApplicationUnderUse,
  error,
  getLocationList,
  locationList,
  setFeedbackFormData,
  getSkillsList,
  skillsList,
}) => {
  const closeFeedbackForm = triggerSource === 'tokenUrl' ? closeFormAndRedirectToCO : closeModal;

  useEffect(() => {
    fetchFeedbackFormData();
    // return closeFeedbackForm;
    return () => clearFeedbackFormData();
  }, []);

  const [attributionList, setAttributionList] = useState([]);
  const [addParameterOverlay, setAddParameterOverlay] = useState(false);
  const [parameterType, setParameterType] = useState({ ...emptyParameterType });
  const [documentObjects, setDocumentObjects] = useState([]);
  const [insightsObject, setInsightsObject] = useState({});

  useEffect(() => {
    // eslint-disable-next-line camelcase
    const insightsQuestions = feedbackFormData?.insights_questions ?? [];
    if (!insightsQuestions) return;
    const data = insightsQuestions.reduce((accum, item) => ({
      ...accum,
      [item.id]: ['MCSA', 'NUM'].includes(item.question_type) ? (item.selected_answers[0] ?? null) : item.selected_answers,
    }), {});
    if (!isEmpty(insightsObject)) return;
    setInsightsObject(data);
  }, [feedbackFormData]);

  if (isEmpty(feedbackFormData)) return <WaitingIndicator fullScreen={true} isModal={true}/>;

  if (error) {
    return (
      <Container>
        <NoContent>
          {mapStatusCodeToDisplayMessage[error.response.status]
           || mapStatusCodeToDisplayMessage.default}
          <Close onClick={closeFeedbackForm}/>
        </NoContent>
      </Container>
    );
  }

  const {
    attribution,
    sections: fitmentSections,
    insights_questions: insightsQuestions,
  } = feedbackFormData;

  const jobApplicationDetails = ['co', 'tokenUrl'].includes(triggerSource) ? fetchedJobApplication : jobApplicationUnderUse;

  if (!(jobApplicationDetails && fitmentSections)) {
    return <WaitingIndicator fullScreen={true} isModal={true} />;
  }

  const { job, candidate: applicant } = jobApplicationDetails;

  if (!(job && applicant)) return <WaitingIndicator fullScreen={true} isModal={true}/>;


  const { name: interviewRoundName } = feedbackFormData;

  const candidateComment = createRef('');

  const constructAttributionDropdownOptions = (attributionData) => {
    const attributionOptions = { mandatory: [], nonMandatory: [] };
    attributionData.forEach((panelMember) => {
      if (panelMember.mandatory) {
        return attributionOptions.mandatory.push(
          { label: panelMember.name, value: panelMember.id },
        );
      }
      return attributionOptions.nonMandatory.push(
        { label: panelMember.name, value: panelMember.id },
      );
    });

    return attributionOptions;
  };

  const attributionDropdownOptionsObj = constructAttributionDropdownOptions(attribution);

  const handleFeedbackData = (feedbackItemIndex, parameterIndex, value) => {
    const tempSections = fitmentSections;
    tempSections[feedbackItemIndex].parameters = tempSections[feedbackItemIndex].parameters
      .map((pItem, index) => (index === parameterIndex ? ({
        ...pItem,
        value,
      }) : pItem));
    setFeedbackFormData({
      sections: tempSections,
    });
  };

  const handleDeleteParameter = (fIndex, pIndex) => () => {
    const tempSections = fitmentSections;
    tempSections[fIndex].parameters = tempSections[fIndex].parameters
      .filter((__, index) => index !== pIndex);
    setFeedbackFormData({
      sections: tempSections,
    });
  };

  const showAddParameterOverlay = (values) => () => {
    setParameterType(values);
    setAddParameterOverlay(!addParameterOverlay);
  };

  const addParam = (fItem, name) => {
    const tempSections = fitmentSections;
    const sectionIndex = tempSections.findIndex((__) => (__.name === name));
    const prevParams = tempSections[sectionIndex].parameters;
    tempSections[sectionIndex].parameters = [...prevParams, fItem];

    setFeedbackFormData({
      sections: tempSections,
    });
    showAddParameterOverlay({ type: null, name: '' })();
  };

  const mapFitmentTypeToComponent = {
    'Overall Fitment': (fItem, fIndex) => (
      <S.FitmentContainer>
        <S.FitmentTitle>OVERALL FITMENT</S.FitmentTitle>
        <S.FitmentDesc>Please tell us about the candidate&apos;s{' '}
          overall fitment by filling in the form below</S.FitmentDesc>
        {fItem.parameters.length ? (
          fItem.parameters.map((pItem, pIndex) => (
            <S.FitmentParams key={pIndex}>
              <img src={DeleteIcon} onClick={handleDeleteParameter(fIndex, pIndex)} />
              <S.FitmentItemName
                title={pItem.name}
                type='overallFitment'
              >{pItem.name}</S.FitmentItemName>
              <Rating
                emptySymbol={<img src={EmptyStar} />}
                fullSymbol={<img src={FilledStar} />}
                initialRating={pItem.value || 0}
                stop={pItem.max_value || 5}
                onChange={(rating) => handleFeedbackData(fIndex, pIndex, rating)}
              />
            </S.FitmentParams>
          ))
        ) : null}
        {/* <S.FitmentAddButton
          onClick={showAddParameterOverlay({
            type: 'parameter',
            fitmentType: 'overallFitment',
            name: fItem.name,
          })}
          isParametersAvailable={fItem.parameters.length}
        >+ Add Parameter</S.FitmentAddButton> */}
        {/* {fItem.allow_add_new_parameters ? (
          <S.FitmentAddButton>+ Add Parameter</S.FitmentAddButton>
        ) : null} */}
      </S.FitmentContainer>
    ),
    'Technical Fitment': (fItem, fIndex) => (
      <S.FitmentContainer>
        <S.FitmentTitle>{fItem.name}</S.FitmentTitle>
        <S.FitmentDesc>Please tell us about the candidate&apos;s{' '}
          technical fitment by filling in the form below</S.FitmentDesc>
        {fItem.parameters.length ? (
          fItem.parameters.map((pItem, pIndex) => (
            <S.FitmentParams key={pIndex}>
              <img src={DeleteIcon} onClick={handleDeleteParameter(fIndex, pIndex, fItem.name)}/>
              <S.FitmentItemName
                title={pItem.name}
                type='technicalFitment'
              >{pItem.name}</S.FitmentItemName>
              <Rating
                emptySymbol={<img src={EmptyStar} />}
                fullSymbol={<img src={FilledStar} />}
                initialRating={pItem.value || 0}
                stop={pItem.max_value || 5}
                onChange={(rating) => handleFeedbackData(fIndex, pIndex, rating)}
              />
            </S.FitmentParams>
          ))
        ) : null}
        <S.FitmentAddButton
          onClick={
            showAddParameterOverlay({
              type: 'skill',
              fitmentType: 'technicalFitment',
              name: fItem.name,
            })
          }
          isParametersAvailable={fItem.parameters.length}
        >+ Add Skill</S.FitmentAddButton>
        {/* {fItem.allow_add_new_parameters ? (
          <S.FitmentAddButton>+ Add Skill</S.FitmentAddButton>
        ) : null} */}
      </S.FitmentContainer>
    ),
    'Functional Fitment': (fItem, fIndex) => (
      <S.FitmentContainer>
        <S.FitmentTitle>FUNCTIONAL FITMENT</S.FitmentTitle>
        <S.FitmentDesc>Please tell us about the candidate&apos;s{' '}
          functional fitment by filling in the form below</S.FitmentDesc>
        {fItem.parameters.length ? (
          fItem.parameters.map((pItem, pIndex) => (
            <S.FitmentParams key={pIndex}>
              <img src={DeleteIcon} onClick={handleDeleteParameter(fIndex, pIndex)} />
              <S.FitmentItemName
                title={pItem.name}
                type='functionalFitment'
              >{pItem.name}</S.FitmentItemName>
              <Rating
                emptySymbol={<img src={EmptyStar} />}
                fullSymbol={<img src={FilledStar} />}
                initialRating={pItem.value || 0}
                stop={pItem.max_value || 5}
                onChange={(rating) => handleFeedbackData(fIndex, pIndex, rating)}
              />
            </S.FitmentParams>
          ))
        ) : null}
        <S.FitmentAddButton
          onClick={
            showAddParameterOverlay({
              type: 'parameter',
              fitmentType: 'functionalFitment',
              name: fItem.name,
            })
          }
          isParametersAvailable={fItem.parameters.length}
        >+ Add Parameter</S.FitmentAddButton>
        {/* {fItem.allow_add_new_parameters ? (
          <S.FitmentAddButton>+ Add Parameter</S.FitmentAddButton>
        ) : null} */}
      </S.FitmentContainer>
    ),
    'Behavioural Fitment': (fItem, fIndex) => (
      <S.FitmentContainer>
        <S.FitmentTitle>BEHAVIOURAL FITMENT</S.FitmentTitle>
        <S.FitmentDesc>Please tell us about the candidate&apos;s{' '}
          behavioural fitment by filling in the form below</S.FitmentDesc>
        {fItem.parameters.length ? (
          fItem.parameters.map((pItem, pIndex) => (
            <S.FitmentParams key={pIndex}>
              <img src={DeleteIcon} onClick={handleDeleteParameter(fIndex, pIndex)} />
              <S.FitmentItemName
                title={pItem.name}
                type='behaviouralFitment'
              >{pItem.name}</S.FitmentItemName>
              <Rating
                emptySymbol={<img src={EmptyStar} />}
                fullSymbol={<img src={FilledStar} />}
                initialRating={pItem.value || 0}
                stop={pItem.max_value || 5}
                onChange={(rating) => handleFeedbackData(fIndex, pIndex, rating)}
              />
            </S.FitmentParams>
          ))
        ) : null}
        <S.FitmentAddButton
          onClick={
            showAddParameterOverlay({
              type: 'parameter',
              fitmentType: 'behaviouralFitment',
              name: fItem.name,
            })
          }
          isParametersAvailable={fItem.parameters.length}
        >+ Add Parameter</S.FitmentAddButton>
        {/* {fItem.allow_add_new_parameters ? (
          <S.FitmentAddButton>+ Add Parameter</S.FitmentAddButton>
        ) : null} */}
      </S.FitmentContainer>
    ),

    Offer: (fItem, fIndex) => (
      <>
        <S.CommentTitle>Date of Joining</S.CommentTitle>
        <S.DatePickerContainer>
          <DatePicker
            selected={fItem.parameters[0].value}
            onChange={(date) => handleFeedbackData(fIndex, 0, date)}
            customInput={<CustomDateInput />}
            dateFormat='dd/MM/yyyy'
          />
        </S.DatePickerContainer>
      </>
    ),
  };

  const handleInsightsObject = (key) => (event, selectedOption) => {
    let value = event.target ? event.target.value : event;

    if (['location'].includes(key)) {
      value = selectedOption;
    } else value = selectedOption;

    setInsightsObject({
      ...insightsObject,
      [key]: value,
    });
  };

  const debounceFunc = debounce((value, fieldType) => {
    if (fieldType === 'location') {
      getLocationList({ query: value, field: fieldType });
    } else if (fieldType === 'skill') {
      getSkillsList({ query: value, field: fieldType });
    }
  }, DEBOUNCE_DELAY);

  const fetchLocationOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'location');
    }
  };

  const fetchSkillsOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'skill');
    }
  };

  const mapInsightsQuestionsToComponent = {
    MCSA: (insightItem, index) => {
      const isLocation = insightItem.auto_suggest?.type === 'location';

      return (
        <S.InsightsContainer>
          <S.DropdownTitle>{index + 1}. {insightItem.description}</S.DropdownTitle>
          <S.CustomDropdownContainer>
            <DropDown
              options={isLocation
                ? locationList
                : insightItem.question_options
              }
              onOptionSelect={handleInsightsObject(insightItem.id)}
              placeholder=""
              addInputText={isLocation}
              isSearchable={isLocation}
              onSearchInputChange={fetchLocationOnKeyPress}
              required={true}
              redDotRequired={true}
              selected={isLocation
                ? locationList.find((__) => __ === insightsObject[insightItem.id])
                : insightItem.question_options
                  .find((__) => __ === insightsObject[insightItem.id])
                  || insightItem.selected_answers[0]}
            />
          </S.CustomDropdownContainer>
        </S.InsightsContainer>
      );
    },

    MCMA: (insightItem, index) => {
      const isSkill = insightItem.auto_suggest?.type === 'skill';

      return (
        <S.InsightsContainer>
          <S.DropdownTitle>{index + 1}. {insightItem.description}</S.DropdownTitle>
          <S.CustomDropdownContainer>
            {isSkill ? (
              <CustomSkillDropdown
                options={skillsList}
                onOptionSelect={handleInsightsObject(insightItem.id)}
                isMultiSelect={true}
                isSearchable={true}
                hideIndicator={false}
                redDotRequired={true}
                required={true}
                boxform={true}
                showOr={false}
                showAddIcon={false}
                onSearchInputChange={fetchSkillsOnKeyPress}
                selected={insightsObject[insightItem.id] || insightItem.selected_answers || []}
              />
            ) : (
              <DropDown
                options={insightItem.question_options || []}
                onOptionSelect={handleInsightsObject(insightItem.id)}
                placeholder=""
                required={true}
                redDotRequired={true}
                isMultiSelect={true}
                isSearchable={true}
                selected={insightsObject[insightItem.id]
                  || insightItem.selected_answers || []}
              />
            )}
          </S.CustomDropdownContainer>
        </S.InsightsContainer>
      );
    },

    NUM: (insightItem, index) => (
      <S.InsightsContainer>
        <S.DropdownTitle>{index + 1}. {insightItem.description}</S.DropdownTitle>
        <S.CustomDropdownContainer>
          <Input
            onChange={(e) => setInsightsObject({
              ...insightsObject,
              [insightItem.id]: e.target.value,
            })}
            value={insightsObject[insightItem.id] || ''}
            required={true}
            min={0}
          />
        </S.CustomDropdownContainer>
      </S.InsightsContainer>
    ),
  };

  const fileChangeHandler = (e) => {
    const newDocuments = e.target.files;

    if (!newDocuments) return null;

    const totalSizeOfCurrentlySelectedDocuments = [...newDocuments].reduce((a, c) => (
      a ? a + c.size : c.size
    ), 0);
    const totalSizeOfPreviouslyAddedDocuments = documentObjects.length ? (
      documentObjects.reduce((a, c) => (
        a ? a + c.size : c.size
      ), 0)
    ) : 0;
    const totalSizeOfTheDocuments = totalSizeOfCurrentlySelectedDocuments
     + totalSizeOfPreviouslyAddedDocuments;

    if (totalSizeOfTheDocuments > MAX_DOCUMENT_SIZE) {
      toaster({
        msg: `Total file size exceeded ${MAX_DOCUMENT_SIZE / 1024 / 1024}MB, please try again`,
        type: 'error',
      });
      return false;
    }

    let totalNoOfDocuments;
    if (newDocuments.length > MAXIMUM_DOCUMENTS_LIMIT) {
      totalNoOfDocuments = [...newDocuments].slice(0, MAXIMUM_DOCUMENTS_LIMIT);
      toaster({
        msg: `Only first ${MAXIMUM_DOCUMENTS_LIMIT} documents selected are considered`,
        type: 'info',
      });
    } else {
      totalNoOfDocuments = newDocuments;
    }

    if (documentObjects.length
       && ((documentObjects.length + newDocuments.length) > MAXIMUM_DOCUMENTS_LIMIT)) {
      toaster({
        type: 'error',
        msg: `Only ${MAXIMUM_DOCUMENTS_LIMIT} documents are allowed`,
      });
      return false;
    }

    setDocumentObjects((prevDocuments) => [...prevDocuments, ...totalNoOfDocuments]);
    return true;
  };

  const selectDocumentType = (index) => (_, selectedDocumentType = null) => {
    const tempDocumentObjects = [...documentObjects];
    tempDocumentObjects[index].doc_type = selectedDocumentType;
    setDocumentObjects(tempDocumentObjects);
  };

  const onSubmit = () => {
    const constructedAttributionData = [
      ...attributionDropdownOptionsObj.mandatory,
      ...attributionList,
    ].map(({ value: id }) => id);

    if (isEmpty(constructedAttributionData)) {
      toaster({
        type: 'error',
        msg: 'Attribution is mandatory to submit feedback',
        unique: true,
      });
      return false;
    }

    const sanitizedFeedbackFormData = feedbackFormData.sections.map((item) => (
      item.parameters.map((pItem) => (
        {
          feedback_section: item.name,
          max_value: pItem.max_value,
          feedback_parameter: pItem.name,
          value: pItem.value,
        }
      ))
    ));

    const constructedInsightsObjectData = insightsQuestions?.length
      ? feedbackFormData.insights_questions.map((item) => (
        {
          feedback_section: 'insights_section',
          feedback_parameter: item.id,
          value: (Array.isArray(insightsObject[item.id]) || isNil(insightsObject[item.id]))
            ? insightsObject[item.id] || item.selected_answers
            : [insightsObject[item.id]] || item.selected_answers,
        }))
      : null;

    if (insightsQuestions?.length) {
      const questionsAnswered = constructedInsightsObjectData
        .filter((insightItem) => (Array.isArray(insightItem.value)
          ? isEmpty(insightItem.value)
          : isNil(insightItem.value)));

      if (questionsAnswered.length) {
        toaster({
          type: 'error',
          msg: 'All questions are mandatory',
          unique: true,
        });
        return false;
      }
    }

    const flatFeedbackData = flattenDeep(sanitizedFeedbackFormData);
    const subjectiveFeedback = {
      feedback_section: 'subjective_feedback',
      feedback_parameter: null,
      value: candidateComment.current.value || null,
      max_value: null,
    };

    const constructedFeedbackData = [
      ...flatFeedbackData,
      { ...subjectiveFeedback },
    ];

    const constructedDocumentsData = [];
    for (let i = 0; i < documentObjects.length; i += 1) {
      if (!documentObjects[i].doc_type) {
        toaster({
          type: 'error',
          msg: 'The document type is mandatory for all documents',
          unique: true,
        });
        return false;
      }
      const documentKey = documentObjects[i].doc_type.value;
      const documentValue = new File(
        [documentObjects[i]],
        documentObjects[i].name,
        { type: documentObjects[i].type },
      );
      delete documentValue.doc_type;
      constructedDocumentsData.push({ documentKey, documentValue });
    }

    if (!candidateComment.current.value) {
      toaster({
        type: 'error',
        msg: 'The comment section is mandatory ',
        unique: true,
      });
      return false;
    }

    submitForm(
      {
        jobApplicationId: jobApplicationDetails.id,
        workflowStageId: jobApplicationDetails.workflow_stage,
        constructedFeedbackData,
        constructedInsightsObjectData,
        constructedDocumentsData,
        constructedAttributionData,
        triggerSource,
      },
    );

    if (triggerSource !== 'tokenUrl') {
      return closeModal();
    }
    return true;
  };

  return (
    <>
      <Container>
        <JobApplicationSummary jobApplication={jobApplicationDetails} onClose={closeFeedbackForm}/>
        <FeedBackForm>
          <FormTitle>{`Feedback: ${interviewRoundName}`}</FormTitle>
          <S.AttributionContainer>
            <S.AttributionTitle>Attribution</S.AttributionTitle>
            <DropDown
              options={attributionDropdownOptionsObj.nonMandatory}
              isMultiSelect={true}
              disableMultiSelectedOptionRemovalIndex={[0]}
              required={true}
              onOptionSelect={(_, selectedOptions) => {
                if (attributionDropdownOptionsObj.mandatory.length) selectedOptions.splice(0, 1);
                setAttributionList(selectedOptions);
              }}
              placeholder="Please select attribution"
              selected={[
                ...attributionDropdownOptionsObj.mandatory,
                ...attributionList,
              ]}
              isSearchable={true}
            />
          </S.AttributionContainer>
          {fitmentSections.length ? (
            <S.FitmentSection>
              {fitmentSections.map((fitmentItem, index) => (
                <React.Fragment key={index}>
                  {mapFitmentTypeToComponent[fitmentItem.name]
                    ? mapFitmentTypeToComponent[fitmentItem.name](fitmentItem, index)
                    : null}
                </React.Fragment>
              ))}
            </S.FitmentSection>
          ) : null}
          {insightsQuestions?.length ? (
            <S.InsightSection>
              {insightsQuestions.map((insightItem, index) => (
                <React.Fragment key={index}>
                  {mapInsightsQuestionsToComponent[insightItem.question_type]
                    ? mapInsightsQuestionsToComponent[insightItem.question_type](insightItem, index)
                    : null}
                </React.Fragment>
              ))}
            </S.InsightSection>
          ) : null}
          <S.UploadDocumentsContainer>
            <S.UploadDocumentsTitle>Attach File(s)</S.UploadDocumentsTitle>
            {documentObjects.map((fileObject, index) => (<S.AddedDocument key={index}>
                <img src={fileIcon} alt='Uploaded document' />
                <S.DocumentName>{fileObject.name}</S.DocumentName>
                <DropDown
                  options={DOCUMENT_TYPES}
                  required={true}
                  placeholder="Select file type"
                  onOptionSelect={selectDocumentType(index)}
                  selected={
                    !isEmpty(documentObjects[index].doc_type)
                      ? DOCUMENT_TYPES.find((__) => (
                        __.label === documentObjects[index].doc_type.label
                      ))
                      : null
                  }
                />
                <S.RemoveDocument
                 src={RemoveDocumentIcon}
                 onClick={() => setDocumentObjects(documentObjects.filter((_, k) => k !== index))}
                 alt='Remove document'
                />
              </S.AddedDocument>))
            }
            <S.UploadDocuments>
                <span>
                  <Input
                    type='file'
                    supportedFileExtensions={SUPPORTED_DOCUMENT_EXTENSIONS}
                    multiple={true}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                    onChange={fileChangeHandler}
                  />
                </span>
                <img src={UploadIcon} alt='document upload'/>
                  <div><b>Browse</b>&nbsp;or Drop the file(s)</div>
              </S.UploadDocuments>
          </S.UploadDocumentsContainer>
          <S.CommentContainer>
            <S.CommentTitle>Your comments about the candidate</S.CommentTitle>
            <S.CommentBox rows={7} cols={58} ref={candidateComment || null} />
          </S.CommentContainer>
          <FeedbackActions>
            <S.SubmitFeedback onClick={onSubmit}>Submit</S.SubmitFeedback>
          </FeedbackActions>
        </FeedBackForm>
      </Container>
      {parameterType.type ? (
        <Modal
          showModal={addParameterOverlay}
          toggleModal={showAddParameterOverlay(false)}
        >
          <AddParameterModal
            paramType={parameterType}
            buttonCallback={(e) => addParam(e, parameterType.name)}
            closeModal={showAddParameterOverlay(false)}
            sections={fitmentSections}
            fitmentName={parameterType.name}
          />
        </Modal>
      ) : null}
    </>
  );
};

AddFeedbackForm.propTypes = {
  triggerSource: PropTypes.string,
  fetchFeedbackFormData: PropTypes.func,
  feedbackFormData: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
  closeFormAndRedirectToCO: PropTypes.func,
  setFeedbackFormData: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  fetchedJobApplication: PropTypes.object,
  jobApplicationUnderUse: PropTypes.object,
  clearFeedbackFormData: PropTypes.func,
  getLocationList: PropTypes.func,
  locationList: PropTypes.array,
  getSkillsList: PropTypes.func,
  skillsList: PropTypes.array,
};

const mapStateToProps = ({ session, feedbackForm, candidateOverview }) => ({
  feedbackFormData: feedbackFormSelectors.feedbackFormData({ feedbackForm }),
  isLoading: feedbackFormSelectors.isLoading({ feedbackForm }),
  error: feedbackFormSelectors.error({ feedbackForm }),
  fetchedJobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
  locationList: sessionSelectors.getJobLocationList({ session }),
  skillsList: sessionSelectors.getJobSkillsList({ session }),
});

const mapDispatchToProps = {
  fetchFeedbackFormData: feedbackFormActions.fetchFeedbackFormData,
  closeFormAndRedirectToCO: feedbackFormActions.closeFormAndRedirectToCO,
  submitForm: feedbackFormActions.submitFeedbackFormData,
  setFeedbackFormData: feedbackFormActions.updateFeedbackForm,
  clearFeedbackFormData: feedbackFormActions.clearFeedbackFormData,
  getLocationList: sessionActions.getLocationList,
  getSkillsList: sessionActions.getSkillsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedbackForm);
