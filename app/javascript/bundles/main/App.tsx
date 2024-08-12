import React from "react";
import Search, { SearchProps } from "./Search";
import { FiltersProvider } from "./contexts/filtersContext";

const App: React.FC<SearchProps> = (props) => {
  return (
    <FiltersProvider initialSelectedTags={props.initial_selected_tags}>
      <Search {...props} />
    </FiltersProvider>
  );
};

export default App;
