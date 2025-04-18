import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const SearchOverlay = ({ isOpen, onClose }) => {
  return (
    <OverlayContainer isOpen={isOpen}>
      <CloseIcon onClick={onClose}>
        <FaTimes />
      </CloseIcon>

      <ContentWrapper>
        <SearchBox>
          <input type="text" placeholder="Axtarış..." />
          <SearchButton>Axtar</SearchButton>
        </SearchBox>
      </ContentWrapper>
    </OverlayContainer>
  );
};

export default SearchOverlay;
const OverlayContainer = styled.div`
position: fixed;
top: 0;
right: 0;
width: 100vw;
height: 90px;
background: white;
z-index: 1000;
overflow: hidden;

opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
transform: ${({ isOpen }) =>
  isOpen ? "translateX(0)" : "translateX(100%)"};
transition: all 0.4s ease;
`;

const CloseIcon = styled.div`
position: absolute;
top: 20px;
left: 30px;
font-size: 24px;
cursor: pointer;
z-index: 2;
`;

const ContentWrapper = styled.div`
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`;

const SearchBox = styled.div`
max-width: 700px;
width: 90%;
display: flex;
gap: 12px;
padding: 0 10px;

input {
  flex: 1;
  padding: 14px 18px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
`;

const SearchButton = styled.button`
padding: 14px 24px;
background: #cba589;
color: white;
border: none;
font-weight: 600;
border-radius: 6px;
cursor: pointer;
transition: 0.3s ease;

&:hover {
  background: #b07c57;
}
`;
