import React from 'react';
import styled from 'styled-components';

import { Card as CardBase, Button as ButtonBase } from '../../../utils/Designs';

const FreeCard = {
  title: 'Free',
  price: 0,
  models: 2,
  requests: 300,
  type: 1,
};
const TeamCard = {
  title: 'Team',
  price: 49,
  models: 30,
  requests: '10,000',
  type: 2,
};
const BusinessCard = {
  title: 'Business',
  price: 190,
  models: 'Unlimited',
  requests: '1,000,000',
  type: 3,
};
const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100vw;
`;

const Header = styled.h1`
  color: ${props => props.color};
  border-bottom: 2px solid #7f8a96;
  padding: 0px 30px 20px 30px;
`;
const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;
const PropertyTitle = styled.span`
  color: #7f8a96;
  font-size: 16px;
  margin-bottom: 10px;
`;
const PropertyValue = styled.span`
  margin-bottom: 10px;
  font-size: 20px;
`;

const PriceTitle = styled.h1`
  margin: 0px;
  color: #7f8a96;
`;
const Property = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled(ButtonBase)`
  margin: 10px;
  background-color: ${props => props.color};
  width: 100px;
  &:hover {
    width: 150px;
    -webkit-transition: width 0.5s; /* Safari prior 6.1 */
    transition: width 0.5s;
  }
`;

const ButtonWrapper = styled.div`
  width: 100;
  display: flex;
  justify-content: center;
`;

const Card = styled(CardBase)`
  height: 400px;
  padding: 0px 20px;
  max-width: 320px;
  min-width: 230px;

  &:hover ${Header} {
    border-bottom: 2px solid ${props => props.color};
    -webkit-transition: border-bottom 0.5s; /* Safari prior 6.1 */
    transition: border-bottom 0.5s;
  }
  &:hover ${PriceTitle} {
    color: ${props => props.color};
    -webkit-transition: color 0.5s; /* Safari prior 6.1 */
    transition: color 0.5s;
  }
`;

const PricingCard = ({ data, color, handleClick }) => {
  const { title, price, models, requests, type } = data;
  return (
    <Card color={color}>
      <Header color={color}>{title}</Header>
      <PriceTitle>{price}$</PriceTitle>
      <Body>
        <Property>
          <PropertyTitle>QUERIES PER MONTH</PropertyTitle>
          <PropertyValue>{requests}</PropertyValue>
        </Property>
        <Property>
          <PropertyTitle>CUSTOM MODELS</PropertyTitle>
          <PropertyValue>{models}</PropertyValue>
        </Property>
      </Body>
      <ButtonWrapper>
        <Button id={type} color={color} onClick={handleClick}>
          Sign up
        </Button>
      </ButtonWrapper>
    </Card>
  );
};
const Pricing = ({ handleClick }) => {
  return (
    <PricingContainer>
      <PricingCard data={FreeCard} color='#4553ff' handleClick={handleClick} />
      <PricingCard data={TeamCard} color='#0F9D58' handleClick={handleClick} />
      <PricingCard
        data={BusinessCard}
        color='#DB4437'
        handleClick={handleClick}
      />
    </PricingContainer>
  );
};

export default Pricing;
