import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { history } from '../../../helpers';
import { userActions } from '../../../_actions';

const LateralMenu = styled.div`
  width: 100px;
  height: 100vh;
  position: absolute;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  background-color: ${props => props.theme.color.blueDark};
`;
const TopMenu = styled.div`
  margin-top: 50px;
`;
const BottomMenu = styled.div`
  margin-bottom: 20px;
`;
const MenuItem = styled.button`
  font-size: 17px;
  padding: 10px 0px 10px 2px;
  color: ${props => props.theme.white};
  background-color: ${props =>
    props.isSelected ? props.theme.color.blueLight : 'transparent'};
  border: none;
  cursor: pointer;
  width: 100%;
`;

const Sidebar = ({ dispatch }) => {
  const isSelected = () => {
    if (history.location.pathname === '/dashboard') {
      return true;
    }
  };
  return (
    <LateralMenu>
      <TopMenu>
        <MenuItem
          id='myModels'
          onClick={() => history.push('/dashboard')}
          isSelected={isSelected()}>
          My Models
        </MenuItem>
        <MenuItem>+ Model</MenuItem>
      </TopMenu>
      <BottomMenu>
        <MenuItem id='profile'>Profile</MenuItem>
        <MenuItem onClick={() => dispatch(userActions.logout())}>
          Log out
        </MenuItem>
      </BottomMenu>
    </LateralMenu>
  );
};

function mapStateToProps(state) {
  const { modelList } = state.models;
  return { modelList };
}

const connectedSidebar = connect(mapStateToProps)(Sidebar);
export { connectedSidebar as Sidebar };
