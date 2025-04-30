import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import theme from "../../../../styles/common/theme";

const TestimonialsSection = ({ testimonials = [] }) => {
  return (
    <Wrapper>
      <TitleArea>
        <SubTitle>Müştəri rəyləri</SubTitle>
        <MainTitle>Bizim haqqımızda nə düşünürlər?</MainTitle>
      </TitleArea>

      <Row r_gap="30px" justify="center">
        {testimonials.slice(0, 3).map((ref, idx) => (
          <Col xs={12} sm={4} md={4} lg={4} xl={4} xxl={4} key={idx}>
            <CardWrapper>
              <RefCard>
                <RefMessage>&ldquo;{ref.message}&rdquo;</RefMessage>
                <RefAuthor>{ref.name}</RefAuthor>
              </RefCard>
            </CardWrapper>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
};

export default TestimonialsSection;

// === Styled Components ===

const Wrapper = styled.section`
  padding: 80px ${theme.spacing.sm};
  background: ${theme.colors.white};
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

const SubTitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  letter-spacing: 1px;
  color: ${theme.colors.mutedText};
  text-transform: uppercase;
`;

const MainTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  color: ${theme.colors.black};
  margin-top: ${theme.spacing.xs};
`;

const CardWrapper = styled.div`
  padding: ${theme.spacing.xs};
  height: 100%;
`;

const RefCard = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.lg};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const RefMessage = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.8;
  font-style: italic;
`;

const RefAuthor = styled.p`
  font-size: ${theme.fontSizes.base};
  text-transform: uppercase;
  color: ${theme.colors.icon};
  text-align: center;
  font-weight: 600;
`;
