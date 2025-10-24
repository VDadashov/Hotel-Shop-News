import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import ProductCard from "../../../common/CardConponent";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import MainContext from "../../../../context";
import { LanguageContext } from "../../../../context/LanguageContext";
import { Col, Row } from "../../../../styles/common/GridSystem";
import theme from "../../../../styles/common/theme";


const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.lg};
  gap: ${theme.spacing.xs};
  flex-wrap: wrap;
`;

const PageButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  background-color: ${({ $active }) => ($active ? theme.colors.saleHover : theme.colors.white)};
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.text)};
  border-radius: 8px;
  cursor: pointer;
  min-width: 40px;
  transition: all 0.3s ease;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.sale};
    color: ${theme.colors.white};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.div`
  margin: 0 ${theme.spacing.md};
  font-family: ${theme.fonts.secondary};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.icon};
`;

const TopBarLabel = styled.span`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.semiBold};
  color: ${theme.colors.text};
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 8px;
  border: 1px solid ${theme.colors.border};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: ${theme.fontWeights.regular};
  background-color: ${theme.colors.white};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right ${theme.spacing.sm} center;
  background-size: 16px;
  padding-right: ${theme.spacing.xl};
  min-width: 140px;

  &:hover {
    border-color: ${theme.colors.sale};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.sale};
    box-shadow: 0 0 0 3px rgba(220, 38, 127, 0.1);
  }

  option {
    padding: ${theme.spacing.sm};
    background-color: ${theme.colors.white};
    color: ${theme.colors.text};
  }
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
  const { lang } = useContext(LanguageContext);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          page: page || 1,
          pageSize: pageSize || 10,
          isActive: true, // Default olarak aktif məhsulları göstər
        };

        if (debouncedSearchQuery) {
          params.searchQuery = debouncedSearchQuery;
        }

        if (sort) {
          params.sort = sort;
        }

        if (selectedCategoryId) {
          params.categoryId = selectedCategoryId;
        }

        console.log('API Params:', params);
        const result = await apiEndpoints.getProducts(params, lang);

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
  }, [debouncedSearchQuery, sort, page, pageSize, selectedCategoryId, lang]);

  return (
    <>
      <TopBar>
        <TopBarLabel>Məhsul sayı:</TopBarLabel>
        <SelectWrapper>
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
        </SelectWrapper>
      </TopBar>

      <Row $r_gap="20px" $c_gap="8px" $justify="flex-start">
        {products.length === 0 ? (
          <p>Heç bir məhsul tapılmadı.</p>
        ) : (
          products.map((product) => (
            <Col $xs={12} $sm={6} $md={3} $lg={3} $xl={3} $xxl={3} key={product.id}>
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
                <PageButton $active={page === p} onClick={() => onPageChange(p)}>
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

          <PaginationInfo>
            {pagination.totalItems} məhsuldan {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, pagination.totalItems)} arası göstərilir
          </PaginationInfo>
        </PaginationWrapper>
      )}
    </>
  );
};

export default ProductList;
