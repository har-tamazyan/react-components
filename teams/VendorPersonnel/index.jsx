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
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES, TEAMS_DISPLAY_ADD_VENDOR_BUTTON } from 'web/ats/components/common/can/privileges';
import { mapRolesToConstants } from 'src/config/definitions';
import Modal from 'src/web/ats/components/atoms/modal';
import Table from 'src/web/ats/components/common/table';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
import DeleteRowIcon from 'src/web/ats/assets/icons/x-delete.svg';
// import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import VendorsFilter from './vendorsFilter';
import VendorForm from './addVendor';
import * as S from './styles.js';


const VendorPersonnel = ({
  vendorsData,
  deleteVendor,
  fetchVendorsList,
  loadingVendors,
  totalVendorCount,
  userRole,
  fetchNewRecruiterAssignees,
  totalAssigneeOptions,
}) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [allRowsSelected, selectAllRows] = useState(false);
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);


  const addTeamMemberAccess = useCan(TEAMS_DISPLAY_ADD_VENDOR_BUTTON);

  const renderRowActionComponent = (userDetails) => (
    ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES[userRole]?.includes(userDetails.role)
      ? <S.UserActions>
    {/* <img
     className="edit-row-icon"
     src={EditIcon}
     onClick={() => setPromptTypeUnderUse({ type: 'editVendor', data: userDetails })}
     alt='edit'
     /> */}
    <img
     className="delete-row-icon"
     src={DeleteRowIcon}
     onClick={() => setPromptTypeUnderUse({ type: 'deleteVendor', data: userDetails })}
     alt='delete'
     />
 </S.UserActions>
      : null);

  const columns = useMemo(() => [
    {
      Header: 'Vendor Personnel',
      accessor: 'name',
      width: 200,
      type: 'name',
    },
    {
      Header: 'Vendor Agency',
      accessor: 'agency',
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
  ], [vendorsData]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
    selectAllRows(false);
  };

  const promptTypes = {
    addVendor: () => (
    <VendorForm
     userRole={userRole}
     closeAddVendor ={() => setPromptTypeUnderUse(null)}
      />),
    editVendor: () => (
    <VendorForm
     userRole={userRole}
     isEditMode={true}
     editFormData={promptTypeUnderUse.data}
     closeAddVendor ={() => setPromptTypeUnderUse(null)} />
    ),
    deleteVendor: () => (
      <RemoveTeamMemberPrompt
        data={promptTypeUnderUse.data}
        fetchAssigneesOptions={
          () => fetchNewRecruiterAssignees({ role: mapRolesToConstants.RECRUITER })}
        assigneeOptions={totalAssigneeOptions.filter((_) => _.id !== promptTypeUnderUse.data.id)}
        primaryAction={(selectedAssigneeId) => {
          deleteVendor({
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
    if (totalVendorCount && startIndex >= totalVendorCount) return;
    fetchVendorsList({}, { loadMore: startIndex !== 0 });
  },
  [totalVendorCount]);

  return (
    <>
        <S.SearchAndAddVendorWrapper>
        <VendorsFilter selectedRows={selectedRows} allRowsSelected={allRowsSelected}/>
          {addTeamMemberAccess && <S.AddNewVendor
            onClick={() => setPromptTypeUnderUse({ type: 'addVendor' })}
          >&#43; Add Vendor Personnel</S.AddNewVendor>}
       </S.SearchAndAddVendorWrapper>
        <S.Container>
          <React.Fragment>
               <TableStyles>
                  <Table
                    type={'teams'}
                    height='lg'
                    columns={columns}
                    data={vendorsData}
                    fetchData={fetchData}
                    loading={loadingVendors}
                    loadingMessage={'Loading Vendors Personnel'}
                    totalCount={totalVendorCount}
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

VendorPersonnel.propTypes = {
  vendorsData: PropTypes.array,
  deleteVendor: PropTypes.func,
  totalVendorCount: PropTypes.number,
  loadingVendors: PropTypes.bool,
  fetchVendorsList: PropTypes.func,
  fetchRecruitersList: PropTypes.func,
  fetchNewRecruiterAssignees: PropTypes.func,
  totalAssigneeOptions: PropTypes.array,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ teams, session }) => ({
  userRole: sessionSelectors.getUserRole({ session }),
  vendorsData: teamsSelectors.vendorsData({ teams }),
  loadingVendors: teamsSelectors.areVendorsLoading({ teams }),
  totalVendorCount: teamsSelectors.getVendorTotalCount({ teams }),
  totalAssigneeOptions: teamsSelectors.getRecruiterTotalAssigneeOptions({ teams }),
});

const mapDispatchToProps = {
  deleteVendor: teamsActions.deleteVendor,
  fetchVendorsList: teamsActions.fetchVendorsList,
  fetchNewRecruiterAssignees: teamsActions.fetchNewRecruiterAssignees,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(VendorPersonnel));
