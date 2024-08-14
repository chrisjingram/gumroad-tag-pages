import React, { ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Tag } from "../Types.interface";
import qs from "qs"
import { useDebounceValue } from "usehooks-ts";

interface Props {
  initialSelectedTagKeys: string[];
  tags: Tag[];
  children: ReactNode;
}

interface FiltersContextValue {
  selectedTagKeys: string[];
  debouncedSelectedTagKeys: string[];
  setSelectedTagKeys?: React.Dispatch<SetStateAction<string[]>>;
  tagsChangedByUser: boolean;
  setTagsChangedByUser?: React.Dispatch<SetStateAction<boolean>>;
}

export const FiltersContext = React.createContext<FiltersContextValue>({
  selectedTagKeys: [],
  debouncedSelectedTagKeys: [],
  setSelectedTagKeys: null,
  tagsChangedByUser: false
});

// Context to provide the currently selected tags to all components in the tree
export const FiltersProvider: React.FC<Props> = ({ initialSelectedTagKeys, children }) => {
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialSelectedTagKeys || []);
  // Used to remove the category description when the tags are changed
  const [tagsChangedByUser, setTagsChangedByUser] = useState(false);
  // Debounced tags to prevent overloading the API if someone mashes the tags
  const [debouncedSelectedTagKeys] = useDebounceValue(selectedTagKeys, 500);

  // Update the URL when the tags change
  useEffect(() => {
    // Using qs to preseve any existing query string and replace the tags
    const existingQS = qs.parse(window.location.search.slice(1));
    const queryString = qs.stringify({ ...existingQS, tags: selectedTagKeys }, { arrayFormat: "comma", encodeValuesOnly: true });
    window.history.replaceState(
      {},
      "",
      `${window.location.origin}${window.location.pathname}${queryString && queryString !== "" ? "?" : ""}${queryString}`
    );
  }, [selectedTagKeys])

  return (
    <FiltersContext.Provider value={{
      selectedTagKeys,
      debouncedSelectedTagKeys,
      setSelectedTagKeys,
      tagsChangedByUser,
      setTagsChangedByUser
    }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => useContext(FiltersContext);

