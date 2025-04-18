import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col } from "../../../styles/common/GridSystem";
import { FaShoppingBag, FaBars, FaSearch } from "react-icons/fa";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";
import BaseApi from "../../../utils/api/baseApi";
import SearchOverlay from "./SearchOverlay";
import CartPanel from "./CartPanel";
import { useCart } from "../../../providers/CartProvider"; // ✅ context'ten import

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { getTotalPrice, getTotalCount } = useCart(); // ✅ sepət məlumatları

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BaseApi}/menu_items`);
        if (!response.ok) throw new Error("Network response was not ok");
        const rawData = await response.json();
        setProductsData(Array.isArray(rawData) ? rawData : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <HeaderWrapper>
      <Row justify="space-between" align="center">
        <Col xs={2} md={2}>
          <Logo>
            <img src="/images/logo.png" alt="Logo" />
          </Logo>
        </Col>

        <Navigation
          productsData={productsData}
          loading={loading}
          error={error}
        />

        <Col xs={2} md={2}>
          <RightSide>
            <Icons>
              <FaSearch onClick={() => setSearchOpen(true)} />
              <Cart onClick={() => setIsCartOpen(true)}>
                ${getTotalPrice().toFixed(2)}
                <span>{getTotalCount()}</span>
                <FaShoppingBag />
              </Cart>
            </Icons>

            <MobileToggle onClick={() => setMobileOpen(!mobileOpen)}>
              <FaBars />
            </MobileToggle>
          </RightSide>
        </Col>
      </Row>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <MobileMenu
        productsData={productsData}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {!loading && !error && (
          <DropdownMenu data={productsData} isMobile={true} />
        )}
      </MobileMenu>
    </HeaderWrapper>
  );
};

export default Header;


// Styled Components
const HeaderWrapper = styled.header`
  width: 100%;
  padding: 15px 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    max-height: 60px;
    object-fit: contain;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  svg {
    cursor: pointer;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Cart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  cursor: pointer;

  span {
    position: absolute;
    top: -6px;
    right: -10px;
    background: #000;
    color: #fff;
    font-size: 10px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MobileToggle = styled.div`
  display: none;
  font-size: 22px;
  cursor: pointer;
  margin-left: 15px;

  @media (max-width: 768px) {
    display: block;
  }
`;
