import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../../../components/site/Home/HeroSection";
import BrandSlider from "../../../components/site/Home/BrandSlider";
import TrendingProducts from "../../../components/site/Home/TrendingProducts";
import BestSellingSection from "../../../components/site/Home/BestSellingSection";
import PromoCountdownSection from "../../../components/site/Home/PromoCountdownSection";
import TestimonialsSection from "../../../components/site/Home/TestimonialsSection";
import { apiEndpoints } from "../../../utils/api/baseApi";
import WhyChooseUsSection from "../../../components/site/Home/WhyChooseUsSection";
import ContactSection from "../../../components/site/Home/ContactSection";
import LoadingLogo from "../../../components/common/Loading/Loading";
import { LanguageContext } from "../../../context/LanguageContext";

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending products
        try {
          const trendingResult = await apiEndpoints.getTrendingProducts(lang);
          setTrending(trendingResult);
        } catch (trendingError) {
          console.warn("Trending endpoint not available:", trendingError.message);
          setTrending([]); // Set empty array as fallback
        }

        // Fetch testimonials
        const testimonialsResult = await apiEndpoints.getTestimonials(lang);
        
        // Handle API response structure - extract data from response
        const testimonialsData = testimonialsResult?.data || testimonialsResult || [];
        setTestimonials(testimonialsData);

        // Fetch best sellers settings and products
        try {
          const settingsResult = await apiEndpoints.getSettings("BestSellerProductIds", lang);
          
          if (settingsResult && settingsResult.value) {
            const ids = settingsResult.value;
            const bestSellersResult = await apiEndpoints.getBestSellers(ids, lang);
            setBestSellers(bestSellersResult);
          }
        } catch (settingsError) {
          console.warn("Settings endpoint not available:", settingsError.message);
          setBestSellers([]); // Set empty array as fallback
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <HeroSection />
      <BrandSlider />
      <TrendingProducts products={trending} />
      <BestSellingSection products={bestSellers} />
      <PromoCountdownSection />
      <TestimonialsSection testimonials={testimonials} />
      <WhyChooseUsSection />
      <ContactSection />
    </>
  );
};

export default Home;
