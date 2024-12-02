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
            <h1 className="flex font-bold text-xl">Movie Suggestions 4 U</h1>

            <div className="flex gap-4 mb-4">
                <select
                    value={ageRating}
                    onChange={(e) => setAgeRating(e.target.value)}
                    className="flex border border-gray-400 p-2 text-black"
                >
                    <option value="">Age Rating</option>
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                </select>

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
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
                    <option value="sports">Sports</option>
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
