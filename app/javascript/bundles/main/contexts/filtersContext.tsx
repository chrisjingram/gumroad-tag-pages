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
}

export const FiltersContext = React.createContext<FiltersContextValue>({
  selectedTagKeys: [],
  debouncedSelectedTagKeys: [],
  setSelectedTagKeys: null
});

export const FiltersProvider: React.FC<Props> = ({ initialSelectedTagKeys, tags, children }) => {
  const [selectedTagKeys, setSelectedTagKeys] = useState(initialSelectedTagKeys || []);
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
      setSelectedTagKeys
    }}>
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => useContext(FiltersContext);

