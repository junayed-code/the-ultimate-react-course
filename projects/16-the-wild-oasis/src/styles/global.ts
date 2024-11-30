import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Colors adapted from https://tailwindcss.com/docs/customizing-colors */
  :root {
    /* Indigo */
    --color-brand-50: #eef2ff;
    --color-brand-100: #e0e7ff;
    --color-brand-200: #c7d2fe;
    --color-brand-500: #6366f1;
    --color-brand-600: #4f46e5;
    --color-brand-700: #4338ca;
    --color-brand-800: #3730a3;
    --color-brand-900: #312e81;

    /* Grey */
    --color-grey: #fff;
    --color-grey-50: #f9fafb;
    --color-grey-100: #f3f4f6;
    --color-grey-200: #e5e7eb;
    --color-grey-300: #d1d5db;
    --color-grey-400: #9ca3af;
    --color-grey-500: #6b7280;
    --color-grey-600: #4b5563;
    --color-grey-700: #374151;
    --color-grey-800: #1f2937;
    --color-grey-900: #111827;

    --color-blue-100: #e0f2fe;
    --color-blue-700: #0369a1;
    --color-green-100: #dcfce7;
    --color-green-700: #15803d;
    --color-yellow-100: #fef9c3;
    --color-yellow-700: #a16207;
    --color-silver-100: #e5e7eb;
    --color-silver-700: #374151;
    --color-indigo-100: #e0e7ff;
    --color-indigo-700: #4338ca;

    --color-red-100: #fee2e2;
    --color-red-700: #b91c1c;
    --color-red-800: #991b1b;

    --backdrop-color: rgba(0, 0, 0, 0.1);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

    --image-grayscale: 0;
    --image-opacity: 100%;

    &.dark {
      --color-grey: #111827;
      --color-grey-50: #18212f;
      --color-grey-100: #1f2937;
      --color-grey-200: #374151;
      --color-grey-300: #4b5563;
      --color-grey-400: #6b7280;
      --color-grey-500: #9ca3af;
      --color-grey-600: #d1d5db;
      --color-grey-700: #e5e7eb;
      --color-grey-800: #f3f4f6;
      --color-grey-900: #f9fafb;

      --color-blue-100: #075985;
      --color-blue-700: #e0f2fe;
      --color-green-100: #166534;
      --color-green-700: #dcfce7;
      --color-yellow-100: #854d0e;
      --color-yellow-700: #fef9c3;
      --color-silver-100: #374151;
      --color-silver-700: #f3f4f6;
      --color-indigo-100: #3730a3;
      --color-indigo-700: #e0e7ff;

      --color-red-100: #fee2e2;
      --color-red-700: #b91c1c;
      --color-red-800: #991b1b;

      --backdrop-color: rgba(0, 0, 0, 0.3);

      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

      --image-grayscale: 10%;
      --image-opacity: 90%;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    /* Creating animations for dark mode */
    transition: background-color 300ms, border 300ms;
  }

  body {
    font-family: "Poppins", sans-serif;
    color: var(--color-grey-700);
    background-color: var(--color-grey);

    transition: color 300ms, background-color 300ms;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1rem;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
    background-color: inherit;
  }

  button {
    cursor: pointer;
  }

  *:disabled {
    cursor: not-allowed;
  }

  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }

  button:disabled {
    opacity: 0.65;
  }

  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    border-color: var(--color-brand-600);
  }

  /* Parent selector, finally 😃 */
  button:has(svg) {
    line-height: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }
  h1,h2,h3 {
    font-weight: 700;
  }
  h4,h5 {
    font-weight: 600;
  }
  h1 {
    font-size: 3.25rem; /* 52px */
  }
  h2 {
    font-size: 2.75rem; /* 44px */
  }
  h3 {
    font-size: 2.25rem; /* 36px */
  }
  h4 {
    font-size: 1.5rem; /* 24px */
  }
  h5 {
    font-size: 1rem; /* 16px */
  }

  img {
    max-width: 100%;
    display: block;

    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }
`;

export default GlobalStyles;
