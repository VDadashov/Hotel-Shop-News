import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { apiEndpoints } from '../../../utils/api/baseApi';
import { LanguageContext } from '../../../context/LanguageContext';
import { Container, Row, Col } from '../../../styles/common/GridSystem';
import MediaApi from '../../../utils/api/MediaApi';
import theme from '../../../styles/common/theme';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import PageBanner from '../../../components/common/PageBanner';
import { useCart } from '../../../providers/CartProvider';

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await apiEndpoints.getProductById(id, lang, true);
        // API response'da məlumat data key'i altındadır
        setProduct(result.data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, lang]);

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || 'N/A';
    }
    return 'N/A';
  };

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/products-1.webp';
    if (imagePath.startsWith('http')) return imagePath;
    // If imagePath starts with /uploads, just prepend MediaApi
    if (imagePath.startsWith('/uploads')) return `${MediaApi}${imagePath}`;
    // Otherwise, assume it's a relative path and prepend MediaApi
    return `${MediaApi}/${imagePath}`;
  };

  // Quantity handlers
  const handleQuantityIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (product) {
      const productWithImage = {
        ...product,
        imageUrl: getImageUrl(product.mainImg)
      };
      addToCart(productWithImage, quantity);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingWrapper>
          <LoadingText>{t('detailsPage.loading')}</LoadingText>
        </LoadingWrapper>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <ErrorWrapper>
          <ErrorText>{t('detailsPage.notFound')}</ErrorText>
          <BackButton onClick={() => navigate('/products')}>
            <FaArrowLeft /> {t('detailsPage.backToProducts')}
          </BackButton>
        </ErrorWrapper>
      </Container>
    );
  }

  const breadcrumb = `${t('detailsPage.breadcrumb.home')} > ${t('detailsPage.breadcrumb.products')} > ${getLocalizedText(product.name)}`;

  return (
    <>
      <PageBanner title={getLocalizedText(product.name)} breadcrumb={breadcrumb} />
      
      <Wrapper>
        <Container>
          <Row $r_gap="40px" $c_gap="20px" $align="flex-start">
            {/* Product Image */}
            <Col $xs={12} $sm={12} $md={4} $lg={4} $xl={4} $xxl={4}>
              <ImageSection>
                <ProductImage 
                  src={getImageUrl(product.mainImg)} 
                  alt={getLocalizedText(product.name)} 
                />
              </ImageSection>
            </Col>

            {/* Product Info */}
            <Col $xs={12} $sm={12} $md={7} $lg={7} $xl={7} $xxl={7}>
              <ProductInfo>
                <ProductTitle>{getLocalizedText(product.name)}</ProductTitle>
                
                <CategorySection>
                  <CategoryLabel>{t('detailsPage.category')}</CategoryLabel>
                  <CategoryValue>{getLocalizedText(product.category?.name) || `${t('detailsPage.category')} ${product.categoryId}`}</CategoryValue>
                </CategorySection>

                <Description>
                  <DescriptionText>
                    {getLocalizedText(product.description) || t('detailsPage.noDescription')}
                  </DescriptionText>
                </Description>

                <QuantitySection>
                  <QuantityLabel>{t('detailsPage.quantity')}</QuantityLabel>
                  <QuantityControls>
                    <QuantityButton onClick={handleQuantityDecrease}>-</QuantityButton>
                    <QuantityInput value={quantity} readOnly />
                    <QuantityButton onClick={handleQuantityIncrease}>+</QuantityButton>
                  </QuantityControls>
                </QuantitySection>

                <ActionButtonsSection>
                  <AddToCartButton onClick={handleAddToCart}>
                    <FaShoppingCart />
                    {t('detailsPage.addToCart')}
                  </AddToCartButton>
                </ActionButtonsSection>
              </ProductInfo>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    </>
  );
};

export default DetailsPage;

// === STYLED COMPONENTS ===

const Wrapper = styled.div`
  padding: 60px 0;
  background: ${theme.colors.white};
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingText = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: ${theme.spacing.md};
`;

const ErrorText = styled.p`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.text};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.sale};
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  font-family: ${theme.fonts.primary};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.saleHover};
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: contain;
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const ProductInfo = styled.div`
  padding: ${theme.spacing.md};
`;

const ProductTitle = styled.h1`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xxl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.darkText};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.3;
`;

const CategorySection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.background};
  border-radius: 8px;
  border-left: 4px solid ${theme.colors.sale};
`;

const CategoryLabel = styled.span`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.text};
`;

const CategoryValue = styled.span`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.sale};
`;

const Description = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const DescriptionText = styled.p`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
  line-height: 1.8;
  text-align: justify;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;

  svg {
    color: #ffc107;
    font-size: 16px;
  }
`;

const RatingText = styled.span`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.icon};
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const CurrentPrice = styled.span`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xxl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.sale};
`;

const OldPrice = styled.span`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.mutedText};
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background: ${theme.colors.sale};
  color: ${theme.colors.white};
  padding: 6px 12px;
  border-radius: 12px;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.bold};
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const QuantityLabel = styled.span`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  color: ${theme.colors.darkText};
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  background: ${theme.colors.background};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text};
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.sale};
    color: ${theme.colors.white};
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: none;
  text-align: center;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.medium};
  background: ${theme.colors.white};
`;

const ActionButtonsSection = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const AddToCartButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: linear-gradient(135deg, ${theme.colors.sale} 0%, #e91e63 100%);
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semiBold};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(220, 38, 127, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 127, 0.4);
  }
`;

const BuyNowButton = styled.button`
  flex: 1;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.darkText};
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semiBold};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.black};
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  margin-top: ${theme.spacing.md};
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
`;

const FeatureIcon = styled.span`
  color: ${theme.colors.success || '#28a745'};
  font-size: ${theme.fontSizes.lg};
`;

const FeatureText = styled.span`
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text};
`;
