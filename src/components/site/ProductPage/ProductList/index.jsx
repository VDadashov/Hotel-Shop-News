import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../../../common/CardConponent";
import BaseApi from "../../../../utils/api/baseApi";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ProductList = ({ searchQuery, sort }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = searchQuery
          ? `${BaseApi}/search/products?query=${encodeURIComponent(searchQuery)}`
          : `${BaseApi}/products`;

        const response = await fetch(url);
        let result = await response.json();

        if (Array.isArray(result)) {
          // Sort localda tətbiq olunsun
          if (sort === "a-z") {
            result.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sort === "z-a") {
            result.sort((a, b) => b.name.localeCompare(a.name));
          }
        }

        setProducts(result);
      } catch (error) {
        console.error("🔴 Product fetch error:", error);
      }
    };

    fetchProducts();
  }, [searchQuery, sort]);

  return (
    <Grid>
      {products.length === 0 ? (
        <p>Heç bir məhsul tapılmadı.</p>
      ) : (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      )}
    </Grid>
  );
};

export default ProductList;
