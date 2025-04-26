import React, { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MainContext from "../../../context"; // ✅ Düz import

const MegaDropdown = ({ data = [] }) => {
  const [activeParent, setActiveParent] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const { setSelectedCategoryId } = useContext(MainContext); // ✅ Contextdən id dəyişmək üçün

  const navigate = useNavigate();

  const childItems = activeParent !== null ? data[activeParent]?.children || [] : [];
  const grandChildren = activeChild !== null ? childItems[activeChild]?.children || [] : [];

  const getLink = (item) => {
    return item?.url ? `/products//${encodeURIComponent(item.url)}` : "#";
  };

  const handleItemClick = (item) => {
    if (item.id) {
      setSelectedCategoryId(item.id); // ✅ İd-ni global saxlayırıq
    }
    if (item.url) {
      navigate(`/products//${encodeURIComponent(item.url)}`); // ✅ Yoluna yönləndir
    }
  };

  return (
    <Wrapper>
      <Inner>
        <Column>
          {data.map((item, index) => (
            <Item
              key={index}
              onMouseEnter={() => {
                setActiveParent(index);
                setActiveChild(null);
              }}
              className={activeParent === index ? "active" : ""}
              as="div"
              onClick={() => handleItemClick(item)} // ✅
            >
              {item.title}
            </Item>
          ))}
        </Column>

        <AnimatedColumn key={`child-col-${activeParent}`}>
          {childItems.map((item, index) => (
            <Item
              key={index}
              onMouseEnter={() => setActiveChild(index)}
              className={activeChild === index ? "active" : ""}
              as="div"
              onClick={() => handleItemClick(item)} // ✅
            >
              {item.title}
            </Item>
          ))}
        </AnimatedColumn>

        <AnimatedColumn key={`grand-col-${activeParent}-${activeChild}`}>
          {grandChildren.map((item, index) => (
            <LinkItem
              key={index}
              to={getLink(item)}
              onClick={() => setSelectedCategoryId(item.id)} // ✅ Grandchildren üçün də
            >
              {item.title}
            </LinkItem>
          ))}
        </AnimatedColumn>
      </Inner>
    </Wrapper>
  );
};

export default MegaDropdown;

// ==== Styled Components ====

const slideFade = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  text-align: left;
  position: absolute;
  top: -5px;
  left: 0;
  width: calc(100vw - 15px);
  background: #fff;
  padding: 30px 20px;
  z-index: 999;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
  animation: ${slideFade} 0.4s ease forwards;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
  max-width: 1220px;
  margin: 0 auto;
  flex-wrap: nowrap;
`;

const Column = styled.div`
  flex: 1;
  min-width: 250px;
  border-right: 1px solid #eee;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 992px) {
    min-width: 220px;
  }

  @media (max-width: 768px) {
    min-width: 200px;
  }
`;

const AnimatedColumn = styled(Column)`
  animation: ${slideFade} 0.3s ease;
`;

const Item = styled.div`
  display: block;
  padding: 12px 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
  font-size: 16px;
  text-decoration: none;

  &.active,
  &:hover {
    background: #f7f7f7;
    color: #cba589;
  }

  @media (max-width: 992px) {
    font-size: 15px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const LinkItem = styled(Link)`
  display: block;
  padding: 12px 16px;
  font-weight: 500;
  font-size: 15px;
  color: #333;
  text-decoration: none;
  transition: background 0.3s ease, color 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f7f7f7;
    color: #cba589;
  }

  @media (max-width: 992px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
