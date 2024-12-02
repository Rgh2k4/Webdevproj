'use client';
import React, { useState, useEffect } from "react";

const Item = ({ name, rating, genre, onSelect }) => (
  <li className="p-2 border-b border-gray-300">
    <div>
      <h3>{name}</h3>
      <p>Rating: {rating}</p>
      <p>Genre: {genre}</p>
    </div>
    <button onClick={() => onSelect(movie)} className="text-blue-500 underline">
      Select
    </button>
  </li>
);

const MovieList = ({ movies }) => {
  const [sortBy, setSortBy] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);

  const fetchMovieDetails = async (movieId) => {
    const apiKey = "bb7493d4f35245a98a4e2f6e93813e12";
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
      const data = await response.json();
      setSelectedMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    let filtered = movies || [];

    if (filterRating) {
      filtered = filtered.filter((movie) => movie.rating === filterRating);
    }

    if (filterGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre.toLowerCase().includes(filterGenre.toLowerCase())
      );
    }

    if (sortBy) {
      filtered = [...filtered];
      switch (sortBy) {
        case "az":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "za":
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "low-high":
          filtered.sort((a, b) => a.vote_average - b.vote_average);
          break;
        case "high-low":
          filtered.sort((a, b) => b.vote_average - a.vote_average);
          break;
        default:
          break;
      }
    }

    setFilteredMovies(filtered);
  }, [movies, sortBy, filterRating, filterGenre]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    fetchMovieDetails(movie.id);
  };

  const MovieModal = ({ movie, details, onClose }) => {
    if (!details) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg">
          <h2>{movie.name}</h2>
          <p>Synopsis: {details.overview}</p>
          <p>Runtime: {details.runtime}</p>
          <p>Release Date: {details.release_date}</p>
          <p>Notable Actors:</p>
          <ul>
            {details.credits.cast.slice(0, 5).map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
          <button onClick={onClose} className="text-blue-500 underline">
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex-grow relative">
        </div>
      </div>

      <ul>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Item
              key={movie.id}
              movie={movie}
              onSelect={handleSelectMovie}
            />
          ))
        ) : (
          <p>No movies found matching the selected criteria.</p>
        )}
      </ul>

      {selectedMovie && selectedMovieDetails && (
        <MovieModal
          movie={selectedMovie}
          details={selectedMovieDetails}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default MovieList;
