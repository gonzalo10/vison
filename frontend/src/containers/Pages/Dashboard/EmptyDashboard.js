import React from "react";
import styled from "styled-components";

import welcomeImg from "../../../assets/images/welcome2.jpg";

const EmtpyDashboardImg = styled.img`
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const ImgWrapper = styled.div`
  min-width: 100%;
  min-height: 45vh;
  justify-content: center;
  display: flex;
`;
const EmtpyDashboard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 50px;
`;
const EmptyDashboardTitle = styled.h1`
  color: #060aad;
  text-align: center;
`;
const CreateModelStepsText = styled.ol`
  font-size: 18px;
  margin: auto;
`;
const CreateModelStepItem = styled.li`
  padding: 5px 25px;
  color: #060aad;
`;
const EmptyDashboard = () => {
  return (
    <EmtpyDashboard>
      <ImgWrapper>
        <EmtpyDashboardImg src={welcomeImg} />
      </ImgWrapper>
      <EmptyDashboardTitle>Create your first Model 😊</EmptyDashboardTitle>
      <CreateModelStepsText>
        <CreateModelStepItem>
          Click <strong>+ Create Model</strong> button 👆
        </CreateModelStepItem>
        <CreateModelStepItem>
          Choose <strong>model</strong> type
        </CreateModelStepItem>
        <CreateModelStepItem>Fill title and description ✍️</CreateModelStepItem>
      </CreateModelStepsText>
    </EmtpyDashboard>
  );
};

export default EmptyDashboard;
