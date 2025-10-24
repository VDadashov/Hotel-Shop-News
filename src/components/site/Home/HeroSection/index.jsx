import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import Button from "../../../../styles/common/Buttons";
import { useNavigate } from "react-router-dom";
import theme from "../../../../styles/common/theme";

const HeroSection = () => {
  const navigator = useNavigate();
  return (
    <HeroWrapper>
      <Overlay>
        <Container>
          <Row $align="center">
            <Col $xs={12} $md={6} $xl={6} $xxl={5}>
              <TextContent>
                <SmallTitle>YENİ SEÇİMLƏR</SmallTitle>
                <MainTitle>Peşəkar Otellər üçün Peşəkar Həllər</MainTitle>
                <Description>
                  Müasir keyfiyyət, zərif görünüş və etibarlı standartlarla
                  <br />
                  otelinizə və ya müəssisənizə peşəkar toxunuş gətirin.
                </Description>
                <Row>
                  <Col $xs={12} $md={6} $xl={6} $xxl={6}>
                    <Button onClick={() => navigator("/contact")} $variant="light">
                      İNDİ AL
                    </Button>
                  </Col>
                </Row>
              </TextContent>
            </Col>
          </Row>
        </Container>
      </Overlay>
    </HeroWrapper>
  );
};

export default HeroSection;

const HeroWrapper = styled.section`
  background-image: url("images/breadcrumb-bg.webp");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 60vh;
  position: relative;
  color: ${theme.colors.white};

  @media (max-width: 768px) {
    background-attachment: scroll;
    height: auto;
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
    padding: 60px 0;
  }
`;

const TextContent = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SmallTitle = styled.h4`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${theme.colors.sale};
`;

const MainTitle = styled.h1`
  font-family: ${theme.fonts.primary};
  font-size: 46px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
  }
`;

const Description = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.base};
  line-height: 1.7;
  color: ${theme.colors.mutedLight};
  max-width: 500px;
`;
