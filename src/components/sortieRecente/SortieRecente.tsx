'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Film {
    id: number;
    title: string;
    posterUrl: string;
    dateDeSortie: Date;
}

export function SortieRecente() {
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const imagePathFilm = '/assets/affiche/film/';


    useEffect(() => {
        async function fetchRecentFilms() {
            try {
                const response = await fetch('/api/film');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! Statut: ${response.status}`);
                }

                const data = await response.json();

                // Filtrer pour obtenir les films sortis dans les 7 derniers jours
                const currentDate = new Date();
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(currentDate.getDate() - 7);
                // Réinitialiser les heures pour inclure toute la journée
                sevenDaysAgo.setHours(0, 0, 0, 0);
                currentDate.setHours(23, 59, 59, 999);

                const recentFilms = data
                    .filter((film: Film) => {
                        if (!film.dateDeSortie) return false;
                        const releaseDate = new Date(film.dateDeSortie);
                        return releaseDate >= sevenDaysAgo && releaseDate <= currentDate;
                    })
                    .slice(0, 6); // Limiter à 6 films

                setFilms(recentFilms);
            } catch (error) {
                console.error('Erreur lors de la récupération des films récents:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecentFilms();
    }, []);

    const handleFilmClick = (filmId: number) => {
        router.push(`/film/${filmId}`);
    };

    if (loading) {
        return <p>Chargement des sorties récentes...</p>;
    }

    return (
        <section className="py-8 px-4 mx-auto">
            <h2 className="flex items-center text-2xl font-bold mb-6 text-DarkBlue">
                Sorties de la semaine
            </h2>

            {films.length > 0 ? (
                <div className=" flex gap-grid justify-center">
                    {films.map((film) => (
                        <div
                            key={film.id}
                            className="cursor-pointer transition-transform hover:scale-105 span-w-2"
                            onClick={() => handleFilmClick(film.id)}
                        >
                            <div className="relative rounded-lg overflow-hidden mb-2">
                                <img
                                    src={`${imagePathFilm}${film.posterUrl}`}
                                    alt={film.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <h3 className="text-sm font-medium truncate">{film.title}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucune sortie récente trouvée.</p>
            )}
        </section>
    );
}