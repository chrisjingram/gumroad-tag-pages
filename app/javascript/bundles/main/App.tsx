import React from "react";
import Search, { SearchProps } from "./Search";

const App: React.FC<SearchProps> = (props) => {
  return (
    <Search {...props} />
  );
};

export default App;
