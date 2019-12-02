import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { userActions } from "../../../_actions";
import logoSVG from "../../../assets/images/logoWhite.svg";
import { Button, Input as InputBase } from "../../../utils/Designs";

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
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 60px 0px;
`;
const Title = styled.h1``;
const SubTitle = styled.h3`
  font-size: 25px;
  text-align: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const InputPassword = styled(InputBase)`
  -webkit-text-security: disc;
  text-security: disc;
`;

const Logo = styled.img`
  height: 60px;
  text-align: center;
  justify-content: center;
  display: flex;
}
`;

const LoginPage = ({ dispatch, isOpen, message }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();

  const handleLogin = e => {
    e.preventDefault();
    dispatch(userActions.login(username, password));
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  return (
    <LoginContainer>
      <LoginArea>
        <DesignSection>
          <Title>
            Welcome to <b>Vision</b>
          </Title>
          <Logo src={logoSVG} />
          <SubTitle>Login to use the app</SubTitle>
        </DesignSection>
        <LoginSection>
          <h1>Login</h1>
          <Form onSubmit={handleLogin}>
            <InputBase
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={username || ""}
            />
            <InputPassword onChange={handlePassword} value={password || ""} />
            <Button color="blueDark" type="submit" value="Submit">
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
    message
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
