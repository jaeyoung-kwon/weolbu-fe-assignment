import { css, type Theme } from '@emotion/react';

export const globalStyles = (theme: Theme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    font-family: ${theme.typography.fontFamily};
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.background.canvas};
    line-height: ${theme.typography.lineHeight.normal};
    font-weight: ${theme.typography.weight.regular};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: inherit;
    background-color: ${theme.colors.background.canvas};
    color: ${theme.colors.text.primary};
  }

  #root {
    min-height: 100vh;
    background-color: ${theme.colors.background.surface};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid ${theme.colors.brand.primary};
    outline-offset: 2px;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button,
  input,
  textarea {
    background-color: ${theme.colors.background.surface};
    border: 1px solid ${theme.colors.border.subtle};
  }

  img {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background-color: ${theme.colors.brand.primaryMuted};
    color: ${theme.colors.brand.primaryStrong};
  }
`;
