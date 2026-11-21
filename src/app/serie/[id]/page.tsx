'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';
import Image from "next/image";
import { Header, Comments } from "@/components";
import { getUser } from "@/lib/auth-session";

type SerieDetails = {
    id: number;
    title: string;
    description: string;
    posterUrl: string;
    rating: number;
};

export default function SerieDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params); // Utilisation de `use` pour déstructurer `params`
    const [serie, setSerie] = useState<SerieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null); // État pour stocker l'ID utilisateur
    const imagePathSerie = '/assets/affiche/serie/';

    useEffect(() => {
        async function fetchUserId() {
            const user = await getUser();
            setUserId(user?.id || null); // Stocke l'ID utilisateur ou `null` si non défini
        }

        fetchUserId();
    }, []);

    useEffect(() => {
        async function fetchSerieDetails() {
            try {
                const response = await fetch(`/api/serie/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: SerieDetails = await response.json();
                setSerie(data);
            } catch (error) {
                console.error('Failed to fetch serie details:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSerieDetails();
    }, [id]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!serie) {
        return <p>Série introuvable.</p>;
    }

    return (
        <>
            <Header />
            <main>
                <h1>{serie.title}</h1>
                <Image src={`${imagePathSerie}${serie.posterUrl}`} alt={serie.title} width={360} height={360} />
                <p>{serie.description}</p>
                <p>Note moyenne : {serie.rating}</p>
                {userId && <Comments seriesId={serie.id} userId={userId} />}
            </main>
        </>
    );
}