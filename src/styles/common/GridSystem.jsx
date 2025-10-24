import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 1220px;
  margin: 0 auto;

  @media (max-width: 1400px) {
    width: 1140px;
  }

  @media (max-width: 1200px) {
    width: 960px;
  }

  @media (max-width: 992px) {
    width: 720px;
  }

  @media (max-width: 768px) {
    width: 540px;
  }

  @media (max-width: 576px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  row-gap: ${({ $r_gap }) => $r_gap || "0"};
  column-gap: ${({ $c_gap }) => $c_gap || "0"};
  justify-content: ${({ $justify }) => $justify || "flex-start"};
  margin: ${({ $margin }) => $margin || "0"};
  padding: ${({ $padding }) => $padding || "0"};
  align-items: ${({ $align }) => $align || ""};
`;

const generateColumn = (cols) => css`
  grid-column: span ${cols};
`;

export const Col = styled.div`
  ${({ $xs }) => $xs && generateColumn($xs)}

  @media (max-width: 576px) {
    ${({ $xs }) => $xs && generateColumn($xs)}
  }

  @media (min-width: 577px) and (max-width: 768px) {
    ${({ $sm }) => $sm && generateColumn($sm)}
  }

  @media (min-width: 769px) and (max-width: 992px) {
    ${({ $md }) => $md && generateColumn($md)}
  }

  @media (min-width: 993px) and (max-width: 1200px) {
    ${({ $lg }) => $lg && generateColumn($lg)}
  }

  @media (min-width: 1201px) and (max-width: 1400px) {
    ${({ $xl }) => $xl && generateColumn($xl)}
  }

  @media (min-width: 1401px) {
    ${({ $xxl }) => $xxl && generateColumn($xxl)}
  }
`;
