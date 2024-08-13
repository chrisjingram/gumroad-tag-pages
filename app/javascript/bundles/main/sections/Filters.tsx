import React, { useCallback, useState } from "react";
import { useFilters } from "../contexts/filtersContext";
import { Tag } from "../Types.interface";
import { XMarkIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { useProducts } from "../contexts/productsContext";

const TagCell: React.FC<{ tag: Tag, removeTagKey: (key: string) => void }> = ({ tag, removeTagKey }) => {
  return (
    <div className="rounded-full bg-gumroad-black text-white px-4 py-2 border border-gumroad-black flex items-center shadowtai">
      <div className="mr-2 text-sm whitespace-nowrap">{tag.key} ({ tag.doc_count })</div>
      <button type="button" onClick={() => removeTagKey(tag.key)}><XMarkIcon className="w-4 h-4" /></button>
    </div>
  )
}

const OtherTagCell: React.FC<{ tag: Tag, onClick: React.MouseEventHandler<HTMLButtonElement>}> = ({ tag, onClick }) => (
  <button type="button" onClick={onClick} className="rounded-full bg-white px-4 py-2 border border-gumroad-black flex items-center">
    <div className="mr-2 text-sm whitespace-nowrap">{tag.key} ({ tag.doc_count })</div>
  </button>
)

interface Props {}

const Filters: React.FC<Props> = () => {
  const { selectedTagKeys, setSelectedTagKeys } = useFilters();
  const { isLoading, tags } = useProducts();
  const [shouldShowOtherTags, setShouldShowOtherTags] = useState(false);
  const removeTagKey = useCallback((keyToRemove) => {
    setSelectedTagKeys(selectedTagKeys.filter(key => key !== keyToRemove));
  }, [setSelectedTagKeys, selectedTagKeys]);
  const toggleOtherTags = useCallback(() => {
    setShouldShowOtherTags(!shouldShowOtherTags);
  }, [shouldShowOtherTags, setShouldShowOtherTags]);
  const addTagKey = useCallback((tagKey) => {
    setSelectedTagKeys([...selectedTagKeys, tagKey])
  }, [selectedTagKeys, setSelectedTagKeys])

  console.log("tags", tags);
  console.log("selectedTagKeys", selectedTagKeys);
  const selectedTags = selectedTagKeys.map(key => tags.find(tag => tag.key === key))
  console.log("selectedTags", selectedTags);

  return (
    <section className="px-4 pt-4 mb-2">
      <div className="border border-gumroad-black rounded-[4px] p-4 bg-white">
        { isLoading || tags.length === 0 ? (<div>Loading...</div>) : 
        (
          <>
            <div className="flex items-center">
              <div className="flex-1 text-sm">Filtering for: {selectedTagKeys.join(", ")}</div>
              <button onClick={toggleOtherTags} className="text-sm flex items-center">{shouldShowOtherTags ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" /> }&nbsp;Edit tags</button>
            </div>
            {shouldShowOtherTags && (
              <ul className="flex overflow-x-scroll w-full mt-3 gap-2">
                {selectedTagKeys.map(key => tags.find(tag => tag.key === key)).map(tag => <li><TagCell tag={tag} removeTagKey={removeTagKey} /></li>)}
                {tags.filter(tag => !selectedTagKeys.includes(tag.key)).map((tag) => <li><OtherTagCell tag={tag} onClick={() => addTagKey(tag.key)} /></li>)}
              </ul>
            )}
          </>
        ) }
      </div>
    </section>
  )
  
}

export default Filters;