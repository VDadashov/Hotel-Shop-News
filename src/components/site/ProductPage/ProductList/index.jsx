import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import ProductCard from "../../../common/CardConponent";
import BaseApi from "../../../../utils/api/baseApi";
import MainContext from "../../../../context";
import { Col, Row } from "../../../../styles/common/GridSystem";
import theme from "../../../../styles/common/theme";


const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.lg};
  gap: ${theme.spacing.xs};
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  background-color: ${({ active }) => (active ? theme.colors.saleHover : theme.colors.white)};
  color: ${({ active }) => (active ? theme.colors.white : theme.colors.text)};
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
  margin-bottom: ${theme.spacing.md};
  gap: ${theme.spacing.md};
`;

const Select = styled.select`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 8px;
  border: 1px solid ${theme.colors.border};
  font-size: ${theme.fontSizes.base};
`;

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const ProductList = ({ searchQuery, sort, page, pageSize, onPageChange, onPageSizeChange, loading, setLoading }) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  });

  const { selectedCategoryId } = useContext(MainContext);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${BaseApi}/products?page=${page}&pageSize=${pageSize}`;

        if (debouncedSearchQuery) {
          url += `&searchQuery=${encodeURIComponent(debouncedSearchQuery)}`;
        }

        if (sort) {
          url += `&sort=${sort}`;
        }

        if (selectedCategoryId) {
          url += `&categoryId=${selectedCategoryId}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        if (result.data) {
          setLoading(false);
          setProducts(result.data);
          setPagination(result.pagination);
        } else {
          setProducts([]);
          setPagination({ totalItems: 0, totalPages: 1, currentPage: 1, pageSize });
        }
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchProducts();
  }, [debouncedSearchQuery, sort, page, pageSize, selectedCategoryId]);

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
            <Col xs={6} sm={6} md={6} xl={4} xxl={4} key={product.id}>
              <ProductCard product={product} />
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
                <PageButton active={page === p} onClick={() => onPageChange(p)}>
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
