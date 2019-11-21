import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';

import Pricing from './Pricing';

export const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 1000;
  background: transparent;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
`;
export const SignupWrapper = styled.div`
  height: 100vh;
  align-items: center;
  display: flex;
`;

const SignupPage = ({ dispatch }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [plan, setPlan] = useState(0);
  const [isSignupModalOpen, setSignupModal] = useState(false);

  const handleLogin = () => {
    dispatch(userActions.register(username, password, plan));
  };

  const handleClick = e => {
    setSignupModal(true);
    console.log(e.target.value);
  };
  const handleClickOutside = e => {
    // setSignupModal(false);
    console.log(e.target.id);
  };
  console.log(isSignupModalOpen);

  return (
    <SignupWrapper id='2' onClick={handleClickOutside}>
      {isSignupModalOpen && (
        <LoginSection id='1'>
          <h1>Signup</h1>
          <input
            type='text'
            onChange={e => setUsername(e.target.value)}
            placeholder='email'
            type='email'
            value={username || ''}
          />
          <input
            onChange={e => setPassword(e.target.value)}
            placeholder='password'
            value={password || ''}
          />
          <input
            onChange={e => setPlan(e.target.value)}
            type='number'
            value={plan}
            placeholder='1'
          />

          <button onClick={handleLogin}>Login</button>
        </LoginSection>
      )}
      <Pricing handleClick={handleClick} />
    </SignupWrapper>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {};
}

const connectedLoginPage = connect(mapStateToProps)(SignupPage);
export { connectedLoginPage as SignupPage };
