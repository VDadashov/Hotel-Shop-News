import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Col } from "../../../styles/common/GridSystem";
import { FaShoppingBag, FaBars, FaSearch } from "react-icons/fa";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";
import { apiEndpoints } from "../../../utils/api/baseApi";
import SearchOverlay from "./SearchOverlay";
import CartPanel from "./CartPanel";
import { useCart } from "../../../providers/CartProvider";
import { LanguageContext } from "../../../context/LanguageContext";
import theme from "../../../styles/common/theme";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsData, setProductsData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const { getTotalCount } = useCart();
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
    const fetchMenuData = async () => {
      setLoading(true);
      try {
        const result = await apiEndpoints.getCategoriesMenu(lang);
        setProductsData(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, [lang]);

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
      <FixedHeader $isFixed={isFixed}>
        <HeaderWrapper>
          <Row $justify="space-between" $align="center">
            <LogoCol $xs={5} $md={2} $lg={2} $xl={2} $xxl={2}>
              <Logo
                href="/"
                onClick={() => {
                  sessionStorage.setItem("homeIntroForce", "true");
                }}
              >
                <img src="/images/logo.png" alt="Logo" />
              </Logo>
            </LogoCol>

            <NavCol $xs={12} $md={7} $lg={7} $xl={8} $xxl={8}>
              <Navigation
                productsData={productsData}
                loading={loading}
                error={error}
              />
            </NavCol>

            <RightCol $xs={7} $md={3} $lg={3} $xl={2} $xxl={2}>
              <RightSide>
                <LanguageSelector />

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
            </RightCol>
          </Row>

          <SearchOverlay
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
          />
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
  position: ${({ $isFixed }) => ($isFixed ? "fixed" : "relative")};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.border};

  ${({ $isFixed }) =>
    $isFixed &&
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
  padding: 20px 20px 8px 0px;
  background: ${theme.colors.white};

  @media (max-width: 500px) {
    padding: 15px 15px 4px 0px;
  }
`;

const NavCol = styled(Col)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const LogoCol = styled(Col)``;

const RightCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;

  img {
    max-height: 60px;
    object-fit: contain;
    margin-bottom: 12px;
  }

  @media (max-width: 500px) {
    img {
      margin-bottom: 16px;
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: flex-end;

  @media (max-width: 600px) {
    gap: ${theme.spacing.sm};
    align-items: center;
  }
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
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
  }
`;
