import React from "react";
import { useProducts } from "../contexts/productsContext";

const FiltersSummary: React.FC = () => {
  const { total } = useProducts();
  return (
    <section className="px-4 pt-4">
      <div className="border border-gumroad-black rounded-[4px] flex bg-white p-4">
        <div className="flex-1 text-sm">Showing 1-9 of {total} products</div>
        <div className="flex">
          <button className="underline text-sm mr-2">Clear</button>
          <button className="underline text-sm">All filters</button>
        </div>
      </div>
    </section>
  )
}

export default FiltersSummary;