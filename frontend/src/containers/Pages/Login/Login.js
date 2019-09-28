import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';

import { Button, Input } from '../../../utils/Designs';

export const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 50%;
  min-width: 300px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${props => props.theme.white};
`;

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.beigeWhite};
`;
const LoginArea = styled.div`
  display: flex;
  min-width: 600px;
  width: 50%;
`;
const DesignSection = styled.div`
  background-color: ${props => props.theme.color.blueDark};
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  color: ${props => props.theme.white};
  width: 50%;
  min-width: 300px;
  padding: 15px;
`;
const Title = styled.h1``;
const SubTitle = styled.h1``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const LoginPage = ({ dispatch, isOpen, message }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState();
  const [hidedPassword, sethidedPassword] = useState();

  const handleLogin = e => {
    e.preventDefault();
    console.log('username', username, 'password', password);
    dispatch(userActions.login(username, password));
  };

  const handlePassword = e => {
    console.log(e.target.value);
    // sethidedPassword('*'.repeat(e.target.value.length));
    setPassword(e.target.value);
  };

  return (
    <LoginContainer>
      <LoginArea>
        <DesignSection>
          <Title>
            Welcome to <b>Vision</b>
          </Title>
          <SubTitle>Login to use the app</SubTitle>
        </DesignSection>
        <LoginSection>
          <h1>Login</h1>
          {isOpen ? <div>{message}</div> : null}
          <Form onSubmit={handleLogin}>
            <Input
              type='text'
              onChange={e => setUsername(e.target.value)}
              value={username || ''}
            />
            <Input onChange={handlePassword} value={password || ''} />
            <Button color='blueDark' type='submit' value='Submit'>
              Login
            </Button>
          </Form>
        </LoginSection>
      </LoginArea>
    </LoginContainer>
  );
};

function mapStateToProps(state) {
  const { isOpen, message } = state.notifications;
  return {
    isOpen,
    message,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
