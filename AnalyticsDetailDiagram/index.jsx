import React from 'react';
import Table from 'src/web/ats/components/common/table';
import { TableStyles } from 'src/web/ats/components/common/table/styles';
import PropTypes from 'prop-types';
import LineChart from 'src/web/ats/components/atoms/graphs/LineChart/index.jsx';
import DonutChartGraph from 'src/web/ats/components/atoms/graphs/DonutChart.jsx';
import BarChartGraph from 'src/web/ats/components/atoms/graphs/BarChart.jsx';
import { SUMMARY_DATA_TYPE } from 'src/web/ats/components/AnalyticsSummary/data';
import { convertSnakeCaseStringToHeadingFormat } from 'src/web/ats/utils';

const getColumns = (values) => Object.keys(values).map((value) => ({
  Header: convertSnakeCaseStringToHeadingFormat(value),
  accessor: value,
  width: 100,
}));

const AnalyticsDetailDiagram = ({ summaryData }) => (
  <>
    {summaryData.type === SUMMARY_DATA_TYPE.TABLE
      && <TableStyles>
        <Table
          height='xs'
          columns={getColumns(summaryData.values[0])}
          data={summaryData.values}
          loading={false}
          type="analytics"
          loadingMessage={`Loading summary for ${summaryData.title}`}
          totalCount={summaryData?.values?.length}
          actionCallback={() => { }}
          nameCellLinkType={true}
          fetchData={() => { }}
        />
      </TableStyles>
    }
    {summaryData.type === SUMMARY_DATA_TYPE.LINE_CHART
      && <LineChart
        containerHeight={550}
        containerWidth="100%"
        data={summaryData.values}
        dataKey={summaryData.dataKey}
        xAxisKey={summaryData.xAxisKey}
        yAxisKey={summaryData.yAxisKey}
        isYAxisLogScaled={false}
      />
    }
    {
      summaryData.type === SUMMARY_DATA_TYPE.DONUT_CHART
      && <DonutChartGraph
        containerHeight="90%"
        containerWidth="80%"
        data={summaryData}
        dataKey={summaryData.dataKey}
      />
    }
    {
      summaryData.type === SUMMARY_DATA_TYPE.BAR_CHART
      && <BarChartGraph
        containerHeight={550}
        containerWidth="100%"
        data={summaryData.values}
        dataKey={summaryData.dataKey}
        dataKeys={summaryData.dataKeys}
      />
    }
  </>
);

AnalyticsDetailDiagram.propTypes = {
  summaryData: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    values: PropTypes.array,
    dataKey: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          name: PropTypes.string,
        }),
      ),
      PropTypes.string,
    ]),
    dataKeys: PropTypes.array,
    xAxisKey: PropTypes.string,
    yAxisKey: PropTypes.string,
  }),
};

export default AnalyticsDetailDiagram;
