"use client";
import MovieCard from "@/components/MovieCard";
import MovieSearchBar from "@/components/Searchbar";
import { useState, useEffect } from "react";
import MovieCardLoading from "@/components/MovieCardSkeleton";
import { useRouter } from "next/navigation";

const poster_cache = await import('../backend/poster_cache.json', { assert: { type: 'json' } });

export default function Home() {
	const [movieData, setMovieData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const handleSearch = (searchTerm) => {
		router.push(`/movies?query=${searchTerm}`);
	};

	const handleSelectMovie = (movie) => {
		router.push(`/movies?id=${movie.movie_id}`);
	};

	const handleRecommendSimilar = (movieName) => {
		router.push(`/movies?recommend=${movieName}`);
	}

	const fetchMovies = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("http://127.0.0.1:5000/movies");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			//   for (const movie of data) {
			//     try {
			//       const res = await fetch(
			//         `http://127.0.0.1:5000/fetch-poster/${movie.movie_id}`
			//       );
			//       if (!res.ok) {
			//         throw new Error("Poster fetch failed");
			//       }
			//       const posterUrl = await res.text();
			//       movie.poster = posterUrl;
			//     } catch {
			//       movie.poster = "https://via.placeholder.com/500x750?text=No+Image";
			//     }
			//   }

			for (const movie of data) {
				const posterUrl = poster_cache.default[movie.movie_id] || "https://via.placeholder.com/500x750?text=No+Image";
				movie.poster = posterUrl;
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
		<div className="mt-12">
			{/* Page Header */}
			<div className="max-w-7xl mx-auto mb-12">
				<h1 className="font-fancy font-bold text-2xl md:text-5xl text-center text-white mb-4">
					Welcome to
				</h1>
				<h1 className="font-fancy font-bold text-2xl md:text-5xl text-center text-red-600 mb-4">
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
			<div className="max-w-screen mx-auto flex flex-wrap justify-center gap-x-5 gap-y-8">
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
		</div>
	);
}
