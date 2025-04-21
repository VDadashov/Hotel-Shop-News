import React from "react";
import styled from "styled-components";
import { Row, Col } from "../../../../styles/common/GridSystem";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";

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
              ></iframe>
            </MapWrapper>
          </WrapperBox>
        </Col>
      </Row>
    </Section>
  );
};

export default ContactSection;

// Styled Components

const Section = styled.section`
  padding: 80px 20px;
  background: #fff;
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const MainTitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  color: #000;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  max-width: 700px;
  margin: 10px auto 0 auto;
`;

const WrapperBox = styled.div`
  padding: 10px;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input,
  textarea {
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
  }

  button {
    padding: 12px 18px;
    background: #cba589;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: #b07c57;
    }
  }
`;

const ContactInfo = styled.div`
  background: #f9f9f9;
  padding: 25px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  h4 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #000;
  }
`;

const InfoRow = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #444;
  margin-bottom: 10px;

  svg {
    color: #cba589;
  }
    a {
  color: #444;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #b85c38;
  }
}

`;

