/* eslint-disable react/display-name */
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector.js';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { RemoveTeamMemberPrompt } from 'src/web/ats/components/teams/common/userPrompts';
import useCan from 'web/ats/components/common/can/useCan';
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES, TEAMS_DISPLAY_ADD_HM_I_BUTTON } from 'web/ats/components/common/can/privileges';
import Modal from 'src/web/ats/components/atoms/modal';
import Table from 'src/web/ats/components/common/table';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
import DeleteRowIcon from 'src/web/ats/assets/icons/x-delete.svg';
// import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import HiringManagersAndInterviewersFilter from './hmsAndIsFilter';
import HMOrIForm from './addHMOrI';
import * as S from './styles.js';


const HiringManagersAndInterviewers = ({
  hiringTeamsData,
  deleteHMOrI,
  fetchNewHMAssignees,
  fetchNewInterviewerAssignees,
  totalHiringTeamAssigneeOptions,
  fetchHMsAndIsList,
  loadingHMOrI,
  totalHiringTeamCount,
  userRole,
}) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [allRowsSelected, selectAllRows] = useState(false);
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);


  const addTeamMemberAccess = useCan(TEAMS_DISPLAY_ADD_HM_I_BUTTON);

  const renderRowActionComponent = (userDetails) => (
    ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES[userRole]?.includes(userDetails.role)
      ? <S.UserActions>
    {/* <img
     className="edit-row-icon"
     src={EditIcon}
     onClick={() => setPromptTypeUnderUse({ type: 'editHMOrI', data: userDetails })}
     alt='edit'
     /> */}
    <img
     className="delete-row-icon"
     src={DeleteRowIcon}
     onClick={() => setPromptTypeUnderUse({ type: 'deleteHMOrI', data: userDetails })}
     alt='delete'
     />
 </S.UserActions> : null);

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      width: 200,
      type: 'name',
    },
    {
      Header: 'Account Type',
      accessor: 'role_display',
      width: 150,
    },
    {
      Header: 'Company',
      accessor: 'company.name',
      width: 200,
      type: 'company',
    },
    {
      Header: 'Email',
      accessor: 'email',
      width: 150,
    },
    {
      Header: <div/>,
      accessor: 'action',
      width: 150,
      type: 'custom_cell_content',
      customCellContent: renderRowActionComponent,
    },
  ], [hiringTeamsData]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
    selectAllRows(false);
  };

  const mapFetchAssigneeCallToRole = {
    HM: fetchNewHMAssignees,
    I: fetchNewInterviewerAssignees,
  };

  const promptTypes = {
    addHMOrI: () => (
    <HMOrIForm
     userRole={userRole}
     closeAddHMOrI={() => setPromptTypeUnderUse(null)}
      />),
    editHMOrI: () => (
      <HMOrIForm
       userRole={userRole}
       isEditMode={true}
       editFormData={promptTypeUnderUse.data}
       closeAddHMOrI={() => setPromptTypeUnderUse(null)}
       />),
    deleteHMOrI: () => (
      <RemoveTeamMemberPrompt
        data={promptTypeUnderUse.data}
        fetchAssigneesOptions={
          () => mapFetchAssigneeCallToRole[promptTypeUnderUse.data.role](
            { company_id: promptTypeUnderUse.data.company.id },
          )
        }
        assigneeOptions={
          totalHiringTeamAssigneeOptions.filter((_) => _.id !== promptTypeUnderUse.data.id)
        }
        primaryAction={(selectedAssigneeId) => {
          deleteHMOrI({
            userId: promptTypeUnderUse.data.id,
            ...(selectedAssigneeId && { selectedAssigneeId }),
          });
          setPromptTypeUnderUse(null);
        }}
        secondaryAction={() => setPromptTypeUnderUse(null)}
    />
    ),
  };

  const fetchData = useCallback((startIndex = 0) => {
    if (totalHiringTeamCount && startIndex >= totalHiringTeamCount) return;
    fetchHMsAndIsList({}, { loadMore: startIndex !== 0 });
  },
  [totalHiringTeamCount]);

  return (
    <>
       <S.SearchAndAddHMOrIWrapper>
          <HiringManagersAndInterviewersFilter
            selectedRows={selectedRows}
            allRowsSelected={allRowsSelected}
          />
          {addTeamMemberAccess && <S.AddNewHMOrI
            onClick={() => setPromptTypeUnderUse({ type: 'addHMOrI' })}
          >&#43; Add HM/Interviewer</S.AddNewHMOrI>}
       </S.SearchAndAddHMOrIWrapper>
        <S.Container>
          <React.Fragment>
              <TableStyles>
                <Table
                  type={'teams'}
                  height='lg'
                  columns={columns}
                  data={hiringTeamsData}
                  fetchData={fetchData}
                  loading={loadingHMOrI}
                  loadingMessage={'Loading Hiring Managers and Interviewers'}
                  totalCount={totalHiringTeamCount}
                  actionCallback={() => {}}
                  onClickName={() => {}}
                  onClickJobName={() => {}}
                  setSelectedRows={updateSelectedRows}
                  nameCellLinkType={false}
                />
            </TableStyles>
          </React.Fragment>
        </S.Container>
       {promptTypeUnderUse
         ? <Modal
            showModal={Boolean(promptTypeUnderUse)}
            toggleModal={() => setPromptTypeUnderUse(null)}
            darkBackground={true}
          >
            {promptTypes[promptTypeUnderUse.type]
              ? promptTypes[promptTypeUnderUse.type]()
              : null}
          </Modal>
         : null}
    </>
  );
};

HiringManagersAndInterviewers.propTypes = {
  hiringTeamsData: PropTypes.array,
  deleteHMOrI: PropTypes.func,
  fetchHMsAndIsList: PropTypes.func,
  totalHiringTeamAssigneeOptions: PropTypes.array,
  fetchNewHMAssignees: PropTypes.func,
  fetchNewInterviewerAssignees: PropTypes.func,
  loadingHMOrI: PropTypes.bool,
  totalHiringTeamCount: PropTypes.number,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ teams, session }) => ({
  hiringTeamsData: teamsSelectors.hiringTeamsData({ teams }),
  totalHiringTeamAssigneeOptions: teamsSelectors.totalHiringTeamAssigneeOptions({ teams }),
  loadingHMOrI: teamsSelectors.areHiringTeamsLoading({ teams }),
  totalHiringTeamCount: teamsSelectors.getHiringTeamTotalCount({ teams }),
  userRole: sessionSelectors.getUserRole({ session }),
});

const mapDispatchToProps = {
  deleteHMOrI: teamsActions.deleteHMOrI,
  fetchHMsAndIsList: teamsActions.fetchHMsAndIsList,
  fetchNewHMAssignees: teamsActions.fetchNewHMAssignees,
  fetchNewInterviewerAssignees: teamsActions.fetchNewInterviewerAssignees,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(HiringManagersAndInterviewers));
