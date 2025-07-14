'use client';
import React, { memo } from 'react';

const MovieCard = ({
  poster = "https://via.placeholder.com/300x450/1f2937/ffffff?text=Movie+Poster",
  movieName = "Sample Movie Title",
  releaseYear = "2024",
  genre = "Action, Drama",
  onButtonClick,
  isLoadingRecommendations = false,
}) => {
  const handleRecommendSimilar = () => {
    onButtonClick?.(movieName);
  };

  return (
    <div className="group relative bg-slate-800/60 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.03] border border-slate-700/30 w-[15rem]">

      {/* Poster Image */}
      <div className="relative">
        <img
          src={poster}
          alt={`${movieName} poster`}
          className="w-full h-48 object-fit rounded-t-2xl transition-transform duration-300 group-hover:scale-105 border-b border-slate-600/40"
        />
        <div className="absolute top-2 right-2 bg-red-800 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          {releaseYear}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-red-500 transition-colors leading-snug">
            {movieName}
          </h3>
          <button
            onClick={handleRecommendSimilar}
            disabled={isLoadingRecommendations}
            title="Recommend Similar"
            className="ml-2 p-1 bg-gradient-to-r from-red-700 to-grey-600 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-1">
          {genre.split(',').map((g, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-slate-700 text-slate-100 text-xs rounded-full border border-slate-500/20"
            >
              {g.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(MovieCard);
