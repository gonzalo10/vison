import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';

const Admin = ({ dispatch, users }) => {
  useEffect(() => {
    dispatch(userActions.getAllUsers());
  }, []);
  return (
    <>
      <div>Admin Panel</div>
      <div>
        {users &&
          users.map(user => {
            const {
              modelsUsage,
              email,
              requestsUsage,
              userTypeId,
              createdAt,
            } = user;
            const created = new Date(+createdAt).toISOString();
            return (
              <div style={{ display: 'flex' }}>
                <div>{email}-</div>
                <div>{created}-</div>
                <div>{userTypeId}-</div>
                <div>{modelsUsage}-</div>
                <div>{requestsUsage}-</div>
              </div>
            );
          })}
      </div>
    </>
  );
};

function mapStateToProps(state) {
  const { users } = state.user;
  console.log(users);
  return { users };
}

const connectedAdmin = connect(mapStateToProps)(Admin);
export { connectedAdmin as Admin };
