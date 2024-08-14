import React, { ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product, Tag } from "../Types.interface";
import { useFilters } from "./filtersContext";

interface ProductsContextValue {
  products: Product[];
  total: number;
  isLoading: boolean;
  error: unknown;
}

const ProductsContext = React.createContext<ProductsContextValue | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

interface SearchResponse {
  products: Product[];
  total: number;
}

// Context to provide the products to all components
export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  // Uses the debounced tags from the above filters context
  const { debouncedSelectedTagKeys } = useFilters();
  const categorySlug = window.location.pathname.split('/').slice(1)[0]

  // Call proxied Gumroad API to get products based on categories and tags
  // Query is cached locally based on the category and tags
  // Makes the app feel snappier when moving between tags
  const { data: searchResponse, isLoading, error } = useQuery<SearchResponse, unknown>({
    queryKey: ['products', `${categorySlug}/${debouncedSelectedTagKeys.join(',')}`],
    queryFn: () => axios.get('/products/search', { params: { taxonomy: categorySlug, tags: debouncedSelectedTagKeys } }).then((response) => response.data)
  });

  const products = searchResponse?.products || []
  const total = searchResponse?.total || 0

  return (
    <ProductsContext.Provider value={{ products, total, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

