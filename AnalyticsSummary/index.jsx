import React, { useCallback, useEffect, useState } from 'react';
import { Title } from 'src/web/ats/components/Analytics/details/styles';
import PropTypes from 'prop-types';
import useFeature from 'src/web/ats/components/common/feature/useFeature';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ArrowRight from 'src/web/ats/assets/icons/arrow_right.svg';
import ArrowLeftDisabled from 'src/web/ats/assets/icons/arrow_right_disabled.svg';
import useCan from 'src/web/ats/components/common/can/useCan';
import { VIEW_ANALYTICS_JOB_STATUS } from 'src/web/ats/components/common/can/privileges';
import {
  RootWrapper,
  MainContainer,
  SummaryWrapper,
  TableTitle,
  AnalyticsDialogDiagramInfoContainer,
  StyledTotalJobs,
  SummaryWrapperHeader,
  DialogDiagramContainer,
  AnalyticsDialogDiagramInfo,
  StyledLink,
  StyledDiseabledLink,
  SummaryNoRecordsWrapper,
} from 'src/web/ats/components/AnalyticsSummary/styles';
import { FILTERS } from 'src/web/ats/components/Analytics/options';
import { protectedRoutes } from 'src/web/ats/routes';
import Filters from 'src/web/ats/components/atoms/filters';
import AnalyticsDialogDiagram from 'src/web/ats/components/AnalyticsDetailDiagram';
import { analyticsActions } from 'src/web/ats/redux/modules/analytics/creator';
import { FEATURE_KEY } from 'src/config/features';
import {
  getAnalyticsJobStatusData, getAnalyticFiltersState,
  getFilterDefaultDates, fillColor, getAllPayloads, renderNoRecords,
  clearAnalyticsSearchInputs, generateAnalyticFiltersPayload,
} from 'src/web/ats/utils';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { isEqual } from 'lodash';
import {
  dataPayloadConfigs, defaultNonPopupValues, TABLE_SCROLL_EXPIRATION_TIMEOUT,
} from 'src/web/ats/components/Analytics/details/constants';
import {
  analyticsDownloadActions,
} from 'src/web/ats/redux/modules/analyticsReportDownload/creator';

const FILL_COLOR_CONFIGS = {
  IS_COLOR_ADDED: false,
};

const SELECT_TYPE_COMPANY = 'company';

const addFill = (data) => {
  if (FILL_COLOR_CONFIGS.IS_COLOR_ADDED || !data.values) return data;
  data.values = fillColor(data.values, 'fill');

  FILL_COLOR_CONFIGS.IS_COLOR_ADDED = true;
  return data;
};

