import React, { useEffect , useState } from "react";
import styled from "styled-components";
import ProductCard from "../../../common/CardConponent"; // sənlikdir
import  BaseApi from "../../../../utils/api/baseApi";
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;



const ProductList = () => {
  const [products, setProducts] = useState([]);
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
  })
  return (
    <Grid>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
};

export default ProductList;
