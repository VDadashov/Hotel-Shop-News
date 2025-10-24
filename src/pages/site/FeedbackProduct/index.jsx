import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apiEndpoints } from "../../../utils/api/baseApi";
import { LanguageContext } from "../../../context/LanguageContext";
import ProductCard from "../../../components/common/CardConponent";
import { Row, Col } from "../../../styles/common/GridSystem";
import theme from "../../../styles/common/theme";

const FeedbackProduct = () => {
  const { token } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    if (!token) return;

    const fetchCartProducts = async () => {
      try {
        setLoading(true);

        const data = await apiEndpoints.getCartItems(token, page, limit, lang);
        setProducts(Array.isArray(data.items) ? data.items : []);
        setTotalPages(data.totalPages || 1);

        if (page === 1) {
          await apiEndpoints.confirmCart(token, lang);
        }
      } catch (err) {
        console.error("Məhsullar yüklənə bilmədi və ya Cart təsdiqlənmədi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [token, page, limit, lang]);

  const handlePrev = () => page > 1 && setPage((p) => p - 1);
  const handleNext = () => page < totalPages && setPage((p) => p + 1);
  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <>
      <Title>Əlaqə istənilən məhsullar</Title>

      <OptionsBar>
        <Label>Məhsul sayı:</Label>
        <Select value={limit} onChange={handleLimitChange}>
          <option value={4}>4</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={32}>32</option>
        </Select>
      </OptionsBar>

      {loading ? (
        <Message>Yüklənir...</Message>
      ) : products.length === 0 ? (
        <Message>Məhsul tapılmadı.</Message>
      ) : (
        <>
          <Row>
            {products.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={3} xxl={3}>
                <CardWrapper>
                  <ProductCard product={item.product} />
                  <QuantityBadge quantity={item.quantity} />
                </CardWrapper>
              </Col>
            ))}
          </Row>

          <PaginationWrapper>
            <PageButton onClick={handlePrev} disabled={page === 1}>⬅ Prev</PageButton>
            <PageInfo>{page} / {totalPages}</PageInfo>
            <PageButton onClick={handleNext} disabled={page === totalPages}>Next ➡</PageButton>
          </PaginationWrapper>
        </>
      )}
    </>
  );
};

export default FeedbackProduct;

const QuantityBadge = ({ quantity }) => {
  if (typeof quantity !== "number") return null;
  return <Badge>{quantity} ədəd</Badge>;
};

const Title = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  margin-bottom: ${theme.spacing.md};
  text-align: center;
  color: ${theme.colors.darkText};
`;

const OptionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
`;

const Select = styled.select`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 6px;
  font-size: ${theme.fontSizes.base};
  border: 1px solid ${theme.colors.inputBorder};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.lg};
`;

const Badge = styled.div`
  background-color: ${theme.colors.sale};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 16px;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  margin-top: ${theme.spacing.xs};
`;

const Message = styled.p`
  text-align: center;
  font-size: ${theme.fontSizes.md};
  font-weight: 500;
  margin-top: ${theme.spacing.lg};
  color: ${theme.colors.mutedText};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.sm} 0;
`;

const PageButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background-color: ${theme.colors.sale};
  color: ${theme.colors.white};
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background-color: ${theme.colors.inputBorder};
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  color: ${theme.colors.text};
`;
