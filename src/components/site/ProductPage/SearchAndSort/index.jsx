import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import theme from "../../../../styles/common/theme";

// Loading animasiyası
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

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
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.regular};
`;

const Button = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 0 8px 8px 0;
  border: 1px solid ${theme.colors.saleHover};
  background-color: ${theme.colors.saleHover};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 80px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.sale};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top: 2px solid ${theme.colors.white};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 8px;
  border: 1px solid ${theme.colors.border};
  min-width: 180px;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.regular};
  background-color: ${theme.colors.white};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing.sm} center;
  background-size: 16px;
  padding-right: ${theme.spacing.xl};

  &:hover {
    border-color: ${theme.colors.sale};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.sale};
    box-shadow: 0 0 0 3px rgba(220, 38, 127, 0.1);
  }

  option {
    padding: ${theme.spacing.sm};
    background-color: ${theme.colors.white};
    color: ${theme.colors.text};
  }
`;

const SearchAndSort = ({ loading, setLoading, query, onQueryChange, sort, onSortChange }) => {
  const [inputValue, setInputValue] = useState(query || "");

  useEffect(() => {
    setInputValue(query || "");
  }, [query]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    onQueryChange(inputValue.trim());

  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoading(true);

      // await new Promise((resolve) => setTimeout(resolve, 0));

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
        <Button onClick={handleButtonClick} disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner />
              Axtarır...
            </>
          ) : (
            "Axtar"
          )}
        </Button>
      </InputWrapper>

      <Select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sırala</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
        <option value="newest">Ən yeni</option>
        <option value="oldest">Ən köhnə</option>
        <option value="most-viewed">Ən çox baxılan</option>
      </Select>
    </Wrapper>
  );
};

export default SearchAndSort;
