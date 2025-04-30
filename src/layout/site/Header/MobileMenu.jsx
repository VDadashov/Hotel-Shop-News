import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import MobileDropdownPopup from "./MobileDropdownPopup";
import theme from "../../../styles/common/theme";

const MobileMenu = ({ productsData, open, onClose }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <MenuWrapper className={open ? "open" : ""}>
        <CloseBtn onClick={onClose}>
          <FaTimes />
        </CloseBtn>
        <nav>
          <ul>
            <li>
              <a href="/">Ana Səhifə</a>
            </li>
            <li>
              <a href="/about">Haqqımızda</a>
            </li>
            <li>
              <a href="/contact">Bizimlə Əlaqə</a>
            </li>
            <li>
              <PopupTrigger onClick={() => setOpenPopup(true)}>
                Məhsullarımız
              </PopupTrigger>
            </li>
          </ul>
        </nav>
      </MenuWrapper>

      {open && <Backdrop onClick={onClose} />}
      <MobileDropdownPopup
        open={openPopup}
        closePopup={() => setOpenPopup(false)}
        closeAll={() => {
          setOpenPopup(false);
          onClose();
        }}
        data={productsData}
      />
    </>
  );
};

export default MobileMenu;

// === Styled Components ===

const PopupTrigger = styled.button`
  background: none;
  border: none;
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  color: ${theme.colors.black};
  cursor: pointer;
  padding: 0;
  display: block;
  width: 100%;
  text-align: left;

  &:hover {
    color: ${theme.colors.sale};
  }
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: ${theme.colors.white};
  z-index: 999;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  box-shadow: -2px 0 8px ${theme.colors.cardShadow};
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;

  &.open {
    transform: translateX(0);
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 60px 0 0;

    li {
      margin-bottom: ${theme.spacing.md};

      a {
        text-decoration: none;
        font-weight: 600;
        font-size: ${theme.fontSizes.base};
        color: ${theme.colors.black};
        transition: color 0.2s;

        &:hover {
          color: ${theme.colors.sale};
        }
      }
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${theme.colors.text};

  &:hover {
    color: ${theme.colors.sale};
  }
`;

const Backdrop = styled.div`
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);

  @media (min-width: 769px) {
    display: none;
  }
`;
