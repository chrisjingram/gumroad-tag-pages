import React from "react";
import Header from "./sections/Header";
import Products from "./sections/Products";
import { Product, Tag } from "./Types.interface";
import Filters from "./sections/Filters";

export interface SearchProps {
  products: Product[];
  tags: Tag[];
  initial_selected_tag_keys: string[];
}

const Search: React.FC<SearchProps> = ({ products, tags }) => {
  return (
    <div className="bg-gumroad-cream">
      <Header />
      <Filters tags={tags} />
      <Products products={products} />
    </div>
  )
}

export default Search;