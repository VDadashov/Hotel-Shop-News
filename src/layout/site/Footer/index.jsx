import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Col } from "../../../styles/common/GridSystem";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import theme from "../../../styles/common/theme";
import { Link } from "react-router-dom";
import { apiEndpoints } from "../../../utils/api/baseApi";
import { LanguageContext } from "../../../context/LanguageContext";
import MediaApi from "../../../utils/api/MediaApi";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const result = await apiEndpoints.getSections("footer", lang);
        setFooterData(result.data?.[0] || result?.[0]);
      } catch (error) {
        console.error("Footer data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, [lang]);

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || 'N/A';
    }
    return 'N/A';
  };

  // Helper function to get image URL
  const getImageUrl = (media) => {
    if (!media?.url) return '/images/logo.png';
    if (media.url.startsWith('http')) return media.url;
    return `${MediaApi}${media.url}`;
  };

  if (loading) {
    return (
      <FooterWrapper>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading...
        </div>
      </FooterWrapper>
    );
  }

  if (!footerData) {
    return (
      <FooterWrapper>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Footer data not available
        </div>
      </FooterWrapper>
    );
  }

  const { additionalData, media } = footerData;
  const { logo, copyright, mainPages, socialMedia, usefulLinks } = additionalData || {};

  return (
    <FooterWrapper>
      <Row $r_gap="40px" $justify="space-between">
        <Col $xs={12} $sm={6} $md={3} $xl={3} $xxl={3}>
          <FooterLogo href="/">
            <img src={getImageUrl(media)} alt={media?.alt || "HotelShop Logo"} />
            <p>{logo?.subtitle || "HotelShop - Hər zaman keyfiyyətli otel məhsulları"}</p>
          </FooterLogo>
        </Col>

        <Col $xs={12} $sm={5} $md={3} $lg={3} $xl={3} $xxl={3}>
          <FooterTitle>{getLocalizedText(mainPages?.title)}</FooterTitle>
          <FooterList>
            {mainPages?.links?.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{getLocalizedText(link.text)}</a>
              </li>
            ))}
          </FooterList>
        </Col>

        <Col $xs={12} $sm={5} $md={3} $lg={3} $xl={3} $xxl={3}>
          <FooterTitle>{getLocalizedText(usefulLinks?.title)}</FooterTitle>
          <FooterList>
            {usefulLinks?.links?.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{getLocalizedText(link.text)}</a>
              </li>
            ))}
          </FooterList>
        </Col>

        <Col $xs={12} $sm={5} $md={3} $lg={1} $xl={1} $xxl={1}>
          <FooterTitle>{getLocalizedText(socialMedia?.title)}</FooterTitle>
          <SocialIcons>
            {socialMedia?.platforms?.map((platform, index) => (
              <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer">
                {platform.platform === 'facebook' && <FaFacebookF />}
                {platform.platform === 'twitter' && <FaTwitter />}
                {platform.platform === 'instagram' && <FaInstagram />}
              </a>
            ))}
          </SocialIcons>
        </Col>
      </Row>

      <Copy>
        {getLocalizedText(copyright?.fullText) || 
          `Copyright © ${copyright?.year || new Date().getFullYear()} ${copyright?.companyName || "HotelShop"} | Powered by ${copyright?.poweredBy || "Rockvell"}`}
      </Copy>
    </FooterWrapper>
  );
};

export default Footer;

// === Styled Components ===

const FooterWrapper = styled.footer`
  background: ${theme.colors.footerBg};
  padding: 60px ${theme.spacing.md} 30px;
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
    margin-left: 25px;
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
