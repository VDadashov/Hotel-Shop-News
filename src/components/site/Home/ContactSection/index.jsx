import React from "react";
import styled from "styled-components";
import { Row, Col } from "../../../../styles/common/GridSystem";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";
import theme from "../../../../styles/common/theme";

const ContactSection = () => {
  return (
    <Section>
      <HeaderWrapper>
        <MainTitle>Bizimlə əlaqə</MainTitle>
        <Description>
          Əgər hər hansı bir sualınız varsa bir başa saytdan bizə ünvanlaya bilərsiniz.
        </Description>
      </HeaderWrapper>

      <Row r_gap="30px" justify="space-between">
        <Col xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <WrapperBox>
            <ContactInfo>
              <h4>Əlaqə məlumatları</h4>
              <InfoRow>
                <FaMapMarkerAlt /> <span>Bakı şəhəri, Yasamal r.</span>
              </InfoRow>
              <InfoRow>
                <FaPhoneAlt />
                <a href="tel:+994551234567">+994 55 123 45 67</a>
              </InfoRow>
              <InfoRow>
                <FaEnvelope />
                <a href="mailto:info@hotelshop.az">info@hotelshop.az</a>
              </InfoRow>
              <InfoRow>
                <FaClock /> <span>09:00 - 18:00 (B.e - C.a)</span>
              </InfoRow>
            </ContactInfo>
          </WrapperBox>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <WrapperBox>
            <Form>
              <input type="text" placeholder="Adınız (vacib)" required />
              <input type="email" placeholder="E-mail ünvanınız (vacib)" required />
              <input type="tel" placeholder="Telefon nömrəniz" />
              <textarea placeholder="Mətn" rows={4}></textarea>
              <button type="submit">Göndər</button>
            </Form>
          </WrapperBox>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <WrapperBox>
            <MapWrapper>
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.9945528856555!2d49.82821567636126!3d40.377194158390344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d69dfc5844d%3A0x93069d13e2f4ae43!2sHotelstore!5e0!3m2!1sen!2saz!4v1713355404019!5m2!1sen!2saz"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

            </MapWrapper>
          </WrapperBox>
        </Col>
      </Row>
    </Section>
  );
};

export default ContactSection;

const Section = styled.section`
  padding: 80px ${theme.spacing.sm};
  background: ${theme.colors.white};
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 50px;
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

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 16px ${theme.colors.cardShadow};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  input,
  textarea {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: 6px;
    font-size: ${theme.fontSizes.sm};
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

    &:hover {
      background: ${theme.colors.saleHover};
    }
  }
`;

const ContactInfo = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.md} ${theme.spacing.sm};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

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
