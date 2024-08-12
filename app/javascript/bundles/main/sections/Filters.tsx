import React from "react";
import { useFilters } from "../contexts/filtersContext";
import { Tag } from "../Types.interface";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"

const TagCell: React.FC<{ tag: Tag }> = ({ tag }) => (
  <div className="rounded-full bg-white px-4 py-2 border border-gumroad-black flex items-center">
    <div className="mr-2 text-sm">{tag.key} ({ tag.doc_count })</div>
    <div><XMarkIcon className="w-4 h-4" /></div>
  </div>
)

interface Props {
  tags: Tag[]
}

const Filters: React.FC<Props> = ({ tags }) => {
  const { selectedTags } = useFilters();
  return (
    <div className="px-4 pt-6">
      <ul className="flex gap-2">
        {selectedTags.map(tag => <li><TagCell tag={tag} /></li>)}
        <li>
          <button className="h-[38px] px-1 flex items-center justify-center"><PlusIcon className="w-5 h-5" /></button>
        </li>
      </ul>
    </div>
  )
  
}

export default Filters;