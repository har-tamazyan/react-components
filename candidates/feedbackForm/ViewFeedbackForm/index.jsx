/* eslint-disable react/display-name */
import * as PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty, startCase } from 'lodash';
import Rating from 'react-rating';

import JobApplicationSummary from 'src/web/ats/components/candidates/common/jobApplicationSummary';
import CrossIcon from 'src/web/ats/assets/icons/cross_icon.svg';
import EmptyStar from 'src/web/ats/assets/icons/star_empty.svg';
import FilledStar from 'src/web/ats/assets/icons/star_full.svg';
import { feedbackFormActions } from 'src/web/ats/redux/modules/feedbackForm/creator';
import feedbackFormSelectors from 'src/web/ats/redux/modules/feedbackForm/selector';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import { GET_FILE_EXTENSION_ICON } from 'src/web/ats/common/getFileIcon';
import { constructDateAndTime } from 'src/web/utils';
import {
  Container,
  CloseButton,
  FeedBackForm,
  FormTitle,
  NoContent,
} from './styles';
import * as S from './styles';

const DEFAULT_MSG_FOR_EMPTY_SECTION = 'For this candidate, the evaluator didn’t submit their rating in this section';

const Close = ({ onClick }) => (
  <CloseButton onClick={onClick}>
    <img src={CrossIcon} alt='' />
  </CloseButton>
);

Close.propTypes = {
  onClick: PropTypes.func,
};

