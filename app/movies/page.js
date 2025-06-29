'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MovieSearchBar from '@/components/Searchbar';
import MovieCard from '@/components/MovieCard';
import MovieCardLoading from '@/components/MovieCardSkeleton';

export default function MoviesPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const movie_id = searchParams.get('id');

    const [movieData, setMovieData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (query) {
            console.log('Searching for:', query);
            
            fetchMovies(query);
        } else if (movie_id) {
            console.log('Fetching movie by ID:', movie_id);
            fetchMovieById(movie_id);
        }
    }, [])

    const fetchMovies = async (searchTerm) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/get-movies/${searchTerm}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // console.log('Search results:', data);
            setMovieData(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovieData([]);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchMovieById = async (movieId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:5000/get-movie/${movieId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMovieData([data])

        } catch (error) {
            console.error('Error fetching movies:', error);
            setMovieData([]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearch = async (searchTerm) => {
        if (searchTerm.trim()) {
            console.log('Searching for:', searchTerm);
            await fetchMovies(searchTerm);
        } else {
            setMovieData([]);
        }
    };

    const handleSelectMovie = (movie) => {
        console.log('Selected movie:', movie);
        fetchMovieById(movie.movie_id);
    };

    return (
        <div className="p-4">
            <div className="mb-12 mt-5">
                <MovieSearchBar
                    onSearch={handleSearch}
                    onSelectMovie={handleSelectMovie}
                    query={query}
                />
            </div>

            <div className="max-w-screen mx-auto flex flex-wrap justify-center gap-x-5 gap-y-8">

                {isLoading ? (
                    Array.from({ length: 12 }).map((_, index) => (
                        <MovieCardLoading key={index} showTitle={true} showGenres={true} showButton={true} />
                    ))
                ) : (
                    movieData.map((movie, index) => {
                        return (
                            <MovieCard
                                key={movie.movie_id || index}
                                poster={movie.poster}
                                movieName={movie.title}
                                releaseYear={movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                                genre={movie.genres ? movie.genres.join(', ') : 'N/A'}
                            />
                        );
                    })
                )}
            </div>

            {/* You can fetch data from your Flask API here based on the query */}
        </div>
    );
}
