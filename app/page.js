'use client';
import React, { useState } from "react";
import Movies from "./movies";
import MovieList from "./movie-list";

export default function Page() {
    const [selectedItemName, setSelectedItemName] = useState("");

    return (
        <main className="container mx-auto p-4">
            <h1 className="flex font-bold text-xl">Movie Suggestions 4 U</h1>
                <MovieList Movies={Movies} />
        </main>
    );
}