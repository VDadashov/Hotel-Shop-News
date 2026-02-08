import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import theme from "../../../../styles/common/theme";
import { Container } from "../../../../styles/common/GridSystem";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import { LanguageContext } from "../../../../context/LanguageContext";
import MediaApi from "../../../../utils/api/MediaApi";

const ContactHeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bgLoaded, setBgLoaded] = useState(false);
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
    if (typeof text === "string") return text;
    if (typeof text === "object" && text !== null) {
      return text[lang] || text.az || text.en || text.ru || "";
    }
    return "";
  };

  // Helper function to get image URL
  const getImageUrl = (media) => {
    if (!media?.url) return "/images/breadcrumb-bg.webp";
    if (media.url.startsWith("http")) return media.url;
    return `${MediaApi}${media.url}`;
  };

  const { additionalData, media } = heroData || {};
  const backgroundImage =
    additionalData?.backgroundImage ||
    getImageUrl(media) ||
    "/images/breadcrumb-bg.webp";
  const overlayOpacity = additionalData?.overlayOpacity || 0.4;
  const subtitle =
    getLocalizedText(additionalData?.subtitle) || "Əlaqə saxlayın";
  const title =
    getLocalizedText(additionalData?.title) ||
    "Bizimlə əlaqə qurmaq çox asandır";
  const description =
    getLocalizedText(additionalData?.description) ||
    "Əgər hər hansı bir sualınız varsa birbaşa saytdan bizə ünvanlaya bilərsiniz. Komandamız sizə yardım etməyə həmişə hazırdır.";

  useEffect(() => {
    if (!backgroundImage) return;
    setBgLoaded(false);
    const img = new Image();
    img.onload = () => setBgLoaded(true);
    img.onerror = () => setBgLoaded(false);
    img.src = backgroundImage;
  }, [backgroundImage]);

  if (loading) {
    return (
      <Wrapper
        as={motion.section}
        $backgroundImage={null}
        $overlayOpacity={0.4}
        $bgLoaded={false}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Container>
          <Content as={motion.div} variants={itemVariants}>
            <Skeleton height={16} width={140} style={{ marginBottom: 12 }} />
            <Skeleton height={36} width={380} style={{ marginBottom: 12 }} />
            <Skeleton height={16} width={520} count={2} />
          </Content>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper
      as={motion.section}
      $backgroundImage={backgroundImage}
      $overlayOpacity={overlayOpacity}
      $bgLoaded={bgLoaded}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <Container>
        <Content as={motion.div} variants={itemVariants}>
          <SmallTitle>{subtitle}</SmallTitle>
          <MainTitle>{title}</MainTitle>
          <Description>{description}</Description>
        </Content>
      </Container>
    </Wrapper>
  );
};

export default ContactHeroSection;

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Wrapper = styled.section`
  width: 100%;
  min-height: 450px;
  background-image: ${({ $bgLoaded, $backgroundImage }) =>
    $bgLoaded && $backgroundImage ? `url(${$backgroundImage})` : "none"};
  background-color: ${theme.colors.black};
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
    background-color: rgba(0, 0, 0, ${(props) => props.$overlayOpacity});
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
