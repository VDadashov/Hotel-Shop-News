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
import { useCart } from "../../../providers/CartProvider";
import theme from "../../../styles/common/theme";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const { getTotalCount } = useCart();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BaseApi}/menu`);
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsFixed(scrollTop > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isFixed && <HeaderSpacer />}
      <FixedHeader isFixed={isFixed}>
        <HeaderWrapper>
          <Row justify="space-between" align="center">
            <Col xs={2} md={2}>
              <Logo href="/">
                <img src="/images/logo.png" alt="Logo" />
              </Logo>
            </Col>

            <Navigation productsData={productsData} loading={loading} error={error} />

            <Col xs={2} md={2}>
              <RightSide>
                <Icons>
                  <FaSearch onClick={() => setSearchOpen(true)} />
                  <Cart onClick={() => setIsCartOpen(true)}>
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

          <MobileMenu productsData={productsData} open={mobileOpen} onClose={() => setMobileOpen(false)}>
            {!loading && !error && <DropdownMenu data={productsData} isMobile={true} />}
          </MobileMenu>
        </HeaderWrapper>
      </FixedHeader>
    </>
  );
};

export default Header;

// Styled Components

const HeaderSpacer = styled.div`
  height: 90px;
`;

const FixedHeader = styled.div`
  position: ${({ isFixed }) => (isFixed ? "fixed" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.border};

  ${({ isFixed }) =>
    isFixed &&
    `
    animation: slideDown 0.4s ease forwards;
  `}

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const HeaderWrapper = styled.header`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;

  img {
    max-height: 60px;
    object-fit: contain;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
`;

const Icons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;

  svg {
    cursor: pointer;
    font-size: ${theme.fontSizes.md};
  }

  @media (max-width: 768px) {
    padding-right: ${theme.spacing.sm};
    svg {
      font-size: ${theme.fontSizes.base};
    }
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
    background: ${theme.colors.black};
    color: ${theme.colors.white};
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
