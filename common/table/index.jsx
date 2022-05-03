import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { useTable, useFlexLayout, useRowSelect } from 'react-table';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import GoToIcon from 'src/web/ats/assets/icons/go-to-icon.svg';
import ClockIcon from 'src/web/ats/assets/icons/clock.svg';
import { Link } from 'react-router-dom';
import useCan from 'src/web/ats/components/common/can/useCan';
import SourceManager from 'src/web/ats/components/configuration/Category/sourceManager';
import SubCategory from 'src/web/ats/components/configuration/Category/subCategory';
import {
  CANDIDATE_OVERVIEW_PREMIUM,
} from 'src/web/ats/components/common/can/privileges';
import { protectedRoutes } from '../../../routes';

import WaitingIndicator from '../../atoms/waitingIndicator';
import { CheckBoxHeaderComponent, CheckBoxRowComponent } from './check-box';
import Avatar from '../../atoms/avatar';
import Icon from '../../atoms/icons';
import {
  ActionButton, HyperLinkedSpanText, EmptyContainer, StatusBadge,
  PremiumIndicator,
} from './styles';
import EmptyStarIcon from '../../../assets/icons/empty-star.svg';
import StarIcon from '../../../assets/icons/star.svg';
import OnHoldBadge from './on-hold-badge';
import JobCountries from './job-countries';

const heightMap = {
  xxs: 200,
  xs: 400,
  sm: 540,
  lg: 768,
};

const getItemSize = (type) => {
  if (type === 'analytics' || type === 'company') {
    return 64;
  }
  if (type === 'teams' || type === 'syndication_partner') {
    return 84;
  }
  if (type === 'jobs') {
    return 94;
  }
  if (type === 'sources_skills') {
    return 72;
  }
  return 150;
};

