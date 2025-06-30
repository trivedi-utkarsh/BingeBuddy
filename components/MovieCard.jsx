'use client';
import React from 'react';

const MovieCard = ({
  poster = "https://via.placeholder.com/300x450/1f2937/ffffff?text=Movie+Poster",
  movieName = "Sample Movie Title",
  releaseYear = "2024",
  genre = "Action, Drama",
  onButtonClick,
  isLoadingRecommendations = false,
}) => {

  const handleRecommendSimilar = () => {
    onButtonClick?.(movieName)
  };

  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.03] transition-all duration-300 ease-in-out w-60 border border-slate-700/50">

      {/* Poster Image */}
      <div className="relative">
        <img
          src={poster}
          alt={`${movieName} poster`}
          className="w-full h-40 object-fit rounded-t-3xl transition-transform duration-500 group-hover:scale-105 border-b border-slate-600/50"
        />

        {/* Year badge */}
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {releaseYear}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Title */}
        <div className="flex items-center justify-between">
  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-red-600 transition-colors duration-200 break-words leading-snug">
    {movieName}
  </h3>
  <button
    onClick={handleRecommendSimilar}
    disabled={isLoadingRecommendations}
    title="Recommend Similar"
    className="ml-2 bg-gradient-to-r from-red-700 to-orange-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold p-2 rounded-lg shadow-md hover:shadow-xl disabled:shadow-none transition-all duration-200 active:scale-95 disabled:active:scale-100"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </button>
</div>



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
        {/* <button
          onClick={handleRecommendSimilar}
          className="w-full mt-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 active:scale-95"
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Recommend Similar
          </span>
        </button> */}
        {/* <button
          onClick={handleRecommendSimilar}
          disabled={isLoadingRecommendations}
          className="w-full mt-3 bg-gradient-to-r from-red-700 to-orange-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl disabled:shadow-none transition-all duration-200 active:scale-95 disabled:active:scale-100"
        >
          <span className="flex items-center justify-center gap-2">
            {isLoadingRecommendations ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Recommend Similar
              </>
            )}
          </span>
        </button> */}
      </div>
    </div>
  );
};

export default MovieCard;
