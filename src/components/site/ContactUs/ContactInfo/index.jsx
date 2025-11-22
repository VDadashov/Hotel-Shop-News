import React from "react";
import styled from "styled-components";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import theme from "../../../../styles/common/theme";

const ContactInfo = ({ contactData, lang }) => {
  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || '';
    }
    return '';
  };

  const pageTitle = getLocalizedText(contactData?.pageTitle) || "Bizimlə əlaqə";
  const pageDescription = getLocalizedText(contactData?.pageDescription) || "Əgər hər hansı bir sualınız varsa birbaşa saytdan bizə ünvanlaya bilərsiniz.";
  const address = getLocalizedText(contactData?.address) || "Bakı şəhəri, Nərimanov rayonu, H.Əliyev 56";
  const email = contactData?.email || "info@hotelshop.az";
  const phone = contactData?.phone || "+994 55 555 55 55";

  return (
    <InfoWrapper>
      <Title>{pageTitle}</Title>
      <Text>{pageDescription}</Text>
      <ContactItem>
        <FaMapMarkerAlt />
        <span>{address}</span>
      </ContactItem>
      <ContactItem>
        <FaEnvelope />
        <span>{email}</span>
      </ContactItem>
      <ContactItem>
        <FaPhoneAlt />
        <span>{phone}</span>
      </ContactItem>
    </InfoWrapper>
  );
};

export default ContactInfo;

const InfoWrapper = styled.div`
  padding: 30px ${theme.spacing.sm};
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
    flex-shrink: 0;
  }
`;