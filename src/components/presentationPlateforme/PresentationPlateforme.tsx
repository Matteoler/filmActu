'use client';

import React, { useEffect, useState } from 'react';

interface fetchPlatform {
    id: number;
    title: string;
    appIcon: string;
}

export function PresentationPlateforme() {
    const [loading, setLoading] = useState(true);
    const [fetchPlatform, setFetchPlatform] = useState<fetchPlatform[]>([]);

    const imagePathPlateform = '/assets/Plateforme/';

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/plateforme');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFetchPlatform(data);
            } catch (error) {
                console.error('Failed to fetch plateforme:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <p>Chargement...</p>;
    }

    return (
        <>
            {fetchPlatform.length > 0 ? (
                <section className="grid-container">
                    <h2 className="my-4 text-DarkBlue text-28 font-bold">Plateformes</h2>
                    <div className="flex gap-grid justify-center">
                        {fetchPlatform.map((platform) => (
                            <div key={platform.id} className="flex flex-col items-center span-w-1">
                                <img
                                    src={`${imagePathPlateform}${platform.appIcon}`}
                                    alt={platform.title}
                                    className="h-auto rounded-lg"
                                />
                                <h3 className="mt-2 text-center text-lg font-semibold">{platform.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <p>Aucune plateforme trouvé.</p>
            )}
        </>
    );
}
