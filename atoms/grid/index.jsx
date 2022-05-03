import React, { useEffect, useState } from 'react';
import DataGrid,
{
  Column,
  MasterDetail,
} from 'devextreme-react/data-grid';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import DetailTemplate from 'src/web/ats/components/atoms/grid/DetailTemplate.js';
import 'src/web/ats/components/atoms/grid/index.css';
import UpArrow from 'src/web/ats/assets/icons/analyticsUpArrow.svg';
import DownArrow from 'src/web/ats/assets/icons/analyticsDownArrow.svg';
import { Paging } from 'devextreme-react/tree-list';
import { ArrowBox, ArrowImage } from '../table/styles';
import { HeaderContainer, HeaderTitle } from './styles';

const Grid = ({
  data, columns, customToolBar, nestedColumns, onRowClick,
  nestByField, gridRef,
}) => {
  const [sortEvent, setSortEvent] = useState();
  const [rowData, setRowData] = useState(data);
  const SORT_ORDER = {
    ASCENDING: 'asc',
    DESCENDING: 'desc',
  };

  useEffect(() => {
    setRowData(data);
    if (gridRef?.current) {
      gridRef.current.instance.refresh(true);
    }
  }, [data, data?.length]);

  const onCellPrepared = (e) => {
    if (e.rowType === 'data' && e.column.command === 'expand') {
      if (!e.data.position?.length) {
        e.cellElement.style.visibility = 'hidden';
      }
    }
  };

  const onOptionChanged = (e) => {
    if (e.fullName.endsWith('ortOrder')) {
      setSortEvent(e);
    }
  };

  const renderTitleHeader = (e, head) => <HeaderContainer >
    <HeaderTitle>
      <Tooltip
        title={head.Header}
        position='bottom' size='small'
      >{head.Header}</Tooltip>
    </HeaderTitle>
    <span>
      {!!e.column.sortOrder
        && (sortEvent.value === SORT_ORDER.DESCENDING
          ? <ArrowImage style={{ marginBottom: `${-7}px` }} src={DownArrow} />
          : <ArrowImage style={{ marginTop: `${-13}px` }} src={UpArrow} />)
      }
      {!e.column.sortOrder && (
        <ArrowBox>
          <ArrowImage src={UpArrow} />
          <ArrowImage src={DownArrow} />
        </ArrowBox>
      )}
    </span>
  </HeaderContainer>;

  return (
    <DataGrid id="grid-container"
      dataSource={rowData}
      keyExpr="id"
      allowColumnReordering={true}
      allowColumnResizing={true}
      onCellPrepared={onCellPrepared}
      onOptionChanged={onOptionChanged}
      remoteOperations={true}
      onCellClick={onRowClick}
      ref={gridRef}
      columnResizingMode={'nextColumn'}
    >
      <Paging pageSize={rowData.length} />
      {columns.map((head, index) => <Column
        key={index}
        caption={head.Header}
        headerCellRender={(e) => renderTitleHeader(e, head)}
        dataField={head.accessor}
        customizeText={head.cell}
      />)}
      <MasterDetail
        enabled={true}
        render={(props) => (
          <DetailTemplate
            nestedColumns={nestedColumns}
            nestByField={nestByField}
            {...props}

          />
        )}

      />
      {customToolBar}
    </DataGrid>
  );
};

Grid.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  nestedColumns: PropTypes.array,
  onRowClick: PropTypes.function,
  filterVisible: PropTypes.bool,
  customToolBar: PropTypes.object,
  nestedData: PropTypes.array,
  nestByField: PropTypes.string,
  gridRef: PropTypes.object,
};

Grid.defaultProps = {
  data: [],
  columns: [],
  nestedColumns: [],
  onRowClick: () => ({}),
  filterVisible: true,
  customToolBar: {},
  nestedData: [],
};

export default Grid;
