import React, { useCallback } from "react";
import { useFilters } from "../contexts/filtersContext";
import { Tag } from "../Types.interface";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"

const TagCell: React.FC<{ tag: Tag, removeTagKey: (key: string) => void }> = ({ tag, removeTagKey }) => {
  return (
    <div className="rounded-full bg-white px-4 py-2 border border-gumroad-black flex items-center">
      <div className="mr-2 text-sm">{tag.key} ({ tag.doc_count })</div>
      <button type="button" onClick={() => removeTagKey(tag.key)}><XMarkIcon className="w-4 h-4" /></button>
    </div>
  )
}

interface Props {
  tags: Tag[]
}

const Filters: React.FC<Props> = ({ tags }) => {
  const { selectedTags, selectedTagKeys, setSelectedTagKeys } = useFilters();
  const removeTagKey = useCallback((keyToRemove) => {
    setSelectedTagKeys(selectedTagKeys.filter(key => key !== keyToRemove));
  }, [setSelectedTagKeys, selectedTagKeys]);
  return (
    <div className="px-4 pt-6">
      <ul className="flex gap-2">
        {selectedTags.map(tag => <li><TagCell tag={tag} removeTagKey={removeTagKey} /></li>)}
        <li>
          <button type="button" className="h-[38px] px-1 flex items-center justify-center"><PlusIcon className="w-5 h-5" /></button>
        </li>
      </ul>
    </div>
  )
  
}

export default Filters;