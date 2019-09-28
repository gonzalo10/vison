import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { userActions } from "../../../_actions";

export const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const LoginPage = ({ dispatch, isOpen, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();

  const handleLogin = () => {
    dispatch(userActions.login(username, password));
  };

  return (
    <LoginSection>
      <h1>Login</h1>
      {isOpen ? <div>{message}</div> : null}
      <input
        type="text"
        onChange={e => setUsername(e.target.value)}
        value={username || ""}
      />
      <input
        onChange={e => setPassword(e.target.value)}
        value={password || ""}
      />
      <button onClick={handleLogin}>Login</button>
    </LoginSection>
  );
};

function mapStateToProps(state) {
  const { isOpen, message } = state.notifications;
  return {
    isOpen,
    message
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
