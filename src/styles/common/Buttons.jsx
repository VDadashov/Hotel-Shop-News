import styled, { css } from "styled-components";
import theme from "./theme";

const variants = {
  primary: css`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    background: ${theme.colors.sale};
    color: ${theme.colors.white};
    border: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: ${theme.fontSizes.sm};
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: ${theme.colors.saleHover};
    }
  `,

  outline: css`
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border: 2px solid ${theme.colors.black};
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${theme.colors.black};
      color: ${theme.colors.white};
    }
  `,

  light: css`
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    font-weight: 600;
    font-size: ${theme.fontSizes.base};
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${theme.colors.inputHover};
    }
  `,
};

const Button = styled.button`
  ${({ $variant }) => variants[$variant || "primary"]}
`;

export default Button;
