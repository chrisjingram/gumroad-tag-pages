import React from "react";
import Header from "./sections/Header";
import Products from "./sections/Products";
import { Product, Tag } from "./Types.interface";

export interface SearchProps {
  products: Product[],
  tags: Tag[]
}

const Search: React.FC<SearchProps> = ({ products, tags }) => {
  return (
    <div>
      <Header />
      <Products products={products} />
    </div>
  )
}

export default Search;