const AnalyticsSummary = ({
  title, jobStatus, fetchOptions, filterOptions,
  filters, setFilters, user, setAnalyticsJobStatus, getUserPreferences,
  storeDataPayload, setStoreDataPayload, setScorCardData, tableValues,
  setTrendLineData, setTableData, setFilterOptions, setTableValues, tableData,
}) => {
  const [summaryData, setSummaryData] = useState(jobStatus);
  const showAnalyticsFilterFlag = useFeature(FEATURE_KEY.ANALYTICS_FILTERS);

  const canViewCompanyFilter = true;
  const [tableScrollExpiredTimeout, setTableScrollExpiredTimeout] = useState(null);
  const [filteredConfigs, setFilteredConfigs] = useState(
    FILTERS?.filters.length
    && FILTERS.filters
      .filter((data) => (canViewCompanyFilter)
        || (!(canViewCompanyFilter) && data.id !== SELECT_TYPE_COMPANY)),
  );
  useEffect(() => {
    if (!jobStatus.title) return;
    setSummaryData(() => ({ ...jobStatus, values: fillColor(jobStatus.values, 'fill') }));
  }, [jobStatus]);

  useEffect(() => {
    const userPreferencePayload = {
      user_id: user?.id,
      page_name: 'Analytics Dashboard Page',
    };
    getUserPreferences(userPreferencePayload);
  }, []);

  const resetFiltersState = useCallback((isReset) => {
    const filtersConfigs = getAnalyticFiltersState(
      defaultNonPopupValues, canViewCompanyFilter, user, isReset ? {} : filters,
    );
    const datesAndCompany = getAnalyticsJobStatusData(filtersConfigs);
    const allPayloads = getAllPayloads(
      filteredConfigs, storeDataPayload, datesAndCompany, filtersConfigs, isReset,
    );
    const { defaultPayload, trendLinePayload, tablePayload } = allPayloads;

    if (
      (!isEqual(defaultPayload, dataPayloadConfigs.lastPayload)
        && (!storeDataPayload.isApplied || isReset)) || !jobStatus.type
    ) {
      if (isReset) setTableValues({ clearData: true });
      setTableData(tablePayload);
      dataPayloadConfigs.lastPayload = defaultPayload;
      setFilterOptions({ reset: true });
      setScorCardData(defaultPayload);
      setTrendLineData(trendLinePayload);
      setAnalyticsJobStatus(datesAndCompany);
      setFilters(isReset ? filtersConfigs : { ...filters, ...filtersConfigs });
      setStoreDataPayload({
        ...storeDataPayload,
        filters: defaultPayload.filters,
        datesAndCompany,
        isApplied: true,
      });
    }
  }, [canViewCompanyFilter, user, storeDataPayload, dataPayloadConfigs]);


  useEffect(() => {
    if (tableData.data?.length && !tableValues.data?.length) {
      setTableScrollExpiredTimeout(setTimeout(() => {
        setTableValues({ expired: true });
        clearTimeout(tableScrollExpiredTimeout);
      }, TABLE_SCROLL_EXPIRATION_TIMEOUT));
      setTableValues({ firstTimeRendered: true });
    }
  }, [tableData, tableValues]);

  useEffect(() => {
    resetFiltersState();
  }, [canViewCompanyFilter, user]);

  const handleApplyFilters = () => {
    clearTimeout(tableScrollExpiredTimeout);
    const filtersPayload = generateAnalyticFiltersPayload(
      filteredConfigs, { ...storeDataPayload, filters: [] }, filters, filterOptions,
    );

    const filtersConfigs = getAnalyticFiltersState(
      defaultNonPopupValues, canViewCompanyFilter, user, filters,
    );
    const datesAndCompany = getAnalyticsJobStatusData(filtersConfigs);

    const allPayloads = getAllPayloads(
      filteredConfigs, filtersPayload, datesAndCompany, filtersConfigs,
    );
    const { defaultPayload, trendLinePayload, tablePayload } = allPayloads;

    if (!isEqual(defaultPayload, dataPayloadConfigs.lastPayload)) {
      setScorCardData({ ...defaultPayload, isApplied: true });
      setTrendLineData(trendLinePayload);
      setTableData(tablePayload);
      dataPayloadConfigs.lastPayload = defaultPayload;
      setAnalyticsJobStatus(filtersPayload.datesAndCompany);
      setStoreDataPayload(filtersPayload);
      setTableValues({ clearData: true });
    }

    return filtersPayload;
  };

  const onResetClick = () => {
    if (!isEqual(defaultNonPopupValues, filters)) {
      dataPayloadConfigs.lastPayload = {};
      resetFiltersState(true);
      clearAnalyticsSearchInputs(setFilteredConfigs);
    }
  };

  const onDropdownChange = (values, actionData) => {
    const { action, name } = actionData;

    if (action === 'pop-value') return;

    if (name === SELECT_TYPE_COMPANY) {
      const dates = getFilterDefaultDates({});
      setStoreDataPayload({
        ...storeDataPayload,
        datesAndCompany: getAnalyticsJobStatusData({ company: values, dp: dates }),
      });

      setFilters({
        [SELECT_TYPE_COMPANY]: values,
        dp: dates,
      });
    }
  };

  const onDateChange = (value, filterId) => {
    const datesAndCompany = getAnalyticsJobStatusData({ company: filters.company, dp: value });
    setStoreDataPayload({
      ...storeDataPayload,
      datesAndCompany,
    });

    setFilters({
      ...filters,
      [filterId]: value,
    });
  };

  if (!summaryData) return null;

  const summaryDataWithAddedFill = addFill(summaryData || {});
  const canViewJobStatus = useCan(VIEW_ANALYTICS_JOB_STATUS);

  return (
    <MainContainer>
      <Title>{title}</Title>
      <div>
        {!!showAnalyticsFilterFlag
          && <Filters
            filterValues={filters}
            filterButtonSummary
            fetchOptions={fetchOptions}
            filterOptions={filterOptions}
            onReset={onResetClick}
            onApply={handleApplyFilters}
            onDateChange={onDateChange}
            filteredConfigs={filteredConfigs}
            onDropdownChange={onDropdownChange}
          />
        }
      </div>
      {!!canViewJobStatus
        && <RootWrapper>
          <SummaryWrapper disabled={!summaryData.values?.length} key={summaryData.title}>
            <SummaryWrapperHeader>
              <TableTitle>
                {summaryData.title}
              </TableTitle>
              <div className='view-details'>
                {summaryData.values?.length
                  ? <StyledLink
                    to={`${protectedRoutes.details}?name=${summaryData.title}`}
                  >
                    View Details
                  </StyledLink>
                  : <StyledDiseabledLink>View Details</StyledDiseabledLink>}
                <img src={summaryData.values?.length ? ArrowRight : ArrowLeftDisabled} />
              </div>
            </SummaryWrapperHeader>
            {summaryData.values?.length
              ? <>
                  <StyledTotalJobs>
                    <p>Total Jobs</p>
                    <h1>{summaryData.total_jobs}</h1>
                  </StyledTotalJobs>
                  <DialogDiagramContainer>
                    <AnalyticsDialogDiagram summaryData={summaryDataWithAddedFill} />
                    <AnalyticsDialogDiagramInfoContainer>
                      {
                        summaryDataWithAddedFill?.values?.map((data, index) => {
                          // TODO - REMOVE THAT WHEN THE NAMING IN DATA WILL BE CORRECT
                          data.name = data.name.includes('_')
                            ? data.name.split('_').join(' ') : data.name;
                          return (
                            <div key={`${data.value}_${index}`}>
                              <AnalyticsDialogDiagramInfo fill={data.fill} />
                              <div>
                                {
                                  data.name.slice(0, 1).toUpperCase()
                                  + data.name.slice(1, data.name.length)
                                }
                              </div>
                            </div>
                          );
                        })
                      }
                    </AnalyticsDialogDiagramInfoContainer>
                  </DialogDiagramContainer>
                </>
              : <SummaryNoRecordsWrapper>
                  {renderNoRecords(jobStatus)}
                </SummaryNoRecordsWrapper>
            }

          </SummaryWrapper>
        </RootWrapper>
      }
    </MainContainer>
  );
};

