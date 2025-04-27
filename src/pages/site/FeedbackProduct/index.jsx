import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BaseApi from "../../../utils/api/baseApi";
import ProductCard from "../../../components/common/CardConponent";
import { Row, Col } from "../../../styles/common/GridSystem";

const FeedbackProduct = () => {
  const { token } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8); // ✅ seçilə bilən limit
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!token) return;

    const fetchCartProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${BaseApi}/cart/items?token=${token}&page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Server error");

        const data = await res.json();
        console.log("Gələn data:", data);

        setProducts(Array.isArray(data.items) ? data.items : []);
        setTotalPages(data.totalPages || 1);

        // ✅ Cart-ı təsdiqləmək üçün yalnız 1-ci səhifədə PATCH edək
        if (page === 1) {
          await fetch(`${BaseApi}/cart/items`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              isConfirmed: true,
            }),
          });
        }
      } catch (err) {
        console.error("Məhsullar yüklənə bilmədi və ya Cart təsdiqlənmədi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [token, page, limit]); // ✅ limit dəyişəndə də fetch edilir

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1); // limit dəyişəndə səhifəni sıfırla
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
            <PageButton onClick={handlePrev} disabled={page === 1}>
              ⬅ Prev
            </PageButton>
            <PageInfo>{page} / {totalPages}</PageInfo>
            <PageButton onClick={handleNext} disabled={page === totalPages}>
              Next ➡
            </PageButton>
          </PaginationWrapper>
        </>
      )}
    </>
  );
};

export default FeedbackProduct;

// === INTERNAL COMPONENTS & STYLED COMPONENTS ===

const QuantityBadge = ({ quantity }) => {
  if (typeof quantity !== "number") return null;
  return <Badge>{quantity} ədəd</Badge>;
};

const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const OptionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 16px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const Badge = styled.div`
  background-color: #8b5e3c;
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  text-align: center;
  margin-top: 8px;
`;

const Message = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin-top: 40px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 12px 0;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  background-color: #8b5e3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 16px;
  font-weight: 600;
`;
