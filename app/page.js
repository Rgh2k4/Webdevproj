'use client';
import React, { useState } from "react";
import MovieFetcher from "./movies";
import MovieList from "./movie-list";

export default function Page() {
    const [movies, setMovies] = useState([]);
    const [ageRating, setAgeRating] = useState("");
    const [genre, setGenre] = useState(""); 

    const handleFetchedMovies = (fetchedMovies) => {
        setMovies(fetchedMovies);
    };

    return (
        <main className="container mx-auto p-4">
            <h1 className="flex font-bold text-xl justify-center absolute top-0 left-1/2 transform -translate-x-1/2">Movie Suggestions 4 U</h1>

            <div className="flex absolute bottom-10 justify-center gap-5 mb-4">
                <select
                    value={ageRating}
                    onChange={(e) => setAgeRating(e.target.value)}
                    className="border border-gray-400 p-2 text-black"
                >
                    <option value="">Age Rating</option>
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="14A">PG-13</option>
                    <option value="18A">18A</option>
                    <option value="A">A</option>
                </select>
                </div>

            <MovieFetcher 
                ageRating={ageRating} 
                genre={genre} 
                onMoviesFetched={handleFetchedMovies} 
            />
            
            <MovieList movies={movies} />
        </main>
    );
}