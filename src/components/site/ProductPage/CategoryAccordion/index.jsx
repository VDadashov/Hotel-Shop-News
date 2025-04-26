import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainContext from "../../../../context";
import BaseApi from "../../../../utils/api/baseApi";

const Wrapper = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
`;

const AccordionItem = styled.div`
  margin-bottom: 0.8rem;
  border-bottom: 1px solid #ddd;
`;

const AccordionHeader = styled.div`
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #b85c38;
  }
`;

const AccordionContent = styled.div`
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? "1000px" : "0")};
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
  transition: all 0.4s ease;
  padding-left: 1rem;
  padding-top: ${({ expanded }) => (expanded ? "0.5rem" : "0")};
`;

const CategoryAccordion = ({ onCategoryChange }) => {
  const [openIndexes, setOpenIndexes] = useState({});
  const [productsData, setProductsData] = useState([]);
  const { setSelectedCategoryId } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${BaseApi}/menu`);
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        setProductsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Menu fetch error:", error);
      }
    };

    fetchMenuData();
  }, []);

  const toggle = (path) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleCategorySelect = (item) => {
    if (item.url) {
      navigate(`/products${item.url}`);
    }
    if (item.id) {
      setSelectedCategoryId(item.id);
    }
    if (onCategoryChange) onCategoryChange();
  };

  const handleAllProductsClick = () => {
    navigate("/products");
    setSelectedCategoryId(null); // ✅ bütün məhsullar üçün null
    if (onCategoryChange) onCategoryChange();
  };

  const renderChildren = (items, parentPath = "") => {
    return items.map((item, index) => {
      const currentPath = `${parentPath}-${index}`;
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openIndexes[currentPath];

      return (
        <AccordionItem key={item.title + currentPath}>
          <AccordionHeader
            onClick={() =>
              hasChildren ? toggle(currentPath) : handleCategorySelect(item)
            }
          >
            <span>{item.title}</span>
            {hasChildren && <span>{isOpen ? "−" : "+"}</span>}
          </AccordionHeader>
          {hasChildren && (
            <AccordionContent expanded={isOpen}>
              {renderChildren(item.children, currentPath)}
            </AccordionContent>
          )}
        </AccordionItem>
      );
    });
  };

  return (
    <Wrapper>
      <AccordionItem>
        <AccordionHeader onClick={handleAllProductsClick}>
          <span>Bütün Məhsullar</span> {/* ✅ Əlavə olundu */}
        </AccordionHeader>
      </AccordionItem>

      {renderChildren(productsData)}
    </Wrapper>
  );
};

export default CategoryAccordion;
