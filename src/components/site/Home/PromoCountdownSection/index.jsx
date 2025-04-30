import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseApi from "../../../../utils/api/baseApi";
import PromoCountdownCard from "./PromoCountdownCard";
import theme from "../../../../styles/common/theme";

const PromoCountdownSection = () => {
  const [promoData, setPromoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BaseApi}/promos`);
        const json = await res.json();

        setPromoData(json.promos || json || []);
      } catch (error) {
        console.error("❌ Promo məlumatı alınarkən xəta:", error);
      }
    };

    fetchData();
  }, []);

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
