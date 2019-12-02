import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { userActions } from "../../../_actions";
import { Card, Button, Input } from "../../../utils/Designs";

import Pricing from "./Pricing";

export const LoginSection = styled(Card)`
  width: 40%;
  height: 50%;
  position: absolute;
  left: 50%;
  display: ${props => (props.active ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  top: 25%;
  margin: 0;
`;
export const SignupWrapper = styled.div`
  height: 100vh;
  align-items: center;
  display: flex;
`;
export const Header = styled.div`
  width: 100vw;
  position: absolute;
  display: flex;
  width: 100%;
  height: 820px;
  overflow: hidden;
  top: -300px;
  transform: skewY(12deg);
  transform-origin: 0;
  background: linear-gradient(158deg, #53f 44%, #05d5ff 85%, #a6ffcb 65%);
  z-index: -1;
`;

export const Span1 = styled.span`
  width: calc(100% / 5);
  background: #53f;
  height: 190px;
  position: absolute;
  bottom: 0;
`;
export const Span4 = styled.span`
  width: calc(100% / 4);
  background: #4f40ff;
  height: 190px;
  position: absolute;
  bottom: 190px;
  left: 0;
`;
export const Span2 = styled.span`
  width: calc(100% / 3);
  top: 0;
  left: 33.66666%;
  right: auto;
  background: #4553ff;
  height: 190px;
  position: absolute;
`;
export const Span3 = styled.span`
  width: 33.33333%;
  width: calc(100% / 3);
  right: 0;
  position: absolute;
  bottom: auto;
  background: #1fa2ff;
  height: 190px;
`;
export const Span5 = styled.span`
  width: 50%;
  left: -187px;
  position: absolute;
  bottom: -46px;
  background: #a6ffcb;
  height: 350px;

  transform: skew(40deg, 12deg);
`;
export const Span6 = styled.span`
  z-index: -3;
  width: 100%;
  right: 0px;
  position: absolute;
  bottom: 0px;
  background: linear-gradient(160deg, #a6ffcb 31%, #05d5ff 54%, #53f 54%);
  height: 350px;
`;

const SignupPage = ({ dispatch }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repeatedPassword, setRepeatedPassword] = useState();
  const [plan, setPlan] = useState(1);
  const [isSignupModalOpen, setSignupModal] = useState(false);

  const handleLogin = () => {
    dispatch(userActions.register(username, password, Number(plan)));
  };

  const handleSelectedPrice = e => {
    if (e) {
      setSignupModal(true);
      setPlan(e.target.id);
    } else {
      setSignupModal(false);
      setPlan(1);
    }
  };

  return (
    <SignupWrapper>
      <Header>
        <Span1 />
        <Span2 />
        <Span3 />
        <Span4 />
      </Header>
      <Span6 />
      <Pricing handleClick={handleSelectedPrice} />
      {isSignupModalOpen && (
        <LoginSection id="1" active={isSignupModalOpen}>
          <h1>Signup</h1>
          <Input
            padding="m"
            type="text"
            onChange={e => setUsername(e.target.value)}
            placeholder="email"
            type="email"
            value={username || ""}
          />
          <Input
            padding="m"
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
            value={password || ""}
          />
          <Input
            padding="m"
            onChange={e => setRepeatedPassword(e.target.value)}
            placeholder="repeat the password"
            value={repeatedPassword || ""}
          />
          <Button onClick={handleLogin} color="blueDark">
            Login
          </Button>
        </LoginSection>
      )}
    </SignupWrapper>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {};
}

const connectedLoginPage = connect(mapStateToProps)(SignupPage);
export { connectedLoginPage as SignupPage };
