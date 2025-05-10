"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
// Création du contexte
const LoadingContext = createContext();

// Hook personnalisé pour accéder plus simplement au contexte
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

// Fournisseur du contexte
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const contextValue = useMemo(() => {
    return { loading, setLoading };
  }, [loading]);

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
