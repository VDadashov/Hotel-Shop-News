import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BaseApi from "../../../utils/api/baseApi";

const FeedbackProduct = () => {
  const { ids } = useParams(); // məsələn: "1,4,7"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllAndFilter = async () => {
      try {
        const res = await fetch(`${BaseApi}/products`);
        const data = await res.json();
        const allProducts = Array.isArray(data) ? data : [];

        const idArray = ids.split(",").map((id) => parseInt(id));
        const selected = [];

        for (let i = 0; i < allProducts.length; i++) {
          if (idArray.includes(allProducts[i].id)) {
            selected.push(allProducts[i]);
          }
        }

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
    <Wrapper>
      <h2>Əlaqə istənilən məhsullar</h2>
      {loading ? (
        <p>Yüklənir...</p>
      ) : products.length === 0 ? (
        <p>Məhsul tapılmadı.</p>
      ) : (
        <ProductList>
          {products.map((item) => (
            <ProductCard key={item.id}>
              <Image src={`/${item.image}`} alt={item.name} />
              <Info>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </Info>
            </ProductCard>
          ))}
        </ProductList>
      )}
    </Wrapper>
  );
};

export default FeedbackProduct;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  h2 {
    font-size: 26px;
    margin-bottom: 20px;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 15px;

  h4 {
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;
