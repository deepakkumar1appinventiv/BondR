"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface ExploreSearchProps {
  onSearch: (query: string) => void;
}

export const ExploreSearch = ({ onSearch }: ExploreSearchProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (searchRef.current) {
      gsap.to(searchRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (searchRef.current) {
      gsap.to(searchRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div
      ref={searchRef}
      className={`flex items-center space-x-3 bg-[#EFF3F4] rounded-full w-full h-[50px] px-4 transition-all duration-300 ${
        isFocused ? "border-2 border-sky-400 shadow-lg" : "border border-gray-300"
      }`}
    >
      <MagnifyingGlassIcon
        className={`w-6 h-6 transition-colors duration-300 ${
          isFocused ? "text-sky-400" : "text-gray-500"
        }`}
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search BondR"
        className="bg-transparent outline-none flex-1 text-gray-800 placeholder-gray-500"
      />
      {query && (
        <button
          onClick={clearSearch}
          className="p-1 rounded-full hover:bg-gray-300 transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default ExploreSearch;
