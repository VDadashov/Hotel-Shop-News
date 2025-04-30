import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import ProductCard from "../../../common/CardConponent/index";
import theme from "../../../../styles/common/theme";

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
  background: ${theme.colors.white};
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

const SubTitle = styled.p`
  font-size: ${theme.fontSizes.md};
  letter-spacing: 1px;
  color: ${theme.colors.mutedText};
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.sm};
  }
`;

const MainTitle = styled.h2`
  font-size: ${theme.fontSizes.xxl};
  font-weight: 600;
  color: ${theme.colors.black};
  margin-top: ${theme.spacing.xs};

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
  }
`;
