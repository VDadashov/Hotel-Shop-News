import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
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
      // Fokus əməliyyatını gecikdirək ki, DOM tam render olsun
      const timer = setTimeout(() => {
        inputRef.current.focus();
      }, 100); // 100ms gecikmə bəs edir
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


// Styled Components

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
  transform: ${({ isOpen }) => (isOpen ? "translateX(0)" : "translateX(100%)")};
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    height: 100vh;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    top: 20px;
    right: 20px;
  }
`;

const ContentWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 80px 20px 20px;
    align-items: flex-start;
  }
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

    @media (max-width: 768px) {
      padding: 12px 14px;
      font-size: 15px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
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

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 15px;
  }
`;
