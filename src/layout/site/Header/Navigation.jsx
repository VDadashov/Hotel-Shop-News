import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import MegaDropdown from "./MegaDropdown";
import theme from "../../../styles/common/theme";

const Navigation = ({ productsData, loading, error }) => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink href="/">{t("header.home")}</NavLink>
        </NavItem>

        <NavItem
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          withBefore
        >
          <NavLink href="/products">{t("header.products")}</NavLink>
          {!loading && !error && isDropdownOpen && (
            <DropdownWrapper>
              <MegaDropdown data={productsData} />
            </DropdownWrapper>
          )}
        </NavItem>

        <NavItem>
          <NavLink href="/about">{t("header.about")}</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/contact">{t("header.contact")}</NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navigation;

// -------------------- Styled Components --------------------

const NavContainer = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: ${theme.spacing.lg};
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 1028px) {
    gap: ${theme.spacing.sm};
  }
`;

const NavItem = styled.li`
  position: static;

  ${({ withBefore }) =>
    withBefore &&
    css`
      &:hover&::before {
        content: "";
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        height: 30px;
        background: transparent;
        transform: translateY(-50%);
        z-index: 1000000;
      }
    `}
`;

const NavLink = styled.a`
  text-decoration: none;
  font-weight: 600;
  color: ${theme.colors.black};
  padding: 10px 15px;
  display: block;
  transition: 0.3s;
  white-space: nowrap;
  border-radius: 3px;

  &:hover {
    background: ${theme.colors.sale};
    color: ${theme.colors.white};
  }

  @media (max-width: 1028px) {
    font-size: ${theme.fontSizes.sm};
    padding: 8px 12px;
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  animation: fadeSlide 0.3s ease;

  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
