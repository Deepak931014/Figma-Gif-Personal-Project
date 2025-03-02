// src/pages/PosterPage.js
import React from "react";

const PosterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
          Poster Collection
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Browse our collection of beautifully designed posters!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/400"
              alt="Poster 1"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl text-gray-800 mb-2">Vintage Posters</h3>
            <p className="text-gray-600">Explore our collection of vintage-inspired posters.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/400"
              alt="Poster 2"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl text-gray-800 mb-2">Motivational Posters</h3>
            <p className="text-gray-600">Stay motivated with our collection of inspiring posters.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/400"
              alt="Poster 3"
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-2xl text-gray-800 mb-2">Nature Posters</h3>
            <p className="text-gray-600">Bring nature into your home with these calming posters.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterPage;
