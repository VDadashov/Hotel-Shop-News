import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
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

const getIntroPreference = () => {
  const force = sessionStorage.getItem("homeIntroForce") === "true";
  const shown = sessionStorage.getItem("homeIntroShown") === "true";
  return force || !shown;
};

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [trending, setTrending] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [showIntro, setShowIntro] = useState(getIntroPreference);
  const [loading, setLoading] = useState(getIntroPreference);
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();

      try {
        try {
          const trendingResult = await apiEndpoints.getTrendingProducts(lang);
          setTrending(trendingResult);
        } catch (trendingError) {
          console.warn(
            "Trending endpoint not available:",
            trendingError.message,
          );
          setTrending([]);
        }

        const testimonialsResult = await apiEndpoints.getTestimonials(lang);

        const testimonialsData =
          testimonialsResult?.data || testimonialsResult || [];
        setTestimonials(testimonialsData);

        try {
          const settingsResult = await apiEndpoints.getSettings(
            "BestSellerProductIds",
            lang,
          );

          if (settingsResult && settingsResult.value) {
            const ids = settingsResult.value;
            const bestSellersResult = await apiEndpoints.getBestSellers(
              ids,
              lang,
            );
            setBestSellers(bestSellersResult);
          }
        } catch (settingsError) {
          console.warn(
            "Settings endpoint not available:",
            settingsError.message,
          );
          setBestSellers([]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        if (showIntro) {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(6000 - elapsedTime, 0);

          setTimeout(() => {
            setLoading(false);
            setShowIntro(false);
            sessionStorage.setItem("homeIntroShown", "true");
            sessionStorage.removeItem("homeIntroForce");
          }, remainingTime);
        } else {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [lang, showIntro]);

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <>
      <Helmet>
        <title>{t("header.home")}</title>
      </Helmet>

      <HeroSection />
      <BrandSlider />
      {/* <TrendingProducts products={trending} /> */}
      {/* <BestSellingSection products={trending} /> */}
      <PromoCountdownSection />
      <TestimonialsSection testimonials={testimonials} />
      <WhyChooseUsSection />
      <ContactSection />
    </>
  );
};

export default Home;
