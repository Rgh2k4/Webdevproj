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
                    <option value="14A">14A</option>
                    <option value="18A">18A</option>
                    <option value="A">A</option>
                </select>

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="flex border border-gray-400 p-2 text-black"
                >
                    <option value="">Genre</option>
                    <option value="28">Action</option>
                    <option value="35">Comedy</option>
                    <option value="18">Drama</option>
                    <option value="27">Horror</option>
                    <option value="10402">Musical</option>
                    <option value="10749">Romance</option>
                    <option value="878">Sci-Fi</option>
                    <option value="37">Western</option>
                    <option value="99">Documentary</option>
                    <option value="16">Animation</option>
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
