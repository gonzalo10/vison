import styled from 'styled-components';

export const Badge = styled.div`
  background-color: ${props => props.theme.color.blueDark};
  font-size: 14px;
  border-radius: 20px;
  padding: 4px 10px;
  margin: 5px 15px 0px 15px;
  min-width: 100px;
  color: ${props => props.theme.white};
`;

export const BadgeGroup = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-around;
  display: grid;
  margin: 10px;
`;
