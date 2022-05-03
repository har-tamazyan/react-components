import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jobOverviewSelectors from 'src/web/ats/redux/modules/jobOverview/selector';
import EditIcon from 'src/web/ats/assets/icons/edit_job_icon.svg';
import useCan from 'web/ats/components/common/can/useCan';
import { JOBS_OVERVIEW_TABS_WORKFLOW_EDIT } from 'web/ats/components/common/can/privileges';
import ProcessWorkflowImage from 'src/web/ats/assets/images/process_workflow.svg';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import { STATUS } from 'src/constants/jobs/index.js';
import * as S from './styles';

let widthOfElement;

const ProcessAndWorkflow = ({
  processAndWorkflow,
  jobDetails,
  gotoEditJobForm,
}) => {
  const processWorkflowRef = createRef();
  const { id: jobId, is_user_in_hiring_team: isUserInHiringTeam, status } = jobDetails;

  useEffect(() => {
    if (processWorkflowRef && processWorkflowRef.current) {
      widthOfElement = processWorkflowRef.current.clientWidth;
    }
  }, []);

  const canEditAssigneeAndWorkflow = useCan(
    JOBS_OVERVIEW_TABS_WORKFLOW_EDIT, { isUserInHiringTeam },
  );

  const renderAssignees = (processItem) => {
    if (processItem.category === 'pre_canvas') {
      return <S.T500Assignees>Talent500</S.T500Assignees>;
    }
    return (
      processItem.panel?.length ? <S.VerticalScrollBox>
        {Object.entries(processItem.panel
          .reduce((acc, _) => ({
            ...acc,
            [_.role_display]: [
              ...(acc[_.role_display] ? acc[_.role_display] : []),
              _,
            ],
          }), {}))
          .map(([assigneeRole, _], i) => <S.Assignee key={`assignee_role_$${i}`}>
            <S.AssigneeRole title={assigneeRole}>
              {assigneeRole} {_.length > 1 ? <b>({_.length})</b> : null}
            </S.AssigneeRole>
            {_.map((__, j) => <React.Fragment key={`assignee_name${j}`}><S.AssigneeName title={__.name}>
              {__.name}
            </S.AssigneeName>
              <S.AssigneeEmail title={__.email}>
                {__.email}
              </S.AssigneeEmail></React.Fragment>)}
          </S.Assignee>)}
      </S.VerticalScrollBox> : <S.Assignee>
        <S.AssigneeRole
          title={processItem.assignee.role_display}
        >{processItem.assignee.role_display}</S.AssigneeRole>
        <S.AssigneeName
          title={processItem.assignee.name}
        >{processItem.assignee.name}</S.AssigneeName>
        <S.AssigneeEmail
          title={processItem.assignee.email}
        >{processItem.assignee.email}</S.AssigneeEmail>
      </S.Assignee>);
  };

  const editWorkflow = () => {
    gotoEditJobForm(jobId, 'edit_workflow');
  };

  return (
    <S.ProcessAndWorkflowContainer>
      {canEditAssigneeAndWorkflow && status === STATUS.OPEN ? (
        <S.EditAction onClick={editWorkflow}>
          <S.EditActionIcon src={EditIcon} alt='Edit Workflow' />
          <S.EditActionText>Edit workflow</S.EditActionText>
        </S.EditAction>
      ) : null}

      <S.ProcessAndWorkflowSubContainer>
        {processAndWorkflow && processAndWorkflow.length ? (
          processAndWorkflow
            .map((processItem, index) => (
              <React.Fragment key={`process_item_${index}`}>
                {processAndWorkflow.length !== (index + 1) ? (
                  <S.ProcessItem
                    index={index + 1}
                    widthOfElement={widthOfElement}
                  >
                    <S.ProcessAndCount category={processItem.category}>
                      <S.ProcessItemName
                        title={processItem.name}
                      >{processItem.name}</S.ProcessItemName>
                      <S.CandidateAndProcess>
                        <S.CandidatesCount>
                          <div>{processItem.candidate_count}</div>
                          <span>Candidates</span>
                        </S.CandidatesCount>
                        <S.CandidatesInProcess>
                          <div>{processItem.in_process_count}</div>
                          <span>In process</span>
                        </S.CandidatesInProcess>
                      </S.CandidateAndProcess>
                    </S.ProcessAndCount>

                    {processItem.panel?.length || processItem.assignee || processItem.category === 'pre_canvas'
                      ? renderAssignees(processItem)
                      : null}

                  </S.ProcessItem>
                ) : null}

                {(index + 1) !== 4
                  && (processAndWorkflow.length !== (index + 1))
                  && ((index + 1) % 4) !== 0 ? (
                  <S.ConnectingLines>
                    <S.ConnectingLinesChild />
                  </S.ConnectingLines>
                  ) : null}

                {((index + 1) % 4) === 0 && (processAndWorkflow.length !== (index + 1)) ? (
                  <S.ConnectingLines isHorizontalBar={true}>
                    <S.ConnectingLinesChild isHorizontalBar={true} />
                  </S.ConnectingLines>
                ) : null}

                {processAndWorkflow.length === (index + 1) ? (
                  <S.ProcessItemLast>
                    <img src={ProcessWorkflowImage} alt={processItem.name} />
                    <S.ProcessItemLastName
                      title={processItem.name}
                    >{processItem.name}</S.ProcessItemLastName>
                    <S.ProcessItemLastNoOfOffersCount>
                      {processItem.offers_count}
                    </S.ProcessItemLastNoOfOffersCount>
                  </S.ProcessItemLast>
                ) : null}


              </React.Fragment>
            ))) : (
          <WaitingIndicator fullWidth={true} />
        )}
      </S.ProcessAndWorkflowSubContainer>
    </S.ProcessAndWorkflowContainer>
  );
};

ProcessAndWorkflow.propTypes = {
  processAndWorkflow: PropTypes.array,
  jobDetails: PropTypes.object,
  gotoEditJobForm: PropTypes.func,
};

const mapStateToProps = ({ jobOverview }) => ({
  processAndWorkflow: jobOverviewSelectors.getJobProcessAndWorkflow({ jobOverview }),
});

export default connect(mapStateToProps)(ProcessAndWorkflow);
