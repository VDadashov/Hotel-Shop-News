import React from "react";
import styled from "styled-components";
import { Row, Col } from "../../../../styles/common/GridSystem";
import ContactInfo from "../ContactInfo";
import ContactForm from "../ContactForm";

const ContactFormSection = () => {
  return (
    <Wrapper>
      <Row r_gap="40px" justify="space-between" align="center">
        <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <ContactInfo />
        </Col>
        <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <ContactForm />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ContactFormSection;

const Wrapper = styled.section`
  padding: 80px 20px;
`;
