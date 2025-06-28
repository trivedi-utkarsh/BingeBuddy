'use client';
import Image from "next/image";
import MovieCard from "@/components/MovieCard";
import MovieSearchBar from "@/components/Searchbar";

const movieData = [
  {
    poster: "http://www.impawards.com/2012/posters/avengers_ver13.jpg",
    movieName: "The Avengers",
    releaseYear: "2012",
    genre: "Sci-Fi, Thriller, Action"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Echoes+of+War",
    movieName: "Echoes of War",
    releaseYear: "2022",
    genre: "War, Drama"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Neon+Revolt",
    movieName: "Neon Revolt",
    releaseYear: "2024",
    genre: "Action, Cyberpunk"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Frostbite",
    movieName: "Frostbite",
    releaseYear: "2021",
    genre: "Horror, Mystery"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Crimson+Sky",
    movieName: "Crimson Sky",
    releaseYear: "2020",
    genre: "Adventure, Fantasy"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Silent+Truth",
    movieName: "Silent Truth",
    releaseYear: "2024",
    genre: "Crime, Drama"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Quantum+Fall",
    movieName: "Quantum Fall",
    releaseYear: "2023",
    genre: "Sci-Fi, Action"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Moonlit+Road",
    movieName: "Moonlit Road",
    releaseYear: "2019",
    genre: "Romance, Drama"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Burning+Code",
    movieName: "Burning Code",
    releaseYear: "2022",
    genre: "Thriller, Tech"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Rise+of+Legends",
    movieName: "Rise of Legends",
    releaseYear: "2021",
    genre: "Fantasy, Action"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Deadlock",
    movieName: "Deadlock",
    releaseYear: "2023",
    genre: "Action, Crime"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Eternal+Whispers",
    movieName: "Eternal Whispers",
    releaseYear: "2020",
    genre: "Mystery, Drama"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Digital+Storm",
    movieName: "Digital Storm",
    releaseYear: "2024",
    genre: "Sci-Fi, Thriller"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=The+Broken+Wing",
    movieName: "The Broken Wing",
    releaseYear: "2018",
    genre: "Drama, Romance"
  },
  {
    poster: "https://via.placeholder.com/300x450/1f2937/ffffff?text=Veil+of+Secrets",
    movieName: "Veil of Secrets",
    releaseYear: "2022",
    genre: "Mystery, Thriller"
  }
];

export default function Home() {
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    // Add your search logic here
    // You can filter movieData or make API calls
  };

  const handleSelectMovie = (movie) => {
    console.log('Selected movie:', movie);
    // Handle movie selection from suggestions
  };

  return (
    <div className="mt-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Welcome to BingeBuddy
        </h1>
        <p className="text-slate-400 text-center text-lg max-w-2xl mx-auto mb-8">
          Discover amazing movies and find your next favorite film
        </p>
        
        {/* Search Bar */}
        <div className="mb-12">
          <MovieSearchBar 
            onSearch={handleSearch}
            onSelectMovie={handleSelectMovie}
          />
        </div>
      </div>

      {/* Movie Cards Grid */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
        {movieData.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              poster={movie.poster}
              movieName={movie.movieName}
              releaseYear={movie.releaseYear}
              genre={movie.genre}
            />
          );
        })}
      </div>
    </div>
  );
}