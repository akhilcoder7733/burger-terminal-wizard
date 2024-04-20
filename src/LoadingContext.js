import React, { createContext, useState, useContext } from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

// Create the LoadingContext
const LoadingContext = createContext();

// Custom hook to use the loading context
export const useLoading = () => {
  return useContext(LoadingContext);
};

// LoadingContext provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <ClipLoader color="#36D7B7" loading={loading} css={override} size={50} />}
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
