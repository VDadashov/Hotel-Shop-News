import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Row, Col } from "../../../../styles/common/GridSystem";
import ContactInfo from "../ContactInfo";
import ContactForm from "../ContactForm";
import theme from "../../../../styles/common/theme";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import { LanguageContext } from "../../../../context/LanguageContext";

const ContactFormSection = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const result = await apiEndpoints.getSections("contact", lang);
        setContactData(result.data?.[0] || result?.[0]);
      } catch (err) {
        console.error("Contact data fetch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContactData();
  }, [lang]);

  const getMapSrc = (value) => {
    if (!value) return null;
    const normalized =
      typeof value === "string"
        ? value
        : value?.[lang] || value?.az || value?.en || value?.ru || "";

    if (!normalized) return null;
    if (normalized.includes("<iframe")) {
      const match = normalized.match(/src=["']([^"']+)["']/i);
      return match?.[1] || null;
    }
    return normalized;
  };

  if (loading) {
    return (
      <Wrapper>
        <Container>
          <Row
            $r_gap="20px"
            $c_gap="15px"
            $justify="space-between"
            $align="flex-start"
          >
            <Col $xs={12} $sm={12} $md={3} $lg={3} $xl={3} $xxl={3}>
              <CardSkeleton>
                <Skeleton
                  height={20}
                  width={140}
                  style={{ marginBottom: 12 }}
                />
                <Skeleton height={14} count={4} style={{ marginBottom: 8 }} />
              </CardSkeleton>
            </Col>
            <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
              <CardSkeleton>
                <Skeleton height={44} style={{ marginBottom: 12 }} />
                <Skeleton height={44} style={{ marginBottom: 12 }} />
                <Skeleton height={90} style={{ marginBottom: 12 }} />
                <Skeleton height={44} width={160} />
              </CardSkeleton>
            </Col>
            <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
              <CardSkeleton>
                <Skeleton height={280} />
              </CardSkeleton>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }

  const additionalData = contactData?.additionalData || {};
  const fallbackMap =
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3037.776955505772!2d49.901317576010925!3d40.41379167144008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2saz!4v1761383084232!5m2!1sen!2saz";
  const mapSrc = getMapSrc(additionalData?.mapIframeUrl) || fallbackMap;

  return (
    <Wrapper>
      <Container>
        {error && (
          <Notice>
            Məlumat yüklənmədi. Zəhmət olmasa sonra yenidən cəhd edin.
          </Notice>
        )}
        <Row
          $r_gap="20px"
          $c_gap="15px"
          $justify="space-between"
          $align="flex-start"
        >
          <Col $xs={12} $sm={12} $md={3} $lg={3} $xl={3} $xxl={3}>
            <ContactInfo contactData={additionalData} lang={lang} />
          </Col>
          <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
            <ContactForm contactData={additionalData} lang={lang} />
          </Col>
          <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
            <MapContainer>
              <iframe
                src={mapSrc}
                title="map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </MapContainer>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default ContactFormSection;

const Wrapper = styled.section`
  padding: 60px 0;
`;

const Container = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const Notice = styled.div`
  width: 100%;
  margin-bottom: ${theme.spacing.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 8px;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.sm};
`;

const MapContainer = styled.div`
  width: 100%;
  height: 280px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const CardSkeleton = styled.div`
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
`;
