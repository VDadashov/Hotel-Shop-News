import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import theme from "../../../../styles/common/theme";
import { Container } from "../../../../styles/common/GridSystem";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import { LanguageContext } from "../../../../context/LanguageContext";
import MediaApi from "../../../../utils/api/MediaApi";

const ContactHeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const result = await apiEndpoints.getSections("hero", lang);
        setHeroData(result.data?.[0] || result?.[0]);
      } catch (error) {
        console.error("Hero data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, [lang]);

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || '';
    }
    return '';
  };

  // Helper function to get image URL
  const getImageUrl = (media) => {
    if (!media?.url) return '/images/breadcrumb-bg.webp';
    if (media.url.startsWith('http')) return media.url;
    return `${MediaApi}${media.url}`;
  };

  if (loading) {
    return (
      <Wrapper $backgroundImage="/images/breadcrumb-bg.webp" $overlayOpacity={0.4}>
        <Container>
          <Content>
            <SmallTitle>Loading...</SmallTitle>
          </Content>
        </Container>
      </Wrapper>
    );
  }

  const { additionalData, media } = heroData || {};
  const backgroundImage = additionalData?.backgroundImage || getImageUrl(media) || '/images/breadcrumb-bg.webp';
  const overlayOpacity = additionalData?.overlayOpacity || 0.4;
  const subtitle = getLocalizedText(additionalData?.subtitle) || "Əlaqə saxlayın";
  const title = getLocalizedText(additionalData?.title) || "Bizimlə əlaqə qurmaq çox asandır";
  const description = getLocalizedText(additionalData?.description) || "Əgər hər hansı bir sualınız varsa birbaşa saytdan bizə ünvanlaya bilərsiniz. Komandamız sizə yardım etməyə həmişə hazırdır.";

  return (
    <Wrapper $backgroundImage={backgroundImage} $overlayOpacity={overlayOpacity}>
      <Container>
        <Content>
          <SmallTitle>{subtitle}</SmallTitle>
          <MainTitle>{title}</MainTitle>
          <Description>{description}</Description>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default ContactHeroSection;

const Wrapper = styled.section`
  width: 100%;
  min-height: 450px;
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 60px ${theme.spacing.md};
  color: ${theme.colors.white};
  position: relative;

  @media (max-width: 768px) {
    padding: 40px ${theme.spacing.sm};
    text-align: center;
    justify-content: center;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, ${props => props.$overlayOpacity});
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
`;

const SmallTitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.accentLight};
`;

const MainTitle = styled.h1`
  font-size: 38px;
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: 576px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: ${theme.colors.mutedLight};
`;