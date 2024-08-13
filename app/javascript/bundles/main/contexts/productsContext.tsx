import React, { ReactNode, useContext } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import objectHash from "object-hash";
import { Product, Tag } from "../Types.interface";
import { useFilters } from "./filtersContext";

interface ProductsContextValue {
  products: Product[];
  isLoading: boolean;
  error: unknown;
}

const ProductsContext = React.createContext<ProductsContextValue | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

interface SearchResponse {
  products: Product[];
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const { debouncedSelectedTagKeys } = useFilters();
  const categorySlug = window.location.pathname.split('/').slice(1)[0]

  const { data: searchResponse, isLoading, error } = useQuery<SearchResponse, unknown>({
    queryKey: ['products', debouncedSelectedTagKeys.join(',')],
    queryFn: () => axios.get('/products/search', { params: { taxonomy: categorySlug, tags: debouncedSelectedTagKeys } }).then((response) => response.data)
  });

  const products = searchResponse?.products || []

  return (
    <ProductsContext.Provider value={{ products, isLoading, error }}>
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

