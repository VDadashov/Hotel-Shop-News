import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import ProductCard from "../../../common/CardConponent/index";

const BestSellingSection = ({ products }) => {
  if (!Array.isArray(products)) return null;

  return (
    <Section>

        <TitleArea>
          <SubTitle>SHOP</SubTitle>
          <MainTitle>Best Selling</MainTitle>
        </TitleArea>

        <Row r_gap="40px" justify="center">
          {products.map((product) => (
            <Col xs={6} sm={6} md={3} lg={3} xl={3} xxl={3} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

    </Section>
  );
};

export default BestSellingSection;

// Styled Components
const Section = styled.section`
  padding: 60px 0;
  background: #fff;
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  letter-spacing: 1px;
  color: #7b7b7b;
  text-transform: uppercase;
`;

const MainTitle = styled.h2`
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  font-weight: 600;
  color: #000;
  margin-top: 10px;
`;
