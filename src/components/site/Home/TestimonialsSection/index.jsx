import React, { useContext } from "react";
import styled from "styled-components";
import { Row, Col } from "../../../../styles/common/GridSystem";
import { LanguageContext } from "../../../../context/LanguageContext";
import { FaStar } from "react-icons/fa";
import theme from "../../../../styles/common/theme";

const TestimonialsSection = ({ testimonials = [] }) => {
  const { lang } = useContext(LanguageContext);

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || 'N/A';
    }
    return 'N/A';
  };

  // Helper function to render rating stars
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" style={{ opacity: 0.5 }} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} style={{ opacity: 0.3 }} />);
    }

    return stars;
  };

  // Handle different data structures - API returns direct array
  const testimonialsData = Array.isArray(testimonials) ? testimonials : (testimonials?.data || []);
  
  return (
    <Wrapper>
      <Container>
        <TitleArea>
          <SubTitle>Müştəri rəyləri</SubTitle>
          <MainTitle>Bizim haqqımızda nə düşünürlər?</MainTitle>
        </TitleArea>

        <Row $r_gap="30px" $justify="center">
          {testimonialsData.slice(0, 6).map((ref, idx) => (
            <Col $xs={12} $sm={6} $md={4} $lg={4} $xl={4} $xxl={4} key={idx}>
              <CardWrapper>
                <RefCard>
                  {ref.imageUrl && <RefImage src={ref.imageUrl} alt={getLocalizedText(ref.name)} />}
                  <RefMessage>&ldquo;{getLocalizedText(ref.message)}&rdquo;</RefMessage>
                  <RatingWrapper>
                    <RatingStars>
                      {renderRating(ref.rating || 5)}
                    </RatingStars>
                  </RatingWrapper>
                  <RefAuthor>{getLocalizedText(ref.name)}</RefAuthor>
                </RefCard>
              </CardWrapper>
            </Col>
          ))}
        </Row>
      </Container>
    </Wrapper>
  );
};

export default TestimonialsSection;

// === Styled Components ===

const Wrapper = styled.section`
  padding: 80px 0;
  background: ${theme.colors.white};
`;

const Container = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (max-width: 768px) {
    padding: 0 ${theme.spacing.sm};
  }
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.p`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  letter-spacing: 1px;
  color: ${theme.colors.mutedText};
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const MainTitle = styled.h2`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xxl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.black};
  margin: 0;
`;

const CardWrapper = styled.div`
  padding: ${theme.spacing.xs};
  height: 100%;
`;

const RefCard = styled.div`
  background: ${theme.colors.white};
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
`;

const RefMessage = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text};
  margin: 20px 0;
  line-height: 1.6;
  font-style: italic;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const RefImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${theme.colors.background};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const RefAuthor = styled.p`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.icon};
  text-align: center;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RatingWrapper = styled.div`
  margin: 15px 0;
`;

const RatingStars = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;

  svg {
    color: #ffc107;
    font-size: 16px;
  }
`;
