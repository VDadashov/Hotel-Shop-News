import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import MainContext from "../../../context"; 
const MobileDropdownPopup = ({ open, closePopup, closeAll, data = [] }) => {
  const [openIndexMap, setOpenIndexMap] = useState({});
  const { setSelectedCategoryId } = useContext(MainContext); // ✅ Contextdən istifadə
  const navigate = useNavigate();

  const toggle = (path) => {
    setOpenIndexMap((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const handleItemClick = (item) => {
    if (item.id) {
      setSelectedCategoryId(item.id); // ✅ CategoryId dəyiş
    }
    if (item.url) {
      navigate(`/products//${item.url.replace(/^\/+/, "")}`); // ✅ Routerdə yönləndir
    }
    closeAll(); // ✅ Menu və popup'u bağla
  };

  const renderList = (items, parentPath = "") => (
    <ul>
      {items.map((item, index) => {
        const path = `${parentPath}${index}`;
        const isOpen = openIndexMap[path];
        const hasChildren = item.children && item.children.length > 0;

        return (
          <li key={item.title + path}>
            <div className="item-row">
              {hasChildren ? (
                <ItemButton onClick={() => toggle(path)}>
                  {item.title}
                </ItemButton>
              ) : (
                <ItemButton onClick={() => handleItemClick(item)}>
                  {item.title}
                </ItemButton>
              )}
              {hasChildren && (
                <ToggleButton onClick={() => toggle(path)}>
                  {isOpen ? "▲" : "▼"}
                </ToggleButton>
              )}
            </div>

            {hasChildren && (
              <div className={`sub-list ${isOpen ? "open" : ""}`}>
                {renderList(item.children, `${path}-`)}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  if (!open) return null;

  return (
    <>
      <Backdrop onClick={closePopup} />
      <PopupContainer>
        <CloseButton onClick={closePopup}>
          <FaTimes />
        </CloseButton>
        <div className="content">{renderList(data)}</div>
      </PopupContainer>
    </>
  );
};

export default MobileDropdownPopup;

// ======= Styled Components =======

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 998;
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  width: 320px;
  height: 100vh;
  background: white;
  padding: 60px 20px 20px;
  overflow-y: auto;

  @media (min-width: 769px) {
    display: none;
  }

  .content ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      border-bottom: 1px solid #eee;
      padding: 10px 0;

      .item-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .sub-list {
        max-height: 0;
        opacity: 0;
        visibility: hidden;
        overflow: hidden;
        transition: all 0.4s ease;
        padding-left: 15px;
        background: #f9f9f9;
        margin-top: 0;

        ul {
          padding-left: 10px;
          border-left: 2px dashed #ddd;
        }

        li a {
          font-size: 14px;
          font-weight: 400;
        }

        &.open {
          max-height: 500px;
          opacity: 1;
          visibility: visible;
          margin-top: 8px;
        }
      }
    }
  }
`;

const ItemButton = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #cba589;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: #888;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #cba589;
  }
`;
