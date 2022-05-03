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
import {
  ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES,
  TEAMS_DISPLAY_ADD_VENDOR_AGENCY_BUTTON,
} from 'web/ats/components/common/can/privileges';
import { mapRolesToConstants, VENDOR_AGENCY, vendorAgencyDisplayName } from 'src/config/definitions';
import Modal from 'src/web/ats/components/atoms/modal';
import Table from 'src/web/ats/components/common/table';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
import DeleteRowIcon from 'src/web/ats/assets/icons/x-delete.svg';
import VendorsFilter from './vendorsFilter';
import VendorForm from './addVendor';
import * as S from './styles.js';


const VendorAgencies = ({
  vendorsData,
  deleteVendorAgenciesList,
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

  const displayAddAgencyButton = useCan(TEAMS_DISPLAY_ADD_VENDOR_AGENCY_BUTTON);

  const renderRowActionComponent = (userDetails) => (
    ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES[userRole]?.includes(VENDOR_AGENCY)
      ? <S.UserActions>
        <img
          className="delete-row-icon"
          src={DeleteRowIcon}
          onClick={() => setPromptTypeUnderUse({ type: 'deleteVendorAgenciesList', data: { ...userDetails, role: VENDOR_AGENCY, role_display: vendorAgencyDisplayName } })}
          alt='delete'
        />
      </S.UserActions>
      : null);

  const columns = useMemo(() => [
    {
      Header: 'Vendor Agency Name',
      accessor: 'name',
      width: 100,
      type: 'name',
    },
    {
      Header: 'Possible Engagement Type',
      accessor: 'engagement_type',
      width: 150,
    },
    {
      Header: 'Resume Validity Period',
      accessor: 'profile_validity_period',
      width: 150,
    },
    {
      Header: 'Allowed Email Domain',
      accessor: 'email_domain',
      width: 150,
    },
    {
      Header: <div />,
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
        closeAddVendor={() => setPromptTypeUnderUse(null)}
      />),
    editVendor: () => (
      <VendorForm
        userRole={userRole}
        isEditMode={true}
        editFormData={promptTypeUnderUse.data}
        closeAddVendor={() => setPromptTypeUnderUse(null)} />
    ),
    deleteVendorAgenciesList: () => (
      <RemoveTeamMemberPrompt
        data={promptTypeUnderUse.data}
        fetchAssigneesOptions={
          () => fetchNewRecruiterAssignees({ role: mapRolesToConstants.RECRUITER })}
        assigneeOptions={totalAssigneeOptions.filter((_) => _.id !== promptTypeUnderUse.data.id)}
        primaryAction={(selectedAssigneeId) => {
          deleteVendorAgenciesList({
            agencyId: promptTypeUnderUse.data.id,
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
        <VendorsFilter selectedRows={selectedRows} allRowsSelected={allRowsSelected} />
        {displayAddAgencyButton && <S.AddNewVendor
          onClick={() => setPromptTypeUnderUse({ type: 'addVendor' })}
        >&#43; Add Vendor</S.AddNewVendor>}
      </S.SearchAndAddVendorWrapper>
      <S.Container>
        <React.Fragment>
          <TableStyles>
            <Table
              hideAvatarOnName
              type={'teams'}
              height='lg'
              columns={columns}
              data={vendorsData}
              fetchData={fetchData}
              loading={loadingVendors}
              loadingMessage={'Loading Vendor Agencies'}
              totalCount={totalVendorCount}
              actionCallback={() => { }}
              onClickName={() => { }}
              onClickJobName={() => { }}
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

VendorAgencies.propTypes = {
  vendorsData: PropTypes.array,
  deleteVendorAgenciesList: PropTypes.func,
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
  vendorsData: teamsSelectors.vendorAgenciesData({ teams }),
  loadingVendors: teamsSelectors.areVendorAgenciesLoading({ teams }),
  totalVendorCount: teamsSelectors.getVendorAgenciesTotalCount({ teams }),
  totalAssigneeOptions: teamsSelectors.getRecruiterTotalAssigneeOptions({ teams }),
});

const mapDispatchToProps = {
  deleteVendorAgenciesList: teamsActions.deleteVendorAgenciesList,
  fetchVendorsList: teamsActions.fetchVendorAgenciesList,
  fetchNewRecruiterAssignees: teamsActions.fetchNewRecruiterAssignees,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(VendorAgencies));
