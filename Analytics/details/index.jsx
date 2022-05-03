import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import Filters from 'src/web/ats/components/atoms/filters';
import PropTypes from 'prop-types';
import { FILTERS } from 'src/web/ats/components/Analytics/options';
import { connect } from 'react-redux';
import useFeature from 'src/web/ats/components/common/feature/useFeature';
import { protectedRoutes } from 'src/web/ats/routes';
import {
  Toolbar,
  Item,
} from 'devextreme-react/data-grid';
import { isEqual, isArray } from 'lodash';
import { SUMMARY_DATA_TYPE } from 'src/web/ats/components/AnalyticsSummary/data';
import { MainContainer, TableContainer } from 'src/web/ats/components/Analytics/styles';
import ScoreCard from 'src/web/ats/components/Analytics/ScoreCard/ScoreCard';
import AnalyticsDetailDiagram from 'src/web/ats/components/AnalyticsDetailDiagram';
import useCan from 'src/web/ats/components/common/can/useCan';
import {
  VIEW_ANALYTICS_REPORT,
  VIEW_ANALYTICS_SCORECARD,
  VIEW_ANALYTICS_TRENDLINE,
} from 'src/web/ats/components/common/can/privileges';
import {
  StyledDiagramDetails,
  StyledDiagramDetailsContainer,
  Title,
  StyledBackButton,
  BackButtonContainer,
  StyledScoreCard,
  GridWrapper,
  NoGridWrapper,
} from 'src/web/ats/components/Analytics/details/styles';
import { FEATURE_KEY } from 'src/config/features';
import { analyticsActions } from 'src/web/ats/redux/modules/analytics/creator';
import ToggleMenu from 'src/web/ats/components/atoms/toggleMenu';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import {
  getAnalyticFiltersState, addPropertiesToAnalyticsScorecardData,
  getFilterDefaultDates, getAnalyticsJobStatusData, getAllPayloads,
  generateAnalyticFiltersPayload, clearAnalyticsSearchInputs, renderNoRecords,
} from 'src/web/ats/utils';
import {
  CLEAR, dataPayloadConfigs, DEBOUNCE_TIME, defaultNonPopupValues, OPTION_VALUE_SELECT_ALL,
  DESELECT_OPTION, LOCATION_SEARCH_KEY, SELECT_OPTION, SUMMARY_DATA_TITLE,
  SELECT_TYPE_COMPANY, TABLE_SCROLL_BOTTOM_DISTANCE, SELECT_ALL, TABLE_SCROLL_EXPIRATION_TIMEOUT,
} from 'src/web/ats/components/Analytics/details/constants';
import {
  analyticsDownloadActions,
} from 'src/web/ats/redux/modules/analyticsReportDownload/creator';

import Grid from '../../atoms/grid';

const pageName = 'Analytics Job Detail Page';

