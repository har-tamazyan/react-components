import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { generateColor } from '../../../utils';
import { COLOR_PALETTE as ColorPalette } from 'src/config/definitions';

const BarChartGraph = ({
  data, dataKeys, dataKey, containerHeight, containerWidth,
}) => (
        <ResponsiveContainer height={containerHeight} width={containerWidth}>
            <BarChart margin={{ right: 36.8 }} width={730} height={250} data={data}>
                <XAxis dataKey={dataKey} angle={-20} textAnchor='end' />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataKeys.map((dataItem, index) => (
                    <Bar key={dataItem.key} dataKey={dataItem.key}
                    fill={ColorPalette[index % (ColorPalette.length - 1)]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
);

BarChartGraph.propTypes = {};

export default BarChartGraph;
