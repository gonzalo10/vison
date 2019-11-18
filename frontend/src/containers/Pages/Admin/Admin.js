import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';
import { Sidebar } from '../../Layout/Sidebar';
import PreviewData from '../../../components/PreviewData';

const Container = styled.div`
  display: flex;
  margin-left: 100px;
  flex-direction: column;
`;

const Table = styled.div`
  margin-top: 10px;
`;
const HeaderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RowItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  padding: 0px 18px;
  text-align: center;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => '1fr '.repeat(columns)};
  text-align: center;
  background-color: #6c79e0;
  color: white;
  border-bottom: 1px solid lightgray;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 30px;
`;
const RowWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => '1fr '.repeat(columns)};
  text-align: center;
  border-bottom: 1px solid lightgray;
`;

const BodyWrapper = styled.div`
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Text = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Header = ({ headers }) => {
  console.log(headers);
  const columns = headers.length;
  return (
    <HeaderWrapper columns={columns}>
      {headers.map((head, index) => (
        <HeaderItem key={index}>{head}</HeaderItem>
      ))}
    </HeaderWrapper>
  );
};

const Body = ({ rows }) => {
  let maxColNumber = 0;
  rows.forEach(row => {
    if (row.length > maxColNumber) maxColNumber = row.length;
  });
  return (
    <BodyWrapper>
      {rows.map((row, index) => {
        console.log('rows', row);
        return (
          <RowWrapper key={index} columns={Object.keys(row).length}>
            {Object.keys(row).map((col, index) => {
              return (
                <RowItem key={index}>
                  <Text>{row[col]}</Text>
                </RowItem>
              );
            })}
          </RowWrapper>
        );
      })}
    </BodyWrapper>
  );
};

const Admin = ({ dispatch, users, me }) => {
  useEffect(() => {
    dispatch(userActions.getAllUsers());
    dispatch(userActions.getUser());
  }, []);
  if (me && me.userTypeId !== 3) {
    return null;
  }
  const headers = [
    'email',
    'modelsUsage',
    'requestsUsage',
    'created',
    'userTypeId',
  ];
  return (
    <>
      <Sidebar />
      <Container>
        <div>Admin Panel</div>
        <div>
          {users && (
            <Table>
              <Header headers={headers} />
              <Body rows={users} />
            </Table>
          )}
        </div>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { users, me } = state.user;
  console.log(users);
  return { users, me };
}

const connectedAdmin = connect(mapStateToProps)(Admin);
export { connectedAdmin as Admin };
