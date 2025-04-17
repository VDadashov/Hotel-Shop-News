import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <InfoWrapper>
      <Title>Bizimlə əlaqə</Title>
      <Text>
        Əgər hər hansı bir sualınız varsa birbaşa saytdan bizə ünvanlaya
        bilərsiniz.
      </Text>
      <ContactItem>
        <FaMapMarkerAlt />
        <span>Bakı şəhəri, Nərimanov rayonu, H.Əliyev 56</span>
      </ContactItem>
      <ContactItem>
        <FaEnvelope />
        <span>info@hotelshop.az</span>
      </ContactItem>
      <ContactItem>
        <FaPhoneAlt />
        <span>+994 55 555 55 55</span>
      </ContactItem>
    </InfoWrapper>
  );
};

export default ContactInfo;

const InfoWrapper = styled.div`
  padding: 50px 20px;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 30px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  color: #333;

  svg {
    color: #cba589;
  }
`;
