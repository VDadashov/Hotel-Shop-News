import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import theme from "../../../styles/common/theme";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?searchQuery=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <OverlayContainer isOpen={isOpen}>
      <CloseIcon onClick={onClose}>
        <FaTimes />
      </CloseIcon>

      <ContentWrapper>
        <SearchBox>
          <input
            ref={inputRef}
            type="text"
            placeholder="Axtarış..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchButton onClick={handleSearch}>Axtar</SearchButton>
        </SearchBox>
      </ContentWrapper>
    </OverlayContainer>
  );
};

export default SearchOverlay;

// === Styled Components ===

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 90px;
  background: ${theme.colors.white};
  z-index: 1000;
  overflow: hidden;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    height: 100vh;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.lg};
  font-size: 24px;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    right: ${theme.spacing.md};
  }
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 80px ${theme.spacing.md} ${theme.spacing.md};
    align-items: flex-start;
  }
`;

const SearchBox = styled.div`
  max-width: 700px;
  width: 90%;
  display: flex;
  gap: ${theme.spacing.sm};
  padding: 0 10px;

  input {
    flex: 1;
    padding: ${theme.spacing.md};
    font-size: ${theme.fontSizes.base};
    border: 1px solid ${theme.colors.inputBorder};
    border-radius: 6px;

    @media (max-width: 768px) {
      padding: ${theme.spacing.sm};
      font-size: ${theme.fontSizes.sm};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }
`;

const SearchButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.sale};
  color: ${theme.colors.white};
  border: none;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: ${theme.colors.saleHover};
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.fontSizes.sm};
  }
`;
