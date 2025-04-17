import React, { useState } from "react";
import styled from "styled-components";

const MegaDropdown = ({ data = [] }) => {
  const [activeParent, setActiveParent] = useState(null);
  const [activeChild, setActiveChild] = useState(null);

  const childItems =
    activeParent !== null ? data[activeParent]?.children || [] : [];
  const grandChildren =
    activeChild !== null ? childItems[activeChild]?.children || [] : [];

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
            >
              {item.title}
            </Item>
          ))}
        </Column>

        <Column>
          {childItems.map((item, index) => (
            <Item
              key={index}
              onMouseEnter={() => setActiveChild(index)}
              className={activeChild === index ? "active" : ""}
            >
              {item.title}
            </Item>
          ))}
        </Column>

        <Column>
          {grandChildren.map((item, index) => (
            <LinkItem key={index} href={item.url || "#"}>
              {item.title}
            </LinkItem>
          ))}
        </Column>
      </Inner>
    </Wrapper>
  );
};

export default MegaDropdown;

// Styled Components

const Wrapper = styled.div`
text-align: left;
  position: absolute;
  top: -25px;
  left: 0.5vw;
  width: 98vw;
  background: #fff;
  padding: 30px 20px;
  z-index: 999;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow-x: auto;

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

const Item = styled.div`
  padding: 12px 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;

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

const LinkItem = styled.a`
  display: block;
  padding: 12px 16px;
  font-weight: 500;
  font-size: 15px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
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
