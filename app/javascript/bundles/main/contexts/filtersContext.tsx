import React, { ReactNode, SetStateAction, useContext, useState } from "react";
import { Tag } from "../Types.interface";

interface Props {
  initialSelectedTags: Tag[];
  children: ReactNode;
}

interface FiltersContextValue {
  selectedTags: Tag[];
  setSelectedTags?: React.Dispatch<SetStateAction<Tag[]>>;
}

export const FiltersContext = React.createContext<FiltersContextValue>({
  selectedTags: [],
  setSelectedTags: null
});


export const FiltersProvider: React.FC<Props> = ({ initialSelectedTags, children }) => {
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags)
  return (
    <FiltersContext.Provider value={{
      selectedTags,
      setSelectedTags
    }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => useContext(FiltersContext);

