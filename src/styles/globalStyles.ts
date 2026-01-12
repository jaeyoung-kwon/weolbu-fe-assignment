import { css, type Theme } from '@emotion/react';

export const globalStyles = (theme: Theme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    background-color: ${theme.colors.background.canvas};
    color: ${theme.colors.text.primary};
    font-family: ${theme.typography.fontFamily};
    font-weight: ${theme.typography.weight.regular};
    line-height: ${theme.typography.lineHeight.normal};

    -webkit-font-smoothing: antialiased;
    text-rendering: optimizelegibility;
  }

  body {
    min-height: 100vh;
    margin: 0;

    background-color: ${theme.colors.background.canvas};
    color: ${theme.colors.text.primary};
    font-family: inherit;
  }

  #root {
    min-height: 100vh;
    background-color: ${theme.colors.background.surface};
  }

  a {
    color: inherit;
    text-decoration: none;
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
    color: inherit;
    font: inherit;
  }

  button,
  input,
  textarea {
    border: 1px solid ${theme.colors.border.subtle};
    background-color: ${theme.colors.background.surface};
  }

  a:focus-visible,
  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  ::selection {
    background-color: ${theme.colors.brand.primaryMuted};
    color: ${theme.colors.brand.primaryStrong};
  }
`;
