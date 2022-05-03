import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';
import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import Modal from 'src/web/ats/components/atoms/modal';
import FilterModal from 'src/web/ats/components/common/table/filter-modal';
import { connect } from 'react-redux';
import jobOverviewSelectors from 'src/web/ats/redux/modules/jobOverview/selector';
import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import * as S from './styles';

const PartnerConfiguration = ({
  display,
  editMode,
  setEditMode,
  fetchPartners,
  fetchCategories,
  partnerList,
  partnerCategories,
  setSelected,
  updateConfiguration,
  jobDetails,
}) => {
  const [partnerListInitial, setPartnerListInitial] = useState([]);
  const [showSyndicationFilterModal, setShowSyndicationFilterModal] = useState(false);
  const [categoriesState, setCategoriesState] = useState([...partnerCategories]);
  const [partnerListState, setPartnerListState] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);

  const sortedPartnerList = (value) => sortBy(value, (item) => !item.checked);

  const handleCheckBoxChange = (id) => (e) => {
    setPartnerListState(sortedPartnerList(partnerListState).map((item) => {
      if (item.id !== id) return item;
      return ({
        ...item,
        checked: e.target.checked,
      });
    }));
  };
  const handleCategoryModal = () => {
    setShowSyndicationFilterModal(true);
  };

  const handlePartnerConfigurationUpdate = (e) => {
    e.preventDefault();
    if (!editMode) return setEditMode(true);
    setQuery('');
    return updateConfiguration(jobDetails.id);
  };

  const handleFilterModalChange = (filters) => {
    setCategoriesState(filters);
    const selectedCategories = filters
      .filter((item) => item.selected)
      .map((item) => item.id);
    setCategory(selectedCategories.join(','));
  };

  const handleResetFilter = (type) => {
    if (type === 'reset-all') setQuery('');
  };

  const syndicationCategoryFilter = [
    {
      name: 'Category',
      filterKey: 'job',
      callback: handleCategoryModal,
    },
  ];

  useEffect(() => {
    if (!editMode) return;
    setCategory([]);
    setQuery('');
  }, [editMode]);

  useEffect(() => {
    if (partnerListState.length > 0) {
      const filteredPartnerList = partnerListInitial
        .filter((item) => {
          const partnerItem = partnerListState.find((itemState) => itemState.id === item.id);
          return (item.checked && isNil(partnerItem?.checked))
            || (!isNil(partnerItem?.checked) && partnerItem.checked);
        })
        .map((item) => item.id);
      const statePartnerList = partnerListState
        .filter((item) => item.checked)
        .map((item) => item.id);
      const selectedPartnerList = uniq([...filteredPartnerList, ...statePartnerList]);
      setPartnerListInitial(partnerListInitial.map((partner) => ({
        ...partner,
        checked: selectedPartnerList.includes(partner.id),
      })));
      setSelected(selectedPartnerList);
    }
  }, [partnerListState]);

  useEffect(() => {
    const output = partnerList.map((item) => ({
      id: item.id,
      name: item.name,
      checked: item.added,
      category: item.category?.name ?? '',
      geographies: item.geographies.map((geography) => geography.name).join(','),
    }));
    const data = sortedPartnerList(output);
    if (!partnerListInitial.length) setPartnerListInitial(data);
    setPartnerListState(data);
  }, [partnerList]);

  useEffect(() => {
    setCategoriesState(partnerCategories);
  }, [partnerCategories]);

  useEffect(() => {
    if (!display) return;
    fetchPartners({ job_id: jobDetails.id });
    fetchCategories();
  }, [
    display,
    fetchPartners,
    fetchCategories]);

  useEffect(() => {
    if (!query && isEmpty(category) && !editMode) return;
    fetchPartners({
      job_id: jobDetails.id,
      ...(query ? { query } : {}),
      ...(category ? { category } : {}),
    });
  }, [query, category]);

  return (
    <>
      {display ? (
        <S.SectionContainer>
          <S.SectionHeader>
            <S.SectionTitle>Partner Configuration</S.SectionTitle>
            <S.TextButton onClick={handlePartnerConfigurationUpdate}>{editMode ? 'Save' : 'Edit'}</S.TextButton>
          </S.SectionHeader>
          {editMode ? (
            <TableFilter
              filterOptions={syndicationCategoryFilter}
              searchQuery={query}
              executeSearch={(filter) => setQuery(filter)}
              disableSortFunc
              disableResetFilter
              useInModal
              containerFullWidth
              resetCallback={handleResetFilter}
              withClearSearch
            />
          ) : null}
          <S.SectionTableHeader>
            <div />
            <div>Partner</div>
            <div>Category</div>
            <div>Geography(s)</div>
          </S.SectionTableHeader>
          <S.SectionTableContainer>
            {query && isEmpty(partnerListState)
              ? (
                <S.SectionMessage>
                  No search results found for <strong>{query}</strong>
                </S.SectionMessage>
              )
              : null}
            {!isEmpty(partnerListState) ? <S.SectionTable>
              {partnerListState.map(((item) => (
                <React.Fragment key={item.id}>
                  <div><input disabled={!editMode} checked={item.checked} onClick={handleCheckBoxChange(item.id)} type="checkbox"/></div>
                  <div>{item.name}</div>
                  <div>{item.category}</div>
                  <div>{item.geographies}</div>
                </React.Fragment>
              )))}
            </S.SectionTable> : null}
          </S.SectionTableContainer>
        </S.SectionContainer>
      ) : null}
      {showSyndicationFilterModal && categoriesState ? (
        <Modal
          showModal={showSyndicationFilterModal}
          toggleModal={() => setShowSyndicationFilterModal(!showSyndicationFilterModal)}
        >
          <FilterModal
            modalTitle={'Select Category'}
            filtersArray={categoriesState}
            buttonCallback={handleFilterModalChange}
            closeModal={() => setShowSyndicationFilterModal(false)}
          />
        </Modal>
      ) : null}
    </>
  );
};
PartnerConfiguration.propTypes = {
  display: PropTypes.bool,
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  fetchPartners: PropTypes.func,
  fetchCategories: PropTypes.func,
  partnerList: PropTypes.array,
  partnerCategories: PropTypes.array,
  setSelected: PropTypes.func,
  updateConfiguration: PropTypes.func,
  jobDetails: PropTypes.object,
};

const mapStateToProps = ({ jobOverview }) => ({
  editMode: jobOverviewSelectors.getSyndicationPartnerEditMode({ jobOverview }),
  partnerList: jobOverviewSelectors.getSyndicationPartnerList({ jobOverview }),
  partnerCategories: jobOverviewSelectors
    .getSyndicationPartnerCategories({ jobOverview }),
  jobDetails: jobOverviewSelectors.getJobDetails({ jobOverview }),
});


const mapDispatchToProps = {
  updateJob: jobOverviewActions.updateJob,
  setEditMode: jobOverviewActions.setSyndicationPartnerEditMode,
  fetchPartners: jobOverviewActions.fetchSyndicationPartners,
  fetchCategories: jobOverviewActions.fetchSyndicationPartnerCategories,
  setSelected: jobOverviewActions.setSyndicationPartnerSelected,
  updateConfiguration: jobOverviewActions.updateSyndicationPartnerJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerConfiguration);
