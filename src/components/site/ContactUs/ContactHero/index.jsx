import React from "react";
import styled from "styled-components";

const ContactHeroSection = () => {
  return (
    <Wrapper>
      <Content>
        <SmallTitle>Əlaqə saxlayın</SmallTitle>
        <MainTitle>Bizimlə əlaqə qurmaq çox asandır</MainTitle>
        <Description>
          Əgər hər hansı bir sualınız varsa birbaşa saytdan bizə ünvanlaya bilərsiniz. Komandamız sizə yardım etməyə həmişə hazırdır.
        </Description>
      </Content>
    </Wrapper>
  );
};

export default ContactHeroSection;
const Wrapper = styled.section`
  width: 100%;
  min-height: 450px;
  background-image: url("/images/breadcrumb-bg.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 40px;
  color: #fff;
  position: relative;

  @media (max-width: 768px) {
    padding: 40px 20px;
    text-align: center;
    justify-content: center;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.4); // overlay
    z-index: 1;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
`;

const SmallTitle = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
  color: #ffdfcc;
`;

const MainTitle = styled.h1`
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    font-size: 28px;
  }
`;

const Description = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: #eaeaea;
`;
