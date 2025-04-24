import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BaseApi from "../../../../utils/api/baseApi";

const Wrapper = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
`;

const AccordionItem = styled.div`
  margin-bottom: 0.8rem;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
`;

const AccordionHeader = styled.div`
  font-weight: bold;
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

const SubItem = styled.div`
  padding: 0.3rem 0;
  font-size: 0.9rem;
  cursor: pointer;
  color: #555;
  transition: color 0.3s ease;

  &:hover {
    color: #b85c38;
  }
`;

const AccordionContent = styled.div`
  overflow: hidden;
  max-height: ${({ expanded }) => (expanded ? "1000px" : "0")};
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
  transform: ${({ expanded }) => (expanded ? "translateY(0)" : "translateY(-10px)")};
  transition: all 0.4s ease;
  padding-left: 1rem;
  padding-top: ${({ expanded }) => (expanded ? "0.5rem" : "0")};
`;

const CategoryAccordion = () => {
  const [openIndexes, setOpenIndexes] = useState({});
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${BaseApi}/menu`);

        if (!response.ok) throw new Error("Network response was not ok");
        const rawData = await response.json();
        setProductsData(Array.isArray(rawData) ? rawData : []);
      } catch (err) {
        console.log(err);
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

  const renderChildren = (items, parentPath = "") => {
    return items.map((item, index) => {
      const currentPath = `${parentPath}/${item.title}-${index}`;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <AccordionItem key={currentPath}>
          <AccordionHeader
            onClick={() =>
              hasChildren
                ? toggle(currentPath)
                : item.url && navigate(`/products/${item.url}`)
            }
          >
            <span>{item.title}</span>
            {hasChildren && <span>{openIndexes[currentPath] ? "−" : "+"}</span>}
          </AccordionHeader>

          {hasChildren && (
            <AccordionContent expanded={openIndexes[currentPath]}>
              {renderChildren(item.children, currentPath)}
            </AccordionContent>
          )}
        </AccordionItem>
      );
    });
  };

  return <Wrapper>{renderChildren(productsData)}</Wrapper>;
};

export default CategoryAccordion;
