'use client'

import React, { useState, useEffect, useRef } from 'react';

const MovieSearchBar = ({ onSearch, onSelectMovie }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const searchRef = useRef(null);
    const debounceRef = useRef(null);

    // Mock API call function (replace with your actual API)
    const searchMoviesAPI = async (query) => {
        // await new Promise(resolve => setTimeout(resolve, 300));

        // const mockMovies = [
        //     { id: 1, title: "The Shawshank Redemption", year: "1994", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=TSR" },
        //     { id: 2, title: "The Godfather", year: "1972", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=TGF" },
        //     { id: 3, title: "The Dark Knight", year: "2008", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=TDK" },
        //     { id: 4, title: "Pulp Fiction", year: "1994", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=PF" },
        //     { id: 5, title: "Forrest Gump", year: "1994", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=FG" },
        //     { id: 6, title: "Inception", year: "2010", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=INC" },
        //     { id: 7, title: "Fight Club", year: "1999", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=FC" },
        //     { id: 8, title: "Interstellar", year: "2014", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=INT" },
        //     { id: 9, title: "The Matrix", year: "1999", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=MTX" },
        //     { id: 10, title: "Gladiator", year: "2000", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=GLD" },
        //     { id: 11, title: "Titanic", year: "1997", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=TTN" },
        //     { id: 12, title: "Avatar", year: "2009", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=AVT" },
        //     { id: 13, title: "The Lord of the Rings: Return of the King", year: "2003", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=LOTR" },
        //     { id: 14, title: "The Avengers", year: "2012", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=AVG" },
        //     { id: 15, title: "Avengers: Endgame", year: "2019", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=END" },
        //     { id: 16, title: "Joker", year: "2019", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=JKR" },
        //     { id: 17, title: "The Lion King", year: "1994", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=TLK" },
        //     { id: 18, title: "Harry Potter and the Sorcerer's Stone", year: "2001", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=HP" },
        //     { id: 19, title: "Spirited Away", year: "2001", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=SA" },
        //     { id: 20, title: "Parasite", year: "2019", poster: "https://via.placeholder.com/50x75/1f2937/ffffff?text=PRS" }
        // ];


        // return mockMovies.filter(movie =>
        //     movie.title.toLowerCase().includes(query.toLowerCase())
        // );

        const response = await fetch(`http://127.0.0.1:5000/get-title-suggestions/${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
    };

    const debouncedSearch = (value) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(async () => {
            if (value.trim().length > 0) {
                setIsLoading(true);
                try {
                    const results = await searchMoviesAPI(value);
                    setSuggestions(results);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Search error:', error);
                    setSuggestions([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300); // 300ms debounce delay
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFocusedIndex(-1);
        debouncedSearch(value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            onSearch?.(searchTerm);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (movie) => {
        setSearchTerm(movie.title);
        setShowSuggestions(false);
        onSelectMovie?.(movie);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev =>
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[focusedIndex]);
                } else {
                    handleSearch();
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setFocusedIndex(-1);
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            {/* Search Form */}
            <div className="relative">
                <div className="relative group">
                    {/* Search Input */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search for movies..."
                        className="w-full h-14 pl-12 pr-20 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm shadow-lg group-hover:shadow-xl"
                    />

                    {/* Search Icon */}
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
                        </div>
                    )}

                    {/* Search Button */}
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2.5 rounded-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-lg border border-slate-600/30 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
                    {suggestions.length > 0 ? (
                        <div className="p-2">
                            {suggestions.map((movie, index) => (
                                <div
                                    key={movie.movie_id}
                                    onClick={() => handleSuggestionClick(movie)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${index === focusedIndex
                                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30'
                                        : 'hover:bg-slate-700/50'
                                        }`}
                                >
                                    {/* Movie Poster */}
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        className="w-10 h-15 object-cover rounded-md flex-shrink-0"
                                    />

                                    {/* Movie Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-white font-medium truncate">{movie.title}</h4>
                                        <p className="text-slate-400 text-sm">{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
                                    </div>

                                    {/* Arrow Icon */}
                                    <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-slate-400">
                            No movies found for "{searchTerm}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MovieSearchBar;