const Details = ({
  filterOptions, fetchFilterOptions, setFilterOptions, history,
  setScorCardData, scoreCardData, trendLineData, filters,
  setTrendLineData, tableData, setTableData, lastLocation,
  setFilters, user, storeDataPayload, setStoreDataPayload, userPreference,
  setAnalyticsJobStatus, setTableValues, tableValues, getUserPreferences, checkReportSize,
}) => {
  const [scoreCardValues, setScoreCardValues] = useState([]);
  const [trendLineValues, setTrendLineValues] = useState({});
  const [gridConfigs, setGridConfigs] = useState({});
  const dataGrid = useRef(null);

  useEffect(() => {
    if (!tableValues?.data?.length) {
      setGridConfigs({
        allColumns: [],
        data: [],
      });
      return;
    }
    if (userPreference?.config && tableValues?.data?.length) {
      const data = userPreference.config.filter(
        (config) => Object.keys(config).includes('table_report'),
      );
      if (data?.length) {
        const nestedField = Object.keys(tableValues.data[0])
          .filter((key) => isArray(tableValues.data[0][key]));
        const tableReportConfig = data[0].table_report;
        const columnsSortedByOrder = tableReportConfig.col_config
          .sort((elem1, elem2) => elem1.order - elem2.order);
        const tableReportColumns = tableReportConfig.list_of_columns;

        const columns = columnsSortedByOrder.map((column) => ({
          Header: column.name,
          accessor: tableReportColumns[column.name],
        }));

        const allColumns = Object.entries(tableReportColumns)
          .filter((entry) => entry[0] !== nestedField[0])
          .map((column) => ({ Header: column[0], accessor: column[1] }));

        const nestedColumnObject = tableReportColumns[nestedField[0].toUpperCase()];
        const nestedColumns = Object.entries(nestedColumnObject)
          .map((column) => ({ Header: column[0], accessor: column[1] }));

        setGridConfigs({
          ...gridConfigs,
          nestedField: nestedField[0],
          displayedColumns: columns,
          allColumns,
          data: tableValues?.data,
          nestedColumns,
        });
      }
    }
  }, [userPreference, tableValues]);

  const canViewCompanyFilter = true;

  const [filteredConfigs, setFilteredConfigs] = useState(
    FILTERS?.filters.length
    && FILTERS.filters
      .filter((data) => (canViewCompanyFilter)
        || (!(canViewCompanyFilter) && data.id !== SELECT_TYPE_COMPANY)),
  );

  const [isMoreTableDataFetched, setMoreTableDataFetched] = useState(false);
  const [isAllTableDataFetched, setAllTableDataFetched] = useState(false);
  const [scrollExpiredTimeout, setScrollExpiredTimeout] = useState(null);

  const showAnalyticsDetailsFilterFlag = useFeature(FEATURE_KEY.ANALYTICS_DETAIL_FILTERS);
  const canViewScoreCard = useCan(VIEW_ANALYTICS_SCORECARD);
  const canViewTrendLine = useCan(VIEW_ANALYTICS_TRENDLINE);
  const canViewReport = useCan(VIEW_ANALYTICS_REPORT);

  const scrollToRowData = lastLocation && lastLocation.includes(LOCATION_SEARCH_KEY) ? {
    attribute: 'id',
    scrollId: lastLocation.split(LOCATION_SEARCH_KEY)[1],
  } : {};

  const [isAllOptionsSelected, setAllOptionsSelected] = useState({});
  const [searchTypingTimer, setSearchTypingTimer] = useState(null);
  const [scrollSetted, setScrollSetted] = useState(false);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    const userPreferencePayload = {
      user_id: user?.id,
      page_name: pageName,
    };
    getUserPreferences(userPreferencePayload);
  }, []);

  useEffect(() => {
    if (scrollSetted) return;
    setTimeout(() => {
      setScrollSetted(true);
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollTop = tableValues.scrollConfigs.scrollHeight;
      }
    }, 500);
  }, [scrollSetted]);

  useEffect(() => () => setTableValues({ scrollHeight: tableContainerRef.current?.scrollTop }), []);

  const getAllApiPayloads = useCallback((isReset) => {
    const filtersConfigs = getAnalyticFiltersState(
      defaultNonPopupValues, canViewCompanyFilter, user, isReset ? {} : filters,
    );
    const datesAndCompany = getAnalyticsJobStatusData(filtersConfigs);
    const allPayloads = getAllPayloads(
      filteredConfigs, storeDataPayload, datesAndCompany, filtersConfigs, isReset,
    );
    const { defaultPayload, trendLinePayload, tablePayload } = allPayloads;

    return {
      defaultPayload, trendLinePayload, tablePayload, filtersConfigs, datesAndCompany,
    };
  }, [
    defaultNonPopupValues, filteredConfigs,
    canViewCompanyFilter, storeDataPayload, filters, user,
  ]);

  const resetFiltersState = useCallback((isReset) => {
    const {
      defaultPayload, trendLinePayload, tablePayload, filtersConfigs, datesAndCompany,
    } = getAllApiPayloads(isReset);

    if (
      !isEqual(defaultPayload, dataPayloadConfigs.lastPayload)
      && (!storeDataPayload.isApplied || isReset)
    ) {
      dataPayloadConfigs.lastPayload = defaultPayload;
      setTableValues({ clearData: true });
      setFilterOptions({ reset: true });
      setScorCardData(defaultPayload);
      setTrendLineData(trendLinePayload);
      setTableData(tablePayload);
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
    resetFiltersState();
  }, [canViewCompanyFilter, user]);

  useEffect(() => {
    if (!scoreCardData.score_card) {
      setScoreCardValues([]);
    } else {
      const values = scoreCardData.score_card;
      addPropertiesToAnalyticsScorecardData(values);
      setScoreCardValues(values);
    }
  }, [scoreCardData]);

  useEffect(() => {
    if (!trendLineData) return;
    const values = {
      title: SUMMARY_DATA_TITLE,
      type: SUMMARY_DATA_TYPE.LINE_CHART,
      ...trendLineData,
    };
    setTrendLineValues(values);
  }, [trendLineData]);

  useEffect(() => {
    if (!tableData.data || tableValues.expirationAlreadySetted) return () => { };
    if (!isEqual(tableValues.data?.slice(-tableData.data.length), tableData.data)) {
      clearTimeout(scrollExpiredTimeout);
      setAllTableDataFetched(tableData.data.length < 20);
      setTableValues({});

      setScrollExpiredTimeout(setTimeout(() => {
        setTableValues({ expired: true });
      }, TABLE_SCROLL_EXPIRATION_TIMEOUT));

      setMoreTableDataFetched(false);
    }

    return clearTimeout(scrollExpiredTimeout);
  }, [tableData]);

  const handleOptionsDebouncedFetch = (payload) => {
    setSearchTypingTimer(clearTimeout(searchTypingTimer));
    setSearchTypingTimer(setTimeout(() => {
      fetchFilterOptions(payload);
    }, DEBOUNCE_TIME));
  };

  const getDeselectedOptions = (actionData, filteredValues) => {
    const { action, name } = actionData;
    const newFilters = filters;
    const filterValuesStatus = {
      isAllDeselected: false,
      isAllSelected: actionData.option?.value === SELECT_ALL,
      isAnyValuesRemovedAfterSelectingAll: false,
      deselectedFilters: storeDataPayload.deselectedFilters,
    };

    const clearedConfigPayload = filteredConfigs.find((cleared) => cleared.id === name).payload;

    /**
     * We need to understand if we have to add deselected filters,
     * or remove existing, by checking incoming action
     */
    const currentField = filterValuesStatus.deselectedFilters[name];
    switch (action) {
      case DESELECT_OPTION:
        if (isAllOptionsSelected[name]) {
          filterValuesStatus.isAnyValuesRemovedAfterSelectingAll = true;
        }

        if (!filterValuesStatus.isAllSelected) {
          if (filterValuesStatus.isAnyValuesRemovedAfterSelectingAll) {
            if (!currentField) filterValuesStatus.deselectedFilters[name] = [];
            filterValuesStatus.deselectedFilters[name].push(actionData.option.value);
          }
        } else {
          filterValuesStatus.isAllDeselected = true;
        }

        if (filters[name].length === 1) {
          filterValuesStatus.isAllDeselected = true;
        }
        break;

      case SELECT_OPTION:
        if (filterValuesStatus.isAllSelected) {
          setAllOptionsSelected((prevValue) => ({ ...prevValue, [name]: true }));
          delete filterValuesStatus.deselectedFilters[name];
        } else if (currentField
          && currentField.some((value) => value === actionData.option.value)
        ) {
          const newOptions = currentField
            .filter((value) => value.value !== actionData.option.value);
          if (!newOptions.length) {
            delete filterValuesStatus.deselectedFilters[name];
          }
          filterValuesStatus.deselectedFilters[name] = newOptions;
        }

        break;

      case CLEAR:
        clearedConfigPayload.search_input = '';
        fetchFilterOptions(clearedConfigPayload);
        filterValuesStatus.isAllDeselected = true;
        break;

      default:
    }

    if (filterValuesStatus.isAllDeselected) {
      delete newFilters[name];
      setFilters({ ...newFilters });
      delete filterValuesStatus.deselectedFilters[name];
    } else {
      setFilters({
        ...newFilters,
        [actionData.name]: filteredValues,
      });
    }

    setStoreDataPayload({
      ...storeDataPayload,
      deselectedFilters: filterValuesStatus.deselectedFilters,
    });
  };

  const onDropdownChange = (values, actionData) => {
    const { action } = actionData;

    if (action === 'pop-value') return;

    const { name } = actionData;
    if (name === SELECT_TYPE_COMPANY) {
      const dates = getFilterDefaultDates({});
      setStoreDataPayload({
        ...storeDataPayload,
        datesAndCompany: getAnalyticsJobStatusData({ company: values, dp: dates }),
      });
      setFilters({
        [name]: values,
        dp: dates,
      });

      if (Object.keys(filterOptions).length > 1) {
        setFilterOptions({ reset: true });
      }
    } else {
      const filteredValues = {
        values: action === DESELECT_OPTION
          ? values.filter((option) => option.value !== SELECT_ALL)
          : values,
      };

      if (filteredConfigs.find((filter) => filter.id === actionData.name)?.payload.search_input !== ''
        && actionData.option?.value !== OPTION_VALUE_SELECT_ALL) {
        filteredValues.values = filteredValues.values
          .filter((option) => option.value !== SELECT_ALL);
      }

      getDeselectedOptions(actionData, filteredValues.values);
    }
  };

  const onInputChange = (value, event, name) => {
    if (event.action !== 'input-change') return;
    const currentField = filteredConfigs.find((filter) => filter.title === name);

    setFilteredConfigs((prevConfigs) => {
      filteredConfigs.find((filter) => filter.title === name).payload.search_input = value;
      return [...prevConfigs];
    });

    if (value.length >= 3) {
      handleOptionsDebouncedFetch(currentField.payload);
    } else if (!value) {
      fetchFilterOptions(currentField.payload);
    } else if (filterOptions[name]?.options?.length) {
      setFilterOptions({ title: name, options: [] });
    }
  };

  const handleApplyFilters = () => {
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
      setTableValues({ clearData: true });
      setAnalyticsJobStatus(filtersPayload.datesAndCompany);
      setStoreDataPayload(filtersPayload);
    }

    return filtersPayload;
  };

  const onDateChange = (value, filterId) => {
    setStoreDataPayload({
      ...storeDataPayload,
      datesAndCompany: getAnalyticsJobStatusData({ company: filters.company, dp: value }),
    });
    setFilters({
      ...filters,
      [filterId]: value,
    });
  };

  const onResetClick = () => {
    if (!isEqual(defaultNonPopupValues, filters)) {
      dataPayloadConfigs.lastPayload = {};
      resetFiltersState(true);
      clearAnalyticsSearchInputs(setFilteredConfigs);
    }
  };

  const handleTableScroll = useCallback((e) => {
    const tableContainer = e.target;
    if (
      tableContainer.scrollTop > (tableContainer.scrollHeight - TABLE_SCROLL_BOTTOM_DISTANCE)
      && !isMoreTableDataFetched && !isAllTableDataFetched
    ) {
      const tablePayload = {
        ...getAnalyticsJobStatusData(filters),
        filters: storeDataPayload.filters,
        source: FILTERS.table_source,
        scroll_id: tableValues.scrollConfigs.id,
      };

      if (!tableValues.scrollConfigs.isExpired) {
        setTableData(tablePayload);
      } else {
        setTableValues({ clearData: true });
        setTableData({ ...tablePayload, scroll_id: '' });
      }
      setMoreTableDataFetched(true);
    }
  }, [isMoreTableDataFetched, tableValues, storeDataPayload, isAllTableDataFetched]);

  const handleExportCsv = () => {
    const { defaultPayload } = getAllApiPayloads(false);
    const exportPayload = {
      index: 'job',
      source: FILTERS.export_source,
      ...defaultPayload,
    };
    checkReportSize(exportPayload);
  };

  return (
    < MainContainer >
      <StyledDiagramDetailsContainer>
        <BackButtonContainer>
          <Title>{SUMMARY_DATA_TITLE}</Title>
          {!!(history.length > 1)
            && <StyledBackButton onClick={history.goBack}>Back</StyledBackButton>
          }
        </BackButtonContainer>
        {!!showAnalyticsDetailsFilterFlag
          && <Filters
            filterValues={filters}
            showMoreFilter
            title='Filters'
            filterOptions={filterOptions}
            fetchOptions={fetchFilterOptions}
            onDateChange={onDateChange}
            filteredConfigs={filteredConfigs}
            onDropdownChange={onDropdownChange}
            onInputChange={onInputChange}
            onReset={onResetClick}
            onApply={handleApplyFilters}
          />
        }
        {!!canViewScoreCard
          && scoreCardValues.length
          ? <ScoreCard cards={scoreCardValues} />
          : (
            <StyledScoreCard>
              {renderNoRecords(scoreCardData)}
            </StyledScoreCard>
          )
        }
        {!!canViewTrendLine && <StyledDiagramDetails>
          {
            trendLineValues.values && trendLineValues.values.length
              ? <AnalyticsDetailDiagram
                summaryData={trendLineValues}
              />
              : renderNoRecords(trendLineData)
          }
        </StyledDiagramDetails>}
        {!!canViewReport
          && <TableContainer>
            {
              gridConfigs?.data?.length
                ? (
                  <GridWrapper ref={tableContainerRef} onScroll={handleTableScroll}>
                    <Grid
                      gridRef={dataGrid}
                      data={gridConfigs?.data}
                      nestByField={gridConfigs?.nestedField}
                      nestedColumns={gridConfigs?.nestedColumns}
                      columns={gridConfigs?.displayedColumns}
                      onRowClick={(event) => {
                        if (event?.rowType === 'header') return;
                        if (!event?.column?.type && event?.column?.type !== 'detailExpand') {
                          history.push(
                            protectedRoutes.jobOverviewInJobsTable(event.data.id),
                          );
                        }
                      }}
                      filterVisible={true}
                      scrollToRowData={scrollToRowData}
                      customToolBar={
                        gridConfigs?.data?.length
                          ? (
                            <Toolbar>
                              <Item location="after">
                                <div className='export-toolbar-item'>
                                  <ToggleMenu
                                    Menu="Export"
                                    list={[
                                      { label: 'Export as CSV', onClick: handleExportCsv },
                                    ]}
                                    disabled={!tableValues.data.length}
                                  />
                                </div>
                              </Item>
                              <Item
                                name="columnChooserButton"
                              />
                            </Toolbar>

                          )
                          : renderNoRecords(gridConfigs?.data)
                      }
                    />
                  </GridWrapper>
                )
                : <NoGridWrapper>{renderNoRecords(gridConfigs)}</NoGridWrapper>
            }
          </TableContainer>}
      </StyledDiagramDetailsContainer>
    </MainContainer >
  );
};

