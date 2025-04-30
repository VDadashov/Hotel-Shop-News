import React from "react";
import styled from "styled-components";
import theme from "../../../../styles/common/theme";

const ContactForm = () => {
  return (
    <FormWrapper>
      <Form>
        <label>Adınız *</label>
        <input type="text" placeholder="Adınızı daxil edin" />
        <label>E-mail *</label>
        <input type="email" placeholder="Email ünvanınız" />
        <label>Mətn *</label>
        <textarea rows={5} placeholder="Mesajınızı yazın..." />
        <button type="submit">Göndər</button>
      </Form>
    </FormWrapper>
  );
};

export default ContactForm;

const FormWrapper = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.md};
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  label {
    font-size: ${theme.fontSizes.sm};
    font-weight: 500;
    color: ${theme.colors.icon};
  }

  input,
  textarea {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: 6px;
    font-size: ${theme.fontSizes.base};
  }

  button {
    padding: ${theme.spacing.sm};
    background: ${theme.colors.sale};
    color: ${theme.colors.white};
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: #b07c57; /* istəsən bunu da theme.colors.saleHover kimi əlavə edə bilərik */
    }
  }
`;
