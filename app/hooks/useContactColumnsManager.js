"use client";

// This custom hook is used to handle states and effects to be sent down to getColumns function

import { useState, useEffect } from "react";

const useContactColumnsManager = (setColumnFilters) => {
  // Company column state to manage column filters
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  // Company column effect to update filter state
  // Whenever selectedCompanies array is changed apply those values to column filters
  useEffect(() => {
    if (selectedCompanies.length > 0) {
      setColumnFilters([{ id: "company", value: selectedCompanies }]);
    } else {
      setColumnFilters([]);
    }
  }, [selectedCompanies]);

  return {
    setSelectedCompanies,
  };
};

export default useContactColumnsManager;
