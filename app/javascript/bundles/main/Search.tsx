import React from "react";
import Header from "./sections/Header";
import Products from "./sections/Products";
import { Product, Tag } from "./Types.interface";
import Filters from "./sections/Filters";

export interface SearchProps {
  products: Product[];
  tags: Tag[];
  initial_selected_tags: Tag[];
}

const Search: React.FC<SearchProps> = ({ products, tags }) => {
  return (
    <div>
      <Header />
      <Filters />
      <Products products={products} />
    </div>
  )
}

export default Search;