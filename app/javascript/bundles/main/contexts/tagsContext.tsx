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

// Context for fetching and providing tags to the app from the Gumroad API
// This is the same API call as in products, but only for the category without specifying a tag
// This is separated so that the tags are not re-fetched when the user adds/removes a tag within the same category
export const TagsProvider: React.FC<TagsProviderProps> = ({ children }) => {
  const categorySlug = window.location.pathname.split('/').slice(1)[0];

  // Query all tags for a category from the API
  // Cache response locally with key categorySlug
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
