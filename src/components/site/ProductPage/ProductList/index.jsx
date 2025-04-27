import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import ProductCard from "../../../common/CardConponent";
import BaseApi from "../../../../utils/api/baseApi";
import MainContext from "../../../../context";
import { Col, Row } from "../../../../styles/common/GridSystem";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  background-color: ${({ active }) => (active ? "#8b5e3c" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  border-radius: 8px;
  cursor: pointer;
  min-width: 40px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const Select = styled.select`
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const ProductList = ({ searchQuery, sort, page, pageSize, onPageChange, onPageSizeChange }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 12,
  });

  const { selectedCategoryId } = useContext(MainContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = searchQuery
          ? `${BaseApi}/search/products?query=${encodeURIComponent(searchQuery)}&page=${page}&pageSize=${pageSize}`
          : `${BaseApi}/products?page=${page}&pageSize=${pageSize}`;

        if (selectedCategoryId) {
          url += `&categoryId=${selectedCategoryId}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (result.data) {
          let sortedProducts = [...result.data];

          if (sort === "a-z") {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          } else if (sort === "z-a") {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
          }

          setProducts(sortedProducts);
          setPagination(result.pagination);
        } else {
          setProducts([]);
          setPagination({
            totalItems: 0,
            totalPages: 1,
            currentPage: 1,
            pageSize: pageSize,
          });
        }
      } catch (error) {
        console.error("🔴 Product fetch error:", error);
      }
    };

    fetchProducts();
  }, [searchQuery, sort, page, pageSize, selectedCategoryId]);

  return (
    <>
      <TopBar>
        <Select
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(parseInt(e.target.value, 10));
            onPageChange(1);
          }}
        >
          <option value={5}>5 məhsul</option>
          <option value={10}>10 məhsul</option>
          <option value={20}>20 məhsul</option>
          <option value={30}>30 məhsul</option>
        </Select>
      </TopBar>

      <Row>
        {products.length === 0 ? (
          <p>Heç bir məhsul tapılmadı.</p>
        ) : (
          products.map((product) => (
            <Col xs={6} sm={6} md={6} xl={4} xxl={4} key={product.id} >
            <ProductCard product={product} key={product.id} />
            </Col>
          ))
        )}
      </Row>

      {pagination.totalPages > 1 && (
        <PaginationWrapper>
          <PageButton
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            {"<"}
          </PageButton>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
            .filter((p) =>
              p === 1 ||
              p === pagination.totalPages ||
              (p >= page - 2 && p <= page + 2)
            )
            .map((p, index, array) => (
              <React.Fragment key={p}>
                {index > 0 && p - array[index - 1] > 1 && <span>...</span>}
                <PageButton
                  active={page === p}
                  onClick={() => onPageChange(p)}
                >
                  {p}
                </PageButton>
              </React.Fragment>
            ))}

          <PageButton
            onClick={() => onPageChange(Math.min(page + 1, pagination.totalPages))}
            disabled={page === pagination.totalPages}
          >
            {">"}
          </PageButton>
        </PaginationWrapper>
      )}
    </>
  );
};

export default ProductList;
