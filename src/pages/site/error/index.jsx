import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

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
          <SubMessage>Axtardığınız səhifə silinmiş və ya mövcud deyil.</SubMessage>
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
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const Content = styled.div`
  max-width: 600px;
`;

const Code = styled.h1`
  font-size: 120px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #cba589;
`;

const Message = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #222;
`;

const SubMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: #cba589;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: #b07c57;
  }
`;
