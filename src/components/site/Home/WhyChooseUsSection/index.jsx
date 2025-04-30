import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import { FaShippingFast, FaTruck, FaUndo } from "react-icons/fa";
import theme from "../../../../styles/common/theme";

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
  padding: 80px ${theme.spacing.sm};
  background: ${theme.colors.white};
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.p`
  font-size: ${theme.fontSizes.sm};
  letter-spacing: 1px;
  color: ${theme.colors.sale};
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
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  border-radius: 8px;
  background: ${theme.colors.background};
  box-shadow: 0 6px 12px ${theme.colors.cardShadow};
  transition: all 0.3s;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconCircle = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto ${theme.spacing.sm} auto;
  background: ${theme.colors.sale};
  color: ${theme.colors.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.base};
`;

const FeatureTitle = styled.h3`
  font-size: ${theme.fontSizes.md};
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.black};
`;

const FeatureText = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.icon};
  line-height: 1.6;
`;
