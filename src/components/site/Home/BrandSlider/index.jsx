import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import BaseApi from "../../../../utils/api/baseApi";

const BrandSlider = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${BaseApi}/brands`);
        const data = await response.json();
        const mapped = data.map((b) => b.title);
        setBrands(mapped);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // 3 dəfə təkrarlayırıq ki, animation heç bitməsin
  const repeatedBrands = [...brands, ...brands, ...brands];

  return (
    <SliderWrapper>
      <Track>
        {repeatedBrands.map((brand, index) => (
          <BrandItem key={index}>{brand}</BrandItem>
        ))}
      </Track>
    </SliderWrapper>
  );
};

export default BrandSlider;
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.33%);
  }
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  background: #f9f9f9;
  padding: 40px 0;
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 15s linear infinite;


`;

const BrandItem = styled.div`
  flex: 0 0 auto;
  padding: 0 40px;
  font-size: 20px;
  font-weight: 600;
  color: #222;
  text-transform: uppercase;
  font-family: "Segoe UI", sans-serif;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;
