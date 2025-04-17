import React from "react";
import styled from "styled-components";

const PageBanner = ({ title, breadcrumb }) => {
  return (
    <Wrapper>
      <Overlay>
        <Content>
          <Breadcrumb>{breadcrumb}</Breadcrumb>
          <Title>{title}</Title>
        </Content>
      </Overlay>
    </Wrapper>
  );
};

export default PageBanner;
const Wrapper = styled.section`
  background-image: url(/images/breadcrumb-bg.webp);
  background-size: cover;
  background-position: center;
  height: 360px;
  position: relative;
  display: flex;
  align-items: center;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 20px     40px;
`;

const Content = styled.div`
    
  color: #fff;
`;

const Breadcrumb = styled.p`
  font-size: 1.2rem;
  color: #ddd;
  padding: 0 30px;
  margin-bottom: 10px;
  @media (max-width: 768px) {   
    font-size: 0.9rem;
  }

`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.3;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;
