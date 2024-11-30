"use client";

import React, { useState, useEffect } from "react";

async function fetchMovies(ageRating, genre) {
    try {
        let url = ``;

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
        <li>
            <div className="flex flex-col gap-4">
                <h3>{title}</h3>
                <p>Rating: {vote_average}</p>
            </div>
        </li>
    );
};

const MovieFetcher = ({ ageRating, genre, sortOption }) => {
    const [movies, setMovies] = useState([]);

    const loadMovies = async () => {
        const fetchedMovies = await fetchMovies(ageRating, genre);
        setMovies(fetchedMovies);
    };

    useEffect(() => {
        loadMovies();
    }, [ageRating, genre]);

    return (
        <ul>
            {movies.length > 0 ? (
                movies.map((movie) => <Movie key={movie.id} {...movie} />)
            ) : (
                <p>No movies found</p>
            )}
        </ul>
    );
};

export default MovieFetcher;
