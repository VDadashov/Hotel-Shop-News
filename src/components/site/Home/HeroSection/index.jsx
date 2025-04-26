import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import Button from "../../../../styles/common/Buttons";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigator = useNavigate();
  return (
    <HeroWrapper>
      <Overlay>
        <Container>
          <Row align="center">
            <Col xs={12} md={6} xl={6} xxl={5}>
              <TextContent>
                <SmallTitle>YENİ SEÇİMLƏR</SmallTitle>
                <MainTitle>Peşəkar Otellər üçün Peşəkar Həllər</MainTitle>
                <Description>
                Müasir keyfiyyət, zərif görünüş və etibarlı standartlarla<br />otelinizə və ya müəssisənizə peşəkar toxunuş gətirin.
                </Description>
                <Row>
                  <Col xs={12} md={6} xl={6} xxl={6}>
                    <Button onClick={() => {navigator("/contact")}} variant="light">İNDİ AL</Button>
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
  color: white;

  @media (max-width: 768px) {
    background-attachment: scroll;
    height: auto;

  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); // daha yumşaq overlay
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
  gap: 20px;
`;

const SmallTitle = styled.h4`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #cba589;
`;

const MainTitle = styled.h1`
  font-size: 46px;
  font-weight: 600;
  font-family: arial, serif;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #eee;
  max-width: 500px;
`;
