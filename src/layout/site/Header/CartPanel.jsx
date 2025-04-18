import React from "react";
import styled from "styled-components";
import { useCart } from "../../../providers/CartProvider";
import { FaTimes } from "react-icons/fa";

const CartPanel = ({ isOpen, onClose }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalCount,
    getTotalPrice,
  } = useCart();

  return (
    <Overlay isOpen={isOpen}>
      <Header>
        <CloseIcon onClick={onClose}>
          <FaTimes />
        </CloseIcon>
        <Title>Shopping Cart</Title>
      </Header>

      <Content>
        {cartItems.length === 0 ? (
          <EmptyMessage>Səbətiniz boşdur.</EmptyMessage>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.id}>
              <Img src={item.image} alt={item.name} />
              <Details>
                <p>{item.name}</p>
                <span>{item.quantity} × ${item.price.toFixed(2)}</span>
              </Details>
              <QuantityControls>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  −
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </QuantityControls>
              <RemoveBtn onClick={() => removeFromCart(item.id)}>
                <FaTimes />
              </RemoveBtn>
            </CartItem>
          ))
        )}
      </Content>

      {cartItems.length > 0 && (
        <Footer>
          <Subtotal>
            <span>Subtotal:</span>
            <strong>${getTotalPrice().toFixed(2)}</strong>
            <span>{getTotalCount()} item</span>
          </Subtotal>
          <ClearCartBtn onClick={clearCart}>SƏBƏTİ SIFIRLA</ClearCartBtn>
        </Footer>
      )}
    </Overlay>
  );
};

export default CartPanel;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 360px;
  height: 100vh;
  background: #fff;
  z-index: 1000;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  position: relative;
`;

const Title = styled.h4`
  font-size: 18px;
  font-weight: 600;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
`;

const Details = styled.div`
  flex: 1;

  p {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  span {
    font-size: 13px;
    color: #666;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  button {
    background: #f0f0f0;
    border: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    font-weight: bold;
    border-radius: 4px;
    transition: 0.2s;

    &:hover {
      background: #ddd;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const RemoveBtn = styled.div`
  font-size: 14px;
  color: #999;
  cursor: pointer;
`;

const Footer = styled.div`
  padding: 20px;
  border-top: 1px solid #eee;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  span {
    font-size: 14px;
    color: #555;
  }

  strong {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }
`;

const ClearCartBtn = styled.button`
  width: 100%;
  padding: 14px;
  background: #000;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #777;
  margin-top: 50px;
`;
