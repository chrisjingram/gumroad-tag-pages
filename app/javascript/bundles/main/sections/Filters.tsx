import React from "react";
import { useFilters } from "../contexts/filtersContext";
import { Tag } from "../Types.interface";

const TagCell: React.FC<{ tag: Tag }> = ({ tag }) => (
  <div className="rounded-full bg-white px-4 py-2 border border-gumroad-black">
    {tag.key} ({ tag.doc_count })
  </div>
)

interface Props {
  tags: Tag[]
}

const Filters: React.FC<Props> = ({ tags }) => {
  const { selectedTags } = useFilters();
  return (
    <div className="px-4 pt-6">
      <ul className="flex">
        {selectedTags.map(tag => <li><TagCell tag={tag} /></li>)}
      </ul>
    </div>
  )
  
}

export default Filters;