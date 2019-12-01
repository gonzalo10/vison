import React from "react";
import styled from "styled-components";

import colorPalette from "../colors";

export const Button = styled.button`
  cursor: pointer;
  margin: 20px;
  border: ${props =>
    props.variant === "outlined"
      ? `2px solid ${colorPalette[props.color]}`
      : "none"};
  color: ${props =>
    props.variant === "outlined" ? colorPalette[props.color] : "#fff"};
  background: ${props =>
    props.variant === "outlined" ? "#fff" : colorPalette[props.color]};
  text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
  white-space: nowrap;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-decoration: none;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  &:hover {
    filter: grayscale(20%);
  }
  &:disabled {
    background: #d3d3d3;
    cursor: default;
  }
`;
