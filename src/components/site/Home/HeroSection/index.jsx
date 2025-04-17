import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "../../../../styles/common/GridSystem";
import Button from "../../../../styles/common/Buttons";

const HeroSection = () => {
  return (
    <HeroWrapper>
    <Overlay>
      <Container>
        <Row align="center">
          <Col xs={12} md={6}  xl={6} xxl={5}>
            <TextContent>
              <SmallTitle>NEW IN TOWN</SmallTitle>
              <MainTitle>The New Beauty Collection</MainTitle>
              <Description>
                This new collection brings with it the most exciting<br />
                lorem ipsum dolor sit amet.
              </Description>

             <Row>
                <Col xs={12} md={6} xl={6} xxl={6}>
                <Button variant="light">SHOP NOW</Button>
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

// styled-components
const HeroWrapper = styled.section`
  background-image: url("images/breadcrumb-bg.webp");
  background-size: cover;
  background-position:center center;
  background-repeat: no-repeat;
  background-attachment: fixed; 
  height: 60vh;
  position: relative;
  color: white;

  @media (max-width: 768px) {
    background-attachment: scroll; 
    height: auto;
    padding: 60px 0;
  }
`;


const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.15); 
  display: flex;
  align-items: center;
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
`;

const MainTitle = styled.h1`
  font-size: 48px;
  font-weight: 500;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: #fff;
`;



const ImageWrapper = styled.div`
  text-align: right;

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    text-align: center;
    margin-top: 30px;
  }
`;
