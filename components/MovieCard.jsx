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
        // Add your recommendation logic here

        const response = await fetch(`http://127.0.0.1:5000/recommend/${movieName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch recommendations');
            return;
        }       

        const data = await response.json();
        console.log('Recommended movies:', data);
    };

    return (
        <div className="group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 ease-out w-80">
            {/* Gradient overlay for depth */}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

            {/* Poster Image */}
            <div className="relative overflow-hidden">
                <img
                    src={poster}
                    alt={`${movieName} poster`}
                    className="w-full h-50 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Year badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    {releaseYear}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Movie Title */}
                <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-300 transition-colors duration-200 break-words">
                    {movieName}
                </h3>

                {/* Genre */}
                <div className="flex flex-wrap gap-2">
                    {genre.split(',').map((g, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-full border border-slate-600/50 backdrop-blur-sm break-words"
                        >
                            {g.trim()}
                        </span>
                    ))}
                </div>

                {/* Recommend Button */}
                <button
                    onClick={handleRecommendSimilar}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                >
                    <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Recommend Similar
                    </span>
                </button>
            </div>

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-2xl border border-slate-600/20 group-hover:border-blue-500/30 transition-colors duration-300 pointer-events-none"></div>
        </div>
    );
};

export default MovieCard;