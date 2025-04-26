import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import MobileDropdownPopup from "./MobileDropdownPopup";

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
          onClose(); // həm popup, həm menu bağlansın
        }}
        data={productsData}
      />
    </>
  );
};

export default MobileMenu;

const PopupTrigger = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  padding: 0;
  display: block;
  width: 100%;
  text-align: left;

  &:hover {
    color: #cba589;
  }
`;

const MenuWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background: #fff;
  z-index: 999;
  padding: 40px 20px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
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
      margin-bottom: 20px;

      a {
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        color: #000;
        transition: color 0.2s;

        &:hover {
          color: #cba589;
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
  color: #333;

  &:hover {
    color: #cba589;
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
