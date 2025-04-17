import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../../../components/site/Home/HeroSection";
import BrandSlider from "../../../components/site/Home/BrandSlider";
import TrendingProducts from "../../../components/site/Home/TrendingProducts";
import BestSellingSection from "../../../components/site/Home/BestSellingSection";
import PromoCountdownSection from "../../../components/site/Home/PromoCountdownSection";
import TestimonialsSection from "../../../components/site/Home/TestimonialsSection";
import BaseApi from "../../../utils/api/baseApi";
import WhyChooseUsSection from "../../../components/site/Home/WhyChooseUsSection";
import ContactSection  from "../../../components/site/Home/ContactSection";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BaseApi}/products`);
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${BaseApi}/testimonials`);
        const result = await response.json();
        setTestimonials(result);
      } catch (error) {
        console.error("Testimonials fetch error:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <HeroSection />
      <BrandSlider />
      <TrendingProducts products={products} />
      <BestSellingSection products={products} />
      <PromoCountdownSection />
      <TestimonialsSection testimonials={testimonials} />
      <WhyChooseUsSection/>
      <ContactSection />
    </>
  );
};

export default Home;
