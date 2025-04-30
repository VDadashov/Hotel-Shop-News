import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import theme from '../../../styles/common/theme'; // theme importu

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Səhifə Tapılmadı</title>
        <meta name="description" content="Axtardığınız səhifə tapılmadı" />
      </Helmet>

      <Wrapper>
        <Content>
          <Code>404</Code>
          <Message>Bağışlayın, bu səhifə tapılmadı.</Message>
          <SubMessage>
            Axtardığınız səhifə silinmiş və ya mövcud deyil.
          </SubMessage>
          <HomeButton to="/">Ana səhifəyə qayıt</HomeButton>
        </Content>
      </Wrapper>
    </>
  );
};

export default ErrorPage;

// Styled Components

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  text-align: center;
`;

const Content = styled.div`
  max-width: 600px;
`;

const Code = styled.h1`
  font-size: 120px;
  font-weight: 700;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.sale};
`;

const Message = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.darkText};
`;

const SubMessage = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.sale};
  color: ${theme.colors.white};
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.saleHover};
  }
`;