const mapStateToProps = ({
  analytics: {
    analyticsFilters,
    analyticsDataPayload,
    analyticsJobStatus,
    analyticsDetailFilterOptions,
    analyticsDetailScoreCardData,
    analyticsDetailTrendLineData,
    analyticsDetailTableData,
    analyticsTableValues,
    userPreferences,
  },
  router,
  ...state
}) => ({
  filters: analyticsFilters,
  storeDataPayload: analyticsDataPayload,
  filterOptions: analyticsDetailFilterOptions,
  scoreCardData: analyticsDetailScoreCardData,
  trendLineData: analyticsDetailTrendLineData,
  jobStatus: analyticsJobStatus,
  tableData: analyticsDetailTableData,
  tableValues: analyticsTableValues,
  lastLocation: router?.from?.search,
  user: sessionSelectors.getUser(state),
  userPreference: userPreferences[pageName],
});

const mapDispatchToProps = {
  setFilters: analyticsActions.setAnalyticsFilters,
  setStoreDataPayload: analyticsActions.setAnalyticsDataPayload,
  fetchFilterOptions: analyticsActions.fetchAnalyticsDetailFilterOptions,
  setFilterOptions: analyticsActions.setAnalyticsDetailFilterOptions,
  setScorCardData: analyticsActions.analyticsDetailScoreCardData,
  setTrendLineData: analyticsActions.analyticsDetailTrendLineData,
  setTableData: analyticsActions.analyticsDetailTableData,
  setAnalyticsJobStatus: analyticsActions.analyticsJobStatus,
  checkReportSize: analyticsDownloadActions.checkEmailOrBrowserDownload,
  setTableValues: analyticsActions.analyticsTableValues,
  getUserPreferences: analyticsActions.fetchAnalyticsUserPreference,
};

Details.propTypes = {
  row: PropTypes.object,
  jobStatus: PropTypes.object,
  filters: PropTypes.object,
  storeDataPayload: PropTypes.arr,
  filterOptions: PropTypes.object,
  fetchFilterOptions: PropTypes.func,
  setFilterOptions: PropTypes.func,
  history: PropTypes.object.isRequired,
  scoreCardData: PropTypes.object,
  setFilters: PropTypes.func,
  setStoreDataPayload: PropTypes.func,
  setScorCardData: PropTypes.func,
  lastLocation: PropTypes.string,
  trendLineData: PropTypes.object,
  setTrendLineData: PropTypes.func,
  tableValues: PropTypes.object,
  setTableValues: PropTypes.func,
  setAnalyticsJobStatus: PropTypes.func,
  tableData: PropTypes.object,
  setTableData: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  getUserPreferences: PropTypes.func,
  userPreference: PropTypes.object,
  checkReportSize: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
