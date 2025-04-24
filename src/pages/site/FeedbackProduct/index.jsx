import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BaseApi from "../../../utils/api/baseApi";
import ProductCard from "../../../components/common/CardConponent";
import {Row} from "../../../styles/common/GridSystem";
const FeedbackProduct = () => {
  const { ids } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ids) return;

    const fetchAllAndFilter = async () => {
      try {
        const res = await fetch(`${BaseApi}/products`);
        if (!res.ok) throw new Error("Server error");

        const data = await res.json();
        const allProducts = Array.isArray(data) ? data : [];

        const idArray = ids.split(",").map((id) => id.trim());
        const selected = allProducts.filter((p) =>
          idArray.includes(p.id.toString())
        );

        setProducts(selected);
      } catch (err) {
        console.error("Məhsullar yüklənə bilmədi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAndFilter();
  }, [ids]);

  return (
    <>
      <Title>Əlaqə istənilən məhsullar</Title>
      {loading ? (
        <p>Yüklənir...</p>
      ) : products.length === 0 ? (
        <p>Məhsul tapılmadı.</p>
      ) : (
        <Row>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Row>
      )}
    </>
  );
};

export default FeedbackProduct;

// === STYLED COMPONENTS ===



const Title = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
