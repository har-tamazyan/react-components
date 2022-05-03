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
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES, TEAMS_DISPLAY_ADD_RECRUITER_BUTTON } from 'web/ats/components/common/can/privileges';
import Modal from 'src/web/ats/components/atoms/modal';
import Table from 'src/web/ats/components/common/table';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
import DeleteRowIcon from 'src/web/ats/assets/icons/x-delete.svg';
// import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import RecruitersFilter from './recruitersFilter';
import RecruiterForm from './addInternalUser';
import * as S from './styles.js';


const InternalUsers = ({
  userRole,
  recruitersData,
  deleteRecruiter,
  fetchNewRecruiterAssignees,
  fetchRecruitersList,
  loadingRecruiters,
  totalRecruiterCount,
  totalAssigneeOptions,
}) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [allRowsSelected, selectAllRows] = useState(false);
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);
  const addTeamMemberAccess = useCan(TEAMS_DISPLAY_ADD_RECRUITER_BUTTON);

  const renderRowActionComponent = (userDetails) => (
    ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES[userRole]?.includes(userDetails.role)
      ? <S.UserActions>
        {/* <img
        className="edit-row-icon"
        src={EditIcon}
        onClick={() => setPromptTypeUnderUse({ type: 'editRecruiter', data: userDetails })}
        alt='edit'
        /> */}
        <img
        className="delete-row-icon"
        src={DeleteRowIcon}
        onClick={() => setPromptTypeUnderUse({ type: 'deleteRecruiter', data: userDetails })}
        alt='delete'
        />
      </S.UserActions>
      : null);

  const columnNames = useMemo(() => [
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
  ], [recruitersData]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
    selectAllRows(false);
  };

  const mapOfActionCallbacks = {
    deleteAction: {
      name: 'Delete Recruiter',
      callback: (data) => setPromptTypeUnderUse({ type: 'deleteRecruiter', data }),
    },
  };

  const promptTypes = {
    addRecruiter: () => (
    <RecruiterForm
      userRole={userRole}
      closeAddRecruiter={() => setPromptTypeUnderUse(null)}
     />),
    editRecruiter: () => (
      <RecruiterForm
        userRole={userRole}
        isEditMode={true}
        editFormData={promptTypeUnderUse.data}
        closeAddRecruiter={() => setPromptTypeUnderUse(null)}
       />),
    deleteRecruiter: () => (
      <RemoveTeamMemberPrompt
        data={promptTypeUnderUse.data}
        fetchAssigneesOptions={
          () => fetchNewRecruiterAssignees({ role: promptTypeUnderUse.data.role })}
        assigneeOptions={totalAssigneeOptions.filter((_) => _.id !== promptTypeUnderUse.data.id)}
        primaryAction={(selectedAssigneeId) => {
          deleteRecruiter({
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
    if (totalRecruiterCount && startIndex >= totalRecruiterCount) return;
    fetchRecruitersList({}, { loadMore: startIndex !== 0 });
  },
  [totalRecruiterCount]);

  return (
    <>
       <S.SearchAndAddRecruiterWrapper>
        <RecruitersFilter selectedRows={selectedRows} allRowsSelected={allRowsSelected}/>
        {addTeamMemberAccess && <S.AddNewRecruiter
          onClick={() => setPromptTypeUnderUse({ type: 'addRecruiter' })}
        >&#43; Add Internal User</S.AddNewRecruiter>}
       </S.SearchAndAddRecruiterWrapper>
        <S.Container>
          <React.Fragment>
               <TableStyles>
                <Table
                  type={'teams'}
                  height='lg'
                  columns={columnNames}
                  data={recruitersData}
                  fetchData={fetchData}
                  loading={loadingRecruiters}
                  loadingMessage={'Loading Internal Users'}
                  totalCount={totalRecruiterCount}
                  actionCallback={() => {}}
                  onClickName={() => {}}
                  onClickJobName={() => {}}
                  setSelectedRows={updateSelectedRows}
                  mapOfActionCallbacks={mapOfActionCallbacks}
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

InternalUsers.propTypes = {
  recruitersData: PropTypes.array,
  deleteRecruiter: PropTypes.func,
  fetchNewRecruiterAssignees: PropTypes.func,
  totalRecruiterCount: PropTypes.number,
  loadingRecruiters: PropTypes.bool,
  fetchRecruitersList: PropTypes.func,
  totalAssigneeOptions: PropTypes.array,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ teams, session }) => ({
  userRole: sessionSelectors.getUserRole({ session }),
  recruitersData: teamsSelectors.recruitersData({ teams }),
  loadingRecruiters: teamsSelectors.areRecruitersLoading({ teams }),
  totalRecruiterCount: teamsSelectors.getRecruiterTotalCount({ teams }),
  totalAssigneeOptions: teamsSelectors.getRecruiterTotalAssigneeOptions({ teams }),
});

const mapDispatchToProps = {
  deleteRecruiter: teamsActions.deleteRecruiter,
  fetchNewRecruiterAssignees: teamsActions.fetchNewRecruiterAssignees,
  fetchRecruitersList: teamsActions.fetchRecruitersList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(InternalUsers));
