import React, {
  useEffect, useMemo, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy, usePagination } from 'react-table';
import UpArrow from 'src/web/ats/assets/icons/analyticsUpArrow.svg';
import DownArrow from 'src/web/ats/assets/icons/analyticsDownArrow.svg';
import { Tooltip } from 'react-tippy';
import {
  StyledButton, StyledPagination, StyledPaginationContainer, StyledTable, ArrowImage,
  ArrowBox, HeaderBox, scrollStyle,
} from './styles';

export const Table = ({
  data: defaultData, columns: defaultColumns, onRowClick, scrollRowData, ...props
}) => {
  const data = useMemo(() => defaultData, [defaultData]);
  const columns = useMemo(() => defaultColumns, [defaultColumns]);
  const CHAR_LIMIT = 15;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    prepareRow,
    // page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    rows,
    // pageCount,
    // gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        ...props,
        pageSize: props.pageSize || 10,
        pageIndex: 0,
      },
    },
    useSortBy,
    usePagination,
  );
  const rowScrollRef = useRef();

  const getRef = (row) => ((row && scrollRowData?.attribute
    && Number(row.original[scrollRowData?.attribute])
    === Number(scrollRowData?.scrollId) && rowScrollRef)
    ? { ref: rowScrollRef } : {});

  useEffect(() => {
    if (rowScrollRef && rowScrollRef?.current) {
      rowScrollRef.current.scrollIntoView(scrollStyle);
    }
  }, [rowScrollRef]);

  return (
    <>
      <StyledTable {...props} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, it) => (
            <tr key={it} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th key={index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <HeaderBox>
                    <span>
                      {column.render('Header')}
                    </span>
                    <span>
                      {!!column.isSorted
                        && (column.isSortedDesc
                          ? <ArrowImage src={DownArrow} />
                          : <ArrowImage src={UpArrow} />)
                      }
                      {!column.isSorted && (
                        <ArrowBox>
                          <ArrowImage src={UpArrow} />
                          <ArrowImage src={DownArrow} />
                        </ArrowBox>
                      )}
                    </span>
                  </HeaderBox>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                key={index} onClick={() => onRowClick(row)} {...getRef(row)} {...row.getRowProps()}>
                {row.cells.map((cell, i) => <td key={i} {...cell.getCellProps()}>
                  {cell.column.Header.includes('Job ') && cell.value.length > CHAR_LIMIT ? (<Tooltip
                      title={cell.value}
                      position='bottom' size='small'
                    >{`${cell.value.slice(0, CHAR_LIMIT)}..`}</Tooltip>) : cell.render('Cell')}
                </td>)}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      {
        props.showPagination
          ? (
            <StyledPagination showPagination={props.showPagination}>
              <StyledPaginationContainer>
                <StyledButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                  Previous
                </StyledButton>{' '}
                <StyledButton onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </StyledButton>{' '}
                {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '} */}
                {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '} */}
                <span>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                </span>
              </StyledPaginationContainer>
            </StyledPagination>
          )
          : null
      }
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  pageSize: PropTypes.number,
  showPagination: PropTypes.bool,
  onRowClick: PropTypes.function,
  scrollRowData: PropTypes.object,
};

Table.defaultProps = {
  data: [],
  columns: [],
  pageSize: 10,
  showPagination: false,
  onRowClick: () => ({}),
};
