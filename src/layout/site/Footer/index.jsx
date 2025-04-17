import React from "react";
import styled from "styled-components";
import { Row, Col } from "../../../styles/common/GridSystem";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterWrapper>
      <Row r_gap="40px" justify="space-between">
        <Col xs={12} sm={6} md={3} xl={3} xxl={3}>
          <FooterLogo>
            <img src="/images/logo.png" alt="HotelShop Logo" />
            <p>HotelShop - Hər zaman keyfiyyətli otel məhsulları</p>
          </FooterLogo>
        </Col>

        <Col xs={12} sm={5} md={3} lg={3} xl={3} xxl={3}>
          <FooterTitle>Əsas səhifələr</FooterTitle>
          <FooterList>
            <li><a href="/">Ana Səhifə</a></li>
            <li><a href="/products">Məhsullar</a></li>
            <li><a href="/about">Haqqımızda</a></li>
            <li><a href="/contact">Əlaqə</a></li>
          </FooterList>
        </Col>

        <Col xs={12} sm={5} md={3} lg={3} xl={3}   xxl={3}>
          <FooterTitle>Faydalı linklər</FooterTitle>
          <FooterList>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/privacy">Gizlilik siyasəti</a></li>
            <li><a href="/terms">İstifadə şərtləri</a></li>
            <li><a href="/returns">Qaytarılma şərtləri</a></li>
          </FooterList>
        </Col>

        <Col xs={12} sm={5} md={3} lg={1} xl={1} xxl={1}>
          <FooterTitle>Bizi izləyin</FooterTitle>
          <SocialIcons>
            <a href="https://facebook.com"><FaFacebookF /></a>
            <a href="https://twitter.com"><FaTwitter /></a>
            <a href="https://instagram.com"><FaInstagram /></a>
          </SocialIcons>
        </Col>
      </Row>

      <Copy>
        Copyright © {new Date().getFullYear()} HotelShop | Powered by HotelShop.az
      </Copy>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background: #f3f3f3;
  padding: 60px 20px 30px;
  color: #333;
`;

const FooterLogo = styled.div`
  img {
    max-height: 60px;
    margin-bottom: 12px;
    
  }

  p {
    font-size: 14px;
    color: #777;
    max-width: 300px;
  }
`;

const FooterTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #cba589;
`;

const FooterList = styled.ul`
    
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: #333;
    font-size: 14px;

    &:hover {
      color: #cba589;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #333;
    font-size: 18px;
    transition: 0.3s;

    &:hover {
      color: #cba589;
    }
  }
`;

const Copy = styled.div`
  margin-top: 40px;
  text-align: center;
  font-size: 13px;
  color: #999;
`;
