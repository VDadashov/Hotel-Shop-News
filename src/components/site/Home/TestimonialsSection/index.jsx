import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";

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
const Wrapper = styled.section`
  padding: 80px 20px;
  background: #fff;
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  letter-spacing: 1px;
  color: #999;
  text-transform: uppercase;
`;

const MainTitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #000;
  margin-top: 10px;
`;

const CardWrapper = styled.div`
  padding: 10px;
  height: 100%;
`;

const RefCard = styled.div`
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const RefMessage = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.8;
  font-style: italic;
`;

const RefAuthor = styled.p`
  font-size: 15px;
  text-transform: uppercase;
  color: #666;
  text-align: center;
  font-weight: 600;
`;