const ViewFeedbackForm = ({
  historyFeedbackFormStageIdAndSubmissionIds,
  viewFeedbackFormData,
  clearFeedbackFormData,
  feedbackFormData,
  error,
  closeModal,
}) => {
  const [currentFormIndex, setCurrentFormIndex] = useState(0);

  useEffect(() => {
    viewFeedbackFormData(historyFeedbackFormStageIdAndSubmissionIds);
    return () => clearFeedbackFormData();
  }, []);

  if (isEmpty(feedbackFormData)) return <WaitingIndicator fullScreen={true} isModal={true}/>;

  if (error) {
    return (
      <Container>
        <NoContent>
          No Data Available.
          <Close onClick={closeModal} />
        </NoContent>
      </Container>
    );
  }

  const { job, candidate, submissions } = feedbackFormData;

  const {
    sections: fitmentSections,
    subjective_feedback: subjectiveFeedback,
    rejection_reasons: rejectionReasons,
    submitted_by: submittedBy,
    submitted_at_timestamp: submittedAtTimestamp,
    submitted_documents: submittedDocuments,
    insights_feedback: insightsFeedback,
    name: interviewRoundName,
    attribution,
  } = submissions[currentFormIndex];

  const handleFormNavigation = (navigateTo) => () => {
    if (navigateTo === 'previous') setCurrentFormIndex(currentFormIndex - 1);
    if (navigateTo === 'next') setCurrentFormIndex(currentFormIndex + 1);
  };

  const mapFitmentTypeToComponent = {
    'Overall Fitment': (fItem) => {
      const parameterValues = fItem.parameters && fItem.parameters.length ? (
        fItem.parameters.filter((__) => Number(__.value) > 0)
      ) : [];

      return (
        <S.FitmentContainer>
          <S.FitmentTitle>OVERALL FITMENT</S.FitmentTitle>
          {parameterValues.length && fItem.parameters.length ? (
            fItem.parameters.map((pItem, pIndex) => (
              Number(pItem.value) ? (
                <S.FitmentParams key={pIndex}>
                  <S.FitmentItemName
                    title={pItem.name}
                    type='overallFitment'
                  >{pItem.name}</S.FitmentItemName>
                  <Rating
                    emptySymbol={<img src={EmptyStar} />}
                    fullSymbol={<img src={FilledStar} />}
                    initialRating={pItem.value || 0}
                    readonly={true}
                  />
                </S.FitmentParams>
              ) : null
            ))
          ) : (
            <S.NoFitmentInput>{DEFAULT_MSG_FOR_EMPTY_SECTION}</S.NoFitmentInput>
          )}
        </S.FitmentContainer>
      );
    },
    'Technical Fitment': (fItem) => {
      const parameterValues = fItem.parameters.length ? (
        fItem.parameters.filter((__) => Number(__.value) > 0)
      ) : [];

      return (
        <S.FitmentContainer>
          <S.FitmentTitle>{fItem.name}</S.FitmentTitle>
          {parameterValues.length && fItem.parameters.length ? (
            fItem.parameters.map((pItem, pIndex) => (
              Number(pItem.value) ? (
                <S.FitmentParams key={pIndex}>
                  <S.FitmentItemName
                    title={pItem.name}
                    type='technicalFitment'
                  >{pItem.name}</S.FitmentItemName>
                  <Rating
                    emptySymbol={<img src={EmptyStar} />}
                    fullSymbol={<img src={FilledStar} />}
                    initialRating={pItem.value || 0}
                    readonly={true}
                  />
                </S.FitmentParams>
              ) : null
            ))
          ) : (
            <S.NoFitmentInput>{DEFAULT_MSG_FOR_EMPTY_SECTION}</S.NoFitmentInput>
          )}
        </S.FitmentContainer>
      );
    },
    'Functional Fitment': (fItem) => {
      const parameterValues = fItem.parameters && fItem.parameters.length ? (
        fItem.parameters.filter((__) => Number(__.value) > 0)
      ) : [];

      return (
        <S.FitmentContainer>
          <S.FitmentTitle>FUNCTIONAL FITMENT</S.FitmentTitle>
          {parameterValues.length && fItem.parameters.length ? (
            fItem.parameters.map((pItem, pIndex) => (
              Number(pItem.value) ? (
                <S.FitmentParams key={pIndex}>
                  <S.FitmentItemName
                    title={pItem.name}
                    type='functionalFitment'
                  >{pItem.name}</S.FitmentItemName>
                  <Rating
                    emptySymbol={<img src={EmptyStar} />}
                    fullSymbol={<img src={FilledStar} />}
                    initialRating={pItem.value || 0}
                    readonly={true}
                  />
                </S.FitmentParams>
              ) : null
            ))
          ) : (
            <S.NoFitmentInput>{DEFAULT_MSG_FOR_EMPTY_SECTION}</S.NoFitmentInput>
          )}
        </S.FitmentContainer>
      );
    },
    'Behavioural Fitment': (fItem) => {
      const parameterValues = fItem.parameters && fItem.parameters.length ? (
        fItem.parameters.filter((__) => Number(__.value) > 0)
      ) : [];

      return (
        <S.FitmentContainer>
          <S.FitmentTitle>BEHAVIOURAL FITMENT</S.FitmentTitle>
          {parameterValues.length && fItem.parameters && fItem.parameters.length ? (
            fItem.parameters.map((pItem, pIndex) => (
              Number(pItem.value) ? (
                <S.FitmentParams key={pIndex}>
                  <S.FitmentItemName
                    title={pItem.name}
                    type='behaviouralFitment'
                  >{pItem.name}</S.FitmentItemName>
                  <Rating
                    emptySymbol={<img src={EmptyStar} />}
                    fullSymbol={<img src={FilledStar} />}
                    initialRating={pItem.value || 0}
                    readonly={true}
                  />
                </S.FitmentParams>
              ) : null
            ))
          ) : (
            <S.NoFitmentInput>{DEFAULT_MSG_FOR_EMPTY_SECTION}</S.NoFitmentInput>
          )}
        </S.FitmentContainer>
      );
    },
  };

  const mapInsightsQuestionsToComponent = {
    MCSA: (insightItem, index) => (
      <S.InsightContainer>
        <S.InsightTitle>{index + 1}. {insightItem.description}</S.InsightTitle>
        <S.InsightSubContainer>
          {insightItem.selected_answers?.length
            ? insightItem.selected_answers.join(', ')
            : '-'
          }
        </S.InsightSubContainer>
      </S.InsightContainer>
    ),

    MCMA: (insightItem, index) => (
      <S.InsightContainer>
        <S.InsightTitle>{index + 1}. {insightItem.description}</S.InsightTitle>
        <S.InsightSubContainer>
          {insightItem.selected_answers?.length
            ? insightItem.selected_answers.map((answer, id) => (
                <S.SelectedAnswers key={id}>
                  <div>{answer}</div>
                </S.SelectedAnswers>
            ))
            : '-'
          }
        </S.InsightSubContainer>
      </S.InsightContainer>
    ),

    NUM: (insightItem, index) => (
      <S.InsightContainer>
        <S.InsightTitle>{index + 1}. {insightItem.description}</S.InsightTitle>
        <S.InsightSubContainer>
          {insightItem.selected_answers?.length
            ? insightItem.selected_answers.join(', ')
            : '-'
          }
        </S.InsightSubContainer>
      </S.InsightContainer>
    ),
  };

  return (
    <>
      <Container>
       <JobApplicationSummary
        jobApplication={{ job, candidate, current_step: { name: interviewRoundName } }}
        onClose={closeModal}/>
        <FeedBackForm>
          <S.FormHeadContainer>
            <div>
            <FormTitle
            isSubmittedBy={submittedBy || false}
          >{`Feedback: ${interviewRoundName}`}</FormTitle>
            <S.FeedbackFormSubmittedBy>
              Submitted by <span>{submittedBy}</span>{' '}
              on {constructDateAndTime(submittedAtTimestamp.toString())}
            </S.FeedbackFormSubmittedBy>
            <S.AttributionText>
              Attribution - {attribution.map((_) => _.name).join(', ')}
            </S.AttributionText>
            </div>
            <S.FormNavigationContainer>
            {submissions.length > 1 && <React.Fragment><S.FormNavigationButton
             onClick={handleFormNavigation('previous')}
             disabled={!(currentFormIndex > 0)}
             >Previous</S.FormNavigationButton>
           <S.FormNavigationButton
            onClick={handleFormNavigation('next')}
            disabled={!(currentFormIndex < submissions.length - 1)}
            >Next</S.FormNavigationButton>
            </React.Fragment>}
          </S.FormNavigationContainer>
          </S.FormHeadContainer>
          {fitmentSections?.length ? (
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
          {insightsFeedback?.length ? (
            <S.FitmentSection>
              {insightsFeedback.map((insightItem, index) => (
                <React.Fragment key={index}>
                  {mapInsightsQuestionsToComponent[insightItem.question_type]
                    ? mapInsightsQuestionsToComponent[insightItem.question_type](insightItem, index)
                    : null}
                </React.Fragment>
              ))}
            </S.FitmentSection>
          ) : null}
          {subjectiveFeedback ? (
            <>
              <S.CommentTitle>Evaluator&apos;s comments</S.CommentTitle>
              - {subjectiveFeedback}
            </>
          ) : null}
          {rejectionReasons && rejectionReasons.length ? (
            <S.RejectionReasonContainer>
              <S.RejectionReasonLegendText>
                REASON FOR REJECTION
              </S.RejectionReasonLegendText>
              <S.RejectionReasonTitle>
                {rejectionReasons.reduce((_, r) => (_ ? `${_}, ${r}` : r), '')}
              </S.RejectionReasonTitle>
            </S.RejectionReasonContainer>
          ) : null}

          {submittedDocuments && submittedDocuments.length ? (
            <S.SubmittedDocsContainer>
              <S.SubmittedDocsTitleContainer>
                <S.SubmittedDocsTitle>Attached File(s)</S.SubmittedDocsTitle>
              </S.SubmittedDocsTitleContainer>
              <S.SubmittedDocs>
                {submittedDocuments.map((docItem) => (
                  <S.SubmittedDocsFile
                    key={docItem.id}
                    as='a'
                    href={docItem.document_link}
                    target='_blank'
                    rel='noopener noreferrer'
                    download={true}
                  >
                    <img src={GET_FILE_EXTENSION_ICON(docItem.document_link)} alt='' />
                    <div title={docItem.document_name}>{docItem.document_name}</div>
                    <span>{startCase(docItem.document_type)}</span>
                  </S.SubmittedDocsFile>
                ))}
              </S.SubmittedDocs>
            </S.SubmittedDocsContainer>
          ) : null}
        </FeedBackForm>
      </Container>
    </>
  );
};

ViewFeedbackForm.propTypes = {
  historyFeedbackFormStageIdAndSubmissionIds: PropTypes.object,
  viewFeedbackFormData: PropTypes.func,
  clearFeedbackFormData: PropTypes.func,
  feedbackFormData: PropTypes.object,
  error: PropTypes.object,
  closeModal: PropTypes.func,
};

const mapStateToProps = ({ feedbackForm }) => ({
  feedbackFormData: feedbackFormSelectors.feedbackFormData({ feedbackForm }),
  error: feedbackFormSelectors.error({ feedbackForm }),
});

const mapDispatchToProps = {
  viewFeedbackFormData: feedbackFormActions.viewFeedbackFormData,
  clearFeedbackFormData: feedbackFormActions.clearFeedbackFormData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFeedbackForm);
