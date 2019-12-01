import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faYoutube,
  faInstagram,
  faAmazon,
  faBuffer,
  faFlipboard,
  faGetPocket,
  faReddit,
  faHubspot,
  faYelp,
  faGoogle,
  faIntercom
} from "@fortawesome/free-brands-svg-icons";

import { modelActions } from "../../../_actions";
import { Sidebar } from "../../Layout/Sidebar";
import { history } from "../../../helpers";

import {
  Button,
  Input as InputBase,
  FlatCard,
  CardMenu,
  Toggle
} from "../../../utils/Designs";
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

const IntegrationIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 30px;
`;
const YoutubeIcon = styled(IntegrationIcon)`
  color: #ff0000;
`;

const Avatar = styled.p`
  padding: 13px;
  width: 50px;
  text-align: center;
  font-size: 40px;
  margin: 20px;
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
const Body = styled.div``;
const IntegrationsArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const IntegrationsDetails = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const IntegrationCard = styled(FlatCard)`
  padding: 30px 0px;
  align-items: center;
`;

const Integrations = ({ dispatch, isLoading }) => {
  return (
    <MainContainer>
      <Container>
        <Header>
          <HeaderLeft>
            <Avatar>🧩</Avatar>
            <TitleHeader>Integrations</TitleHeader>
          </HeaderLeft>
        </Header>
        <Body>
          <IntegrationsArea>
            <IntegrationCard>
              <YoutubeIcon icon={faYoutube} />
              <IntegrationsDetails>Youtube</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faInstagram} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faAmazon} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faBuffer} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faFlipboard} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faGetPocket} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faReddit} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faIntercom} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faHubspot} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faYelp} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
            <IntegrationCard>
              <IntegrationIcon icon={faGoogle} />
              <IntegrationsDetails>Comming soon</IntegrationsDetails>
            </IntegrationCard>
          </IntegrationsArea>
        </Body>
      </Container>
    </MainContainer>
  );
};

function mapStateToProps(state) {
  const { isLoading } = state;
  return {};
}

const connectedIntegrations = connect(mapStateToProps)(Integrations);
export { connectedIntegrations as Integrations };
