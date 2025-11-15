import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import theme from "../../../../styles/common/theme";
import { toast } from "react-toastify";

const ContactForm = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

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

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <label>Adınız *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Adınızı daxil edin"
          disabled={loading}
          required
        />

        <label>E-mail *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email ünvanınız"
          disabled={loading}
          required
        />

        <label>Mətn *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Mesajınızı yazın..."
          disabled={loading}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Göndərilir..." : "Göndər"}
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