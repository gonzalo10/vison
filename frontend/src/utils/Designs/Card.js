import styled from 'styled-components';

export const Card = styled.div`
  cursor: pointer;
  margin: 15px;
  position: relative;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid lightgray;
  transition-property: color, background-color, box-shadow, transform;
  transition-duration: 0.15s;
  &:hover {
    box-shadow: -1px 7px 24px -6px rgba(0, 0, 0, 0.43);
  }
`;
export const ShadowCard = styled.div`
  cursor: pointer;
  margin: 15px;
  position: relative;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: -1px 7px 24px -6px rgba(0, 0, 0, 0.43);
  border: 1px solid lightgray;
`;
export const FlatCard = styled.div`
  cursor: pointer;
  margin: 15px;
  position: relative;
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid lightgray;
`;

export const CardMenu = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr 1fr 1fr;
  height: 85vh;
  overflow: scroll;
`;
