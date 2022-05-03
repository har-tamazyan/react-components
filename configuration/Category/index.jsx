/* eslint-disable react/display-name */
import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useCan from 'web/ats/components/common/can/useCan';
import Modal from 'src/web/ats/components/atoms/modal';
import Table from 'src/web/ats/components/common/table';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
import DeleteRowIcon from 'src/web/ats/assets/icons/x-delete.svg';
import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import { mapRolesToConstants } from 'src/config/definitions';
import { categoriesActions } from 'src/web/ats/redux/modules/category/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import categorySelectors from 'src/web/ats/redux/modules/category/selector.js';
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES, CONFIGURATION_DISPLAY_ADD_CATEGORY_BUTTON } from 'web/ats/components/common/can/privileges';
import CategoryFilter from './categoryFilter';
import CategoryForm from './addCategory';
import CategoryPrompts from './deleteCategory';
import * as S from './styles.js';

const Category = ({
  userRole,
  categoriesData,
  fetchCategoriesList,
  loadingCategories,
  totalCategoryCount,
  deleteCategory,
}) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [allRowsSelected, selectAllRows] = useState(false);
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);
  const addTeamMemberAccess = useCan(CONFIGURATION_DISPLAY_ADD_CATEGORY_BUTTON);
  const renderRowActionComponent = (userDetails) => (
    ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES[userRole]?.includes(mapRolesToConstants.CATEGORY)
      ? <S.UserActions>
        <img
          className="edit-row-icon"
          src={EditIcon}
          onClick={() => setPromptTypeUnderUse({ type: 'editCategory', data: userDetails })}
          alt='edit'
        />
        <img
          className="delete-row-icon"
          src={DeleteRowIcon}
          onClick={() => setPromptTypeUnderUse({ type: 'deleteCategory', data: userDetails })}
          alt='delete'
        />
      </S.UserActions>
      : null);

  const columnNames = useMemo(() => [
    {
      Header: 'Category',
      accessor: 'name',
      width: 150,
      type: 'name',
    },
    {
      Header: 'Role Family',
      accessor: 'subcategories',
      type: 'cetegory',
      id: 'role_family',
      width: 150,
    },
    {
      Header: 'Sourcing manager',
      width: 250,
      accessor: 'subcategories',
      type: 'cetegory',
      id: 'sourcing_manager',
    },
    {
      Header: <div />,
      accessor: 'action',
      width: 150,
      type: 'custom_cell_content',
      customCellContent: renderRowActionComponent,
    },
  ], [categoriesData]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
    selectAllRows(false);
  };

  const mapOfActionCallbacks = {
    deleteAction: {
      name: 'Delete Category',
      callback: (data) => setPromptTypeUnderUse({ type: 'deleteCategory', data }),
    },
  };
  const promptTypes = {
    addCategory: () => (
      <CategoryForm
        userRole={userRole}
        closeAddRecruiter={() => setPromptTypeUnderUse(null)}
      />),
    editCategory: () => (
      <CategoryForm
        userRole={userRole}
        isEditMode={true}
        editFormData={promptTypeUnderUse.data}
        closeAddRecruiter={() => setPromptTypeUnderUse(null)}
      />),
    deleteCategory: () => (
      <CategoryPrompts
        data={promptTypeUnderUse.data}
        closeDeleteModal={() => setPromptTypeUnderUse(null)}
        primaryAction={() => {
          deleteCategory({
            categoryId: promptTypeUnderUse.data.id,
          });
          setPromptTypeUnderUse(null);
        }}
      />
    ),
  };

  const fetchData = useCallback((startIndex = 0) => {
    if (totalCategoryCount && startIndex >= totalCategoryCount) return;
    fetchCategoriesList({}, { loadMore: startIndex !== 0 });
  },
  [totalCategoryCount]);

  return (
    <>
      <S.SearchAndAddRecruiterWrapper>
        <CategoryFilter selectedRows={selectedRows} allRowsSelected={allRowsSelected} />
        {addTeamMemberAccess && <S.AddNewRecruiter
          onClick={() => setPromptTypeUnderUse({ type: 'addCategory' })}
        >&#43; Add  Category</S.AddNewRecruiter>}
      </S.SearchAndAddRecruiterWrapper>
      <S.Container>
        <React.Fragment>
          <TableStyles>
            <S.TabRow>
              <Table
                hideAvatarOnName
                type={'category'}
                height='lg'
                columns={columnNames}
                data={categoriesData}
                fetchData={fetchData}
                loading={loadingCategories}
                loadingMessage={'Loading Category & Sub-catogory'}
                totalCount={totalCategoryCount}
                actionCallback={() => { }}
                onClickName={() => { }}
                onClickJobName={() => { }}
                setSelectedRows={updateSelectedRows}
                mapOfActionCallbacks={mapOfActionCallbacks}
              />
            </S.TabRow>
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

Category.propTypes = {
  categoriesData: PropTypes.array,
  totalCategoryCount: PropTypes.number,
  loadingCategories: PropTypes.bool,
  fetchCategoriesList: PropTypes.func,
  userRole: PropTypes.string,
  deleteCategory: PropTypes.func,
};

const mapStateToProps = ({ session, category }) => ({
  userRole: sessionSelectors.getUserRole({ session }),
  categoriesData: categorySelectors.categoriesData({ category }),
  loadingCategories: categorySelectors.areCategoriesLoading({ category }),
  totalCategoryCount: categorySelectors.getCategoryTotalCount({ category }),
});

const mapDispatchToProps = {
  fetchCategoriesList: categoriesActions.fetchCategoriesList,
  deleteCategory: categoriesActions.deleteCategory,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Category));
