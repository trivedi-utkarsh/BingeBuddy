'use client';
import React from 'react';

const MovieCard = ({
  poster = "https://via.placeholder.com/300x450/1f2937/ffffff?text=Movie+Poster",
  movieName = "Sample Movie Title",
  releaseYear = "2024",
  genre = "Action, Drama"
}) => {

  const handleRecommendSimilar = async () => {
    console.log(`Finding similar movies to: ${movieName}`);
    try {
      const response = await fetch(`http://127.0.0.1:5000/recommend/${movieName}`);
      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      console.log('Recommended movies:', data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.03] transition-all duration-300 ease-in-out w-80 border border-slate-700/50">
      
      {/* Poster Image */}
      <div className="relative">
        <img
          src={poster}
          alt={`${movieName} poster`}
          className="w-full h-64 object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105 border-b border-slate-600/50"
        />

        {/* Year badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {releaseYear}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 break-words leading-snug">
          {movieName}
        </h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-2">
          {genre.split(',').map((g, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gradient-to-tr from-slate-700 via-slate-600 to-slate-700 text-slate-100 text-xs font-medium rounded-full border border-slate-500/30 shadow-inner"
            >
              {g.trim()}
            </span>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleRecommendSimilar}
          className="w-full mt-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 active:scale-95"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Recommend Similar
          </span>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
