import React, { useState } from "react";
import Search, { SearchProps } from "./Search";
import { FiltersProvider } from "./contexts/filtersContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProductsProvider } from "./contexts/productsContext";

const App: React.FC<SearchProps> = (props) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <FiltersProvider initialSelectedTagKeys={props.initial_selected_tag_keys} tags={props.tags}>
        <ProductsProvider>
            <Search {...props} />
        </ProductsProvider>
      </FiltersProvider>
    </QueryClientProvider>
  );
};

export default App;
