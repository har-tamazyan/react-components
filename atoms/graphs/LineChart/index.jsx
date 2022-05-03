import React, { useEffect, useState } from 'react';
import {
  LineChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Line,
} from 'recharts';
import theme from 'src/web/ats/theme';
import PropTypes from 'prop-types';
import { COLOR_PALETTE as ColorPalette } from 'src/config/definitions';
import { PREVIOUS_PREFIX } from 'src/web/ats/components/Analytics/details/constants';
import { changeTrendLineOpacityAndWith } from 'src/web/ats/utils';
import { CheckboxContainer } from '../styles';
import Checkbox from '../../input/checkbox';
import CustomTooltip, { dateTimeFormatter } from './CustomTooltip';

const DEFAULT_OPACITY = 0.8;
const DEFAULT_STROKE_WIDTH = 1.5;
const MOUSE_ENTERED_OPACITY = 1;
const MOUSE_ENTERED_STROKE_WIDTH = 2.5;

const LineChartGraph = ({
  data, dataKey, xAxisKey, yAxisKey, containerHeight, containerWidth, isYAxisLogScaled,
}) => {
  const [coloredDatakey, setColoredDatakey] = useState(dataKey);
  const [checkBoxState, setCheckBoxState] = useState([]);
  const [opacity, setOpacity] = useState({});
  const [strokeWidth, setStrokeWidth] = useState({});

  const handleMouseEnter = (key) => {
    const opacityConfigs = { value: MOUSE_ENTERED_OPACITY, setter: setOpacity };
    const strokeWidthConfigs = { value: MOUSE_ENTERED_STROKE_WIDTH, setter: setStrokeWidth };
    changeTrendLineOpacityAndWith(key, opacityConfigs, strokeWidthConfigs);
  };

  const handleMouseLeave = (key) => {
    const opacityConfigs = { value: DEFAULT_OPACITY, setter: setOpacity };
    const strokeWidthConfigs = { value: DEFAULT_STROKE_WIDTH, setter: setStrokeWidth };
    changeTrendLineOpacityAndWith(key, opacityConfigs, strokeWidthConfigs);
  };

  useEffect(() => {
    const opacities = {};
    const newDatakey = dataKey.map((item, index) => {
      opacities[item.key] = DEFAULT_OPACITY;
      strokeWidth[item.key] = DEFAULT_STROKE_WIDTH;
      return {
        ...item,
        color: ColorPalette[(!item.key.includes(PREVIOUS_PREFIX)
          ? index
          : index - (Math.round(dataKey.length / 2) % (ColorPalette.length - 1)))],
      };
    });
    setOpacity({ ...opacities });
    setStrokeWidth({ ...strokeWidth });
    setColoredDatakey(newDatakey);
  }, [dataKey]);

  useEffect(() => {
    const defaultState = dataKey.map((entry, index) => ({
      name: entry.key,
      checked: index < 4,
    }));

    defaultState.map((entry) => {
      if (entry.checked) {
        const previousValue = defaultState
          .find((item) => item.name === PREVIOUS_PREFIX + entry.name);
        if (previousValue) previousValue.checked = true;
      }
      return entry;
    });

    setCheckBoxState(defaultState);
  }, []);

  const renderLegend = (props) => {
    const { payload } = props;
    const handleCheckboxChange = (event) => {
      const updatedData = checkBoxState.map((item) => (
        (item.name === event.target.name || item.name === `${PREVIOUS_PREFIX}${event.target.name}`)
          ? { ...item, checked: event.target.checked }
          : item));
      setCheckBoxState(updatedData);
    };

    return (
      <CheckboxContainer>
        {
          payload
            .filter((val) => (val.dataKey.slice(0, 5) !== PREVIOUS_PREFIX))
            .map((entry, index) => (
              <label
                onMouseEnter={() => handleMouseEnter(entry.dataKey)}
                onMouseLeave={() => handleMouseLeave(entry.dataKey)}
                key={entry.dataKey + index}>
                <Checkbox
                  checked={
                    checkBoxState?.length
                    && checkBoxState.find((item) => item.name === entry.dataKey).checked
                  }
                  onChange={handleCheckboxChange}
                  styles={{ borderColor: 'none', backgroundColor: entry.color, strokeColor: theme.default.WHITE }}
                  name={entry.dataKey}
                />
                <span style={{ marginLeft: 8 }}>{entry.value}</span>
              </label>
            ))
        }
      </CheckboxContainer>
    );
  };

  const scaleProps = isYAxisLogScaled ? { scale: 'log', domain: [0.01, 'auto'], allowDataOverflow: true } : {};

  const renderActiveDot = (dataItem) => {
    if (!dataItem.key.includes(PREVIOUS_PREFIX)) return { r: 8 };

    return {
      stroke: dataItem.color, strokeWidth: 1, r: 6, strokeDasharray: '', fill: 'white',
    };
  };

  return (
    <ResponsiveContainer height={containerHeight} width={containerWidth}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        {coloredDatakey.map((dataItem) => (
            <Line
              activeDot={renderActiveDot(dataItem)}
              dot={!dataItem.key.includes(PREVIOUS_PREFIX)}
              hide={checkBoxState?.length
                ? !checkBoxState.find((item) => item.name === dataItem.key).checked : true}
              key={dataItem.key}
              name={dataItem.name}
              type="monotone"
              dataKey={dataItem.key}
              stroke={dataItem.color}
              strokeOpacity={opacity[dataItem.key]}
              onMouseEnter={() => handleMouseEnter(dataItem.key)}
              onMouseLeave={() => handleMouseLeave(dataItem.key)}
              strokeWidth={strokeWidth[dataItem.key]}
              fill={dataItem.color}
              strokeDasharray={dataItem.key.includes(PREVIOUS_PREFIX) ? '5, 5' : null}
            />
          ))}
        <XAxis
          dataKey={xAxisKey}
          tickFormatter={dateTimeFormatter}
          angle={-20}
          textAnchor='end'
        />
        <YAxis dataKey={yAxisKey} { ...scaleProps } />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />

      </LineChart>
    </ResponsiveContainer>
  );
};

LineChartGraph.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.array,
  xAxisKey: PropTypes.string,
  yAxisKey: PropTypes.string,
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  payload: PropTypes.array,
  isYAxisLogScaled: PropTypes.bool,
};

export default LineChartGraph;
