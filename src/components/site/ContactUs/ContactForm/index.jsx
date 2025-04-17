import React from "react";
import styled from "styled-components";

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
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #444;
  }

  input,
  textarea {
    padding: 12px 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 15px;
  }

  button {
    padding: 14px;
    background: #cba589;
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: #b07c57;
    }
  }
`;
