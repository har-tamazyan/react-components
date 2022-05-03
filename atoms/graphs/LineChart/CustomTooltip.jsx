import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { TooltipContainer, TooltipTitle, TooltipContent } from '../styles';

export const dateTimeFormatter = (unixTime) => (
  moment((unixTime === 'auto' || unixTime === 0) ? new Date() : unixTime).format('DD/MM/YY')
);
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipTitle>{dateTimeFormatter(label)}</TooltipTitle>
        {payload.map((dataItem) => (
          <TooltipContent key={dataItem.dataKey}>
            {dataItem.dataKey.includes('prev_') ? `Previous ${dataItem.name}` : dataItem.name}: {dataItem.value}
          </TooltipContent>
        ))}
      </TooltipContainer>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};

export default CustomTooltip;
