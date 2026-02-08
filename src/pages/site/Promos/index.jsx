import React, { useContext, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import PageBanner from "../../../components/common/PageBanner";
import { apiEndpoints } from "../../../utils/api/baseApi";
import { LanguageContext } from "../../../context/LanguageContext";
import MediaApi from "../../../utils/api/MediaApi";
import theme from "../../../styles/common/theme";

const INITIAL_VISIBLE = 9;
const LOAD_MORE_COUNT = 3;

const PromosPage = () => {
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [promoData, setPromoData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

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

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [lang]);

  const visiblePromos = useMemo(
    () => promoData.slice(0, visibleCount),
    [promoData, visibleCount],
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, promoData.length),
    );
  };

  const breadcrumb = `${t("detailsPage.breadcrumb.home")} > ${t("promo.breadcrumb")}`;

  return (
    <>
      <Helmet>
        <title>{t("promo.pageTitle")}</title>
      </Helmet>
      <PageBanner title={t("promo.pageTitle")} breadcrumb={breadcrumb} />
      <Section>
        <Grid>
          {visiblePromos.map((promo, index) => (
            <PromoCard
              key={promo.id || index}
              $bg={getImageUrl(promo.backgroundImage)}
            >
              <Overlay />
              <CardContent>
                {promo.subtitle && (
                  <Subtitle>{getLocalizedText(promo.subtitle, lang)}</Subtitle>
                )}
                {promo.title && (
                  <Title>{getLocalizedText(promo.title, lang)}</Title>
                )}
                {promo.description && (
                  <Description>
                    {getLocalizedText(promo.description, lang)}
                  </Description>
                )}
              </CardContent>
            </PromoCard>
          ))}
        </Grid>

        {visibleCount < promoData.length && (
          <Actions>
            <LoadMoreButton type="button" onClick={handleLoadMore}>
              {t("promo.loadMore")}
            </LoadMoreButton>
          </Actions>
        )}
      </Section>
    </>
  );
};

export default PromosPage;

const getLocalizedText = (text, lang) => {
  if (typeof text === "string") return text;
  if (typeof text === "object" && text !== null) {
    return text[lang] || text.az || text.en || text.ru || "N/A";
  }
  return "N/A";
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return "/images/promo-spa.webp";
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/uploads")) return `${MediaApi}${imagePath}`;
  return `${MediaApi}/${imagePath}`;
};

const Section = styled.section`
  max-width: 1320px;
  margin: 0 auto;
  padding: 50px ${theme.spacing.md};

  @media (max-width: 768px) {
    padding: 30px ${theme.spacing.sm};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${theme.spacing.md};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PromoCard = styled.div`
  position: relative;
  min-height: 240px;
  border-radius: 16px;
  overflow: hidden;
  background-image: url(${({ $bg }) => $bg});
  background-size: cover;
  background-position: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  display: flex;
  align-items: flex-end;
  color: ${theme.colors.white};
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.7));
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Subtitle = styled.span`
  font-size: ${theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${theme.colors.accentLight};
`;

const Title = styled.h3`
  font-size: ${theme.fontSizes.xl};
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  font-size: ${theme.fontSizes.sm};
  opacity: 0.9;
`;

const Actions = styled.div`
  margin-top: ${theme.spacing.lg};
  display: flex;
  justify-content: center;
`;

const LoadMoreButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  background: ${theme.colors.sale};
  color: ${theme.colors.white};
  font-weight: 600;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(220, 38, 127, 0.25);

  &:hover {
    background: ${theme.colors.saleHover};
    transform: translateY(-2px);
  }
`;
