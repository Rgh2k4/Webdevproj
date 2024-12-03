'use client';
import React, { useState, useEffect } from "react";

const Item = ({ movie, onSelect }) => {
  const { title, vote_average } = movie;

  return (
    <li className="p-2 border-b border-gray-300">
      <div>
        <h3>{title}</h3>
        <p>Rating: {vote_average}/10</p>
      </div>
      <button onClick={() => onSelect()} className="text-blue-500 underline">
        Select
      </button>
    </li>
  );
};

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
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`
      );
      const data = await response.json();
      setSelectedMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const genreMapping = {
    'action': 28,
    'comedy': 35,
    'drama': 18,
    'horror': 27,
    'musical': 10402,
    'romance': 10749,
    'sci-fi': 878,
    'western': 37,
    'documentary': 99,
    'animation': 16,
  };

  useEffect(() => {
    let filtered = movies || [];

    if (filterRating) {
      filtered = filtered.filter((movie) => {
        return movie.certification && movie.certification.includes(filterRating);
      });
    }

    if (filterGenre) {
      const genreId = genreMapping[filterGenre];
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
    }

    if (sortBy) {
      filtered = [...filtered];
      switch (sortBy) {
        case "az":
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "za":
          filtered.sort((a, b) => b.title.localeCompare(a.title));
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
        <div className="bg-white p-4 rounded-lg text-black">
          <h2>{movie.title}</h2>
          <p>Synopsis: {details.overview}</p>
          <p>Runtime: {details.runtime} minutes</p>
          <img
            className="max-w-[400px] max-h-[500px] justify-end"
            src={details.poster_path
              ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
              : 'defaultPoster'}
            alt="Movie Poster"
          />
          <p>Rating: {details.vote_average}/10</p>
          <p>Genre: {details.genres.map((genre) => genre.name).join(", ")}</p>
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
      <div className="flex gap-4 mb-4">
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="flex border border-gray-400 p-2 text-black"
        >
          <option value="">Age Rating</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="14A">14A</option>
          <option value="18A">18A</option>
          <option value="A">A</option>
        </select>

        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="flex border border-gray-400 p-2 text-black"
        >
          <option value="">Genre</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="musical">Musical</option>
          <option value="romance">Romance</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="western">Western</option>
          <option value="documentary">Documentary</option>
          <option value="animation">Animation</option>
        </select>
      </div>

      <div className="flex justify-between items-center">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex border border-gray-400 p-2 text-black mb-4"
        >
          <option value="">Sort By</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="low-high">Low-High</option>
          <option value="high-low">High-Low</option>
        </select>
      </div>

      <ul>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Item
              key={movie.id}
              movie={movie}
              onSelect={() => handleSelectMovie(movie)}
            />
          ))
        ) : (
          <p>No movies found matching selected criteria.</p>
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
