import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import theme from "../../../../styles/common/theme";
import { toast } from "react-toastify";

const ContactForm = ({ contactData, lang }) => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

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

  // Get dynamic labels and placeholders
  const nameLabel = getLocalizedText(contactData?.formNameLabel) || "Adınız";
  const namePlaceholder = getLocalizedText(contactData?.formNamePlaceholder) || "Adınızı daxil edin";
  const emailLabel = getLocalizedText(contactData?.formEmailLabel) || "E-mail";
  const emailPlaceholder = getLocalizedText(contactData?.formEmailPlaceholder) || "Email ünvanınız";
  const messageLabel = getLocalizedText(contactData?.formMessageLabel) || "Mətn";
  const messagePlaceholder = getLocalizedText(contactData?.formMessagePlaceholder) || "Mesajınızı yazın...";
  const submitButtonText = getLocalizedText(contactData?.submitButtonText) || "Göndər";

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <label>{nameLabel} *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={namePlaceholder}
          disabled={loading}
          required
        />

        <label>{emailLabel} *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={emailPlaceholder}
          disabled={loading}
          required
        />

        <label>{messageLabel} *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder={messagePlaceholder}
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Göndərilir..." : submitButtonText}
        </button>
      </Form>
    </FormWrapper>
  );
};

export default ContactForm;

const FormWrapper = styled.div`
  background: ${theme.colors.background};
  padding: 20px;
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
    min-height: 100px;
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

    &:hover:not(:disabled) {
      background: #b07c57;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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