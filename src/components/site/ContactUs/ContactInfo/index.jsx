import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import theme from "../../../../styles/common/theme";

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
  padding: 50px ${theme.spacing.sm};
  text-align: left;
`;

const Title = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
`;

const Text = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.icon};
  margin-bottom: ${theme.spacing.md};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};

  svg {
    color: ${theme.colors.sale};
  }
`;
