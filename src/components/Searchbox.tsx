import React, { ChangeEvent, FC, memo, useCallback } from "react";
import styled from "@emotion/styled";

const Input = styled.input`
    display: block;
    padding: 10px;
    font-size: 14px;
`;

interface SearchBoxProps {
    onChange: (value: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ onChange }) => {
    console.log("Searchbox Rendered");
    return (
        <Input
            type="text"
            placeholder="Search word"
            onChange={(e) => onChange(e.target.value)}
        />
    );
};

export default memo(SearchBox);
