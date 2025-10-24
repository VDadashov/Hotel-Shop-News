import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import MediaApi from "../../../../utils/api/MediaApi";
import { LanguageContext } from "../../../../context/LanguageContext";
import theme from "../../../../styles/common/theme";

const BrandSlider = () => {
  const [brands, setBrands] = useState([]);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await apiEndpoints.getBrands({
          page: 1,
          limit: 10,
          isActive: true
        }, lang);
        setBrands(data.data || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, [lang]);

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || 'N/A';
    }
    return 'N/A';
  };

  const repeatedBrands = [...brands, ...brands, ...brands];

  return (
    <SliderWrapper>
      <Track>
        {repeatedBrands.map((brand, index) => (
          <BrandItem key={index}>
            {brand.imageUrl ? (
              <BrandLogo
                src={brand.imageUrl}
                alt={getLocalizedText(brand.name)}
              />
            ) : (
              <BrandNameOnly>{getLocalizedText(brand.name)}</BrandNameOnly>
            )}
          </BrandItem>
        ))}
      </Track>
    </SliderWrapper>
  );
};

export default BrandSlider;

// === Styled Components ===
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  background: ${theme.colors.background};
  padding: 40px 0;
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 15s linear infinite;
`;

const BrandItem = styled.div`
  flex: 0 0 auto;
  padding: 0 ${theme.spacing.lg};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Figure = styled.figure`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrandLogo = styled.img`
  max-height: 120px;
  max-width: 120px;
  height: auto;
  width: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;

const FigCaption = styled.figcaption`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text};
  font-weight: 500;
  margin-top: 6px;
  text-align: center;
`;

const BrandNameOnly = styled.div`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.darkText};
  font-weight: 600;
  font-family: "Segoe UI", sans-serif;
`;
