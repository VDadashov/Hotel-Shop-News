import React from "react";
import styled from "styled-components";
import theme from "../../../styles/common/theme";

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
  padding: ${theme.spacing.md} ${theme.spacing.lg};
`;

const Content = styled.div`
  color: ${theme.colors.white};
`;

const Breadcrumb = styled.p`
  font-size: ${theme.fontSizes.md};
  color: #ddd;
  padding: 0 ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xs};

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.sm};
  }
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes.xxl};
  font-weight: 700;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
  }
`;
