import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Col } from "../../../../styles/common/GridSystem";
import ContactInfo from "../ContactInfo";
import ContactForm from "../ContactForm";
import theme from "../../../../styles/common/theme";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import { LanguageContext } from "../../../../context/LanguageContext";

const ContactFormSection = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const result = await apiEndpoints.getSections("contact", lang);
        setContactData(result.data?.[0] || result?.[0]);
      } catch (error) {
        console.error("Contact data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactData();
  }, [lang]);

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || '';
    }
    return '';
  };

  if (loading) {
    return (
      <Wrapper>
        <Container>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Loading...
          </div>
        </Container>
      </Wrapper>
    );
  }

  const { additionalData } = contactData || {};
  const mapUrl = additionalData?.mapIframeUrl;

  return (
    <Wrapper>
      <Container>
        <Row $r_gap="20px" $c_gap="15px" $justify="space-between" $align="flex-start">
          <Col $xs={12} $sm={12} $md={3} $lg={3} $xl={3} $xxl={3}>
            <ContactInfo contactData={additionalData} lang={lang} />
          </Col>
          <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
            <ContactForm contactData={additionalData} lang={lang} />
          </Col>
          <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
            <MapContainer dangerouslySetInnerHTML={{ __html: additionalData?.mapIframeUrl }} />
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