AnalyticsSummary.propTypes = {
  title: PropTypes.string,
  filters: PropTypes.object,
  storeDataPayload: PropTypes.array,
  jobStatus: PropTypes.shape({
    title: PropTypes.string,
    values: PropTypes.array,
    type: PropTypes.string,
  }),
  setFilters: PropTypes.func,
  setStoreDataPayload: PropTypes.func,
  fetchOptions: PropTypes.func,
  filterOptions: PropTypes.object,
  setAnalyticsJobStatus: PropTypes.func,
  setScorCardData: PropTypes.func,
  setFilterOptions: PropTypes.func,
  setTrendLineData: PropTypes.func,
  setTableValues: PropTypes.func,
  setTableData: PropTypes.func,
  tableData: PropTypes.object,
  tableValues: PropTypes.object,
  user: PropTypes.shape({
    id: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  getUserPreferences: PropTypes.func,
  upsertUserPreference: PropTypes.func,
};

AnalyticsSummary.defaultProps = {
  title: 'Analytics Dashboard',
  filters: {},
  storeDataPayload: [],
  jobStatus: {
    title: '',
    values: [],
  },
  user: {
    company: {
      name: '',
    },
  },
  tableData: {},
  tableValues: {},
  setFilters: () => { },
  fetchOptions: () => { },
  setAnalyticsJobStatus: () => { },
  setScorCardData: () => { },
  setTrendLineData: () => { },
  setTableData: () => { },
  setStoreDataPayload: () => { },
  setFilterOptions: () => { },
  setTableValues: () => { },
};

const mapStateToProps = ({
  analytics: {
    analyticsJobStatus,
    analyticsDetailFilterOptions,
    analyticsFilters,
    analyticsDataPayload,
    analyticsDetailTableData,
    analyticsTableValues,
  },
  ...state
}) => ({
  user: sessionSelectors.getUser(state),
  jobStatus: analyticsJobStatus,
  filterOptions: analyticsDetailFilterOptions,
  tableData: analyticsDetailTableData,
  tableValues: analyticsTableValues,
  filters: analyticsFilters,
  storeDataPayload: analyticsDataPayload,
});

const mapDispatchToProps = {
  getReport: analyticsDownloadActions.startPolling,
  setFilters: analyticsActions.setAnalyticsFilters,
  fetchOptions: analyticsActions.fetchAnalyticsDetailFilterOptions,
  setAnalyticsJobStatus: analyticsActions.analyticsJobStatus,
  setStoreDataPayload: analyticsActions.setAnalyticsDataPayload,
  setScorCardData: analyticsActions.analyticsDetailScoreCardData,
  setTrendLineData: analyticsActions.analyticsDetailTrendLineData,
  setFilterOptions: analyticsActions.setAnalyticsDetailFilterOptions,
  setTableData: analyticsActions.analyticsDetailTableData,
  setTableValues: analyticsActions.analyticsTableValues,
  getUserPreferences: analyticsActions.fetchAnalyticsUserPreference,
  upsertUserPreference: analyticsActions.upsertUserPreference,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AnalyticsSummary));

