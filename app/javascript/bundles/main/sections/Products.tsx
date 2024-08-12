import React from "react";
import ProductCell from "../components/ProductCell";

const Products = ({ products }) => {
  return (
    <div className="px-4 py-6 flex flex-col gap-6">
      { products.map(product => <ProductCell product={product} />) }
    </div>
  )
}

export default Products;