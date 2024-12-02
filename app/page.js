'use client';
import React, { useState } from "react";
import MovieFetcher from "./movies";
import MovieList from "./movie-list";

export default function Page() {
    const [movies, setMovies] = useState([]);

    const handleFetchedMovies = (fetchedMovies) => {
        setMovies(fetchedMovies);
    };

        return (
            <main className="container mx-auto p-4">
                <h1 className="flex font-bold text-xl">Movie Suggestions 4 U</h1>
                <MovieFetcher onMoviesFetched={handleFetchedMovies} />
                <MovieList movies={movies} />
            </main>
    );
}