import React from "react";
import { useFilters } from "../contexts/filtersContext";

const Filters = () => {
  const { selectedTags } = useFilters();

  return (
    <div>
      {JSON.stringify(selectedTags)}
    </div>
  )
  
}

export default Filters;