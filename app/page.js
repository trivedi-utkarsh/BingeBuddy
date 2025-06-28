'use client';
import MovieCard from "@/components/MovieCard";
import MovieSearchBar from "@/components/Searchbar";
import { useState, useEffect } from "react";
import MovieCardLoading from "@/components/MovieCardSkeleton";

// const movieData = [
//   {
//     poster: "http://www.impawards.com/2012/posters/avengers_ver13.jpg",
//     movieName: "The Avengers",
//     releaseYear: "2012",
//     genre: "Sci-Fi, Thriller, Action"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Echoes+of+War",
//     movieName: "Echoes of War",
//     releaseYear: "2022",
//     genre: "War, Drama"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Neon+Revolt",
//     movieName: "Neon Revolt",
//     releaseYear: "2024",
//     genre: "Action, Cyberpunk"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Frostbite",
//     movieName: "Frostbite",
//     releaseYear: "2021",
//     genre: "Horror, Mystery"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Crimson+Sky",
//     movieName: "Crimson Sky",
//     releaseYear: "2020",
//     genre: "Adventure, Fantasy"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Silent+Truth",
//     movieName: "Silent Truth",
//     releaseYear: "2024",
//     genre: "Crime, Drama"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Quantum+Fall",
//     movieName: "Quantum Fall",
//     releaseYear: "2023",
//     genre: "Sci-Fi, Action"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Moonlit+Road",
//     movieName: "Moonlit Road",
//     releaseYear: "2019",
//     genre: "Romance, Drama"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Burning+Code",
//     movieName: "Burning Code",
//     releaseYear: "2022",
//     genre: "Thriller, Tech"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Rise+of+Legends",
//     movieName: "Rise of Legends",
//     releaseYear: "2021",
//     genre: "Fantasy, Action"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Deadlock",
//     movieName: "Deadlock",
//     releaseYear: "2023",
//     genre: "Action, Crime"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Eternal+Whispers",
//     movieName: "Eternal Whispers",
//     releaseYear: "2020",
//     genre: "Mystery, Drama"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Digital+Storm",
//     movieName: "Digital Storm",
//     releaseYear: "2024",
//     genre: "Sci-Fi, Thriller"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Broken+Wing",
//     movieName: "The Broken Wing",
//     releaseYear: "2018",
//     genre: "Drama, Romance"
//   },
//   {
//     poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Veil+of+Secrets",
//     movieName: "Veil of Secrets",
//     releaseYear: "2022",
//     genre: "Mystery, Thriller"
//   }
// ];

export default function Home() {

	const [movieData, setMovieData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleSearch = (searchTerm) => {
		console.log('Searching for:', searchTerm);
	};

	const handleSelectMovie = (movie) => {
		console.log('Selected movie:', movie);
		// Handle movie selection from suggestions
	};

	const fetchMovies = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('http://127.0.0.1:5000/movies');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();

			// for (const movie of data) {
			// 	try {
			// 		const res = await fetch(`http://127.0.0.1:5000/fetch-poster/${movie.movie_id}`);
			// 		if (!res.ok) {
			// 			throw new Error('Poster fetch failed');
			// 		}
			// 		movie.poster = res.url;
			// 	} catch {
			// 		movie.poster = "https://via.placeholder.com/500x750?text=No+Image";
			// 	}
			// }	

			setMovieData(data);
		} catch (error) {
			console.error('Error fetching movies:', error);
			setMovieData([]);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, [])

	return (
		<div className="mt-12">
			{/* Page Header */}
			<div className="max-w-7xl mx-auto mb-12">
				<h1 className="font-fancy font-bold text-2xl md:text-5xl text-center text-white mb-4">
					Welcome to
				</h1>
				<h1 className="font-fancy font-bold text-2xl md:text-5xl text-center text-white text-transparent mb-4">BingeBuddy</h1>
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
		</div>
	);
}