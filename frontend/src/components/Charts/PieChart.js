import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { PieChart as PieChartBase, Pie, Sector, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

export const PieChart = ({ data }) => {
  const [chartValues, setChartValues] = useState();

  useEffect(() => {
    console.log(chartValues, data);
    if (data) {
      const values = [];
      Object.keys(data).forEach(item => {
        values.push({ name: item, value: data[item] });
      });
      setChartValues(values);
    }
  }, [data]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'>
        {percent * 100 > 0 && `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (!chartValues) return null;
  return (
    <PieChartBase width={200} height={200}>
      <Pie
        data={chartValues}
        cx={100}
        cy={100}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill='#8884d8'
        dataKey='value'>
        {chartValues.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChartBase>
  );
};
