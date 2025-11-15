import React, { useContext } from "react";
import styled from "styled-components";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../../providers/CartProvider";
import { LanguageContext } from "../../../context/LanguageContext";
import MediaApi from "../../../utils/api/MediaApi";
import theme from "../../../styles/common/theme"; // theme importu

const CardModel = ({ product }) => {
  const { addToCart } = useCart();
  const { lang } = useContext(LanguageContext);

  const handleAddToCart = () => {
    const productWithImage = {
      ...product,
      imageUrl: getImageUrl(product.mainImg)
    };
    addToCart(productWithImage);
  };

  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || 'N/A';
    }
    return 'N/A';
  };
  
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/products-1.webp'; // fallback image
    
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    if (imagePath.startsWith('/uploads')) {
      return `${MediaApi}${imagePath}`;
    }
    
    return `${MediaApi}/${imagePath}`;
  };

  return (
    <CardWrapper>
      <Card home={true}>
        <ImageWrapper>
          <img src={getImageUrl(product.mainImg)} alt={getLocalizedText(product.name)} />
          <Badge>Sale!</Badge>
          <CartIcon onClick={handleAddToCart}>
            <FaShoppingBag />
          </CartIcon>
        </ImageWrapper>

        <ProductName href={`/products/${product.id}`}>
          {getLocalizedText(product.name)}
        </ProductName>
      </Card>
    </CardWrapper>
  );
};

export default CardModel;

// === Styled Components ===

const CartIcon = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: ${theme.colors.white};
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.icon};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background: ${theme.colors.sale};
    color: ${theme.colors.white};
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(220, 38, 127, 0.4);
  }
`;

const CardWrapper = styled.div`
  padding: 4px;
  height: 100%;

  @media (max-width: 768px) {
    padding: ${theme.spacing.xs};
  }
`;

const Card = styled.div`
  width: 200px;
  padding: 0;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  background: ${theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    border-color: ${theme.colors.sale};
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }

  ${Card}:hover & img {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    padding: 10px;
    min-height: 180px;

    img {
      width: 100%;
      height: auto;
      max-height: 140px;
    }
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, ${theme.colors.sale} 0%, #e91e63 100%);
  color: ${theme.colors.white};
  padding: 6px 12px;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  font-weight: 700;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(220, 38, 127, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
`;

const ProductName = styled.a`
  font-family: ${theme.fonts.primary};
  font-weight: 600;
  font-size: ${theme.fontSizes.md};
  margin: 20px 15px 15px;
  color: ${theme.colors.darkText};
  text-decoration: none;
  line-height: 1.4;
  display: block;
  transition: color 0.3s ease;
  flex-shrink: 0;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  &:hover {
    color: ${theme.colors.sale};
  }
`;
