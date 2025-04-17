import React, { useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const MobileDropdownPopup = ({ open, onClose, data = [] }) => {
  const [openIndexMap, setOpenIndexMap] = useState({});

  const toggle = (path) => {
    setOpenIndexMap((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderList = (items, parentPath = "") => (
    <ul>
      {items.map((item, index) => {
        const path = `${parentPath}${index}`;
        const isOpen = openIndexMap[path];

        return (
          <li key={item.title + path}>
            <div className="item-row">
              <a href={item.url || "#"}>{item.title}</a>
              {item.children && (
                <button onClick={() => toggle(path)}>
                  {isOpen ? "▲" : "▼"}
                </button>
              )}
            </div>

            {item.children && (
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
      <Backdrop onClick={onClose} />
      <PopupContainer>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <div className="content">{renderList(data)}</div>
      </PopupContainer>
    </>
  );
};

export default MobileDropdownPopup;

// Styled Components
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

      a {
        font-size: 16px;
        font-weight: 600;
        color: #000;
        text-decoration: none;

        &:hover {
          color: #cba589;
        }
      }

      .item-row {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
          background: none;
          border: none;
          font-size: 14px;
          color: #888;
          cursor: pointer;
        }
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
