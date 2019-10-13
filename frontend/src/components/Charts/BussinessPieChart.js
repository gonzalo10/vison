import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import { PieChart as PieChartBase, Pie, Sector, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const LegendSquare = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.color};
`;
const LegendText = styled.p`
  margin: 0;
  padding: 0 5px;
`;
const Legend = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 12px;
`;
const LegendItem = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
`;

export const BussinessPieChart = ({ data }) => {
  const [chartValues, setChartValues] = useState();
  const [totalItems, setTotalItems] = useState();

  useEffect(() => {
    console.log(chartValues, data);
    if (data && data.entityModel.data) {
      const listValues = data.entityModel.data;
      let values = {};
      setTotalItems(listValues.length);
      listValues.forEach(item => {
        if (values[item.type]) {
          values[item.type]++;
        } else {
          values[item.type] = 1;
        }
      });
      const chartData = [];
      Object.keys(values).forEach(item => {
        chartData.push({ name: item, value: values[item] });
      });
      setChartValues(chartData);
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
  console.log('chartValues', chartValues);
  return (
    <>
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
      {chartValues.length ? (
        <Legend>
          <LegendItem>
            <LegendSquare color='#0088FE' />
            <LegendText>Organization</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendSquare color='#00C49F' />
            <LegendText>Person</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendSquare color='#FFBB28' />
            <LegendText>Location</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendSquare color='#FF8042' />
            <LegendText>Date</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendSquare color='#0088FE' />
            <LegendText>Event</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendSquare color='#00C49F' />
            <LegendText>Quantity</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendSquare color='#FFBB28' />
            <LegendText>Brand</LegendText>
          </LegendItem>
          <LegendItem>
            <LegendSquare color='#FF8042' />
            <LegendText>Title</LegendText>
          </LegendItem>
        </Legend>
      ) : null}
    </>
  );
};
