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
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  transition-property: color, background-color, box-shadow, transform;
  transition-duration: 0.15s;
  &:hover {
    box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
      0 18px 36px -18px rgba(0, 0, 0, 0.3),
      0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  }
`;

export const CardMenu = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 85vh;
  overflow: scroll;
`;
