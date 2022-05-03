/* eslint-disable react/display-name */
import React, {
  useState, useMemo, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import useCan from 'web/ats/components/common/can/useCan';
import { ADD_EDIT_DELETE_COMPANY } from 'web/ats/components/common/can/privileges';
import Modal from 'src/web/ats/components/atoms/modal';
import Table from 'src/web/ats/components/common/table';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
// import DeleteRowIcon from 'src/web/ats/assets/icons/x-delete.svg';
import EditIcon from 'src/web/ats/assets/icons/edit_icon_pen_light.svg';
import * as S from './styles.js';
import CompanyFilter from './companyFilter';
import DeleteCompanyPrompts from './deleteCompany/index';
import { companyActions } from '../../../redux/modules/company/creator.js';
import companySelectors from '../../../redux/modules/company/selector.js';
import { protectedRoutes } from '../../../routes/index.js';

const Company = ({
  history,
  companiesData,
  fetchCompaniesList,
  loadingCompanies,
  totalCompaniesCount,
  deleteCompany,
  createClientInfo,
  setTabLocation,
  createClientPersonnel,
  creatOrganisation,
}) => {
  const canAddEditDeleteCompany = useCan(ADD_EDIT_DELETE_COMPANY);
  const [selectedRows, setSelectedRows] = useState(null);
  const [allRowsSelected, selectAllRows] = useState(false);
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);

  useEffect(() => {
    createClientInfo({});
    creatOrganisation({});
    createClientPersonnel({});
  }, []);

  const renderRowActionComponent = (userDetails) => (
    canAddEditDeleteCompany
      ? <S.UserActions>
        <img
          className="edit-row-icon"
          src={EditIcon}
          onClick={() => {
            const companyId = userDetails.id;
            history.push({ pathname: protectedRoutes.company('clientInfo'), search: `?mode=edit&id=${companyId}` });
          }}
          alt='edit'
        />
        {/* <img
        className="delete-row-icon"
        src={DeleteRowIcon}
        onClick={() => setPromptTypeUnderUse({ type: 'deleteCompany', data: company })}
        alt='delete'
        /> */}
      </S.UserActions>
      : null);

  const renderCompanyColumn = (company) => (
    <S.CompanyNameContainer>
      <S.CompanyName onClick={() => {
        const companyId = company.id;
        history.push({ pathname: protectedRoutes.company('clientInfo'), search: `?mode=view&id=${companyId}` });
      }}>{company.name}</S.CompanyName>
    </S.CompanyNameContainer>
  );

  const columnNames = useMemo(() => [
    {
      Header: 'Company',
      accessor: 'name',
      width: 200,
      type: 'custom_cell_content',
      customCellContent: renderCompanyColumn,
    },
    {
      Header: 'No. of Open Jobs',
      accessor: 'open_jobs_count',
      width: 150,
    },
    {
      Header: 'Users',
      accessor: 'users_count',
      width: 150,
    },
    {
      Header: <div />,
      accessor: 'action',
      width: 150,
      type: 'custom_cell_content',
      customCellContent: renderRowActionComponent,
    },
  ], [companiesData, canAddEditDeleteCompany]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
    selectAllRows(false);
  };

  const promptTypes = {
    deleteCompany: () => (
      <DeleteCompanyPrompts
        data={promptTypeUnderUse.data}
        primaryAction={(selectedCompanyId) => {
          deleteCompany({ companyId: selectedCompanyId });
          setPromptTypeUnderUse(null);
        }}
        closeDeleteModal={() => setPromptTypeUnderUse(null)}
      />
    ),
  };

  const fetchData = useCallback((startIndex = 0) => {
    if (totalCompaniesCount && startIndex >= totalCompaniesCount) return;
    fetchCompaniesList({}, { loadMore: startIndex !== 0 });
  }, [totalCompaniesCount]);

  return (
    <>
      <S.SearchAndAddCompanyWrapper>
        <CompanyFilter selectedRows={selectedRows} allRowsSelected={allRowsSelected} />
        {canAddEditDeleteCompany && <S.AddNewCompany
          onClick={() => {
            history.push({ pathname: protectedRoutes.company('clientInfo'), search: '?mode=add' });
            createClientInfo({});
            setTabLocation({});
            creatOrganisation({});
            createClientPersonnel({});
          }}
        >&#43; Add Company</S.AddNewCompany>
        }
      </S.SearchAndAddCompanyWrapper>
      <S.Container>
        <React.Fragment>
          <TableStyles>
            <S.TabRow>
              <Table
                type={'company'}
                height='lg'
                columns={columnNames}
                data={companiesData}
                fetchData={fetchData}
                loading={loadingCompanies}
                loadingMessage={'Loading Companies'}
                totalCount={totalCompaniesCount}
                actionCallback={() => { }}
                onClickName={() => { }}
                onClickJobName={() => { }}
                setSelectedRows={updateSelectedRows}
                nameCellLinkType={false}
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

Company.propTypes = {
  deleteCompany: PropTypes.func,
  totalCompaniesCount: PropTypes.number,
  loadingCompanies: PropTypes.bool,
  fetchCompaniesList: PropTypes.func,
  userRole: PropTypes.string,
  companiesData: PropTypes.array,
  history: PropTypes.object,
  createClientInfo: PropTypes.func,
  setTabLocation: PropTypes.func,
  creatOrganisation: PropTypes.func,
  createClientPersonnel: PropTypes.func,
};


const mapStateToProps = ({ session, company }) => ({
  userRole: sessionSelectors.getUserRole({ session }),
  companiesData: companySelectors.companiesData({ company }),
  totalCompaniesCount: companySelectors.getCompanyTotalCount({ company }),
  loadingCompanies: companySelectors.areCompaniesLoading({ company }),
});

const mapDispatchToProps = {
  fetchCompaniesList: companyActions.fetchCompaniesList,
  deleteCompany: companyActions.deleteCompany,
  createClientInfo: companyActions.createClientInfo,
  setTabLocation: companyActions.setTabLocation,
  creatOrganisation: companyActions.creatOrganisation,
  createClientPersonnel: companyActions.createClientPersonnel,
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(withRouter(Company));
