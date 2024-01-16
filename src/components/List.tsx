import styled from "@emotion/styled";
import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { Item } from "./Item";
import { SafelyRenderChildren } from "./SafelyRenderChildren";
import { useScrollPosition } from "../hooks/useScrollPosition";
import SearchBox from "./Searchbox";

const ScrollWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  width: 100%;
  height: 500px;
  overflow: auto;
  position: relative;
`;

const ListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`;

export interface ListProps {
  items: string[];
  rowHeight: number;
}

export const List: FC<ListProps> = ({ items, rowHeight, children }) => {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useScrollPosition(scrollWrapperRef);

  const maxAllowedVisibleRows = Math.ceil(scrollWrapperRef.current?.clientHeight / rowHeight);

  const startIndex = Math.floor(scrollPosition / rowHeight);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + maxAllowedVisibleRows
  );

  const [searchInput, setSearchInput] = useState<string>("");
  const handleSearch = useCallback((value: string) => {
    setSearchInput(value);
  }, [items]);
  
  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().startsWith(searchInput.toLowerCase())
    );
  }, [items, searchInput]);
  
  const visibleItems = filteredItems.slice(startIndex, endIndex + 1);
  
  const totalListHeight = useMemo(() => {
    return searchInput.length > 0 ? `${rowHeight * filteredItems.length}px` : `${rowHeight * items.length}px`;
  }, [searchInput, filteredItems]);
  
  return (
    <>
      <SearchBox onChange={handleSearch} />
      <ScrollWrapper ref={scrollWrapperRef}>
        <ListWrapper style={{height: totalListHeight}}>
          {/**
           * Note: `SafelyRenderChildren` should NOT be removed while solving
           * this interview. This prevents rendering too many list items and
           * potentially crashing the web page. This also enforces an artificial
           * limit (5,000) to the amount of children that can be rendered at one
           * time during virtualization.
           */}
          <SafelyRenderChildren limit={2500}>
            {visibleItems.map((word, index) => (
              <Item postionTop={startIndex * rowHeight} key={startIndex + index}>{word}</Item>
            ))}
          </SafelyRenderChildren>
        </ListWrapper>
      </ScrollWrapper>
    </>
  );
};
