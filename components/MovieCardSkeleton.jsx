'use client';
import React from 'react';

const MovieCardLoading = ({
    showPoster = true,
    showTitle = true,
    showGenres = true,
    showButton = true,
    animate = true
}) => {
    const shimmerClass = animate ? "animate-pulse" : "";

    return (
        <div className={`group relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl w-[15rem] ${shimmerClass}`}>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-50"></div>

            {/* Poster Skeleton */}
            {showPoster && (
                <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-600 relative">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-500/20 to-transparent animate-shimmer"></div>

                        {/* Placeholder icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-16 h-16 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Year badge skeleton */}
                    <div className="absolute top-2 right-2 bg-slate-600/80 rounded-full px-2 py-1">
                        <div className="w-8 h-3 bg-slate-700 rounded"></div>
                    </div>
                </div>
            )}

            {/* Content Skeleton */}
            <div className="p-4 space-y-2">
                {/* Movie Title Skeleton */}
                {showTitle && (
                    <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                        </div>
                        {/* Button skeleton */}
                        {showButton && (
                            <div className="ml-2 w-6 h-6 bg-slate-700 rounded-full"></div>
                        )}
                    </div>
                )}

                {/* Genre Skeleton */}
                {showGenres && (
                    <div className="flex flex-wrap gap-1">
                        <div className="h-5 bg-slate-700/50 rounded-full w-12 border border-slate-600/50"></div>
                        <div className="h-5 bg-slate-700/50 rounded-full w-14 border border-slate-600/50"></div>
                        <div className="h-5 bg-slate-700/50 rounded-full w-10 border border-slate-600/50"></div>
                    </div>
                )}
            </div>

            {/* Border skeleton */}
            <div className="absolute inset-0 rounded-2xl border border-slate-600/40 pointer-events-none"></div>

            {/* Custom shimmer animation styles */}
            <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
        </div>
    );
};

export default MovieCardLoading;