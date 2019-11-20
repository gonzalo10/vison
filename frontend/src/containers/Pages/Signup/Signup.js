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
  height: 400px;
`;

const SignupPage = ({ dispatch }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [plan, setPlan] = useState(0);

  const handleLogin = () => {
    dispatch(userActions.register(username, password, plan));
  };

  return (
    <>
      <LoginSection>
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
      <Pricing />
    </>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {};
}

const connectedLoginPage = connect(mapStateToProps)(SignupPage);
export { connectedLoginPage as SignupPage };
