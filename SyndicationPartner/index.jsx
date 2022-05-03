/* eslint-disable react/display-name */
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'src/web/ats/components/atoms/modal';
import Main from 'src/web/ats/components/templates/main';
import Table from 'src/web/ats/components/common/table';
import partnersSelectors from 'src/web/ats/redux/modules/syndicationPartner/selector';
import useCan from 'web/ats/components/common/can/useCan';
import { ADD_SYNDICATION_PARTNER } from 'web/ats/components/common/can/privileges';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
import { partnersActions } from 'src/web/ats/redux/modules/syndicationPartner/creator';
import PartnerFilters from './PartnerFilters';
import PartnerForm from './partnerForm';
import * as S from './styles';

const SyndicationPartner = ({
  loadingPartners,
  partnersTotalCount,
  syndicationPartnersData,
  fetchPartnersList,
}) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [allRowsSelected, selectAllRows] = useState(false);
  const [promptUnderUse, setPromptUnderUse] = useState(null);

  const columns = useMemo(() => [
    {
      Header: 'Partner Name',
      accessor: 'name',
      width: 100,
      type: 'name',
    },
    {
      Header: 'Category',
      accessor: 'category.name',
      width: 100,
    },
    {
      Header: 'Geography(s)',
      accessor: (row) => row.geographies.map((__) => __.name),
      width: 100,
      type: 'array',
    },
    {
      Header: 'Specialisation(s)',
      accessor: 'specialization',
      width: 100,
      type: 'array',
    },
  ], [syndicationPartnersData]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
    selectAllRows(false);
  };

  const fetchData = useCallback((startIndex = 0) => {
    if (partnersTotalCount && startIndex >= partnersTotalCount) return;
    fetchPartnersList({}, { loadMore: startIndex !== 0 });
  }, [partnersTotalCount]);

  const promptTypes = {
    addPartner: () => (
      <PartnerForm
       config={{ mode: 'add_partner' }}
       closeUserForm={() => setPromptUnderUse(null)}
       />
    ),
    viewPartner: () => (
      <PartnerForm
       config={{ mode: 'view_partner', data: promptUnderUse.data }}
       closeUserForm={() => setPromptUnderUse(null)}
       />
    ),
  };

  const getPartnerDetails = (selectedPartner) => () => {
    setPromptUnderUse(
      {
        type: 'viewPartner',
        data: {
          ...selectedPartner,
          category: selectedPartner.category?.id,
          geographies: selectedPartner.geographies.map((_) => _.id),
        },
      },
    );
  };

  const canAddSyndicationPartner = useCan(ADD_SYNDICATION_PARTNER);

  return (
    <Main title={'Syndication Partner'}>
      <S.Wrapper>
        <S.Title>Syndication Partner</S.Title>
        <S.Main>
          <S.SearchAndAddNewPartner>
            <PartnerFilters selectedRows={selectedRows} allRowsSelected={allRowsSelected} />
          {canAddSyndicationPartner ? <S.AddNewPartner onClick={() => setPromptUnderUse({ type: 'addPartner' })}>
            &#43; Add Syndication Partner
          </S.AddNewPartner> : null}
          </S.SearchAndAddNewPartner>
          <S.Container>
            <TableStyles>
              <Table
                hideAvatarOnName
                type={'syndication_partner'}
                height='lg'
                columns={columns}
                data={syndicationPartnersData}
                fetchData={fetchData}
                loading={loadingPartners}
                loadingMessage={'Loading partners'}
                totalCount={partnersTotalCount}
                actionCallback={() => {}}
                onClickName={getPartnerDetails}
                setSelectedRows={updateSelectedRows}
                nameCellLinkType={true}
              />
            </TableStyles>
          </S.Container>
        </S.Main>
      </S.Wrapper>
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
    </Main>
  );
};

SyndicationPartner.propTypes = {
  syndicationPartnersData: PropTypes.array,
  loadingPartners: PropTypes.bool,
  partnersTotalCount: PropTypes.number,
  fetchPartnersList: PropTypes.func,
};

const mapStateToProps = ({ syndicationPartner }) => ({
  syndicationPartnersData: partnersSelectors.syndicationPartnersData({ syndicationPartner }),
  loadingPartners: partnersSelectors.arePartnersLoading({ syndicationPartner }),
  partnersTotalCount: partnersSelectors.getPartnersTotalCount({ syndicationPartner }),
});

const mapDispatchToProps = {
  fetchPartnersList: partnersActions.fetchPartnersList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SyndicationPartner));
