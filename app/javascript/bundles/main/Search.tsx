import React from "react";
import Header from "./sections/Header";
import Products from "./sections/Products";
import { Product, Tag } from "./Types.interface";
import Filters from "./sections/Filters";
import FiltersSummary from "./sections/FiltersSummary";

export interface SearchProps {
  products: Product[];
  tags: Tag[];
  initial_selected_tag_keys: string[];
  search_page_description: string;
}

// Search page layout
const Search: React.FC<SearchProps> = ({ search_page_description }) => {
  return (
    <div className="bg-gumroad-cream">
      <Header search_page_description={search_page_description} />
      <FiltersSummary />
      <Filters />
      <Products />
    </div>
  )
}

export default Search;