import React from 'react';
import GumroadLogo from "@svg/gumroad.svg";
import FilterIcon from "@svg/filter.svg";

const Header = () => {
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
      <div className="mt-4">
        <h2 className="text-2xl font-normal text-gumroad-black">3D</h2>
      </div>
    </header>
  );
};

export default Header;
