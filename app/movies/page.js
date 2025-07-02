"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import MovieSearchBar from "@/components/Searchbar";
import MovieCard from "@/components/MovieCard";
import MovieCardLoading from "@/components/MovieCardSkeleton";
import { useRouter } from "next/navigation";

const poster_cache = await import("../../backend/poster_cache.json", {
  assert: { type: "json" },
});

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const movie_id = searchParams.get("id");
  const inputRecommend = searchParams.get("recommend");

  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [selectedMovieName, setSelectedMovieName] = useState(
    inputRecommend || ""
  );

  const modalRef = useRef(null);
const router = useRouter();

  useEffect(() => {
    if (query) {
      console.log("Searching for:", query);
      fetchMovies(query);
    } else if (movie_id) {
      console.log("Fetching movie by ID:", movie_id);
      fetchMovieById(movie_id);
    } else if (inputRecommend) {
      console.log("Fetching recommendations for:", inputRecommend);
      getRecommendations(inputRecommend);
      fetchMovies(inputRecommend);
    }
  }, []);

  // Handle click outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const fetchMovies = async (searchTerm) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get-movies/${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      for (const movie of data) {
        const posterUrl =
          poster_cache.default[movie.movie_id] ||
          "https://via.placeholder.com/500x750?text=No+Image";
        movie.poster = posterUrl;
      }

      setMovieData(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovieData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovieById = async (movieId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get-movie/${movieId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      data.poster =
        poster_cache.default[data.movie_id] ||
        "https://via.placeholder.com/500x750?text=No+Image";

      setMovieData([data]);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovieData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      await fetchMovies(searchTerm);
    } else {
      setMovieData([]);
    }
  };

  const handleSelectMovie = (movie) => {
    console.log("Selected movie:", movie);
    fetchMovieById(movie.movie_id);
  };

  const getRecommendations = async (movieName) => {
    setIsLoadingRecommendations(true);
    setSelectedMovieName(movieName);
    setShowModal(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/recommend/${movieName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch recommendations");

      const data = await response.json();

      for (const movie of data) {
        const posterUrl =
          poster_cache.default[movie.movie_id] ||
          "https://via.placeholder.com/500x750?text=No+Image";
        movie.poster = posterUrl;
      }
      setRecommendedMovies(data);
    } catch (err) {
      console.error(err.message);
      setRecommendedMovies([]);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setRecommendedMovies([]);
    setSelectedMovieName("");
    setIsLoadingRecommendations(false);
  };

  const handleRecommendedMovieClick = (movie) => {
    closeModal();
    fetchMovieById(movie.movie_id);
  };

  return (
    <>
     <div className="fixed top-6 left-6 z-50">
    <button
      onClick={() => router.push("/")}
      className="text-red-800 font-fancy font-bold text-3xl transition duration-300 hover:text-red-600 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]"
    >
      BB
    </button>
  </div>
    <div className="p-4">
      <div className="mb-12 mt-5">
        <MovieSearchBar
          onSearch={handleSearch}
          onSelectMovie={handleSelectMovie}
          query={query}
        />
      </div>
      <div className="max-w-screen mx-auto flex flex-wrap justify-center gap-x-5 gap-y-8">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <MovieCardLoading key={index} showTitle showGenres showButton />
            ))
          : movieData.map((movie, index) => (
              <MovieCard
                key={movie.movie_id || index}
                poster={movie.poster}
                movieName={movie.title}
                releaseYear={movie.release_date?.split("-")[0] || "N/A"}
                genre={movie.genres?.join(", ") || "N/A"}
                onButtonClick={getRecommendations}
                isLoadingRecommendations={isLoadingRecommendations}
              />
            ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-6xl max-h-[90vh] w-full overflow-hidden shadow-2xl border border-slate-700/50"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
              <h2 className="text-2xl font-bold bg-red-800 bg-clip-text text-transparent">
                If you enjoyed {selectedMovieName}, try these:
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white text-2xl font-bold w-10 h-10 flex justify-center hover:bg-slate-700/50 rounded-full transition-all duration-200 border border-slate-600/30"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-gradient-to-b from-slate-900/50 to-slate-800/50 transition-all duration-300 ease-in-out">
              {isLoadingRecommendations ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <MovieCardLoading
                      key={index}
                      showTitle
                      showGenres
                      showButton
                    />
                  ))}
                </div>
              ) : recommendedMovies.length > 0 ? (
                <div className="will-change-transform px-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                  {recommendedMovies.map((movie, index) => (
                    <div
                      key={movie.movie_id || index}
                      onClick={()=>getRecommendations(movie.title)}
                    >
                      <MovieCard
                        poster={movie.poster}
                        movieName={movie.title}
                        releaseYear={movie.release_date?.split("-")[0] || "N/A"}
                        genre={movie.genres?.join(", ") || "N/A"}
                        onButtonClick={(e) => {
                          e.stopPropagation();
                          getRecommendations(movie.title);
                        }}
                        isLoadingRecommendations={isLoadingRecommendations}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-300 text-lg">
                    No recommendations found.
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    Try selecting a different movie.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}