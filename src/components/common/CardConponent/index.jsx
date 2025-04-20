import React from "react";
import styled from "styled-components";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../../providers/CartProvider";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <CardWrapper>
      <Card>
        <ImageWrapper>
          <img src={`/${product.image} `}alt={product.name} />
          <Badge>Sale!</Badge>
          <CartIcon onClick={handleAddToCart}>
            <FaShoppingBag />
          </CartIcon>
        </ImageWrapper>

        <ProductName>{product.name}</ProductName>

        <PriceArea>
          <OldPrice>{product.oldPrice}</OldPrice>
          <NewPrice>{product.newPrice}</NewPrice>
        </PriceArea>
      </Card>
    </CardWrapper>
  );
};

export default ProductCard;

// === Styled Components ===

const CartIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #cba589;
    color: #fff;
  }
`;

const CardWrapper = styled.div`
  padding: 30px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  padding: 10px;
  background: #fff;

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
  background: #fff;
  color: #cba589;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const ProductName = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin: 15px 0 8px;
  color: #222;
`;

const PriceArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
`;

const NewPrice = styled.span`
  font-weight: 700;
  color: #cba589;
  font-size: 16px;
`;
