import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import { FaShippingFast, FaTruck, FaUndo } from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast />,
    title: "Sürətli çatdırılma",
    text: "Sifarişləriniz ən qısa zamanda ünvanınıza çatdırılır.",
  },
  {
    icon: <FaTruck />,
    title: "Pulsuz çatdırılma",
    text: "100 AZN və üzəri sifarişlərdə çatdırılma pulsuzdur.",
  },
  {
    icon: <FaUndo />,
    title: "Asan qaytarılma",
    text: "7 gün ərzində problemsiz məhsul qaytarılma imkanı.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <Wrapper>

        <TitleArea>
          <SubTitle>Niyə bizi seçirlər?</SubTitle>
          <MainTitle>HotelShop fərqi</MainTitle>
        </TitleArea>

        <Row justify="center" r_gap="30px">
          {features.map((item, i) => (
            <Col xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} key={i}>
              <CardWrapper>
                <FeatureCard>
                  <IconCircle>{item.icon}</IconCircle>
                  <FeatureTitle>{item.title}</FeatureTitle>
                  <FeatureText>{item.text}</FeatureText>
                </FeatureCard>
              </CardWrapper>
            </Col>
          ))}
        </Row>

    </Wrapper>
  );
};

export default WhyChooseUsSection;
const Wrapper = styled.section`
  padding: 80px 20px;
  background: #fff;
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  letter-spacing: 1px;
  color: #cba589;
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
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 30px 20px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconCircle = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto 15px auto;
  background: #cba589;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #000;
`;

const FeatureText = styled.p`
  font-size: 15px;
  color: #555;
  line-height: 1.6;
`;
