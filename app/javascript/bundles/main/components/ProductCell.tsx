import React from "react";
import { Product } from "../Types.interface";

interface Props {
  product: Product;
}

const ProductCell: React.FC<Props> = ({ product }) => {
  return (
    <div className="rounded-[4px] border border-gumroad-black overflow-hidden">
      <div className="relative">
        <img src={product.thumbnail_url} alt={product.name} className="w-full aspect-square object-cover" />
      </div>
      <div className="p-4">
        <h2 className="text-lg mb-2">{product.name}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={product.seller.avatar_url} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
            <span className="text-sm text-gray-600 underline">{product.seller.name}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center border-t border-gumroad-black">
        <div className="flex flex-1 items-center p-4 border-r border-gumroad-black">
          <svg className="w-4 h-4 text-gumroad-black mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm">{product.ratings.average} ({product.ratings.count})</span>
        </div>
        <div className="px-6">
          <div className="bg-gumroad-pink text-black px-2 py-1 text-sm border border-gumroad-black">
            $52+
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCell;