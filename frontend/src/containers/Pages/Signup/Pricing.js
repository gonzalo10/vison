import React from 'react';
import styled from 'styled-components';

import { Card as CardBase } from '../../../utils/Designs';

const FreeCard = {
  title: 'Free',
  price: 0,
  models: 3,
  requests: 300,
};
const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Card = styled(CardBase)`
  height: 400px;
`;

const PricingCard = ({ data }) => {
  const { title, price, models, requests } = data;
  return (
    <Card>
      <h1>{title}</h1>
      <h1>{price}</h1>
      <h3>{models}</h3>
      <h3>{requests}</h3>
    </Card>
  );
};
const Pricing = () => {
  return (
    <PricingContainer>
      <PricingCard data={FreeCard} />
      <PricingCard data={FreeCard} />
      <PricingCard data={FreeCard} />
    </PricingContainer>
  );
};

export default Pricing;
