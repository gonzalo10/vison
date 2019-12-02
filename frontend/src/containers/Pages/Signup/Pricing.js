import React, { useState } from "react";
import styled from "styled-components";

import { Card as CardBase, Button as ButtonBase } from "../../../utils/Designs";

const tiers = {
  1: {
    id: 1,
    title: "Free",
    price: 0,
    models: 2,
    requests: 300,
    type: 1,
    color: "#4553ff"
  },
  2: {
    id: 2,
    title: "Team",
    price: 49,
    models: 30,
    requests: "10,000",
    type: 2,
    color: "#0F9D58"
  },
  3: {
    id: 3,
    title: "Business",
    price: 190,
    models: "Unlimited",
    requests: "1,000,000",
    type: 3,
    color: "#DB4437"
  }
};
const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100vw;
  transition: transform 1000ms ease-in-out;
  ${props => !props.isPricingVisible && " transform: translate(-11000px, 0px);"}
`;
const OnePriceContainer = styled.div`
  left: -500px;
  position: absolute;
  top: 25%;
  transition: transform 500ms ease-in-out;
  ${props => props.active && "transform: translate(600px, 0px)"}
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
  width: 70%;
  padding: 0px 20px;
  max-width: 320px;
  min-width: 230px;
  margin: auto;
  &:hover ${Header} {
    border-bottom: 2px solid ${props => props.color};
    transition: border-bottom 0.5s;
  }
  &:hover ${PriceTitle} {
    color: ${props => props.color};
    transition: color 0.5s;
  }
`;

const CrossIconWrapper = styled.div`
  top: -15px;
  left: -15px;
  position: absolute;
  font-size: 25px;
  font-weight: 700;
  border: 1px solid transparent;
  padding: 2px;
  width: 25px;
  border-radius: 50%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background-color: #d3d3d375;
  color: white;
  &:hover {
    box-shadow: -1px 7px 24px -6px rgba(0, 0, 0, 0.43);
    cursor: pointer;
    background-color: lightgray;
  }
`;

const PricingCard = ({ data, color, handleClick }) => {
  const { title, price, models, requests, id } = data;

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
        <Button id={id} color={color} onClick={handleClick}>
          Sign up
        </Button>
      </ButtonWrapper>
    </Card>
  );
};

const Pricing = ({ handleClick }) => {
  const [isPricingVisible, setPricingVisible] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState();

  const handleOnClick = e => {
    setPricingVisible(false);
    handleClick(e);
    setSelectedPrice(e.target.id);
  };
  const onClickCancelSelection = () => {
    setPricingVisible(true);
    handleClick();
    setSelectedPrice(null);
  };
  return (
    <>
      <OnePriceContainer active={selectedPrice}>
        <CrossIconWrapper onClick={onClickCancelSelection}>X</CrossIconWrapper>
        <PricingCard
          data={tiers[selectedPrice] || {}}
          color={selectedPrice && tiers[selectedPrice].color}
          handleClick={handleOnClick}
        />
      </OnePriceContainer>
      <PricingContainer isPricingVisible={isPricingVisible}>
        {Object.keys(tiers).map((tier, key) => (
          <PricingCard
            key={key}
            data={tiers[tier]}
            color={tiers[tier].color}
            handleClick={handleOnClick}
          />
        ))}
      </PricingContainer>
    </>
  );
};

export default Pricing;
