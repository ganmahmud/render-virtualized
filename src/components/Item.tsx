import styled from "@emotion/styled";
import React, { FC } from "react";

const Wrapper = styled.li`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid black;
  padding-left: 8px;
  font-size: 18px;
  font-family: monospace;
  position: relative;
`;

export interface ItemProps {
  postionTop: number 
}

export const Item: FC<ItemProps> = ({ postionTop, children }) => {
  return <Wrapper style={{"top": `${postionTop}px`}}>{children}</Wrapper>;
};
