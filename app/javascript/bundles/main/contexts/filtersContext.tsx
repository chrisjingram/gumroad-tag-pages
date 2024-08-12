import React, { ReactNode, SetStateAction, useContext, useState } from "react";
import { Tag } from "../Types.interface";

interface Props {
  initialSelectedTagKeys: string[];
  tags: Tag[];
  children: ReactNode;
}

interface FiltersContextValue {
  selectedTagKeys: string[];
  setSelectedTagKeys?: React.Dispatch<SetStateAction<string[]>>;
  selectedTags: Tag[];
}

export const FiltersContext = React.createContext<FiltersContextValue>({
  selectedTagKeys: [],
  setSelectedTagKeys: null,
  selectedTags: []
});


export const FiltersProvider: React.FC<Props> = ({ initialSelectedTagKeys, tags, children }) => {
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialSelectedTagKeys || []);

  const selectedTags = selectedTagKeys.map(key => tags.find(tag => tag.key === key))

  return (
    <FiltersContext.Provider value={{
      selectedTagKeys,
      setSelectedTagKeys,
      selectedTags
    }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => useContext(FiltersContext);

