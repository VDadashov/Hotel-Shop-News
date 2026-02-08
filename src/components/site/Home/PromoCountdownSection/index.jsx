import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import { LanguageContext } from "../../../../context/LanguageContext";
import PromoCountdownCard from "./PromoCountdownCard";
import theme from "../../../../styles/common/theme";

const PromoCountdownSection = () => {
  const [promoData, setPromoData] = useState([]);
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await apiEndpoints.getPromos(lang);
        setPromoData(json.promos || json || []);
      } catch (error) {
        console.error("❌ Promo məlumatı alınarkən xəta:", error);
      }
    };

    fetchData();
  }, [lang]);

  return (
    <Section>
      <CardsGrid>
        {promoData.slice(0, 2).map((promo, index) => (
          <PromoCountdownCard key={index} {...promo} />
        ))}
      </CardsGrid>
      <Actions>
        <ViewAllButton to="/promos">{t("promo.viewAll")}</ViewAllButton>
      </Actions>
    </Section>
  );
};

export default PromoCountdownSection;

const Section = styled.section`
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  max-width: 1320px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.md} ${theme.spacing.sm};
    gap: ${theme.spacing.md};
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 600px) {
    gap: ${theme.spacing.sm};
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 600px) {
    justify-content: stretch;
  }
`;

const ViewAllButton = styled(Link)`
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  background: ${theme.colors.sale};
  color: ${theme.colors.white};
  font-weight: 600;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(220, 38, 127, 0.25);
  text-align: center;

  &:hover {
    background: ${theme.colors.saleHover};
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;
