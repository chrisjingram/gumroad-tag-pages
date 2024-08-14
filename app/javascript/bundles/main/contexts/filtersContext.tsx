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

export const FiltersProvider: React.FC<Props> = ({ initialSelectedTagKeys, children }) => {
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialSelectedTagKeys || []);
  const [tagsChangedByUser, setTagsChangedByUser] = useState(false);
  const [debouncedSelectedTagKeys] = useDebounceValue(selectedTagKeys, 500);

  useEffect(() => {
    const existingQS = qs.parse(window.location.search.slice(1));
    const queryString = qs.stringify({ ...existingQS, tags: selectedTagKeys }, { arrayFormat: "comma", encodeValuesOnly: true });
    console.log("queryString", queryString);
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

