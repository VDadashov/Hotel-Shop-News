import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../../../styles/common/theme";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 220px;
`;

const Input = styled.input`
  flex: 1;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 8px 0 0 8px;
  border: 1px solid ${theme.colors.border};
  border-right: none;
  font-size: ${theme.fontSizes.base};
`;

const Button = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 0 8px 8px 0;
  border: 1px solid ${theme.colors.saleHover};
  background-color: ${theme.colors.saleHover};
  color: ${theme.colors.white};
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${theme.colors.sale};
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 8px;
  border: 1px solid ${theme.colors.border};
  min-width: 180px;
  font-size: ${theme.fontSizes.base};
`;

const SearchAndSort = ({ query, onQueryChange, sort, onSortChange }) => {
  const [inputValue, setInputValue] = useState(query || "");

  useEffect(() => {
    setInputValue(query || "");
  }, [query]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    onQueryChange(inputValue.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onQueryChange(inputValue.trim());
    }
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          type="text"
          placeholder="Məhsul axtar..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Button onClick={handleButtonClick}>Axtar</Button>
      </InputWrapper>

      <Select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sırala</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </Select>
    </Wrapper>
  );
};

export default SearchAndSort;
