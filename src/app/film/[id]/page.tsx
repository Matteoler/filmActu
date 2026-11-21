'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';
import Image from "next/image";
import { Header, Comments } from "@/components";
import { getUser } from "@/lib/auth-session";

type MovieDetails = {
    id: number;
    title: string;
    description: string;
    posterUrl: string;
    rating: number;
    bandeAnnonce: string;
};

export default function FilmDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const imagePathMovie = '/assets/affiche/film/';

    useEffect(() => {
        async function fetchUserId() {
            const user = await getUser();
            setUserId(user?.id || null); // Stocke l'ID utilisateur ou `null` si non défini
        }

        fetchUserId();
    }, []);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await fetch(`/api/film/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: MovieDetails = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Failed to fetch movie details:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!movie) {
        return <p>Film introuvable.</p>;
    }

    return (
        <>
            <Header />
            <main>
                <h1>{movie.title}</h1>
                <Image src={`${imagePathMovie}${movie.posterUrl}`} alt={movie.title} width={360} height={360}/>
                <p>{movie.description}</p>
                <p>Note moyenne : {movie.rating}</p>
                <iframe width="1835" height="765"
                        src={`https://www.youtube.com/embed/${movie.bandeAnnonce}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        className={"aspect-video span-w-7 m-auto h-auto "}
                        allowFullScreen></iframe>
                {userId && <Comments movieId={movie.id} userId={userId}/>}
            </main>
        </>
    );
}