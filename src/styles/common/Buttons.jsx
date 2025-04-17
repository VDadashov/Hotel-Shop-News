import styled, { css } from "styled-components";

const variants = {
  primary: css`
    padding: 12px 18px;
    background: #cba589;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: #b07c57;
    }
  `,

  outline: css`
    padding: 12px 24px;
    background: white;
    color: black;
    border: 2px solid black;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: black;
      color: white;
    }
  `,

  light: css`
    padding: 14px 28px;
    background: #fff;
    color: #000;
    font-weight: 600;
    font-size: 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #eaeaea;
    }
  `,
};

const Button = styled.button`
  ${({ variant }) => variants[variant || "primary"]}
`;

export default Button;
