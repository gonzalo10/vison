import styled from "styled-components";

const padding = {
  l: "20px",
  m: "10px",
  s: "5px"
};

export const Input = styled.input`
  width: 200px;
  height: 25px;
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin: 0px 10px 20px 0px;
  font-size: 14px;
  padding: ${props => padding[props.padding]};
`;
