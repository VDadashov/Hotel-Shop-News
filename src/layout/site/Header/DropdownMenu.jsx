import React from 'react';
import styled from 'styled-components';

const DropdownMenu = ({ data, depthLevel = 0, activePaths = [], setActivePaths }) => {
  const isActive = (path) =>
    activePaths.length >= path.length &&
    activePaths.slice(0, path.length).every((v, i) => v === path[i]);

  const renderMenu = (items, currentPath = []) => {
    const currentDepth = depthLevel + currentPath.length;

    return (
      <DropdownList
        depthLevel={currentDepth}
        isActive={isActive(currentPath)}
      >
        {items.map((item, index) => {
          const newPath = [...currentPath, index];
          return (
            <DropdownItem
              key={index}
              onMouseEnter={() => setActivePaths(newPath)}
              onMouseLeave={() => setActivePaths(currentPath)}
            >
              <DropdownLink href={item.url || "#"}>
                {item.title}
                {item.children && <span style={{ marginLeft: '8px' }}>›</span>}
              </DropdownLink>
              {item.children && renderMenu(item.children, newPath)}
            </DropdownItem>
          );
        })}
      </DropdownList>
    );
  };

  if (!data || !Array.isArray(data)) return null;

  return renderMenu(data);
};

export default DropdownMenu;

const DropdownList = styled.ul`
  position: absolute;
  top: ${({ depthLevel }) => (depthLevel === 0 ? '100%' : '0')};
  left: ${({ depthLevel }) => (depthLevel === 0 ? '0' : '100%')};
  background: #fff;
  min-width: 220px;
  max-width: 100vw;
  max-height: 90vh;
  padding: 10px 0;
  margin: 0;
  list-style: none;

  contain: layout style;

  box-shadow: 
    5px 12px 24px rgba(0, 0, 0, 1),
    0 0 0 1px rgba(0, 0, 0, 0.04);

  z-index: ${({ depthLevel }) => 1000 + depthLevel * 10};


  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};

  transform: ${({ depthLevel, isActive }) => 
    isActive 
      ? depthLevel >= 1
        ? 'translateX(-75%)' 
        : 'translateY(0)' 
      : depthLevel >= 1 
        ? 'translateX(0)' 
        : 'translateY(10px)'};

  transition: 
    opacity 0.2s ease,
    transform 2s ease,
    visibility 0.2s ease;
  
  transition-delay: ${({ depthLevel }) => (depthLevel >= 1 ? '0.3s' : '0s')};

  @media (max-width: 768px) {
    position: static;
    transform: none;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    box-shadow: none;
    max-height: none;
    overflow: visible;
  }
`;


const DropdownItem = styled.li`
  position: relative;
`;

const DropdownLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  transition: all 1s ease;

  &:hover {
    background: #f3f3f3;
    color: #000;
  }
`;
