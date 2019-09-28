import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const LateralMenu = styled.div`
  width: 100px;
  height: 100vh;
  position: absolute;
  justify-content: space-between;
  flex-direction: column;
  display: flex;
  background-color: ${props => props.theme.color.dark};
`;
const TopMenu = styled.div`
  margin-top: 50px;
`;
const BottomMenu = styled.div`
  margin-bottom: 50px;
`;
const MenuItem = styled.div`
  margin-left: 20px;
  color: ${props => props.theme.white};
`;

const Sidebar = ({ dispatch }) => {
  return (
    <LateralMenu>
      <TopMenu>
        <MenuItem>Discover</MenuItem>
        <MenuItem>Explore</MenuItem>
      </TopMenu>
      <BottomMenu>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Log out</MenuItem>
      </BottomMenu>
    </LateralMenu>
  );
};

function mapStateToProps(state) {
  const { modelList } = state.models;
  console.log("state", state);
  return { modelList };
}

const connectedSidebar = connect(mapStateToProps)(Sidebar);
export { connectedSidebar as Sidebar };
