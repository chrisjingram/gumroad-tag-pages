import React, { ReactNode, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag } from "../Types.interface";

interface TagsContextValue {
  tags: Tag[];
  isLoading: boolean;
  error: unknown;
}

const TagsContext = React.createContext<TagsContextValue | undefined>(undefined);

interface TagsProviderProps {
  children: ReactNode;
}

interface TagsResponse {
  tags_data: Tag[];
}

export const TagsProvider: React.FC<TagsProviderProps> = ({ children }) => {
  const categorySlug = window.location.pathname.split('/').slice(1)[0];

  const { data: tagsResponse, isLoading, error } = useQuery<TagsResponse, unknown>({
    queryKey: ['tags', categorySlug],
    queryFn: () => axios.get('/products/search', { params: { taxonomy: categorySlug } }).then((response) => response.data)
  });

  const tags = tagsResponse?.tags_data || [];

  return (
    <TagsContext.Provider value={{ tags, isLoading, error }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => {
  const context = useContext(TagsContext);
  if (context === undefined) {
    throw new Error('useTags must be used within a TagsProvider');
  }
  return context;
};
