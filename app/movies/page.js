"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import MovieSearchBar from "@/components/Searchbar";
import MovieCard from "@/components/MovieCard";
import MovieCardLoading from "@/components/MovieCardSkeleton";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

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
  const modalContentRef = useRef(null);
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

      try {
        const res = await fetch(
          `http://127.0.0.1:5000/fetch-poster/${data.movie_id}`
        );
        if (!res.ok) {
          throw new Error("Poster fetch failed");
        }
        const posterUrl = await res.text();
        data.poster = posterUrl;
      } catch {
        data.poster = "https://via.placeholder.com/500x750?text=No+Image";
      }

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

  const scrollModalToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const getRecommendations = async (movieName) => {
    setIsLoadingRecommendations(true);
    setSelectedMovieName(movieName);
    setShowModal(true);

    // Scroll to top when starting new recommendations
    setTimeout(() => {
      scrollModalToTop();
    }, 100);

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
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-7xl max-h-[90vh] w-full overflow-hidden shadow-2xl border border-slate-700/50"
            >
              {/* Modal Header */}
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

              {/* Modal Content */}
              <div
                className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-gradient-to-b from-slate-900/50 to-slate-800/50 scroll-smooth"
                style={{ scrollBehavior: "smooth" }}
              >
                {isLoadingRecommendations ? (
                  <div className="flex flex-wrap justify-center gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="flex-shrink-0">
                        <div className="group relative bg-slate-800/40 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl w-80 border border-slate-700/50">
                          <div className="w-full h-64 bg-slate-700/50 rounded-t-3xl border-b border-slate-600/50"></div>
                          <div className="p-5 space-y-3">
                            <div className="h-6 bg-slate-700/50 rounded-lg"></div>
                            <div className="flex flex-wrap gap-2">
                              <div className="h-6 w-16 bg-slate-700/50 rounded-full"></div>
                              <div className="h-6 w-20 bg-slate-700/50 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recommendedMovies.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-y-4 gap-x-2 place-items-center">
                    {recommendedMovies.map((movie, index) => (
                      <div
                        key={movie.movie_id || index}
                        className="flex-shrink-0 cursor-pointer"
                        onClick={() => handleRecommendedMovieClick(movie)}
                      >
                        <div className="group relative bg-slate-800/40 backdrop-blur-lg rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.03] w-[16rem] h-[22rem] border border-slate-700/50">
                          {/* Poster Image */}
                          <div className="relative">
                            <img
                              src={movie.poster}
                              alt={`${movie.title} poster`}
                              className="w-full h-52 object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105 border-b border-slate-600/50"
                            />
                            {/* Year badge */}
                            <div className="absolute top-2 right-2 bg-red-800 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                              {movie.release_date
                                ? movie.release_date.split("-")[0]
                                : "N/A"}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 space-y-3">
                            {/* Title */}

                            <div className="flex items-center justify-between">
                              <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-red-500 transition-colors duration-200 break-words leading-snug">
                                {movie.title}
                              </h3>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  getRecommendations(movie.title);
                                }}
                                className="ml-4 p-1 bg-gradient-to-r from-red-700 to-gray-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-50"
                              >
                                <span className="flex items-center justify-center gap-2">
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                  </svg>
                                </span>
                              </button>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-1">
                              {(movie.genres ? movie.genres.join(", ") : "N/A")
                                .split(",")
                                .map((g, idx) => (
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-300 text-lg">
                      No recommendations found.
                    </p>
                    <p className="text-slate-400 text-sm mt-2">
                      Try selecting a different movie for recommendations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
