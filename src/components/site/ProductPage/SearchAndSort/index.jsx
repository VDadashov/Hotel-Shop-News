import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 220px;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 8px 0 0 8px;
  border: 1px solid #ccc;
  border-right: none;
`;

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 0 8px 8px 0;
  border: 1px solid #8b5e3c;
  background-color: #8b5e3c;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #714a2f;
  }
`;



const Select = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-width: 180px;
`;

const SearchAndSort = () => {
  return (
    <Wrapper>
      <InputWrapper>
        <Input type="text" placeholder="Search products..." />
        <Button>Search</Button>
      </InputWrapper>
      <Select>
        <option value="default">Sort by</option>
        <option value="low-high">Price: Low → High</option>
        <option value="high-low">Price: High → Low</option>
        <option value="a-z">A → Z</option>
        <option value="z-a">Z → A</option>
      </Select>
    </Wrapper>
  );
};

export default SearchAndSort;
