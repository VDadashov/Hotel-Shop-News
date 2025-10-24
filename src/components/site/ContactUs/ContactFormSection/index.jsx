import React from "react";
import styled from "styled-components";
import { Row, Col } from "../../../../styles/common/GridSystem";
import ContactInfo from "../ContactInfo";
import ContactForm from "../ContactForm";
import theme from "../../../../styles/common/theme";

const ContactFormSection = () => {
  return (
    <Wrapper>
      <Container>
        <Row $r_gap="20px" $c_gap="15px" $justify="space-between" $align="flex-start">
        <Col $xs={12} $sm={12} $md={3} $lg={3} $xl={3} $xxl={3}>
          <ContactInfo />
        </Col>
        <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
          <ContactForm />
        </Col>
        <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
          <MapContainer>
            <iframe
              title="HotelShop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.650568764408!2d49.86709267604011!3d40.40924375526407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d0459618c4f%3A0x93069d13e2f4ae43!2sHotelStore!5e0!3m2!1sen!2saz!4v1713449500000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
