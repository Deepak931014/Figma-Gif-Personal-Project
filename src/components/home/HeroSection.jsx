import React from "react";

const HeroSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col items-center mt-6 px-4 sm:px-6 md:px-8">
      {/* Wrapper container for input */}
      <div className="relative w-full sm:w-4/5 md:w-2/3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="What is on your mind?"
          className="w-full p-3 py-4 lg:py-6 border rounded-xl shadow-sm text-gray-700 pl-4 pr-16 outline-none focus:ring-2 focus:ring-red-400"
        />
        {/* Search button (Optional - If needed) */}
        <button
          onClick={() => console.log("Searching for:", searchTerm)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-400 text-white lg:px-8 px-4 py-2 rounded-xl hover:bg-red-500 transition"
        >
          Search
        </button>
      </div>

      {/* Links section aligned properly */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600 justify-center">
        {["Diwali", "Birthday Poster", "Stickers", "Clip & Meme"].map((item, index) => (
          <button
            key={index}
            onClick={() => setSearchTerm(item)}
            className="cursor-pointer hover:text-red-400 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
