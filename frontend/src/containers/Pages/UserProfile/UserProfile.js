import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import welcomeImg from '../../../assets/images/welcome2.jpg';
import visionLogo from '../../../assets/images/vision.svg';
import { userActions } from '../../../_actions';
import { Sidebar } from '../../Layout/Sidebar';
import { history } from '../../../helpers';
import {
  Button,
  Input as InputBase,
  FlatCard,
  CardMenu,
  Toggle,
} from '../../../utils/Designs';
const Container = styled.div`
  display: flex;
  margin-left: 100px;
  flex-direction: column;
`;
const MainContainer = styled.div`
  height: 100vh;
  background-color: ${props => props.theme.color.beigeWhite};
`;
const Header = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.p`
  border: 3px solid ${props => props.theme.color.blueDark};
  border-radius: 50%;
  padding: 13px;
  width: 50px;
  text-align: center;
  font-size: 40px;
  margin: 20px;
`;

const Input = styled(InputBase)`
  padding: 0px 15px;
  text-align: center;
`;

const TitleHeader = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: ${props => props.theme.color.blueDark};
`;

const HeaderLeft = styled.div`
  align-items: center;
  display: flex;
`;
const HeaderRight = styled.div``;
const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const UserInfoArea = styled(FlatCard)`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;
const UserInfoAreaLeft = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 150px;
  padding: 10px 0px;
`;
const UserInfoAreaRight = styled.div`
  padding: 30px 0px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PasswordArea = styled(FlatCard)`
  padding: 30px 0px;
  align-items: center;
`;
const BillingArea = styled(FlatCard)`
  padding: 30px 0px;
  align-items: center;
`;
const UsageArea = styled(FlatCard)`
  padding: 30px 0px;
  align-items: center;
`;
const ProgressBar = styled.div`
  display: inline-block;
  width: 400px;
  height: 50px;
  margin: 15px;
  border-radius: 20px;
  background: #f9f9f9;
`;

const InsideBar = styled.div`
  border-radius: 20px;
  width: ${props => props.progress || '0'}%;
  height: 100%;
  transition: width;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0.36, 0.55, 0.63, 0.48);
  box-shadow: 0px 45px 50px rgba(0, 0, 0, 0.25);
  background-color: #b5ccbf;
  display: flex;
  justify-content: center;
  align-items: center;
  color: blue;
`;
const EmailArea = styled(FlatCard)`
  padding: 30px 0px;
  align-items: center;
`;
const EmailAreaEmail = styled.p`
  align-items: center;
  felx-direction: column;
`;
const EmailAreaTop = styled.div``;
const EmailAreaBottom = styled.div`
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
  display: grid;
`;
const EmailToggleTitle = styled.h5``;

const UserProfile = ({ dispatch, isLoading }) => {
  const [menuOpenId, setMenuOpen] = useState();
  useEffect(() => {
    dispatch(userActions.getUserAccount());
  }, []);

  return (
    <MainContainer>
      <Sidebar />
      <Container>
        <Header>
          <HeaderLeft>
            <Avatar>🦊</Avatar>
            <TitleHeader>My Profile</TitleHeader>
          </HeaderLeft>
          <HeaderRight>
            <Button color='blueDark'>Logout</Button>
          </HeaderRight>
        </Header>
        <Body>
          <UserInfoArea>
            <UserInfoAreaLeft>
              <Avatar>🦊</Avatar>
              <h5>Change profile imagen</h5>
            </UserInfoAreaLeft>
            <UserInfoAreaRight>
              <Input placeholder='Name' type='text' />
              <Input placeholder='Email' type='text' />
              <Input placeholder='Company' type='text' />
              <Input placeholder='Location' type='text' />
            </UserInfoAreaRight>
          </UserInfoArea>
          <PasswordArea>
            <Input placeholder='Old password' type='text' />
            <Input placeholder='New password' type='text' />
            <Input placeholder='Repeat new password' type='text' />
            <Button color='blueDark'>Change password</Button>
          </PasswordArea>
          <UsageArea>
            Models Usage
            <ProgressBar>
              <InsideBar progress={30}>1/3</InsideBar>
            </ProgressBar>
            Requests Usage
            <ProgressBar>
              <InsideBar progress={100}>600/600</InsideBar>
            </ProgressBar>
            <Button color='blueDark'>Upgrade Plan</Button>
          </UsageArea>
          <BillingArea>
            <Input type='text' />
            <Input type='text' />
            <Input type='text' />
            <Button color='blueDark'>Change billing address</Button>
          </BillingArea>
          {/* <EmailArea>
            <EmailAreaTop>
              <EmailAreaEmail>Supercollemail@gmail.com</EmailAreaEmail>
            </EmailAreaTop>
            <EmailAreaBottom>
              <EmailToggleTitle>Daily summary </EmailToggleTitle>
              <Toggle />
              <EmailToggleTitle>Weekly report </EmailToggleTitle>
              <Toggle />
              <EmailToggleTitle>Weekly report </EmailToggleTitle>
              <Toggle />
            </EmailAreaBottom>
          </EmailArea> */}
        </Body>
      </Container>
    </MainContainer>
  );
};

function mapStateToProps(state) {
  const { isLoading } = state;
  return {};
}

const connectedUserProfile = connect(mapStateToProps)(UserProfile);
export { connectedUserProfile as UserProfile };
