import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { FaTimes, FaPen } from "react-icons/fa";
import { useCart } from "../../../providers/CartProvider";
import { apiEndpoints } from "../../../utils/api/baseApi";
import MediaApi from "../../../utils/api/MediaApi";
import theme from "../../../styles/common/theme";
import { LanguageContext } from "../../../context/LanguageContext";

const CartPanel = ({ isOpen, onClose }) => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [token, setToken] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editQuantity, setEditQuantity] = useState("");

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const { lang } = useContext(LanguageContext);

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || 'N/A';
    }
    return 'N/A';
  };

  useEffect(() => {
    const fetchWhatsappNumber = async () => {
      try {
        const data = await apiEndpoints.getSettings("WhatsappNumber");
        setWhatsappNumber(data.value);
      } catch (error) {
        console.warn("WhatsApp number endpoint not available:", error.message);
        setWhatsappNumber("+994501234567"); // Fallback number
      }
    };
    fetchWhatsappNumber();
  }, []);

  // Force re-render when language changes
  useEffect(() => {
    // This effect will trigger a re-render when lang changes
  }, [lang]);

  useEffect(() => {
    const createCartAndGetToken = async () => {
      if (cartItems.length === 0) {
        setToken(null);
        return;
      }

      const formattedItems = cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity
      }));

      try {
        const data = await apiEndpoints.createCart(formattedItems);
        setToken(data.token);
      } catch (error) {
        console.error("Cart POST error:", error);
      }
    };

    createCartAndGetToken();
  }, [cartItems]);

  const getWhatsappUrl = () => {
    if (!token) return "#";
    const productLink = `${window.location.origin}/feedbackproduct/${token}`;
    const message = `Salam, səbətimdəki məhsullar haqqında ətraflı məlumat almaq istəyirəm.\n\n${productLink}\n\nZəhmət olmasa mənimlə əlaqə saxlayın.\nTəşəkkür edirəm!`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleQuantitySave = (item) => {
    if (editQuantity && Number(editQuantity) > 0 && Number(editQuantity) !== item.quantity) {
      const newQty = Math.min(Number(editQuantity), 99999);
      updateQuantity(item.id, newQty);
    }
    setEditItemId(null);
    setEditQuantity("");
  };

  return (
    <Overlay isOpen={isOpen}>
      <Header>
        <CloseIcon onClick={onClose}><FaTimes /></CloseIcon>
        <Title>Səbət</Title>
      </Header>

      <Content>
        {cartItems.length === 0 ? (
          <EmptyMessage>Səbətiniz boşdur.</EmptyMessage>
        ) : (
          cartItems.map((item) => (
            <CartItem key={item.id}>
              <Img src={item.imageUrl || `${MediaApi}${item.mainImg}`} alt={getLocalizedText(item.name)} />
              <Details>
                <p>{getLocalizedText(item.name)}</p>
                {editItemId === item.id ? (
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => {
                      const value = Math.min(Number(e.target.value), 99999);
                      setEditQuantity(value);
                    }}
                    onBlur={() => handleQuantitySave(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleQuantitySave(item);
                      if (e.key === "Escape") {
                        setEditItemId(null);
                        setEditQuantity("");
                      }
                    }}
                    autoFocus
                    min={1}
                    max={99999}
                    style={{
                      width: "80px",
                      fontSize: theme.fontSizes.base,
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: `1px solid ${theme.colors.inputBorder}`,
                    }}
                  />
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    {item.quantity} ədəd
                    <FaPen
                      onClick={() => {
                        setEditItemId(item.id);
                        setEditQuantity(item.quantity);
                      }}
                      style={{ fontSize: "12px", color: theme.colors.mutedText, cursor: "pointer" }}
                    />
                  </span>
                )}
              </Details>

              <QuantityControls>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>−</button>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= 99999}>+</button>
              </QuantityControls>

              <RemoveBtn onClick={() => removeFromCart(item.id)}><FaTimes /></RemoveBtn>
            </CartItem>
          ))
        )}
      </Content>

      {cartItems.length > 0 && (
        <Footer>
          <ClearCartBtn onClick={clearCart}>SƏBƏTİ SİL</ClearCartBtn>
          <a href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer">
            <WhatsappBtn>WhatsApp ilə göndər</WhatsappBtn>
          </a>
        </Footer>
      )}
    </Overlay>
  );
};

export default CartPanel;

// === Styled Components ===

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  width: 360px;
  height: 100vh;
  background: ${theme.colors.white};
  z-index: 1000;
  box-shadow: -2px 0 10px ${theme.colors.cardShadow};
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.div`
  padding: ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
  position: relative;
`;

const Title = styled.h4`
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  font-size: ${theme.fontSizes.lg};
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.spacing.md};
`;

const CartItem = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
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
    font-size: ${theme.fontSizes.sm};
    font-weight: 600;
    margin-bottom: 5px;
  }

  span {
    font-size: ${theme.fontSizes.xs};
    color: ${theme.colors.icon};
    cursor: default;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  button {
    background: ${theme.colors.inputBg};
    border: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: ${theme.fontSizes.base};
    font-weight: bold;
    border-radius: 4px;
    transition: 0.2s;

    &:hover {
      background: ${theme.colors.inputHover};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const RemoveBtn = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.mutedText};
  cursor: pointer;
`;

const Footer = styled.div`
  padding: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;

const ClearCartBtn = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.black};
  color: ${theme.colors.white};
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.text};
  }
`;

const WhatsappBtn = styled.button`
  width: 100%;
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: ${theme.colors.whatsapp};
  color: ${theme.colors.white};
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${theme.colors.whatsappHover};
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${theme.colors.footerText};
  margin-top: 50px;
`;
