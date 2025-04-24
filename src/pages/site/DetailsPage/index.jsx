import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BaseApi from '../../../utils/api/baseApi';
import { Container, Row, Col } from '../../../styles/common/GridSystem';
import MediaApi from '../../../utils/api/MediaApi';

const DetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BaseApi}/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const result = await response.json();
        setProduct(result);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading || !product) {
    return (
      <Container>
        <Row>
          <Col>
            <Wrapper>
              {loading ? "Yüklənir..." : "Məhsul tapılmadı."}
            </Wrapper>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Wrapper>
    <Container>
      <Row style={{ alignItems: 'flex-start' }}>
        <Col xs={12} sm={4}    md={4} lg={4} xl={4} xxl={4}>
          <Image src={`${MediaApi}${product.mainImg}`} alt={product.name} />
        </Col>
        <Col xs={12} sm={8}    md={8} lg={8} xl={8} xxl={8}>
          <Info>
            <h2>{product.name}</h2>
            <p>{product.description || "Açıqlama mövcud deyil."}</p>
          </Info>
        </Col>
      </Row>
    </Container>
    </Wrapper>
  );
};

export default DetailsPage;

// === STYLED COMPONENTS ===

const Wrapper = styled.div`
  padding: 200px 0;
  font-size: 18px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Info = styled.div`
  h2 {
    text-align: center;
    font-size: 28px;
    margin-bottom: 15px;
    color: #222;
  }

  p {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
  }
`;
