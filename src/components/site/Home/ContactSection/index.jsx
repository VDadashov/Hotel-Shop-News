import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Col } from "../../../../styles/common/GridSystem";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import theme from "../../../../styles/common/theme";
import { toast } from "react-toastify";
import { LanguageContext } from "../../../../context/LanguageContext";

const ContactSection = () => {
  const { i18n } = useTranslation();
  const { lang } = useContext(LanguageContext);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const result = await apiEndpoints.getSections("contact", lang);
        setContactData(result.data?.[0] || result?.[0]);
      } catch (error) {
        console.error("Contact data fetch error:", error);
      } finally {
        setDataLoading(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Bütün xanaları doldurun");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Düzgün email daxil edin");
      return;
    }

    setLoading(true);

    try {
      await apiEndpoints.submitContactForm(formData, i18n.language);
      
      toast.success("Mesajınız uğurla göndərildi!");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Mesaj göndərilərkən xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <Section>
        <Container>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Loading...
          </div>
        </Container>
      </Section>
    );
  }

  const { additionalData } = contactData || {};
  
  // Get dynamic data
  const pageTitle = getLocalizedText(additionalData?.pageTitle) || "Bizimlə əlaqə";
  const pageDescription = getLocalizedText(additionalData?.pageDescription) || "Əgər hər hansı bir sualınız varsa bir başa saytdan bizə ünvanlaya bilərsiniz.";
  const address = getLocalizedText(additionalData?.address) || "Bakı şəhəri, Yasamal r.";
  const phone = additionalData?.phone || "+994 55 123 45 67";
  const email = additionalData?.email || "info@hotelshop.az";
  const workingHours = getLocalizedText(additionalData?.workingHours) || "09:00 - 18:00 (B.e - C.a)";
  const contactInfoTitle = getLocalizedText(additionalData?.contactInfoTitle) || "Əlaqə məlumatları";
  
  // Form labels
  const namePlaceholder = getLocalizedText(additionalData?.formNamePlaceholder) || "Adınız (vacib)";
  const emailPlaceholder = getLocalizedText(additionalData?.formEmailPlaceholder) || "E-mail ünvanınız (vacib)";
  const messagePlaceholder = getLocalizedText(additionalData?.formMessagePlaceholder) || "Mətn";
  const submitButtonText = getLocalizedText(additionalData?.submitButtonText) || "Göndər";
  
  // Map URL
  const mapUrl = additionalData?.mapIframeUrl || "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3037.776955505772!2d49.901317576010925!3d40.41379167144008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sen!2saz!4v1761383084232!5m2!1sen!2saz";

  return (
    <Section>
      <Container>
        <HeaderWrapper>
          <MainTitle>{pageTitle}</MainTitle>
          <Description>{pageDescription}</Description>
        </HeaderWrapper>

        <Row $r_gap="20px" $c_gap="20px" $justify="center">
          <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
            <WrapperBox>
              <ContactInfo>
                <h4>{contactInfoTitle}</h4>
                <InfoRow>
                  <FaMapMarkerAlt /> <span>{address}</span>
                </InfoRow>
                <InfoRow>
                  <FaPhoneAlt />
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
                </InfoRow>
                <InfoRow>
                  <FaEnvelope />
                  <a href={`mailto:${email}`}>{email}</a>
                </InfoRow>
                {workingHours && (
                  <InfoRow>
                    <FaClock /> <span>{workingHours}</span>
                  </InfoRow>
                )}
              </ContactInfo>
            </WrapperBox>
          </Col>

          <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
            <WrapperBox>
              <Form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={namePlaceholder}
                  disabled={loading}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={emailPlaceholder}
                  disabled={loading}
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={messagePlaceholder}
                  rows={4}
                  disabled={loading}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Göndərilir..." : submitButtonText}
                </button>
              </Form>
            </WrapperBox>
          </Col>

          <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
            <WrapperBox >
              <MapContainer dangerouslySetInnerHTML={{ __html: additionalData?.mapIframeUrl }} />
            </WrapperBox>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default ContactSection;

const Section = styled.section`
  padding: 60px 0;
  background: ${theme.colors.white};
`;

const Container = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const MainTitle = styled.h3`
  font-size: ${theme.fontSizes.xxl};
  font-weight: 600;
  color: ${theme.colors.black};

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
  }
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.icon};
  max-width: 700px;
  margin: 10px auto 0 auto;
`;

const WrapperBox = styled.div`
  padding: ${theme.spacing.xs};
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 250px;
  justify-content: space-between;

  input,
  textarea {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: 6px;
    font-size: ${theme.fontSizes.sm};
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.sale};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: #f5f5f5;
    }
  }

  textarea {
    resize: vertical;
  }

  button {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    background: ${theme.colors.sale};
    color: ${theme.colors.white};
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: ${theme.fontSizes.sm};
    cursor: pointer;
    transition: 0.3s ease;

    &:hover:not(:disabled) {
      background: ${theme.colors.saleHover};
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }
`;

const ContactInfo = styled.div`
  background: ${theme.colors.background};
  padding: 20px ${theme.spacing.sm};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h4 {
    font-size: ${theme.fontSizes.md};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.black};
  }
`;

const InfoRow = styled.p`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.icon};
  margin-bottom: ${theme.spacing.xs};

  svg {
    color: ${theme.colors.sale};
    flex-shrink: 0;
  }

  a {
    color: ${theme.colors.icon};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: ${theme.colors.accent};
    }
  }
`;