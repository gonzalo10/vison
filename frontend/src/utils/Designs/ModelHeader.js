import styled from 'styled-components';

export const ModelHeader = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 15px;
  position: relative;
  text-align: center;
  border-radius: 8px;
`;

export const ModelHeaderTitle = styled.h3`
  display: flex;
  flex-direction: column;
`;
export const ModelHeaderDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 600px;
  margin-left: 20px;
  color: ${props => props.theme.color.lightGrey};
`;
