/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import categorySelectors from 'src/web/ats/redux/modules/category/selector.js';
import * as S from './styles';

const SourceManager = ({
  data,
  index,
  showMore,
  showMoreIndex,
}) => {
  const [sourceData, setSourceData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setSourceData(data);
  }, [sourceData]);

  const formatData = () => {
    if (showMore && showMoreIndex === index) {
      const items = [...sourceData];
      setItems(items);
    } else {
      const items = sourceData && [
        ...sourceData.slice(0, 3),
      ];
      setItems(items);
    }
  };

  useEffect(() => {
    formatData();
  }, [sourceData, showMore, showMoreIndex]);

  return (
    <>
      {items
        && items.map((item, index) => {
          const tooltip = item?.sourcing_manager.filter((_, i) => i !== 0);
          return (<S.SourceName key={index}>
            <span>{item.sourcing_manager[0]?.name}({item.sourcing_manager[0]?.email})</span>
            {item.sourcing_manager.length > 1
              && <Tooltip
                position='top'
                size='small'
                distance={-20}
                offset={0}
                title={tooltip.map((_) => _.name)}
              >
                <S.ShowManager>{`+${item.sourcing_manager.length - 1}`}</S.ShowManager>
              </Tooltip>}
          </S.SourceName>
          );
        })}
    </>
  );
};

SourceManager.propTypes = {
  data: PropTypes.array,
  showMore: PropTypes.bool,
  showMoreIndex: PropTypes.string,
  index: PropTypes.number,
};

const mapStateToProps = ({ category }) => ({
  showMore: categorySelectors.getShowMore({ category }),
  showMoreIndex: categorySelectors.getShowMoreIndex({ category }),
});


export default connect(
  mapStateToProps,
  null,
)(withRouter(SourceManager));

