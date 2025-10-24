import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PageBanner from "../../../components/common/PageBanner";
import { apiEndpoints } from "../../../utils/api/baseApi";
import { LanguageContext } from "../../../context/LanguageContext";
import theme from "../../../styles/common/theme";

const TITLES = {
  "gizlilik-siyaseti": "Gizlilik Siyasəti",
  "istifade-sertleri": "İstifadə Şərtləri",
  "qaytarilma-sertleri": "Qaytarılma Şərtləri",
};

const PolicyPage = ({ type }) => {
  const [content, setContent] = useState("");
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiEndpoints.getSettings(type, lang);
        setContent(data?.value || "<p>Məzmun tapılmadı.</p>");
      } catch (err) {
        console.error("Polisiyə sorğusunda xəta:", err);
        setContent("<p>Xəta baş verdi.</p>");
      }
    };

    fetchData();
  }, [type, lang]);

  return (
    <>
      <PageBanner title={TITLES[type]} breadcrumb={`Ana səhifə / ${TITLES[type]}`} />
      <ContentWrapper dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default PolicyPage;

// === Styled Components ===

const ContentWrapper = styled.div`
  max-width: 900px;
  margin: ${theme.spacing.lg} auto;
  padding: 0 ${theme.spacing.md};
  font-family: Arial, sans-serif;

  p {
    font-size: ${theme.fontSizes.base};
    line-height: 1.8;
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.md};
  }

  h1, h2, h3 {
    margin: ${theme.spacing.md} 0 ${theme.spacing.sm};
    color: ${theme.colors.darkText};
  }

  ul {
    padding-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};

    li {
      margin-bottom: ${theme.spacing.xs};
      color: ${theme.colors.text};
      font-size: ${theme.fontSizes.base};
    }
  }
`;
