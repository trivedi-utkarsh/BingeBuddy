"use client";
import MovieCard from "@/components/MovieCard";
import MovieSearchBar from "@/components/Searchbar";
import { useState, useEffect } from "react";
import MovieCardLoading from "@/components/MovieCardSkeleton";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import EnhancedLogo from "@/components/Logo";
import NavigationLoader from "@/components/NavigationLoader";

export default function Home() {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleSearch = (searchTerm) => {
    setIsNavigating(true);
    router.push(`/movies?query=${searchTerm}`);
  };

  const handleSelectMovie = (movie) => {
    setIsNavigating(true);
    router.push(`/movies?id=${movie.movie_id}`);
  };

  const handleRecommendSimilar = (movieName) => {
    setIsNavigating(true);
    router.push(`/movies?recommend=${movieName}`);
  };

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/movies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      for (const movie of data) {
        try {
          const res = await fetch(
            `http://127.0.0.1:5000/fetch-poster/${movie.movie_id}`
          );
          if (!res.ok) {
            throw new Error("Poster fetch failed");
          }
          const posterUrl = await res.text();
          movie.poster = posterUrl;
        } catch {
          movie.poster = "https://via.placeholder.com/500x750?text=No+Image";
        }
      }
      setMovieData(data);
      console.log("Fetched movies:", data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovieData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      {/* Navigation Loader */}
      {isNavigating && <NavigationLoader />}

      <div className="mt-12 scroll-smooth">
        {/* Logo Top Left */}
        <div className="absolute top-2 left-10 z-50">
          <button
            onClick={() => router.push("/")}
            className="w-14 h-14 rounded-full text-red-800 font-fancy font-bold text-3xl transition duration-300 hover:text-red-600 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.7)] flex items-center justify-center"
          >
            BB
          </button>
        </div>

        {/* <EnhancedLogo /> */}

        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="font-fancy font-bold text-2xl md:text-5xl text-center text-white mb-4">
            Welcome to
          </h1>
          <h1 className="font-fancy font-bold text-2xl md:text-5xl text-center text-red-800 mb-4 ">
            BingeBuddy
          </h1>
          <p className="text-white text-center text-lg max-w-2xl mx-auto mt-10">
            We know what you'll love—because it's built just for you
          </p>

          {/* Search Bar */}
          <div className="mb-12 mt-5">
            <MovieSearchBar
              onSearch={handleSearch}
              onSelectMovie={handleSelectMovie}
            />
          </div>
        </div>

        {/* Movie Cards Grid */}
        <div className="will-change-transform max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {isLoading
            ? Array.from({ length: 15 }).map((_, index) => (
                <MovieCardLoading
                  key={index}
                  showTitle={true}
                  showGenres={true}
                  showButton={true}
                />
              ))
            : movieData.map((movie, index) => {
                return (
                  <MovieCard
                    key={movie.movie_id || index}
                    poster={movie.poster}
                    movieName={movie.title}
                    releaseYear={
                      movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "N/A"
                    }
                    genre={movie.genres ? movie.genres.join(", ") : "N/A"}
                    onButtonClick={() => handleRecommendSimilar(movie.title)}
                  />
                );
              })}
        </div>

        <Footer />
      </div>
    </>
  );
}
