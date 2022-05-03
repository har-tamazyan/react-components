import React from 'react';
import {
  Pie, Tooltip, Label, ResponsiveContainer
} from 'recharts';
import { PieDiagram } from 'src/web/ats/components/atoms/graphs/styles'

const RADIAN = Math.PI / 180;

const CustomLabel = ({ viewBox: { cx, cy }, value1, value2 }) => (
  <>
    <text x={cx} y={cy - 10} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
      <tspan fontWeight={700} alignmentBaseline="middle" fontSize="18">{value1}</tspan>
    </text>
    <text x={cx} y={cy + 20} fill="#3d405c" className="recharts-text recharts-label" textAnchor="middle" dominantBaseline="central">
      <tspan fontWeight={700} fontSize="28">{value2}</tspan>
    </text>
  </>
);

const DonutChartGraph = ({
  data, dataKey, containerHeight, containerWidth,
}) => {

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x - 10} y={y} fill="black" fontSize={18} fontWeight="normal" dominantBaseline="central">
        {data.values[index].value}
      </text>
    );
  };

  return (
    <ResponsiveContainer height={containerHeight} width={containerWidth}>
      <PieDiagram width={'100%'} height={'100%'}>
        <Pie
          isAnimationActive={false}
          dataKey={dataKey}
          data={data.values}
          cx="50%"
          cy="50%"
          outerRadius={'95%'}
          innerRadius={'65%'}
          fill="#8884D8"
          onClick={({ name, value }) => console.log({ name, value })}
          label={renderCustomizedLabel}
          labelLine={false}
        >
          <Label width={30} position="center"
            content={<CustomLabel value1="Total Positions" value2={data.total_positions} />}>
          </Label>
        </Pie>
        <Tooltip />
      </PieDiagram>
    </ResponsiveContainer>
  )
}

DonutChartGraph.propTypes = {};

export default DonutChartGraph;
