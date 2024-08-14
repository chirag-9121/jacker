"use client";

// This custom hook is used to handle states and effects to be sent down to getColumns function

import { useState, useEffect } from "react";

const useJobColumnsManager = (setColumnFilters) => {
  // Company and Response column state to manage column filters
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedResponses, setselectedResponses] = useState([]);

  // Company and Response column effects to update filter state
  // Whenever selectedCompanies array is changed apply those values to column filters
  useEffect(() => {
    if (selectedCompanies.length > 0) {
      setColumnFilters([{ id: "company", value: selectedCompanies }]);
    } else {
      setColumnFilters([]);
    }
  }, [selectedCompanies]);

  useEffect(() => {
    if (selectedResponses.length > 0) {
      setColumnFilters([{ id: "response", value: selectedResponses }]);
    } else {
      setColumnFilters([]);
    }
  }, [selectedResponses]);

  return {
    setSelectedCompanies,
    setselectedResponses,
  };
};

export default useJobColumnsManager;
