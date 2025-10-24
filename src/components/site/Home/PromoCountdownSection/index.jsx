import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import { LanguageContext } from "../../../../context/LanguageContext";
import PromoCountdownCard from "./PromoCountdownCard";
import theme from "../../../../styles/common/theme";

const PromoCountdownSection = () => {
  const [promoData, setPromoData] = useState([]);
  const { lang } = useContext(LanguageContext);

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
      {promoData.slice(0, 2).map((promo, index) => (
        <PromoCountdownCard key={index} {...promo} />
      ))}
    </Section>
  );
};

export default PromoCountdownSection;

const Section = styled.section`
  padding: ${theme.spacing.lg} ${theme.spacing.xs};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
`;
