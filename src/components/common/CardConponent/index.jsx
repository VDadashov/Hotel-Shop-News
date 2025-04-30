import React from "react";
import styled from "styled-components";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../../providers/CartProvider";
import MediaApi from "../../../utils/api/MediaApi";
import theme from "../../../styles/common/theme"; // theme importu

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <CardWrapper>
      <Card>
        <ImageWrapper>
          <img src={`${MediaApi}${product.mainImg}`} alt={product.name} />
          <Badge>Sale!</Badge>
          <CartIcon onClick={handleAddToCart}>
            <FaShoppingBag />
          </CartIcon>
        </ImageWrapper>

        <ProductName href={`/products/${product.id}`}>{product.name}</ProductName>

        {/* <PriceArea>
          <OldPrice>{product.oldPrice}</OldPrice>
          <NewPrice>{product.newPrice}</NewPrice>
        </PriceArea> */}
      </Card>
    </CardWrapper>
  );
};

export default ProductCard;

// === Styled Components ===

const CartIcon = styled.span`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  width: 36px;
  height: 36px;
  background: ${theme.colors.white};
  border-radius: 50%;
  box-shadow: 0 2px 6px ${theme.colors.cardShadow};
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.icon};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.sale};
    color: ${theme.colors.white};
  }
`;

const CardWrapper = styled.div`
  padding: 30px;

  @media (max-width: 768px) {
    padding: ${theme.spacing.sm};
  }
`;

const Card = styled.div`
  padding: ${theme.spacing.md};
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px ${theme.colors.cardShadow};
  }

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.white};

  img {
    width: 100%;
    object-fit: contain;
    transition: transform 0.3s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 5px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 20px;
  left: 20px;
  background: ${theme.colors.white};
  color: ${theme.colors.sale};
  padding: 4px 10px;
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0 2px 6px ${theme.colors.cardShadow};
`;

const ProductName = styled.a`
  font-weight: 600;
  font-size: ${theme.fontSizes.base};
  margin: 15px 0 8px;
  color: ${theme.colors.darkText};
`;

const PriceArea = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xs};
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: ${theme.colors.mutedText};
  font-size: ${theme.fontSizes.sm};
`;

const NewPrice = styled.span`
  font-weight: 700;
  color: ${theme.colors.sale};
  font-size: ${theme.fontSizes.base};
`;
