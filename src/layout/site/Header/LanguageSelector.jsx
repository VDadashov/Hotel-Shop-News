import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import { LanguageContext } from "../../../context/LanguageContext";
import theme from "../../../styles/common/theme";
import icon1 from "../../../assets/images/azerbaijan.png";
import icon2 from "../../../assets/images/united-kingdom.png";
import icon3 from "../../../assets/images/russia.png";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useContext(LanguageContext);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "az", label: "AZ", flag: icon1 },
    { code: "en", label: "EN", flag: icon2 },
    { code: "ru", label: "RU", flag: icon3 },
  ];

  const currentLanguage =
    languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <LanguageWrapper ref={dropdownRef}>
      <LanguageButton onClick={() => setIsOpen(!isOpen)}>
        <img width={20} src={currentLanguage.flag} alt="flag" />
        <Label>{currentLanguage.label}</Label>
        <Arrow isOpen={isOpen}>▼</Arrow>
      </LanguageButton>

      {isOpen && (
        <DropdownList>
          {languages.map((language) => (
            <DropdownItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              isActive={lang === language.code}
            >
              <img width={20} src={language.flag} alt="flag" />
              <Label>{language.label}</Label>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </LanguageWrapper>
  );
};

export default LanguageSelector;

// Styled Components

const LanguageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 20px;
`;

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.black};
    background: ${theme.colors.lightGray};
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    gap: 4px;
  }
`;

const Flag = styled.span`
  font-size: 18px;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: ${theme.colors.black};
  text-transform: uppercase;
  font-size: ${theme.fontSizes.sm};

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const Arrow = styled.span`
  font-size: 10px;
  color: ${theme.colors.gray};
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const DropdownList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 100%;
  z-index: 1000;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.2s ease;
  background: ${({ isActive }) =>
    isActive ? theme.colors.lightGray : "transparent"};

  &:hover {
    background: ${theme.colors.lightGray};
  }

  ${Label} {
    font-weight: ${({ isActive }) => (isActive ? "700" : "600")};
  }
`;
