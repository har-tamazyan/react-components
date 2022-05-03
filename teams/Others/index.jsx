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
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES, TEAMS_DISPLAY_ADD_OTHER_TYPE_BUTTON } from 'web/ats/components/common/can/privileges';
import Modal from 'src/web/ats/components/atoms/modal';
import Table from 'src/web/ats/components/common/table';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
import DeleteRowIcon from 'src/web/ats/assets/icons/x-delete.svg';
// import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import RecruitersFilter from './othersFilter';
import UserForm from './addUser';
import * as S from './styles.js';


const Others = ({
  userRole,
  otherTypeUsersData,
  deleteOtherTypeUser,
  fetchNewOtherTypeUserAssignees,
  fetchOtherTypeUsersList,
  loadingRecruiters,
  totalRecruiterCount,
  totalAssigneeOptions,
}) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [allRowsSelected, selectAllRows] = useState(false);
  const [promptUnderUse, setPromptUnderUse] = useState(null);
  const addTeamMemberAccess = useCan(TEAMS_DISPLAY_ADD_OTHER_TYPE_BUTTON);

  const renderRowActionComponent = (userDetails) => (
    ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES[userRole]?.includes(userDetails.role)
      ? <S.UserActions>
     {/* <img
      className="edit-row-icon"
      src={EditIcon}
      onClick={() => setPromptUnderUse({ type: 'editOtherTypeUser', data: userDetails })}
      alt='edit'
      /> */}
     <img
      className="delete-row-icon"
      src={DeleteRowIcon}
      onClick={() => setPromptUnderUse({ type: 'deleteOtherTypeUser', data: userDetails })}
      alt='delete'
      />
  </S.UserActions> : null);

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
  ], [otherTypeUsersData]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
    selectAllRows(false);
  };

  const promptTypes = {
    addOtherTypeUser: () => (
      <UserForm userRole={userRole} closeUserForm={() => setPromptUnderUse(null)}/>
    ),
    editOtherTypeUser: () => (
      <UserForm
       userRole={userRole}
       isEditMode={true}
       editFormData={promptUnderUse.data}
       closeUserForm={() => setPromptUnderUse(null)}
       />
    ),
    deleteOtherTypeUser: () => (
      <RemoveTeamMemberPrompt
        data={promptUnderUse.data}
        fetchAssigneesOptions={
          () => fetchNewOtherTypeUserAssignees({ role: promptUnderUse.data.role })}
        assigneeOptions={totalAssigneeOptions.filter((_) => _.id !== promptUnderUse.data.id)}
        primaryAction={(selectedAssigneeId) => {
          deleteOtherTypeUser({ userId: promptUnderUse.data.id, selectedAssigneeId });
          setPromptUnderUse(null);
        }}
        secondaryAction={() => setPromptUnderUse(null)}
    />
    ),
  };

  const fetchData = useCallback((startIndex = 0) => {
    if (totalRecruiterCount && startIndex >= totalRecruiterCount) return;
    fetchOtherTypeUsersList({}, { loadMore: startIndex !== 0 });
  },
  [totalRecruiterCount]);

  return (
    <>
       <S.SearchAndAddRecruiterWrapper>
        <RecruitersFilter selectedRows={selectedRows} allRowsSelected={allRowsSelected}/>
        {addTeamMemberAccess && <S.AddNewRecruiter
          onClick={() => setPromptUnderUse({ type: 'addOtherTypeUser' })}
        >&#43; Add User</S.AddNewRecruiter>}
       </S.SearchAndAddRecruiterWrapper>
        <S.Container>
          <React.Fragment>
               <TableStyles>
                <Table
                  type={'teams'}
                  height='lg'
                  columns={columnNames}
                  data={otherTypeUsersData}
                  fetchData={fetchData}
                  loading={loadingRecruiters}
                  loadingMessage={'Loading Users'}
                  totalCount={totalRecruiterCount}
                  actionCallback={() => {}}
                  onClickName={() => {}}
                  onClickJobName={() => {}}
                  setSelectedRows={updateSelectedRows}
                  nameCellLinkType={false}
                />
               </TableStyles>
             </React.Fragment>
        </S.Container>
       {promptUnderUse
         ? <Modal
            showModal={Boolean(promptUnderUse)}
            toggleModal={() => setPromptUnderUse(null)}
            darkBackground={true}
          >
            {promptTypes[promptUnderUse.type]
              ? promptTypes[promptUnderUse.type]()
              : null}
          </Modal>
         : null}
    </>
  );
};

Others.propTypes = {
  otherTypeUsersData: PropTypes.array,
  deleteOtherTypeUser: PropTypes.func,
  fetchNewOtherTypeUserAssignees: PropTypes.func,
  totalRecruiterCount: PropTypes.number,
  loadingRecruiters: PropTypes.bool,
  fetchOtherTypeUsersList: PropTypes.func,
  totalAssigneeOptions: PropTypes.array,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ teams, session }) => ({
  userRole: sessionSelectors.getUserRole({ session }),
  otherTypeUsersData: teamsSelectors.otherTypeUsersData({ teams }),
  loadingRecruiters: teamsSelectors.areOtherTypeUsersLoading({ teams }),
  totalRecruiterCount: teamsSelectors.getOtherTypeUsersTotalCount({ teams }),
  totalAssigneeOptions: teamsSelectors.getOtherTypeUsersTotalAssigneeOptions({ teams }),
});

const mapDispatchToProps = {
  fetchOtherTypeUsersList: teamsActions.fetchOtherTypeUsersList,
  deleteOtherTypeUser: teamsActions.deleteOtherTypeUser,
  fetchNewOtherTypeUserAssignees: teamsActions.fetchNewOtherTypeUserAssignees,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Others));
