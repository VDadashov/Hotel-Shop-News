import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet"; // ← dəyişdik
import HeroSection from "../../../components/site/Home/HeroSection";
import BrandSlider from "../../../components/site/Home/BrandSlider";
import TrendingProducts from "../../../components/site/Home/TrendingProducts";
import BestSellingSection from "../../../components/site/Home/BestSellingSection";
import PromoCountdownSection from "../../../components/site/Home/PromoCountdownSection";
import TestimonialsSection from "../../../components/site/Home/TestimonialsSection";
import BaseApi from "../../../utils/api/baseApi";
import WhyChooseUsSection from "../../../components/site/Home/WhyChooseUsSection";
import ContactSection from "../../../components/site/Home/ContactSection";
import LoadingLogo from "../../../components/common/Loading/Loading";

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingResponse = await fetch(`${BaseApi}/trending`);
        const trendingResult = await trendingResponse.json();
        setTrending(trendingResult);

        const testimonialsResponse = await fetch(`${BaseApi}/testimonials`);
        const testimonialsResult = await testimonialsResponse.json();
        setTestimonials(testimonialsResult);

        const settingsResponse = await fetch(`${BaseApi}/settings/BestSellerProductIds`);
        const settingsResult = await settingsResponse.json();

        if (settingsResult && settingsResult.value) {
          const ids = settingsResult.value;
          const bestSellersResponse = await fetch(`${BaseApi}/bestseller/${ids}`);
          const bestSellersResult = await bestSellersResponse.json();
          setBestSellers(bestSellersResult);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
