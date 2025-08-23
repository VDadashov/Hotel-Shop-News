import React from "react";
import styled from "styled-components";
import { Row, Col } from "../../../styles/common/GridSystem";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import theme from "../../../styles/common/theme";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <FooterWrapper>
      <Row r_gap="40px" justify="space-between">
        <Col xs={12} sm={6} md={3} xl={3} xxl={3}>
          <FooterLogo href="/">
            <img src="/images/logo.png" alt="HotelShop Logo" />
            <p>HotelShop - Hər zaman keyfiyyətli otel məhsulları</p>
          </FooterLogo>
        </Col>

        <Col xs={12} sm={5} md={3} lg={3} xl={3} xxl={3}>
          <FooterTitle>Əsas səhifələr</FooterTitle>
          <FooterList>
            <li>
              <a href="/">Ana Səhifə</a>
            </li>
            <li>
              <a href="/products">Məhsullar</a>
            </li>
            <li>
              <a href="/about">Haqqımızda</a>
            </li>
            <li>
              <a href="/contact">Əlaqə</a>
            </li>
          </FooterList>
        </Col>

        <Col xs={12} sm={5} md={3} lg={3} xl={3} xxl={3}>
          <FooterTitle>Faydalı linklər</FooterTitle>
          <FooterList>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/privacy">Gizlilik siyasəti</a>
            </li>
            <li>
              <a href="/terms">İstifadə şərtləri</a>
            </li>
            <li>
              <a href="/returns">Qaytarılma şərtləri</a>
            </li>
          </FooterList>
        </Col>

        <Col xs={12} sm={5} md={3} lg={1} xl={1} xxl={1}>
          <FooterTitle>Bizi izləyin</FooterTitle>
          <SocialIcons>
            <a href="https://facebook.com">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com">
              <FaTwitter />
            </a>
            <a href="https://instagram.com">
              <FaInstagram />
            </a>
          </SocialIcons>
        </Col>
      </Row>

      <Copy>
        Copyright &copy; {new Date().getFullYear()} HotelShop | Powered by{" "}
        <Link to="https://rockvelltechnology.com/en/">Rockvell</Link>
      </Copy>
    </FooterWrapper>
  );
};

export default Footer;

// === Styled Components ===

const FooterWrapper = styled.footer`
  background: ${theme.colors.footerBg};
  padding: 60px ${theme.spacing.sm} 30px;
  color: ${theme.colors.text};
`;

const FooterLogo = styled.a`
  display: block;

  img {
    max-height: 60px;
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.footerText};
    max-width: 300px;
  }
`;

const FooterTitle = styled.h4`
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.sale};
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: ${theme.spacing.xs};
  }

  a {
    text-decoration: none;
    color: ${theme.colors.text};
    font-size: ${theme.fontSizes.sm};

    &:hover {
      color: ${theme.colors.sale};
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};

  a {
    color: ${theme.colors.text};
    font-size: ${theme.fontSizes.md};
    transition: 0.3s;

    &:hover {
      color: ${theme.colors.sale};
    }
  }
`;

const Copy = styled.div`
  margin-top: ${theme.spacing.lg};
  text-align: center;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.mutedText};
`;
