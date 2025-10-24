import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainContext from "../../../../context";
import { LanguageContext } from "../../../../context/LanguageContext";
import { apiEndpoints } from "../../../../utils/api/baseApi";
import theme from "../../../../styles/common/theme";

const Wrapper = styled.div`
  background: ${theme.colors.background};
  padding: ${theme.spacing.sm};
  border-radius: 8px;
`;

const AccordionItem = styled.div`
  margin-bottom: ${theme.spacing.xs};
  border-bottom: 1px solid ${theme.colors.border};
`;

const AccordionHeader = styled.div`
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.xs} 0;
  color: ${theme.colors.text};
  transition: color 0.3s ease;

  &:hover {
    color: ${theme.colors.accent};
  }
`;

const AccordionContent = styled.div`
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? "1000px" : "0")};
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
  transition: all 0.4s ease;
  padding-left: ${theme.spacing.sm};
  padding-top: ${({ expanded }) => (expanded ? theme.spacing.xs : "0")};
`;

const CategoryAccordion = ({ onCategoryChange }) => {
  const [openIndexes, setOpenIndexes] = useState({});
  const [productsData, setProductsData] = useState([]);
  console.log(productsData);
  const { setSelectedCategoryId } = useContext(MainContext);
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const result = await apiEndpoints.getCategoriesMenu(lang);
        setProductsData(Array.isArray(result.data) ? result.data : []);
      } catch (error) {
        console.error("Menu fetch error:", error);
      }
    };

    fetchMenuData();
  }, [lang]);

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

  // Helper function to get localized text
  const getLocalizedText = (text) => {
    if (typeof text === 'string') return text;
    if (typeof text === 'object' && text !== null) {
      return text[lang] || text.az || text.en || text.ru || 'N/A';
    }
    return 'N/A';
  };

  const handleAllProductsClick = () => {
    navigate("/products");
    setSelectedCategoryId(null);
    if (onCategoryChange) onCategoryChange();
  };

  const renderChildren = (items, parentPath = "") => {
    return items.map((item, index) => {
      const currentPath = `${parentPath}-${index}`;
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openIndexes[currentPath];

      return (
        <AccordionItem key={getLocalizedText(item.title) + currentPath}>
          <AccordionHeader
            onClick={() =>
              hasChildren ? toggle(currentPath) : handleCategorySelect(item)
            }
          >
            <span>{getLocalizedText(item.title)}</span>
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
          <span>Bütün Məhsullar</span>
        </AccordionHeader>
      </AccordionItem>
      {renderChildren(productsData)}
    </Wrapper>
  );
};

export default CategoryAccordion;
