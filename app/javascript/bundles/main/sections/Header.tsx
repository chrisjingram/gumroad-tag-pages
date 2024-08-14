import React, { useState } from 'react';
import GumroadLogo from "@svg/gumroad.svg";
import FilterIcon from "@svg/filter.svg";
import { useFilters } from '../contexts/filtersContext';

interface Props {
  search_page_description: string;
}

const trimDescription = (description: string): string => {
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [];
  return sentences.slice(0, 2).join(' ').trim();
};

const Header: React.FC<Props> = ({ search_page_description }) => {
  const pathname = window.location.pathname;
  const formatPathname = (path: string): string[] => {
    const segments = path.split('/').filter(segment => segment !== '');
    return segments.map(segment => 
      segment.split('-').map(word => 
        word === '3d' ? '3D' : word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    );
  };

  const breadcrumbs = formatPathname(pathname);
  const trimmedDescription = search_page_description ? trimDescription(search_page_description) : null;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const { tagsChangedByUser } = useFilters();
  return (
    <header className="bg-gumroad-green px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black"><GumroadLogo /></h1>
      </div>
      <div className="mt-4 flex items-center">
        <div className="flex-grow bg-white rounded-[4px] border border-gumroad-black flex items-center p-3 mr-2">
          <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search products"
            className="bg-transparent outline-none flex-grow text-gray-700"
          />
        </div>
        <button className="w-[50px] h-[50px] bg-white rounded-[4px] border border-gumroad-black flex items-center justify-center">
          <FilterIcon />
        </button>
      </div>
      <div className="mt-4 mb-2">
        <h2 className="text-2xl font-normal text-gumroad-black">{breadcrumbs.join(' / ')}</h2>
      </div>
      {search_page_description && !tagsChangedByUser && (
        <div>
          {showFullDescription ? (
            <p className="text-gumroad-black">
              {search_page_description}{' '}
              <a href="#" className="text-gumroad-black underline" onClick={(e) => { e.preventDefault(); setShowFullDescription(false); }}>
                Show less
              </a>
            </p>
          ) : (
            <p className="text-gumroad-black">
              {trimmedDescription}{' '}
              <a href="#" className="text-gumroad-black underline" onClick={(e) => { e.preventDefault(); setShowFullDescription(true); }}>
                Show more
              </a>
            </p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
