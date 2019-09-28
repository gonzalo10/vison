import React from "react";

import BlueTitleImg from "../../../assets/images/blueAnalytics.png";
import MambaDashboard from "../../../assets/images/MambaDashboard.jpeg";
import dasboardSVG from "../../../assets/images/home.svg";
import dragSVG from "../../../assets/images/drag.svg";
import manufactureSVG from "../../../assets/images/manufacture.svg";
import integrateSVG from "../../../assets/images/integrate.svg";
import visionLogo from "../../../assets/images/vision.svg";
import DS from "../../../assets/images/DS.png";
import BA from "../../../assets/images/BA.png";
import DE from "../../../assets/images/DE.png";
import AL from "../../../assets/images/AL.png";
import teamBuilding from "../../../assets/images/teamBuilding.png";
import puzzle from "../../../assets/images/puzzle.png";

import {
  TitleSection,
  Header,
  Img,
  ImgMamba,
  Span1,
  Span4,
  Span2,
  Span3,
  TextArea,
  TitleText,
  SubtitleText,
  CallToAction,
  FirstButton,
  SecondButton,
  ExampleSection,
  ExampleTitle,
  InteractiveExample,
  NavSwitcher,
  StepsButtons,
  TryText,
  SwitchImg,
  ClientImg,
  UsesImg,
  Section,
  ClientsTitle,
  ClientsSubtitle,
  ClientTitle,
  ClientType,
  UsesType,
  ClientsIcons,
  UsesIcons,
  Footer,
  StripeArea,
  FooterContent,
  Logo,
  Product,
  Guides,
  Company
} from "./styles";

export const LandingPage = () => {
  return (
    <div>
      <Header>
        <Span1></Span1>
        <Span2></Span2>
        <Span3></Span3>
        <Span4></Span4>
      </Header>
      <TitleSection>
        <TextArea>
          <TitleText>
            Build production-ready A.I. Models
            <br />— without code
          </TitleText>
          <SubtitleText>
            Design, build, launch, and grow faster. Without distracting your
            engineers.
          </SubtitleText>
          <CallToAction>
            <FirstButton>START Free NOW</FirstButton>
          </CallToAction>
        </TextArea>
        <Img src={BlueTitleImg} />
      </TitleSection>
      <ExampleSection>
        <InteractiveExample>
          <ExampleTitle>Put Machine Learning at your fingertips</ExampleTitle>
          <ImgMamba src={MambaDashboard} />
        </InteractiveExample>
        <NavSwitcher>
          <StepsButtons active>
            <SwitchImg src={dasboardSVG} />
            Dashboard
          </StepsButtons>
          <StepsButtons active>
            <SwitchImg src={dragSVG} />
            Drag & Drop Model creator
          </StepsButtons>
          <StepsButtons>
            <SwitchImg src={manufactureSVG} />
            Production In One Click
          </StepsButtons>
          <StepsButtons>
            <SwitchImg src={integrateSVG} />
            Integrate
          </StepsButtons>
          <StepsButtons>
            <TryText>Try for free 🚀</TryText>
          </StepsButtons>
        </NavSwitcher>
      </ExampleSection>
      <StripeArea />
      <Section>
        <ClientsTitle>
          From Raw Data
          <br />
          To
          <br />
          Business Impact.
        </ClientsTitle>
        <ClientsSubtitle>
          Vision's single, collaborative platform powers both self-service
          analytics and the operationalization of machine learning models in
          production.
        </ClientsSubtitle>
        <UsesIcons>
          <UsesType>
            <UsesImg src={teamBuilding} />
            <ClientTitle>Business Analyst</ClientTitle>
          </UsesType>
          <UsesType>
            <UsesImg src={puzzle} />
            <ClientTitle>Data Engineer</ClientTitle>
          </UsesType>
          <UsesType>
            <UsesImg src={teamBuilding} />
            <ClientTitle>Project Manager</ClientTitle>
          </UsesType>
          <UsesType>
            <UsesImg src={puzzle} />
            <ClientTitle>Data Sciences</ClientTitle>
          </UsesType>
        </UsesIcons>
      </Section>
      <Section>
        <ClientsTitle>
          For Everyone <br />
          In The Data-Powered Organization.
        </ClientsTitle>
        <ClientsSubtitle>
          Vision is the data platform that brings ease and efficiency to
          everyone in the data-to-insights process, including:
        </ClientsSubtitle>
        <ClientsIcons>
          <ClientType>
            <ClientImg src={BA} />
            <ClientTitle>Business Analyst</ClientTitle>
          </ClientType>
          <ClientType>
            <ClientImg src={DE} />
            <ClientTitle>Data Engineer</ClientTitle>
          </ClientType>
          <ClientType>
            <ClientImg src={AL} />
            <ClientTitle>Project Manager</ClientTitle>
          </ClientType>
          <ClientType>
            <ClientImg src={DS} />
            <ClientTitle>Data Sciences</ClientTitle>
          </ClientType>
        </ClientsIcons>
      </Section>
      <Footer />
      <FooterContent>
        <Logo src={visionLogo} />
        <Product>Products</Product>
        <Guides>Guides</Guides>
        <Company>Company</Company>
      </FooterContent>
    </div>
  );
};
