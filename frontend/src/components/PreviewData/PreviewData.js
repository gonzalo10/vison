import React, { useState } from 'react';
import styled from 'styled-components';

// rows: [
//     [
//       'Very unfriendly staff at reception: not responding to needs and giving wrong information.',
//     ],
//     ['The staff are polite, chatty and very helpful.'],
//     [
//       'Although clean and the bed comfy, the room was a little on the small side.',
//     ],
//   ],

const Table = styled.div``;
const HeaderItem = styled.div``;
const RowItem = styled.div`
  border: 1px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  justify-content: start;
  padding: 0px 5px;
`;

const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
`;
const BodyWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => '1fr '.repeat(columns)};
  text-align: center;
`;

const Text = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Header = ({ headers }) => {
  return (
    <RowWrapper>
      {headers.map((head, index) => (
        <HeaderItem key={index}>{head}</HeaderItem>
      ))}
    </RowWrapper>
  );
};

const Body = ({ rows }) => {
  let maxColNumber = 0;
  rows.forEach(row => {
    if (row.length > maxColNumber) maxColNumber = row.length;
  });
  return rows.map((row, index) => {
    return (
      <BodyWrapper key={index} columns={maxColNumber}>
        {row.map((col, index) => {
          return (
            <RowItem key={index}>
              <Text>{col}</Text>
            </RowItem>
          );
        })}
      </BodyWrapper>
    );
  });
};

const PreviewData = ({ data }) => {
  const { headers, rows } = data.dataSet;
  return (
    <Table>
      <Header headers={headers} />
      <Body rows={rows} />
    </Table>
  );
};

export default PreviewData;
