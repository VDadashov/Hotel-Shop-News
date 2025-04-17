import React, { useState } from "react";
import styled from "styled-components";
import MegaDropdown from "./MegaDropdown"; // Yeni komponenti import edirik

const Navigation = ({ productsData, loading, error }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink href="/">Ana Səhifə</NavLink>
        </NavItem>

        <NavItem
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <NavLink href="#">Məhsullarımız</NavLink>
          {!loading && !error && isDropdownOpen && (
            <DropdownWrapper>
              <MegaDropdown data={productsData} />
            </DropdownWrapper>
          )}
        </NavItem>

        <NavItem>
          <NavLink href="/about">Haqqımızda</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/contact">Bizimlə Əlaqə</NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navigation;

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
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 1028px) {
    gap: 10px;
  }
`;

const NavItem = styled.li`
  position: static;
`;

const NavLink = styled.a`
  text-decoration: none;
  font-weight: 600;
  color: #000;
  padding: 10px 15px;
  display: block;
  transition: 0.3s;
  white-space: nowrap;

  &:hover {
    background: #cba589;
    color: #fff;
    border-radius: 3px;
  }

  @media (max-width: 1028px) {
    font-size: 14px;
    padding: 8px 12px;
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
`;
