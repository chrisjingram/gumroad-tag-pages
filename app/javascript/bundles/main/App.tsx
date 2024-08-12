import React from "react";
import Search, { SearchProps } from "./Search";
import { FiltersProvider } from "./contexts/filtersContext";

const App: React.FC<SearchProps> = (props) => {
  return (
    <FiltersProvider initialSelectedTagKeys={props.initial_selected_tag_keys} tags={props.tags}>
      <Search {...props} />
    </FiltersProvider>
  );
};

export default App;
