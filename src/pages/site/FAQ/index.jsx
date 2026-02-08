import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import PageBanner from "../../../components/common/PageBanner";
import { apiEndpoints } from "../../../utils/api/baseApi";
import { LanguageContext } from "../../../context/LanguageContext";
import theme from "../../../styles/common/theme";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await apiEndpoints.getFaqs(lang);
        setFaqs(data || []);
      } catch (err) {
        console.error("FAQ sorğusu uğursuz oldu:", err);
      }
    };

    fetchFaqs();
  }, [lang]);

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === "string") return text;
    if (typeof text === "object" && text !== null) {
      return text[lang] || text.az || text.en || text.ru || "N/A";
    }
    return "N/A";
  };

  const toggleIndex = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Helmet>
        <title>{t("pageTitles.faq")}</title>
      </Helmet>
      <PageBanner title={t("pageTitles.faq")} breadcrumb="Ana səhifə / FAQ" />
      <FaqWrapper>
        {faqs.map((item, index) => (
          <FaqItem key={index}>
            <Question onClick={() => toggleIndex(index)}>
              {getLocalizedText(item.question)}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </Question>
            <Answer expanded={activeIndex === index}>
              <p>{getLocalizedText(item.answer)}</p>
            </Answer>
          </FaqItem>
        ))}
      </FaqWrapper>
    </>
  );
};

export default Faq;

// ===== Styled Components =====

const FaqWrapper = styled.div`
  max-width: 800px;
  margin: ${theme.spacing.lg} auto;
  padding: 0 ${theme.spacing.md};
  font-family: Arial, sans-serif;
`;

const FaqItem = styled.div`
  border-bottom: 1px solid ${theme.colors.inputBorder};
  margin-bottom: ${theme.spacing.md};
  overflow: hidden;
`;

const Question = styled.div`
  cursor: pointer;
  font-weight: 600;
  font-size: ${theme.fontSizes.md};
  padding: ${theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.background};
  border-radius: 6px;
  transition: background 0.3s ease;

  &:hover {
    background: ${theme.colors.inputHover};
  }

  span {
    font-size: ${theme.fontSizes.lg};
    font-weight: 400;
    color: ${theme.colors.mutedText};
  }
`;

const Answer = styled.div`
  transform-origin: top;
  transform: ${({ expanded }) => (expanded ? "scaleY(1)" : "scaleY(0)")};
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
  transition:
    transform 0.35s ease,
    opacity 0.35s ease;
  overflow: hidden;
  padding: ${({ expanded }) =>
    expanded
      ? `${theme.spacing.sm} ${theme.spacing.md}`
      : `0 ${theme.spacing.md}`};
  pointer-events: ${({ expanded }) => (expanded ? "auto" : "none")};

  p {
    margin: 0;
    font-size: ${theme.fontSizes.base};
    color: ${theme.colors.text};
    line-height: 1.7;
    font-family: Arial, sans-serif;
  }
`;
