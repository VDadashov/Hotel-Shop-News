import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import theme from "../../../../styles/common/theme";

import CardModel from "../../../common/CardConponent/CardModel.jsx";

const TrendingNowSection = ({ products }) => {
  if (!Array.isArray(products.data)) return null;

  return (
    <Section>
      <TitleArea>
        <SubTitle>POPULLAR MƏHSULLAR</SubTitle>
        <MainTitle>İndi Trend</MainTitle>
      </TitleArea>

      <Container>
        <Row $r_gap="30px" $c_gap="120px" $justify="flex-start">
          {products?.data.slice(0, 6).map((product) => (
            <Col $xs={6} $sm={6} $md={4} $lg={3} $xl={2} $xxl={2} key={product.id}>
              <CardModel product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </Section>
  );
};

export default TrendingNowSection;

// === Styled Components ===

const Section = styled.section`
  padding: ${theme.spacing.lg} 0;
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
