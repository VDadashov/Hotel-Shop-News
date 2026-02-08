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
  overflow: hidden;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.45) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
`;

const Content = styled.div`
  color: ${theme.colors.white};
  max-width: 1100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Breadcrumb = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  margin: 0;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  letter-spacing: 0.3px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(6px);
  max-width: 100%;
  white-space: normal;
  word-break: break-word;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xs};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes.xxl};
  font-weight: 700;
  line-height: 1.3;
  text-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  margin: 0;

  @media (max-width: 768px) {
    font-size: ${theme.fontSizes.xl};
  }
`;
