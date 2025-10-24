import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Button from "../../../../styles/common/Buttons";
import { LanguageContext } from "../../../../context/LanguageContext";
import MediaApi from "../../../../utils/api/MediaApi";
import theme from "../../../../styles/common/theme";

const PromoCountdownCard = ({
  backgroundImg,
  startDate,
  endDate,
  subtitle,
  title,
  description,
  product,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [validImg, setValidImg] = useState(backgroundImg);
  const [isExpired, setIsExpired] = useState(false);
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || 'N/A';
    }
    return 'N/A';
  };

  useEffect(() => {
    const checkImage = async () => {
      if (!backgroundImg) {
        setValidImg(product?.mainImg || "");
        return;
      }

      // Skip image validation to avoid CORS issues
      // Just use the backgroundImg directly
      setValidImg(backgroundImg);
    };

    checkImage();
  }, [backgroundImg, product]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setIsExpired(true);
      return;
    }

    const end = new Date(endDate);

    if (isNaN(end.getTime())) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setIsExpired(true);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return (
    <Wrapper>
      <CardWrapper $backgroundImg={validImg}>
        <Overlay />
        <Content>
          <SubTitle>{getLocalizedText(subtitle)}</SubTitle>
          <Title>{getLocalizedText(title)}</Title>
          <Description>{getLocalizedText(description)}</Description>

          <Timer>
            {timeLeft.days > 0 && <span>{timeLeft.days}g:</span>}
            {String(timeLeft.hours).padStart(2, "0")}:
            {String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </Timer>

          <ModernButton
            onClick={() => {
              window.location.href = `/products/${product?.id}`;
            }}
            disabled={isExpired}
            $isExpired={isExpired}
          >
            {isExpired ? t('promo.campaignEnded') : t('promo.buyNow')}
          </ModernButton>
        </Content>
      </CardWrapper>
    </Wrapper>
  );
};

export default PromoCountdownCard;

// === STYLED COMPONENTS ===

const Wrapper = styled.div`
  padding: ${theme.spacing.md};
  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
  }
`;

const CardWrapper = styled.div`
  position: relative;
  background-image: url(${({ $backgroundImg }) => 
    $backgroundImg && $backgroundImg.startsWith('http') 
      ? $backgroundImg 
      : MediaApi + $backgroundImg
  });
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  padding: 4rem ${theme.spacing.lg};
  color: ${theme.colors.white};
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    padding: 2rem ${theme.spacing.md};
    border-radius: 15px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 500px;
  width: 100%;
`;

const SubTitle = styled.p`
  text-transform: uppercase;
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  letter-spacing: 2px;
  color: ${theme.colors.accentLight};
  margin-bottom: ${theme.spacing.sm};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.sm};
    letter-spacing: 1px;
  }
`;

const Title = styled.h2`
  font-size: ${theme.fontSizes.xxxl};
  font-weight: 800;
  margin-bottom: ${theme.spacing.sm};
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xxl};
  }
`;

const Description = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.mutedLight};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.base};
  }
`;

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  font-size: ${theme.fontSizes.xxl};
  font-weight: 800;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  backdrop-filter: blur(10px);
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: 15px;
  margin-bottom: ${theme.spacing.lg};
  letter-spacing: 2px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const ModernButton = styled.button`
  background: ${({ $isExpired }) => 
    $isExpired 
      ? 'linear-gradient(135deg, #666 0%, #444 100%)'
      : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'
  };
  border: none;
  border-radius: 15px;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  color: ${theme.colors.white};
  font-weight: 700;
  font-size: ${theme.fontSizes.lg};
  cursor: ${({ $isExpired }) => $isExpired ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
    background: linear-gradient(135deg, #ff5252 0%, #d32f2f 100%);
  }

  &:active:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.fontSizes.base};
  }
`;
