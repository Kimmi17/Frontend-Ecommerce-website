import React, { useState, useEffect, ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi"; // Import the search icon
import { SearchBarProps } from "../miscs/types/types";

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm, searchTerm }) => {
  const [searchQuery, setSearchQuery] = useState(searchTerm);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchQuery(newValue);
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      setSearchTerm(newValue);
    }, 1000);
    setTimer(newTimer);
  };

  return (
    <div
      className="search-bar border border-black rounded-md flex items-center px-4 py-2"
      style={{
        background: "linear-gradient(to right, #c5eff7, #96d6e0)",
      }}
    >
      <FiSearch className="text-gray-500 mr-2" /> {/* Search icon */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search..."
        className="outline-none focus:outline-none flex-grow border-none text-black font-serif bg-transparent placeholder-black"
      />
    </div>
  );
};

export default SearchBar;
