'use client';

import React, { useState, useEffect } from "react";

async function fetchMovies(ageRating = "", genre = "") {
    const apiKey = "bb7493d4f35245a98a4e2f6e93813e12";
    try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

        const params = new URLSearchParams();
        
        if (ageRating) {
            params.append("certification", ageRating);
            params.append("certification_country", "CA");
        }

        if (genre) {
            params.append("with_genres", genre);
        }

        url += `&${params.toString()}`;

        const response = await fetch(url);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

const Movie = ({ title, vote_average }) => {
  return (
    <li className="p-2 border-b border-gray-300">
      <div className="flex flex-col gap-4">
        <h3>{title}</h3>
        <p>Rating: {vote_average}</p>
      </div>
    </li>
  );
};

const MovieFetcher = ({ ageRating, genre, onMoviesFetched }) => {
    const [movies, setMovies] = useState([]);

    const loadMovies = async () => {
      const fetchedMovies = await fetchMovies(ageRating, genre);
      setMovies(fetchedMovies);
      onMoviesFetched(fetchedMovies);
    };

    useEffect(() => {
      loadMovies();
    }, [ageRating, genre]);

    return (
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              vote_average={movie.vote_average}
            />
          ))
        ) : (
          <p>No movies found matching the selected criteria.</p>
        )}
      </ul>
    );
};

export default MovieFetcher;
