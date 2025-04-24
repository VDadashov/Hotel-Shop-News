import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BaseApi from "../../../../utils/api/baseApi";
import MediaApi from "../../../../utils/api/MediaApi";
import PromoCountdownCard from "./PromoCountdownCard";

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
  padding: 60px 10px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;