const Table = ({
  hideAvatarOnName = false,
  height = 'sm',
  width = 198,
  minWidth = 50,
  columns,
  data,
  fetchData,
  totalCount,
  actionCallback,
  onClickName,
  onClickJobName = () => {
    // eslint-disable-next-line no-console
    console.log('to maintain component props contract');
  },
  mapOfActionCallbacks,
  type,
  bulkActions = false,
  setSelectedRows,
  emptyTableMessage = 'No data available',
  loading,
  loadingMessage = 'loading',
  nameCellLinkType = true,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth,
      width,
    }),
    [],
  );
  const canViewPremiumState = useCan(CANDIDATE_OVERVIEW_PREMIUM);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    selectedFlatRows,
    state,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
    bulkActions ? useRowSelect : null,
    (hooks) => {
      hooks.visibleColumns.push((columnsList) => {
        const selectionColumn = bulkActions ? [{
          id: 'selection',
          Header: CheckBoxHeaderComponent,
          Cell: CheckBoxRowComponent,
          width: 20,
          minWidth: 20,
          maxWidth: 20,
          disableResizing: true,
          autoResetSelectedRows: false,
        }] : [];
        return [
          ...selectionColumn,
          ...columnsList,
        ];
      });
    },
  );
  const isItemLoaded = (index) => Boolean(rows[index]);
  const RenderRow = React.useCallback(
    ({ index, style }) => {
      if (totalCount && rows && rows.length > 0 && rows[index]) {
        const row = rows[index];
        prepareRow(row);

        return (
          <div
            {...row.getRowProps({
              style,
            })}
            className={`tr ${bulkActions ? 'with-checkbox' : ''}`}
            key={index}
          >
            {row.cells.map((cell, rowIndex) => {
              const cellType = cell.column.type;
              let cellContentDOM = null;
              switch (cellType) {
                case 'name': {
                  // eslint-disable-next-line camelcase
                  const isPremium = row.original.candidate?.is_premium;

                  cellContentDOM = (
                    <div
                      className={`name-content ${nameCellLinkType ? 'link-type' : ''}`}
                      onClick={onClickName({ ...row.original })}
                      title={cell.value}
                    >
                      {canViewPremiumState ? (
                        <PremiumIndicator>
                          <img src={isPremium ? StarIcon : EmptyStarIcon} />
                        </PremiumIndicator>
                      ) : null}
                      {hideAvatarOnName ? null : <div className='user-avatar'><Avatar fullName={cell.value} size='sm' /></div>}
                      <div className={`bold-text${nameCellLinkType ? ' link-text' : ''}${hideAvatarOnName ? ' name-text-relative' : ''}`}>
                        {cell.render('Cell')}
                      </div>
                    </div>
                  );
                  break;
                }
                case 'array': {
                  const cellValue = cell.value;
                  const WORD_LIMIT = 3;
                  const CHAR_LIMIT = 30;
                  cellContentDOM = (
                    <div className="">
                      <div className="semi-bold-text smaller-text-name">
                        {cellValue.slice(0, WORD_LIMIT).map((text, textIndex) => (
                          <React.Fragment key={`${text} + ${textIndex}`}>
                            {text.length > CHAR_LIMIT ? (
                              <Tooltip
                                title={text}
                                position='bottom' size='small'
                              >{`${text.slice(0, CHAR_LIMIT)}...`}</Tooltip>
                            ) : text}
                            {textIndex + 1 !== cellValue.length ? (<span>, </span>) : null}
                          </React.Fragment>
                        ))}
                        {cellValue.length > WORD_LIMIT ? (
                          <Tooltip
                            title={cellValue.slice(WORD_LIMIT, cellValue.length).join(', ')}
                            position='bottom' size='small'
                          >
                            <span> +{cellValue.length - WORD_LIMIT}</span>
                          </Tooltip>
                        ) : null}
                      </div>
                    </div>
                  );
                  break;
                }
                case 'company': {
                  cellContentDOM = (
                    <div className="semi-bold-text">
                      {cell.render('Cell')}
                    </div>
                  );
                  break;
                }
                case 'job': {
                  cellContentDOM = (
                    <div
                      className="bold-text link-text"
                      onClick={onClickJobName({ ...row.original })}
                      title={cell.value}
                    >
                      {cell.render('Cell')}
                    </div>
                  );
                  break;
                }
                case 'current_stage': {
                  const currentStatusObj = cell.value;
                  if (!currentStatusObj) {
                    cellContentDOM = '';
                  } else {
                    cellContentDOM = (
                      <div className="status-content">
                        <div className="row">
                          {currentStatusObj.name}
                        </div>
                        {row.original.workflow_status
                          ? <StatusBadge
                            title={row.original.workflow_status.name}
                          >
                            {row.original.workflow_status.name}
                          </StatusBadge>
                          : null}
                        {(row.original?.hold_reason_label && row.original?.current_step?.category === 'on_hold') ? (
                         <OnHoldBadge label={row.original?.hold_reason_label} />
                        ) : null}
                        <div className="row status-sub-content">
                          {currentStatusObj.assignee && currentStatusObj.assignee.name ? (
                            <div className="row smaller-text status-sub-content">
                              <Icon name='person-single' width={12} height={12} />
                              <div className='smaller-text-name'>{currentStatusObj.assignee.name}</div>
                            </div>
                          ) : null}
                        </div>
                        {currentStatusObj.task_time && (
                          <div className="row smaller-text status-sub-content">
                            <img className="clock-icon" src={ClockIcon} alt='clock' />
                            <div className='smaller-text-name'>{currentStatusObj.task_time}</div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  break;
                }
                case 'cetegory': {
                  if (cell.column.id === 'sourcing_manager') {
                    cellContentDOM = (
                      <div>
                        <SourceManager index={cell?.row?.index} data={cell?.value} />
                      </div>
                    );
                  } else if (cell.column.id === 'role_family') {
                    const sourcingManager = cell?.value.map((item) => item?.name);
                    cellContentDOM = (
                      <div
                        title={sourcingManager}>
                        <SubCategory index={cell?.row?.index} data={cell?.value} />
                      </div>
                    );
                  }
                  break;
                }
                case 'action': {
                  if (
                    !row.original.current_step || !row.original.action.length
                    || row.original.action.includes('activate')
                    || row.original.action.includes('skip_to_ta')
                    || row.original.action.includes('resend_talent500_invite')
                  ) {
                    cellContentDOM = '';
                  } else {
                    let buttonText = '';
                    if (row.original.action.includes('approve') && row.original.action.includes('reject')) {
                      buttonText = 'Move Forward/Reject';
                    }
                    if (row.original.action.includes('retained')) {
                      buttonText = 'Retained/Resigned';
                    }
                    if (row.original.action.includes('generate_offer')) {
                      buttonText = 'Generate Offer Letter';
                    }
                    if (row.original.action.includes('save_offer_details')) {
                      buttonText = 'Save Offer Details';
                    }
                    if (row.original.action.includes('submit_offer_for_approval')) {
                      buttonText = 'Send for approval';
                    }
                    if (row.original.action.includes('send_offer')) {
                      buttonText = 'Send Offer';
                    }
                    cellContentDOM = <ActionButton
                      onClick={() => actionCallback(index, cell.value, row.original)}
                    >
                      {buttonText}
                    </ActionButton>;
                  }
                  break;
                }
                case 'job_name': {
                  cellContentDOM = (
                    <div
                      className="name-content"
                      onClick={onClickJobName({ ...row.original })}
                      title={cell.value}
                    >
                      <div className="bold-text link-text">
                        {cell.render('Cell')}
                      </div>
                    </div>
                  );
                  break;
                }
                case 'job_code': {
                  cellContentDOM = (
                    <div className="bold-text">
                      {cell.render('Cell')}
                    </div>
                  );
                  break;
                }
                case 'job_countries': {
                  cellContentDOM = (<JobCountries
                    value={cell.value}
                    isRemote={row.original.is_remote} />);
                  break;
                }
                case 'location': {
                  const locationArray = cell.value;
                  if (!locationArray || !locationArray.length) {
                    cellContentDOM = '';
                  } else {
                    let locationText = '';
                    locationArray.forEach((loc) => {
                      if (loc.city) {
                        if (locationText !== '') locationText += ', ';
                        locationText += loc.city;
                      }
                    });
                    cellContentDOM = (
                      <div className="semi-bold-text">
                        {locationText}
                      </div>
                    );
                  }
                  break;
                }
                case 'total_candidates': {
                  const candidateCount = cell.value;
                  const { id: jobId } = row.original;
                  cellContentDOM = (
                    <div className="extra-bold-text">
                      {candidateCount}&nbsp;(
                      <HyperLinkedSpanText
                        as={Link}
                        to={`${protectedRoutes.candidates}?job[0]=${jobId}`}
                      >
                        <span className="regular-text underlined">VIEW</span>
                        <span>&nbsp;<img className="go-to-icon" src={GoToIcon} alt='go-to' />&nbsp;</span>
                      </HyperLinkedSpanText>
                      )
                    </div>
                  );
                  break;
                }
                case 'processed_candidates_count': {
                  const candidateCount = cell.value;
                  const { id: jobId } = row.original;
                  cellContentDOM = (
                    <div className="extra-bold-text">
                      {candidateCount}&nbsp;(
                      <HyperLinkedSpanText as={Link} to={`${protectedRoutes.candidates}?job[0]=${jobId}`}>
                        <span className="regular-text underlined">VIEW</span>
                        <span>&nbsp;<img className="go-to-icon" src={GoToIcon} alt='go-to' />&nbsp;</span>
                      </HyperLinkedSpanText>
                      )
                    </div>
                  );
                  break;
                }
                case 'shared_with_ta_count': {
                  const candidateCount = cell.value;
                  const { id: jobId } = row.original;

                  cellContentDOM = (
                    <div className="extra-bold-text">
                      {candidateCount}&nbsp;(
                      <HyperLinkedSpanText
                        as={Link}
                        to={`${protectedRoutes.candidates}?job[0]=${jobId}&sm_type=shared_with_ta_count`}
                      >
                        <span className="regular-text underlined">VIEW</span>
                        <span>&nbsp;<img className="go-to-icon" src={GoToIcon} alt='go-to' />&nbsp;</span>
                      </HyperLinkedSpanText>
                      )
                    </div>
                  );
                  break;
                }
                case 'new_candidates': {
                  const candidateCount = cell.value;
                  const { id: jobId, workflow_stages: workflowStages } = row.original;
                  if (!workflowStages || !workflowStages.length) {
                    cellContentDOM = '';
                    break;
                  }
                  // workflow_stages[0] refers to newCandidates status
                  const url = `${protectedRoutes.candidates}?status[0]=${workflowStages[0]}&job[0]=${jobId}`;
                  cellContentDOM = (
                    <div className="extra-bold-text">
                      {candidateCount}&nbsp;(
                      <HyperLinkedSpanText
                        as={Link}
                        to={url}
                      >
                        <span className="regular-text underlined">VIEW</span>
                        <span>&nbsp;<img className="go-to-icon" src={GoToIcon} alt='go-to' />&nbsp;</span>
                      </HyperLinkedSpanText>
                      )
                    </div>
                  );
                  break;
                }
                case 'priority': {
                  const PRIORITY_LIST = [
                    {
                      label: 'Must-have',
                      value: true,
                    },
                    {
                      label: 'Nice-to-have',
                      value: false,
                    },
                  ];
                  const priorityValueObj = PRIORITY_LIST.find((___) => ___.value === cell.value);
                  if (!priorityValueObj || !priorityValueObj.label) {
                    cellContentDOM = '';
                    break;
                  }
                  cellContentDOM = (
                    <div className="capitalize-text">
                      {priorityValueObj.label}
                    </div>
                  );
                  break;
                }
                case 'multiple_actions': {
                  const currentRowIndex = row.index;
                  const { editAction, deleteAction } = mapOfActionCallbacks;
                  cellContentDOM = (
                    <div className="inline-links">
                      <div className="bold-text link-text"
                        onClick={() => editAction.callback(currentRowIndex)}
                      >
                        Edit
                      </div>
                      <div className="bold-text link-text"
                        onClick={() => deleteAction.callback(currentRowIndex)}
                      >
                        Delete
                      </div>
                    </div>
                  );
                  break;
                }
                case 'custom_cell_content': {
                  cellContentDOM = (
                    <React.Fragment>
                      {cell.column.customCellContent(row.original) || null}
                    </React.Fragment>
                  );
                  break;
                }
                default: {
                  cellContentDOM = (
                    <div title={cell.value}>
                      {cell.render('Cell')}
                    </div>
                  );
                }
              }
              return (
                <div {...cell.getCellProps()} className="td" key={rowIndex}>
                  {cellContentDOM}
                </div>
              );
            })}
          </div>
        );
      }
      return null;
    },
    [prepareRow, rows, state],
  );

  const [itemCount, setItemCount] = React.useState(20);

  React.useEffect(() => {
    if (totalCount && rows) {
      setItemCount(totalCount < rows.length ? rows.length : totalCount);
    }
  }, [totalCount]);

  React.useEffect(() => {
    if (bulkActions) setSelectedRows(selectedFlatRows.map((row) => row.original));
  }, [selectedFlatRows]);

  return (
    <div {...getTableProps()} className="table">
      <div className="header">
        {headerGroups.map((headerGroup, headerGroupsIndex) => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr" key={headerGroupsIndex}>
            {headerGroup.headers.map((column, headerIndex) => (
              <div {...column.getHeaderProps()} className={`th ${bulkActions ? 'with-checkbox' : ''}`} key={headerIndex}>
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()} className="body">
        {loading
          ? <WaitingIndicator fullScreen={true} msg={loadingMessage} />
          : <>
            {itemCount > 0 && data.length > 0
              ? <InfiniteLoader
                itemCount={itemCount}
                isItemLoaded={isItemLoaded}
                loadMoreItems={fetchData}
              >
                {({ onItemsRendered, ref }) => (
                  <FixedSizeList
                    height={heightMap[height]}
                    itemCount={itemCount}
                    itemSize={getItemSize(type)}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    style={{ overflow: 'hidden auto' }}
                  >
                    {RenderRow}
                  </FixedSizeList>
                )}
              </InfiniteLoader>
              : <EmptyContainer height={heightMap[height]}>{emptyTableMessage}</EmptyContainer>
            }
          </>
        }
      </div>
    </div>
  );
};

Table.propTypes = {
  height: PropTypes.oneOf(['xxs', 'xs', 'sm', 'lg']),
  width: PropTypes.number,
  minWidth: PropTypes.number,
  columns: PropTypes.array,
  data: PropTypes.array,
  fetchData: PropTypes.func,
  totalCount: PropTypes.number,
  actionCallback: PropTypes.func,
  onClickName: PropTypes.func,
  type: PropTypes.string,
  bulkActions: PropTypes.bool,
  setSelectedRows: PropTypes.func,
  onClickJobName: PropTypes.func,
  mapOfActionCallbacks: PropTypes.object,
  emptyTableMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]),
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  nameCellLinkType: PropTypes.bool,
  hideAvatarOnName: PropTypes.bool,
};

export default Table;
