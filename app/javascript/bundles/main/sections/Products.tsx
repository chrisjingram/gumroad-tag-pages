import React from "react";
import ProductCell from "../components/ProductCell";
import { useProducts } from "../contexts/productsContext";

const Products = () => {
  const { products } = useProducts();
  return (
    <div className="px-4 py-6 flex flex-col gap-6">
      { products.map(product => <ProductCell key={product.id} product={product} />) }
    </div>
  )
}

export default Products;
